<template>
	<u-popup :show="show" mode="center" :round="10" style="width: 100%;">
	        <view class="dialog">
	            <view class="title">带薪{{title}}</view>
				<view class="input">
					<view class="time">本次用时</view>
					<view class="val">
						<view class="u--input">
							<u--input type="text" v-model="value"></u--input>
						</view>
						<view class="min">min</view>
					</view>
					
				</view>
				<view class="btn">
					<button class="cancel" @click="cancel">取消</button>
					<button class="confirm" @click="confirm">确认</button>
				</view>
	        </view>
		</u-popup>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
	    data() {
	      return {
	        value:0,
			
	      }
	    },
		props:['title','index'],
		computed:mapState(['show']),
		
	    methods: {
	      confirm() {
			  this.$store.commit('updateShow',false)
			  switch (this.index){
			  	case 0:
					this.$store.commit('lashi',this.value)
					console.log(this.$store.state.moyuObj.lashi)
			  		break;
				case 1:
					this.$store.commit('chiwaimai',this.value)
					break;
				case 2:
					this.$store.commit('hesuan',this.value)
					break;
				case 3:
					this.$store.commit('study',this.value)
					break;
				case 4:
					this.$store.commit('saunter',this.value)
					break;
				case 5:
					this.$store.commit('chat',this.value)
					break;
			  	default:
			  		break;
			  }
			  
	      },
	      cancel() {
	        this.$store.commit('updateShow',false)
			
	      }
	    }
	  
	  }
</script>

<style lang="scss">
	.u-popup{
		width: 100%;
		
	}
	.dialog{
		width: 100%;
		.title{
			margin-top: 30rpx;
			
			height: 40rpx;
			font-size: 46rpx;
			font-weight: 700;
			text-align: center;
			line-height: 46rpx;
		}
		.input{
			margin-top: 80rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			
			.time{
				margin-left: 30rpx;
				width: 200rpx;
				font-size: 44rpx;
				font-weight: 600;
			}
			
			.val{
				display: flex;
				margin-right: 30rpx;
				margin-top: 20rpx;
				.u--input{
					width: 100rpx;
					height: 80rpx;
					margin-right: 30rpx;
				}
				.min{
					font-size: 44rpx;
					font-weight: 600;
				}
				
			}
		}
		.btn{
			display: flex;
			background-color: #fff;
			margin-top: 100rpx;
			margin-bottom: 40rpx;
			width: 600rpx;
			height: 100rpx;
			
			.cancel{
				width: 180rpx;
				height: 80rpx;
				margin-right: -176rpx;
				background-color: #fef7dd;
				border-radius: 50rpx 0 0 50rpx;
				text-align: center;
				line-height: 80rpx;
			}
			.confirm{
				width: 180rpx;
				height: 80rpx;
				text-align: center;
				line-height: 80rpx;
				background-color: #fad556;
				border-radius: 0rpx 50rpx 50rpx 0rpx;
			}
		}
	}
	
</style>