<template>
	<view class="">
		<view class="bailan">
			<image src="../../static/image/beiwanglu.png" mode="widthFix"></image>
			<view class="text">写下此刻心情吧</view>
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
				
			}
		},
		methods:{
			
			goWrite(){
				uni.navigateTo({
					url:'../../compoments/textarea'
				})
			}
		}
	}
</script>

<style lang="scss">
	.bailan{
		position: relative;
		margin: 300rpx 220rpx;
		image{
			width: 300rpx;
			
		}
		.text{
			font-size: 40rpx;
			color: #999;
		}
		.pen{
			position: absolute;
			top: -240rpx;
			right: -180rpx;
			width: 160rpx;
			
			image{
				width: 80%;
			}
		}
	}
</style>