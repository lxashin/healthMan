<template>
	<view class="about">
		<view class="main">
			<view class="avatar">
				<image src="../../static/image/avatar.jpg" mode="widthFix"></image>
			</view>
			<view class="title">
				搬砖达人
			</view>
			<view class="content">
				<text>-阿信个人开发-</text>
				<text>wx: -ashin11</text>
				<text>1.1.0</text>
			</view>
		</view>
		
		<view class="message">
			<u-cell-group>
				<u-cell
				    title="用户协议"
				    isLink
				    url="./user-agreement"
				></u-cell>
				<u-cell
				    title="隐私政策"
				    isLink
				    url="./privacy"
				></u-cell>
				<u-cell
				    title="更新日志"
				    isLink
				    url="./update"
				></u-cell>
			</u-cell-group>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss">
	.about{
		.main{
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			margin-top: 100rpx;
			.avatar{
				width: 250rpx;
				height: 250rpx;
				image{
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}
			}
			.title{
				margin-top: 40rpx;
				font-size: 44rpx;
				font-weight: 700;
			}
			.content{
				display: flex;
				flex-direction: column;
				padding-top: 10rpx;
				font-size: 30rpx;
				text:nth-child(2){
					padding-left: 14rpx;
				}
				text:nth-child(3){
					margin: 0 auto;
				}
			}
		}
		.message{
			box-shadow: -14rpx 10rpx 0rpx #eee,0 -5rpx 0 #eee,0 4rpx 0 #ccc,4rpx 14rpx 0 #eee;
			width: 90%;
			margin: 30rpx auto;
			
		}
	}
</style>