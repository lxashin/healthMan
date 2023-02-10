<template>
	<view class="article">
		<view class="article_item" @click="goDetail">
				<image src="../../static/image/avatar.jpg" mode="heightFix"></image>
			<view class="container">
				<view class="title">
					文章标题文章标题文章标题文章标题文章标题文章标题文章标题
				</view>
				<view class="content">
					文章内容
					文章内容
					文章内容
					文章内容
					文章内容
					文章内容
				</view>
				<view class="time">
					2022-12-26 03:30:06
				</view>
			</view>
		</view>
		<view class="article_item" @click="goDetail">
				<image src="../../static/image/avatar.jpg" mode="heightFix"></image>
			<view class="container">
				<view class="title">
					文章标题文章标题文章标题文章标题文章标题文章标题文章标题
				</view>
				<view class="content">
					文章内容
					文章内容
					文章内容
					文章内容
					文章内容
					文章内容
				</view>
				<view class="time">
					2022-12-26 03:30:06
				</view>
			</view>
		</view>
		<view class="article_item" @click="goDetail">
				<image src="../../static/image/avatar.jpg" mode="heightFix"></image>
			<view class="container">
				<view class="title">
					文章标题文章标题文章标题文章标题文章标题文章标题文章标题
				</view>
				<view class="content">
					文章内容
					文章内容
					文章内容
					文章内容
					文章内容
					文章内容
				</view>
				<view class="time">
					2022-12-26 03:30:06
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
		methods:{
			goDetail(){
				uni.navigateTo({
					url:'/compoments/article/article_detail',
				})
			}
		}
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