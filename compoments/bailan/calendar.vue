// 点击展示日历组件
<template>
	<view class="calendar" style="background-color: #f2f2f2;">
		<Calendar @confirm="confirm" @change="change"></Calendar>
		
		<view class="container">
			<!-- 无备忘录 -->
			<view class="noneArticle" v-if="!article.length">
				--{{date}}无备忘录--
			</view>
			
			<view v-else>
				<view class="date">
						{{date}}
					</view>
					
				<!-- article卡片 -->	
					<view class="show_article" v-for="item in article" :key="item.id">
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
					
			</view>
			
		</view>
	
	</view>	
		
	
</template>

<script>
	import Calendar from '../uni-calendar_1.4.5/components/uni-calendar/uni-calendar'
	export default{
		components:{
			Calendar
		},
		data(){
			return{
				article:[],
				date:''
			}
		},
		methods:{
			change(e){
				console.log(e.fulldate)
				this.date = e.fulldate
				this.getArticle()
				
			},
			async getArticle(){
				const res = await uniCloud.callFunction({
					name:'Article',
					data:{
						action:'getArticle',
						date:this.date
					}
				})
				
				this.article = JSON.parse(JSON.stringify(res.result.data))
			},
			getNowDate(){
				var time = new Date()
				var y = time.getFullYear()
				var m = time.getMonth()+1<10?'0'+(time.getMonth()+1):time.getMonth()+1
				var d = time.getDate()<10?'0'+time.getDate():time.getDate()
				return y+'-'+m+'-'+d;
			}
		},
		async mounted() {
			this.date = this.getNowDate()
			this.getArticle()
		}
	}
</script>

<style lang="scss" scoped>
	.date{
		margin-top: 30rpx;
		margin-left: 20rpx;
		font-size: 40rpx;
		font-weight: 600;
	}
	.noneArticle{
		width: 100%;
		height: 100rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		
	}

	.container{
		background-color: #f2f2f2;
		margin-top: 40rpx;
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
				justify-content: space-around;
				margin-top: 4rpx;
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
</style>