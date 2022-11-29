<template>
	<view class="detail">
		<view class="title">
			{{article.title}}
		</view>
		<text class="time">{{article.time}}</text>
		<view class="content">
			{{article.content}}
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				article:{}
			}
		},
		methods:{
			
		},
		onLoad(option) {
			if(option.article){
				this.article=JSON.parse(decodeURIComponent(option.article));
				// console.log(JSON.parse(decodeURIComponent(option.article)))
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	.detail{
		.title{
			margin-left: 15rpx;
			font-size: 46rpx;
			font-weight: 600;
		}
		.time{
			margin-left: 15rpx;
			font-size: 20rpx;
		}
		.content{
			margin-left: 15rpx;
			margin-top: 30rpx;
			font-size: 40rpx;
			font-weight: 500;
		}
	}
</style>