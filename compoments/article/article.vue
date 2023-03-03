<template>
	<view class="article">
		<view class="article_item" @click="goDetail(item)" v-for="item in articleData" :key="item.id">
				<image :src="item.avatar" mode="heightFix"></image>
			<view class="container">
				<view class="title">
					{{item.title}}
				</view>
				<view class="content">
					{{getSimpleText(item.content)}}
				</view>
				<view class="time">
					{{item.createTime}}
				</view>
			</view>
		</view>
		
	</view>
	
</template>

<script>
	export default{
		data(){
			return {
				
			}
		},
		props:['articleData'],
		async onLoad() {
			
		},
		onShow() {
			console.log(1111,this.$store.state.articles)
		},
		methods:{
			goDetail(item){
				uni.navigateTo({
					url:`/compoments/article/article_detail?id=${item.id}`,
				})
			},
			// 剔除富文本标签
			getSimpleText(html){
			    //匹配html标签的正则表达式，"g"是搜索匹配多个符合的内容
			    var re1 = new RegExp("<.+?>","g");
			    //执行替换成空字符
			    var msg = html.replace(re1,'');
			    return msg;
			}
		},
		
	}
</script>

<style lang="scss" scoped>
	.article_item{
		display: flex;
		height: 140rpx;
		width: 90%;
		margin-left: 30rpx;
		margin-top: 30rpx;
			image{
				flex: 1;
				width: 100%;
				height: 100%;
			}
		
		.container{
			margin-left: 20rpx;
			flex: 3;
			.title{
				font-size: 34rpx;
				font-weight: 600;
				width: 450rpx;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
			.content{
				font-size: 26rpx;
				color: rgb(127, 127, 127);
				margin-top: 5rpx;
				margin-bottom: 8rpx;
				width: 450rpx;
				overflow: hidden;
				white-space:nowrap;
				text-overflow: ellipsis;
			}
			.time{
				font-size: 20rpx;
				color: rgb(127, 127, 127);
			}
		}
		
	}
</style>