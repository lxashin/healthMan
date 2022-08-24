<template>
	<view class="bgc">
		<view class="bailan">
			<view class="noArticle" v-if="!article.length">
				<image src="../../static/image/beiwanglu.png" mode="widthFix"></image>
				<view class="text">写下此刻心情吧</view>
			</view>
			<view class="search" v-if="article.length">
				<view class="oldSearch" v-if="showSearch">
					<u-search placeholder="搜索备忘" height="40rpx" disabled :showAction='false' bgColor="#fff" @click="clicksearch"></u-search>
					<u-icon name="calendar" size="30" @click='goCalendar'></u-icon>
				</view>
				
				<view class="newSearch"  v-else>
					<u-search :clearabled="true" @search="search" placeholder='搜索备忘录(标题/内容)' :showAction='false' v-model="keyword"></u-search>
					<view class="btn" @click="cancel">
						取消
					</view>
				</view>
			</view>
			
			<view class="show_article" @click="goDetail(item)" v-for="item in article" :key="item.id">
				<view class="article">
					<view class="calendar">
						<text class="day">{{item.date.substring(item.date.length-2)}}</text>
						<text class="month">{{item.date.substring(6,7)}}月</text>
					</view>
					<view class="container">
						<view class="title">
							{{item.title}}
						</view>
						<view class="content">
							{{item.content}}
						</view>
						<view class="tool">
							<view class="time">
								{{item.time}}
							</view>
							<view class="edit">
								<u-icon name="edit-pen" size="24"></u-icon>
							</view>
							<view class="list">
								<u-icon name="list" size="24"></u-icon>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="pen" @click="goWrite">
				<image src="../../static/image/pencil.png" mode="widthFix"></image>
			</view>
		</view>
		
	</view>
	
</template>

<script>
	export default{
		data(){
			return {
				article:[]||{},
				keyword:'',
				showSearch:true
			}
		},
		methods:{
			goWrite(){
				uni.navigateTo({
					url:'../../compoments/bailan/textarea'
				})
			},
			clicksearch(){
				
				this.showSearch = false
			},
			cancel(){
				this.showSearch = true
				this.getArticle()
			},
			async search(){
				const res = await uniCloud.callFunction({
					name:'Article',
					data:{
						action:'searchArticle',
						keyword:this.keyword
					}
				})
				if(res.result.data.length==0){
					this.article= this.article
				}else{
					console.log(res.result.data.length)
					this.article = res.result.data
					this.showSearch = false
				}
				
			},
			goCalendar(item){
				// 点击日历图标跳转页面
				uni.navigateTo({
					url:'../../compoments/bailan/calendar'
				})
			},
			goDetail(item){
				// 跳转文章详情页
				uni.navigateTo({
					url:'../../compoments/bailan/detailArticle?article='+encodeURIComponent(JSON.stringify(item))
				})
			},
			// 获取文章
			async getArticle(){
				const res = await uniCloud.callFunction({
					name:'Article',
					data:{
						action:'get',
						
					}
				})
				// console.log(JSON.stringify(res.result.data))
				this.article = JSON.parse(JSON.stringify(res.result.data))
				
				
			},
			// 获取某一条文章
			async getOneArticle(id){
				const res = await uniCloud.callFunction({
					name:'Article',
					data:{
						action:'getOne',
						id
					}
				})
				console.log(res)
			},
			// 删除文章
			async delArticle(id){
				const res = await uniCloud.callFunction({
					name:'Article',
					data:{
						action:'delete',
						id:id
					}
				})
				console.log(res)
				if(res.result.deleted){
					uni.showToast({
						title:'删除成功',
						icon:'none'
					})
				}
			},
		},
		created() {
			
		},
		mounted() {
			this.getArticle()
			
		},
		computed:{
			day(){
				this.article.forEach((item)=>{
					console.log(item.time.substr(item.time.length-2))
					return item.time.substr(item.time.length-2)
				})
			}
		}
	}
</script>

<style lang="scss">
	.bgc{
		background-color: #f2f2f2;
	}
	.bailan{
		position: relative;
		// margin: 300rpx 220rpx;
		.noArticle{
			margin-top: 40%;
			background-color: #fff;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			image{
				width: 300rpx;
				
			}
			.text{
				font-size: 40rpx;
				color: #999;
			}
		}
		
		.pen{
			position: fixed;
			bottom: 180rpx;
			right: 270rpx;
			width: 160rpx;
			image{
				width: 80%;
			}
		}
		.search{
			background-color: #fff;
			margin-bottom: 10rpx;
			.oldSearch{
				display: flex;
				width: 300rpx;
				// margin-left: 30rpx;
				margin-top: 20rpx;
				.u-icon{
					position: absolute;
					right: 40rpx;
					top: -6rpx;
				}
			}
			
			.newSearch{
				display: flex;
				width: 100%;
				height: 100rpx;
				background-color: #fad556;
				.btn{
					width: 100rpx;
					height: 80rpx;
					line-height: 80rpx;
					text-align: center;
				}
			}
		}
		.show_article{
			margin-top: 30rpx;
			margin-bottom: 30rpx;
			.article{
				display: flex;
				width: 90%;
				margin-left: 5%;
				height: 200rpx;
				background-color: #fff;
				border-radius: 20rpx;
				box-shadow: 0rpx 0 10rpx 10rpx #ccc;
				.calendar{
					display: flex;
					justify-content: center;
					align-items: center;
					flex-direction: column;
					flex: 1;
					border-right: 2rpx solid #ccc;
					.day{
						font-size: 50rpx;
						font-weight: 600;
						margin-bottom: 10rpx;
					}
					.month{
						
					}
				}
				.container{
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					flex: 5;
					margin-left: 20rpx;
					.title{
						flex: 1;
						font-size: 40rpx;
						font-weight: 600;
					}
					.content{
						flex: 3;
						height: 50rpx;
						line-height: 48rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
					}
					.tool{
						display: flex;
						flex: 1;
						margin-bottom: 10rpx;
						.time{
							font-size: 36rpx;
							color: #707070;
						}
						.edit{
							position: absolute;
							right: 140rpx;
						}
						.list{
							position: absolute;
							right: 70rpx;
						}
					}
				}
			}
			
		}
	}
</style>