<!-- 支付抽屉组件 -->
<template>
	<u-action-sheet
		@close="close"
		:closeOnClickOverlay="true" 
		:closeOnClickAction="true"  
		:title="title" 
		:show="show"
		>
		<view class="pay-type">
		      <view class="amount">￥38</view>
			  <u-line color="#ccc"></u-line>
			  <view class="wechat" :class="[paymentMethod==0?'active':'']" @click="paymentMethod=0">
			  	<u-icon name="weixin-fill" size="28" color="rgb(35,217,110)"></u-icon>
				<text>微信支付</text>
			  </view>
			  <u-line color="#ccc"></u-line>
			  <view class="alipay" :class="[paymentMethod==1?'active':'']" @click="paymentMethod=1">
			  	<u-icon name="zhifubao" size="28" color="rgb(0,167,239)"></u-icon>
				<text>支付宝支付</text>
			  </view>
			  <u-line color="#ccc"></u-line>
		      <view class="btn">
		        <u-button round block @click="pay">立即支付</u-button>
		      </view>
		    </view>
	</u-action-sheet>
</template>

<script>
	export default{
		props:{
			show:{
				default:false
			}
		},
		data(){
			return{
				title:'选择支付方式',
				list:[],
				paymentMethod:-1
			}
		},
		methods:{
			close() {
				this.$emit('close',false)
				this.paymentMethod = -1
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pay-type{
		.active{
			background: rgb(0, 205, 205);
		}
		.amount{
			padding: 20px;
			text-align: center;
			font-size: 32rpx;
			font-weight: bold;
		}
		.wechat,.alipay{
			width: 100%;
			height: 100rpx;
			display: flex;
			align-items: center;
			padding-left:40rpx;
			text{
				margin-left: 20rpx;
				margin-bottom: 10rpx;
			}
		}
		.btn{
			width: 80%;
			margin: 30rpx;
			.u-button{
				margin-left: 50rpx;
				border-radius: 50rpx;
				background: rgb(22, 194, 163);
			}
		}
	}
</style>