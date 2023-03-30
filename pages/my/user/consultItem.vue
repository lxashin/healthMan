<template>
	<view>
		<u-empty v-if="!order.length"
			mode="history"
			icon="../../../static/image/无历史记录.png"
		>
		</u-empty>
		<view class="item" v-for="item in order" :key="item.id" v-else>
			<view class="head van-hairline--bottom">
			      <img class="img" src="../../../static/image/avatar-doctor.svg" />
			      <view>{{ '已分配李医生' }}</view>
				  <text>已支付</text>
			    </view>
			    <view class="body">
			      <view class="body-row">
			        <view class="body-label">病情描述:</view>
			        <view class="body-value">{{item.illnessDesc}}</view>
			      </view>
			      <view class="body-row">
			        <view class="body-label">价格:</view>
			        <view class="body-value">¥ {{item.actualPayment}}</view>
			      </view>
			      <view class="body-row">
			        <view class="body-label">创建时间:</view>
			        <view class="body-value tip">{{item.createTime}}</view>
			      </view>
			    </view>
				 <view class="foot">
				      <u-button type="error" @click="removeOrder(item.id)">删除订单</u-button>
				</view>
		</view>
	</view>
	
	
</template>

<script>
	export default{
		data(){
			return {
				order:[]
			}
		},
		methods:{
			async getAllOrder(){
				const res = await this.$api.getOrder()
				this.order = res.data
			},
			async removeOrder(id){
				const res = await this.$api.removeOrder({id})
				if(res.code==200){
					uni.showToast({
						icon:'success',
						title:'删除成功'
					})
				}
				this.getAllOrder()
			}
		},
		async onLoad() {
			this.getAllOrder()
		}
	}
</script>

<style lang="scss" scoped>
.item {
	width: 90%;
	border-radius:40rpx;
	margin: 20rpx 0;
	transform: translateX(36rpx);
	box-shadow: 0px 0px 22px 0px rgba(245, 245, 245, 0.1);
  background-color: #fff;
  .head {
		display: flex;
		align-items: center;
		height: 50px;
		padding: 0 15px;
		.img {
		  width: 20px;
		  height: 20px;
		}
		> view {
		  flex: 1;
		  font-size: 15px;
		  padding-left: 10px;
		}
		> text {
		  color: #848484;
		  &.orange {
			color: #f2994a;
		  }
		  &.green {
			color: #16C2A3;
		  }
		}
  }
  .body {
		padding: 15px 15px 8px 15px;
		.body-row {
		  display: flex;
		  margin-bottom: 7px;
		}
		.body-label {
		  width: 62px;
		  font-size: 13px;
		  color: #C3C3C5;
		}
		.body-value {
		  width: 250px;
		  &.tip {
			color: #C3C3C5;
		  }
		}
  }
  .foot {
      padding: 0 15px 15px 15px;
      .u-button {
		border-radius: 50rpx;
      }
    }
}
</style>