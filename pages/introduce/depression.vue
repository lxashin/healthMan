<template>
	<view class="introduce">
		<view class="title">
			员工抑郁测评[专业版]
		</view>
		<view class="sub_title">
			<u-icon name="checkmark-circle-fill" size="14"></u-icon>
			<text>本测评基于《抑郁自评量表SDS》编制</text>
			
		</view>
		<view class="main">
			<view class="title">
				测评介绍
			</view>
			<view class="programs">
				<view class="item"> <text>5分钟</text><text>简单快速</text> </view>
				<view class="item"> <text>20题</text><text>专业量表</text> </view>
				<view class="item"><text>350万人</text><text>已完成测评</text> </view>
			</view>
			</view>
			<view class="subnav">
				<view class="img">
					<image src="/static/image/depression.png" mode="widthFix"></image>
				</view>
				<view class="article">
					<view class="bottom_title">
						当你开始怀疑自己是否有“抑郁症”时，我们可以通过专业的测试来了解自己最近的情绪状态。本测评基于《抑郁自评量表(SDS)》编制，是世界上最著名的心理健康测量表之一，广泛应用于精神障碍和心理疾病门诊检查
					</view>
					<view class="bottom_title1">
						本测试结果仅供用户自测参考，不作为医学诊断。
					</view>
				</view>
			</view>
			<view class="btn">
				<u-button text="分享"></u-button>
				<u-button type="primary" text="开始测评" @click="go"></u-button>
			</view>
		
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			go(){
				uni.navigateTo({
					url:'/compoments/testing/index'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.introduce{
		background-color: rgb(233, 243, 255);
		height: 1200rpx;
		.title{
			font-size: 50rpx;
			margin: 20rpx;
		}
		.sub_title{
			display: flex;
			font-size: 24rpx;
			color: #bbb;
			margin: -20rpx 0 40rpx 20rpx;
		}
		.main{
			background-color: #fff;
			border-radius: 20rpx;
			margin-left: 20rpx;
			width: 90%;
			height: 300rpx;
			overflow: hidden;
			.title{
				font-size: 50rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				margin: 50rpx;
			}
			.programs{
				display: flex;
				justify-content: space-around;
				// margin-top: 80rpx;
				.item{
					display: flex;
					flex-direction: column;
				}
			}
		}
		.subnav{
			margin-bottom: 30rpx;
			.img{
				margin-top: 40rpx;
				margin-left: 50rpx;
			}
			.article{
				background-color: #fff;
				border-radius: 20rpx;
				margin-left: 20rpx;
				width: 90%;
				height: 400rpx;
				overflow: hidden;
				.bottom_title,.bottom_title1{
					font-size: 28rpx;
					margin:40rpx 30rpx;
				}
			}
			
		}
		.btn{
			display: flex;
		}
	}
</style>