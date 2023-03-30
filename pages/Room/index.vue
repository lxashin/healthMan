<template>
	<view class="room">
		<view class="big_out">
				<!-- 左上角返回按钮 -->
				<!-- 这里为什么要加4px，是因为这个左箭头<的高度为16rpx需要下降一半，就是8rpx=4px,可以自己试一下，我这里没有问题 -->
				<view class="back" @click="back"> 
					<view class="back_img"></view>
					<view class="back_text">返回</view>
				</view>
			</view>
		<view class="room-status">
			<!-- <view class="wait">
			  已通知医生尽快接诊，24小时内医生未回复将自动退款
			</view> -->
			<view class="chat">
			  <text>咨询中</text>
			  <view>剩余时间：<u-count-down :time="time" format="HH:mm:ss"></u-count-down> </view>
			</view>
		</view>
	
	<view class="chat-wrapper">
		<view v-for="item in messages">
			<view class="chat-message " :class="[item.id===currentUserId?'chat-message-sent':'chat-message-received']">
				<view class="avatar_right" v-if="item.id!==currentUserId">
					<image src="../../static/image/avatar.jpg" mode=""></image>
				</view>
				<view :class="[item.id===currentUserId?'message-content-send':'message-content-received']">
				  <view>{{item.text}}</view>
				  <text class="timestamp">{{item.time}}</text>
				</view>
				<view class="avatar_left" v-if="item.id===currentUserId">
					<image src="../../static/image/avatar.jpg" mode="widthFix"></image>
				</view>
			</view>
		</view>
		<view class="chat-input">
			<input type="text" v-model="message" placeholder="请输入消息">
			<button @click="sendMessage">发送</button>
		</view>
	</view>
</view>
</template>

<script>
	export default{
		data(){
			return {
				 messages: [],
				 message: '',
				 currentUserId:1,
				 time:localStorage.getItem('time') || 24*60*60*1000, // 24小时倒计时
				 timer: null
			}
		},
		methods:{
			back(){
				uni.switchTab({
					url:'/pages/index/index'
				})
			},
			sendMessage(){
				if(this.socket.readyState===WebSocket.OPEN){
					// 先检查连接状态是否为open
					// 构造消息传送对象
					const msg = {
						id:this.currentUserId,
						type:'chat',
						text:this.message,
						time:this.$moment(new Date()).format('HH:mm')
					}
					console.log(msg)
					// 将消息转换为 JSON格式并发送到服务器
					this.socket.send(JSON.stringify(msg))
					this.messages.push(msg)
					// 清空消息输入框
					this.message = ''
				}
				
			}
		},
		async onLoad() {
			const res = await this.$api.getChat()
			this.messages = res.data
			this.socket = new WebSocket('ws://localhost:3001')
			this.socket.addEventListener('open',e=>{
				console.log('websocket连接成功！')
			})
			this.socket.addEventListener('message',e=>{
				const msg = JSON.parse(e.data)
				// 用来判断消息是不是自己的
				msg.isMe = msg.sendId=== this.currentUserId
				console.log('收到消息',e.data)
				// 解析消息
				// 根据消息类型进行处理
				switch (msg.type){
					case 'chat':
						this.messages.push(msg);
						console.log(this.messages)
						break;
					default:
						console.log('未知消息类型：',msg.type)
				}
			})
			this.timer = setInterval(() => {
				this.time-=1000
				localStorage.setItem('time', this.time)
				if(this.time==0){
					uni.removeStorageSync('orderId')
					uni.removeStorageSync('time')
					clearInterval(this.timer)
					this.socket.close()
					this.messages = []
					return uni.switchTab({
						url:'/pages/index/index'
					})
				}
			}, 1000)
		},
		// beforeDestroy() {
		// 	this.socket.close()
		// 	clearInterval(this.timer)
		// 	localStorage.setItem('time', this.time)
		// }
	}
</script>

<style lang="scss">
.big_out {
	position: fixed;
	z-index: 999;
	width: 100%;
	height: 100rpx;
	background-color: #fad556;
}
 
.back {
	position: absolute;
	top: 30rpx;
	height: 50rpx;
	width: 120rpx;
}
 
.back_img {
	/* 用border值来控制箭头粗细 */
	border: 3px solid black;
	/* 上、右、下、左  四个边框的宽度 */
	border-width: 0px 2px 2px 0px;
	display: inline-block;
	/* padding值控制箭头大小 */
	padding: 5px;
	transform: rotate(135deg);
	-webkit-transform: rotate(135deg);
	margin-left: 30rpx;
}
 
.back_text {
	float: right;
	position: relative;
	top: -4rpx;
}
	
.room-status {
  position: fixed;
  left: 0;
  top: 100rpx;
  height: 88rpx;
  width: 100%;
  background-color: #fff;
  font-size: 26rpx;
  z-index: 1;
  .wait {
	padding: 0 30rpx;
	background-color: #EAF8F6;
	height: 100%;
	line-height: 88rpx;
	text-align: center;
	color: #16C2A3;
  }
  .chat {
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 30rpx;
	text {
	  &:first-child {
		color: #16C2A3;
	  }
	  &:last-child {
		color: #3C3E42;
		width: 260rpx;
		.van-count-down {
		  display: inline;
		}
	  }
	}
  }
}
.chat-wrapper {
  display: flex;
  flex-direction: column;
  padding: 20rpx;
  overflow: scroll;
  width: 100%;
  position: absolute;
  top: 200rpx;
  bottom: 100rpx;
}

.chat-message {
  display: flex;
  align-items: flex-start;
  margin-bottom: 20rpx;
}

.chat-message-sent {
  justify-content: flex-end;
}

.chat-message-received {
  justify-content: flex-start;
}

.avatar_left {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  overflow: hidden;
  margin-left: 20rpx;
}
.avatar_right {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 20rpx;
}

.avatar_left image,.avatar_right image {
  width: 100%;
  height: 100%;
}

.message-content-send {
  display: flex;
  flex-direction: column;
  background-color: rgb(149,236,105);
  border-radius: 20rpx;
  padding: 20rpx;
  max-width: 70%;
}
.message-content-received {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 20rpx;
  padding: 20rpx;
  max-width: 70%;
}

.message-content view {
  margin: 0;
  font-size: 28rpx;
}

.timestamp {
  font-size: 24rpx;
  color: #999;
  margin-top: 10rpx;
  text-align: right;
}
.chat-input {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 20rpx;
  background-color: #f5f5f5;
  border-top: 2rpx solid #ddd;
  position: fixed;
  bottom: 40rpx;
}

.chat-input input {
  flex: 1;
  margin-right: 20rpx;
  border: none;
  outline: none;
  font-size: 32rpx;
  color: #333;
  background-color: transparent;
}

.chat-input button {
  font-size: 32rpx;
  color: #409EFF;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
}
</style>