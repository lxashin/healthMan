<template>
	  <view class="consult-pay-page">
	    <view class="pay-info">
	      <view class="tit">图文问诊 39 元</view>
	      <img class="img" src="/static/image/avatar-doctor.svg" />
	      <view class="desc">
	        <text>极速问诊</text>
	        <text>自动分配医生</text>
	      </view>
	    </view>
	
	    <!-- 支付信息区域 -->
	    <u-cell-group>
	      <u-cell title="优惠券" :value="`-¥ 0`" />
	      <u-cell title="积分抵扣" :value="`-¥0`" />
	      <u-cell title="实付款" :value="`¥39`" class="pay-price" />
	    </u-cell-group>
	    <view class="pay-space"></view>
	
	    <!-- 患者信息 -->
	    <u-cell-group>
	      <u-cell
	        title="患者信息"
	        :value="`ashin | 男 | 22岁`"
	      ></u-cell>
	      <u-cell title="病情描述" label="ssss"></u-cell>
	    </u-cell-group>
	    <view class="pay-schema">
			<u-checkbox-group @change="checkBoxChange">
				<u-checkbox v-model="agree" shape="circle" label="我已同意"></u-checkbox> <text class="text">支付协议</text>
			</u-checkbox-group>
	      
	    </view>
	
		<view class="pay_bottom">
			<view class="money">
				<text>合计:</text>
				<text>￥ <text class="number">39</text></text>
			</view>
			<view>
				<u-button type="success" @click="pay" text="立即支付"></u-button>
			</view>
		</view>
		<!-- 支付抽屉 -->
		<paySheet :show="show" @close="close"></paySheet>
	    
	  </view>
</template>

<script>
	import paySheet from '../../compoments/paySheet/index.vue'
	export default{
		components:{
			paySheet
		},
		data(){
			return {
				payInfo:{}, // 预订单信息 {优惠券、积分抵扣、实付款等}
				agree:false,
				show:false,
				title:"请选择支付方式",
			}
		},
		methods:{
			checkBoxChange(n){
				if(n.length) this.agree = true
				else this.agree = false
				console.log(this.agree)
			},
			pay(){
				if(this.agree==true){
					this.show = true
				}else{
					uni.showToast({
						title:'请勾选同意我已支付协议',
						icon:'none'
					})
				}
			},
			close(){
				this.show = false
			},
			// 生成预支付订单信息
			async loadData(){
				const res = await this.$api.getConsultOrderPre({
					type:2,
					illnessType:1
				})
				this.payInfo = res.data
			}
		}
	}
</script>

<style lang="scss" scoped>

.pay-info {
  display: flex;
  padding: 15px;
  flex-wrap: wrap;
  align-items: center;
  .tit {
	width: 100%;
	font-size: 16px;
	margin-bottom: 10px;
  }
  .img {
	margin-right: 10px;
	width: 38px;
	height: 38px;
	border-radius: 4px;
	overflow: hidden;
  }
  .desc {
	flex: 1;
	> text {
	  display: block;
	  color: #848484;
	  &:first-child {
		font-size: 16px;
		color: #3C3E42;
	  }
	}
  }
}
.pay-price {
  
}
.pay-space {
  height: 12px;
  background-color: #F6F7F9;
}

.pay-schema {
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  .text {
	color: #16C2A3;
  }
}
.pay_bottom{
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 90%;
	margin-left: 30rpx;
	position: absolute;
	bottom: 20rpx;
	.money{
		text:nth-child(2){
			color: red;
			.number{
				font-weight: 600;
				font-size: 40rpx;
			}
			
		}
	}
}
.pay-type {
  .amount {
	padding: 20px;
	text-align: center;
	font-size: 16px;
	font-weight: bold;
  }
  .btn {
	padding: 15px;
  }
  .u-cell {
	align-items: center;
	.u-icon {
	  margin-right: 10px;
	  font-size: 18px;
	}
	.u-checkbox :deep(.u-checkbox__icon) {
	  font-size: 16px;
	}
  }
}
</style>