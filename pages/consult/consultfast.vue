<template>
	<view class="consult-fast-page">
		<text class="right-text">
			问诊记录
		</text>
	    <view class="fast-logo">
	      <img class="img" src="../../static/image/consult-fast.png" alt="" />
	      <p class="text"><text>20s</text> 快速匹配专业医生</p>
	    </view>
		
	    <view class="fast-type">
	      <view class="item" @click="goDep">
	        <u-icon name="chat" size="32"></u-icon>
	        <view class="info">
	          <p>三甲图文问诊</p>
	          <p>三甲主治及以上级别医生</p>
	        </view>
	        <u-icon name="arrow-right"></u-icon>
	      </view>
	      <view class="item">
	        <u-icon name="chat" size="32"></u-icon>
	        <view class="info">
	          <p>普通图文问诊</p>
	          <p>二甲主治及以上级别医生</p>
	        </view>
	        <u-icon name="arrow-right"></u-icon>
	      </view>
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
			goDep(){
				console.log(222)
				uni.navigateTo({
					url:'/pages/consult/consultDep'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.consult-fast-page {
	  .right-text{
		  float: right;
		  transform: translate(-20rpx,0);
		  color: #16C2A3;
	  }
	  .fast-logo {
	    padding: 30px 0;
	    text-align: center;
	    .img {
	      width: 240px;
	    }
	    .text {
	      font-size: 16px;
	      margin-top: 10px;
	      > text {
	        color: #16C2A3;
	      }
	    }
	  }
	  .fast-type {
	    padding: 15px;
	    .item {
	      display: flex;
	      padding: 16px;
	      border-radius: 4px;
	      align-items: center;
	      margin-bottom: 16px;
	      border: 0.5px solid #EDEDED;
	    }
	    .pic {
	      width: 40px;
	      height: 40px;
	    }
	    .info {
	      margin-left: 12px;
	      flex: 1;
	      > p:first-child {
	        font-size: 16px;
	        color: #121826;
	        margin-bottom: 4px;
	      }
	      > p:last-child {
	        font-size: 13px;
	        color: #848484;
	      }
	    }
	    .van-icon {
	      color: #C3C3C5;
	    }
	  }
	}
</style>