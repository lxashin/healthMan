<template>
	<view class="festival">
		<u-popup :show="showFestival" mode="bottom" :round="10" style="height: 0rpx;" @close="close">
		        <view class="container">
					
		        	<view class="title">
		        		设置节假日
		        	</view>
					<view class="content">
						<view class="first">
							<text class="name">名称</text>
							<input type="text" v-model="name">
						</view>
						<view class="second">
							<text class="name">日期</text>
							<view>
							    <u-datetime-picker :show="show" v-model="date" mode="date" @cancel='close_picker' @confirm="confirm_picker"></u-datetime-picker>
								<view class="u-button">
									<u-button @click="show = true">{{date}}</u-button>
								</view>
							</view>
						</view>
						<view class="third">
							<text class="name">鼓励语</text>
							<input type="text" v-model="content">
						</view>
					</view>
		        </view>
				<view class="btn">
					<button class="cancel" @click="cancel">取消</button>
					<button class="confirm" @click="confirm">确认</button>
				</view>
				<!-- <view >
						<u-toast ref="uToast"></u-toast>
						
					</view> -->
			</u-popup>
	</view>
</template>

<script>
	
	export default{
		
		props:['showFestival','festivalName','festivalContent'],
		data(){
			return{
				show:false,
				name:'',
				date:Number(new Date()),
				content:'',
				now:Date.now(),
				day:0,
				timeOut:'', // 定时器
			}
		},
		
		methods:{
			close(){
				this.$emit('closeFestival',false)
			},
			cancel(){
				this.$emit('closeFestival',false)
			},
			confirm() {
				let timeStamp = new Date(this.nowDate(this.date)).getTime() - new Date(this.nowDate(this.now)).getTime()   // 选择的日期 减去 当前的日期 的时间戳
				this.day = timeStamp/(24*60*60*1000)  // 天数
				if(this.day<0) this.day=0
				this.$store.commit('setFestivalDay',this.day)
				this.$emit('sendFestivalData',this.name,this.content)
				this.$emit('closeFestival',false)
			},
			close_picker(){
				console.log(33)
				this.show = false
			},
			confirm_picker(){
				setTimeout(()=>{
					this.date = this.nowDate(this.date)
				},100)
				this.show = false
			},
			
			nowDate(timeStamp){
				// timeStamp时间戳，计算年月日格式
				let year = new Date(timeStamp).getFullYear()
				let month = new Date(timeStamp).getMonth()+1>=10?new Date(timeStamp).getMonth()+1:'0'+(new Date(timeStamp).getMonth()+1)
				let day = new Date(timeStamp).getDate()>=10?new Date(timeStamp).getDate():'0'+new Date(timeStamp).getDate()
				return `${year}-${month}-${day}`
			}
		},
		created() {
			this.timeOut = setTimeout(()=>{
			this.date = this.nowDate(this.now)
			},10)
			this.name = this.festivalName // 让父组件的值显示在输入框中
			this.content = this.festivalContent
		},
		destroyed() {
			clearTimeout(this.timeOut)
		}
		
	}
</script>

<style lang="scss" scoped>
	.festival{
		.container{
			background-color: #fad556;
			height: 600rpx;
			.title{
				margin-top: 20rpx;
				text-align: center;
				font-size: 50rpx;
				font-weight: 700;
				height: 50rpx;
				line-height: 50rpx;
			}
			.content{
				display: flex;
				flex-direction: column;
				margin-top: 100rpx;
				view{
					margin-bottom: 20rpx;
				}
				.first{
					display: flex;
					justify-content: space-around;
					
					.name{
						font-size: 50rpx;
						font-weight: 600;
					}
					input{
						width: 400rpx;
						height: 80rpx;
						text-align: center;
						border: 2rpx solid #ccc;
						background-color: #fff;
						
					}
				}
				.second{
					display: flex;
					justify-content: space-around;
					align-items: center;
					// height: 80rpx;
					line-height: 80rpx;
					align-content: center;
					.name{
						font-size: 50rpx;
						font-weight: 600;
					}
					.u-button{
						width: 400rpx;
						height: 80rpx;
					}
				}
				.third{
					display: flex;
					justify-content: space-around;
					.name{
						font-size: 50rpx;
						font-weight: 600;
					}
					input{
						width: 400rpx;
						height: 80rpx;
						margin-left: 20rpx;
						margin-right: 20rpx;
						text-align: center;
						border: 2rpx solid #ccc;
						background-color: #fff;
						
					}
				}
			}
		}
		.btn{
			display: flex;
			background-color: #fff;
			margin-top: 40rpx;
			margin-bottom: 40rpx;
			margin-left: 80rpx;
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