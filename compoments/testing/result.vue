<template>
	<view class="result_page">
		<view class="result">
			<view class="result_content">
				{{result.level}}
			</view>
			<view class="desc">
				<view class="title">
					测评结果概述
				</view>
				<view class="content">
					{{result.description}}
				</view>
				<view class="tip">
					此测试结果仅供参考，不能代替医生诊断
				</view>
			</view>
			<view class="article">
				<view class="article_desc">
					<view class="title">
						如何理解抑郁症
					</view>
					<view class="content">
						人生在世，不开心的事总会偶尔发生。首先，你要明白“偶尔发生的抑郁情绪≠抑郁症”，偶尔不愉快、烦闷的心理体验，是每人与生俱来的情感反应。这种情绪是短暂的，通过倾诉、运动等就可以调节、一般在2周内就可以缓解甚至消除。
					</view>
				</view>
				<view class="article_item" @click="goDetail()">
					<view class="container">
						<view class="title">
							如何区分抑郁情绪还是抑郁症？
						</view>
						<view class="content">
							上海交通大学医学院
						</view>
					</view>
					<image src="../../static/image/avatar.jpg" mode="heightFix"></image>
				</view>
				<view class="article_item" @click="goDetail()">
					<view class="container">
						<view class="title">
							医生确诊抑郁症，都会做什么检查
						</view>
						<view class="content">
							首都医科大学
						</view>
					</view>
					<image src="../../static/image/avatar.jpg" mode="heightFix"></image>
				</view>
				<view class="article_item" @click="goDetail()">
					<view class="container">
						<view class="title">
							抑郁症有哪些前兆表现
						</view>
						<view class="content">
							医学团队
						</view>
					</view>
					<image src="../../static/image/avatar.jpg" mode=""></image>
					<!-- <image src="../../static/image/avatar.jpg" mode="heightFix"></image> -->
				</view>
			</view>
			
		</view>
		
		<view class="btn">
			<u-button type="primary" @click="back" text="返回首页"></u-button>
			<u-button type="primary" text="邀请朋友测一测"></u-button>
		</view>
	</view>
</template>

<script>
	export default{
		async onLoad(option) {
			const res = await this.$api.getQuesstionResult({scores:option.scores})
			this.result = res.data
			console.log(res.data)
		},
		data(){
			return {
				result:{}
			}
		},
		methods:{
			goDetail(item){},
			back(){
				uni.switchTab({
					url:'/pages/index/index'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.result_page{
		.result{
			height: 1120rpx;
			overflow: scroll;
			margin: 50rpx;
			.result_content{
				font-size: 60rpx;
				color: rgb(60, 156, 255);
				display: flex;
				justify-content: center;
				align-items: center;
			}
			.desc{
				margin-top: 30px;
				.title{
					font-size: 34rpx;
					font-weight: 700;
				}
				.content{
					font-size: 28rpx;
					color: red;
					margin-top: 20rpx;
				}
				.tip{
					margin-top: 20rpx;
					font-size: 20rpx;
					color: #bbb;
				}
			}
			.article{
				.article_desc{
					margin-top: 30rpx;
					.title{
						font-size: 40rpx;
						font-weight: 700;
					}
					.content{
						margin-top: 20rpx;
						color: gray;
					}
				}
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
							// font-weight: 600;
							width: 450rpx;
							overflow: hidden;
							white-space: nowrap;
							text-overflow: ellipsis;
							padding-top: 10rpx;
						}
						.content{
							font-size: 20rpx;
							color: rgb(127, 127, 127);
							margin-top: 5rpx;
							margin-bottom: 8rpx;
							width: 450rpx;
							overflow: hidden;
							white-space:nowrap;
							text-overflow: ellipsis;
							padding-top: 32rpx;
						}
					}
					
				}
			}
			
		}
		
		.btn{
			display: flex;
			position: absolute;
			bottom: 50rpx;
			height: 60rpx;
			width: 100%;
			.u-button{
				width: 40%;
			}
		}
	}
</style>