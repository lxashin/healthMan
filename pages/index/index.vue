<template>
	<view class="content">
		<view v-if="restTime>0" class="off">还有<view style="margin-top: -16rpx;font-size: 60rpx;"> <u-count-down :time="restTime" format="HH:mm:ss"></u-count-down> </view>就下班啦！</view>
		<view class="off" v-else>
			下班啦，赶紧跑路！！
		</view>
		<view class="money-content">
			<view class="money">
				<view style="font-weight: 600;padding-top: 10rpx;padding-left: 16rpx;display: flex;">今日搬砖已赚到 <u-icon name="eye" size='20' style="padding-left:10rpx"></u-icon> </view>
				<text style="font-size: 60rpx;font-weight: 700;padding-top: 40rpx;padding-left: 20rpx;"> {{money}} 元</text>
				<view class="btn">
					<u-button text="设置" color="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))" size='mini' @click="setUp"></u-button>
				</view>
				<image src="../../static/image/moyu.jpg" mode="widthFix"></image>
				
			</view>
			
		</view>
		
		<!-- 摸鱼项目合集 -->
		<Project></Project>
	
	<!-- 弹幕，加油 -->
	<view class="programs">
		<view class="title">
			<text class="title1">加油打工人！</text>
			<text class="title2">工作再忙也不要忘记休息休息哦</text>
			</view>
			<u-swiper
			            :list="list3"
			            indicator
			            indicatorMode="line"
			            circular
			    ></u-swiper>
		
	</view>
	
	<!-- 距离节假日天数 -->
	<Holiday></Holiday>
	</view>

</template>

<script>
	
	import Project from '../../compoments/index/project.vue'
	import Holiday from '../../compoments/index/holiday.vue'
	export default {
		components:{
			Project,
			Holiday
		},
		
		data() {
			return {
				 list3: [
				            'https://cdn.uviewui.com/uview/swiper/swiper3.png',
				            'https://cdn.uviewui.com/uview/swiper/swiper2.png',
				            'https://cdn.uviewui.com/uview/swiper/swiper1.png',
				        ],
				money:0,	
				restTime:"",
				interval:'',
				timeData:{},
				
				
			}
		},
		onLoad() {
			 
		},
		
		onShow() {
			this.timeData = uni.getStorageSync('timeData')
			let workStartTime = this.timeData.startTime
			let closeTime = this.timeData.endTime
			let startRest = this.timeData.startRest
			let endRest = this.timeData.endRest
			let workTime = (this.detailTime(closeTime)-this.detailTime(workStartTime)-this.detailTime(endRest)+this.detailTime(startRest))/1000  //每天工作的秒数
			let salary = this.timeData.salary
			let workDay = this.timeData.workDay
			let secondSalary = salary/workDay/workTime  //秒薪
			this.$store.commit('setSecondSalary',secondSalary)
			//  计算倒计时
			const date = new Date()
			let year = date.getFullYear()
			let month = date.getMonth()+1
			let day = date.getDate()
			let hours = this.timeData.endTime
			// hours = hours.split(':')[0]||'' // 裁剪掉 ':00'
			let endTime = `${year}-${month}-${day} ${this.timeData.endTime}`
			let startTime = `${year}-${month}-${day} ${this.timeData.startTime}`
			// endTime = endTime.replace(new RegExp("-","gm"),"/")
			// startTime = startTime.replace(new RegExp("-","gm"),"/")
			if(Date.now()>new Date(endTime).getTime()||Date.now()<new Date(startTime).getTime()){  // 如果当前时间大于下班时间或者小于上班时间说明已经到下班了，restTime设置为0
				// this.getSalary() //下班最后再执行一次薪资
				console.log('到点下班')
				
			}else{
				this.restTime = (new Date(endTime)).getTime()-Date.now()  // 如果当前时间小于下班时间，则下班时间减去当前时间

			}
			if(this.restTime!=0){
				this.interval= setInterval(()=>{
					this.getSalary()
				},1000)
			}
			
			// 如果是下班了，并且是第二天还未到上班时间，设置金额为0元，
			if(this.restTime==0&&Date.now()>new Date(`${year}-${month}-${day} 00:00`)){
				this.money = 0.00
			}
		},
		
		watch:{
			money(newVal,oldVal){
				if(newVal==(this.timeData.salary/this.timeData.workDay).toFixed(2)){
					clearInterval(this.interval)
					this.restTime=0
					uni.switchTab({
						url:'/pages/index/index'
					})
					this.money = (this.timeData.salary/this.timeData.workDay).toFixed(2)
				}
			}
		},
		// computed:mapState(['time']),
		methods: {
			setUp(){
				uni.navigateTo({
					url:'../../compoments/index/setUp'
				})
			},
			
			// 处理时间格式
			detailTime(time){
				let date = new Date()
				let year = date.getFullYear()
				let month = date.getMonth()+1
				let day = date.getDate()
				let detail = `${year}-${month}-${day} ${time}`
				return new Date(detail).getTime()
			},
			
			// 计算今日已赚钱
			getSalary(){
				let startTime = this.timeData.startTime
				let endTime = this.timeData.endTime
				let startRest = this.timeData.startRest
				let endRest = this.timeData.endRest
				let workTime = (this.detailTime(endTime)-this.detailTime(startTime)-this.detailTime(endRest)+this.detailTime(startRest))/1000  //每天工作的秒数
				let salary = this.timeData.salary
				let workDay = this.timeData.workDay
				let secondSalary = salary/workDay/workTime  //秒薪
				let second
				if(Date.now()>=this.detailTime(startRest)&&Date.now()<=this.detailTime(endRest)){ //正在休息时间
					second = (this.detailTime(startRest)-this.detailTime(startTime))/1000
				}else if(Date.now()<this.detailTime(startRest)){ // 还没到休息时间
					second = (Date.now()-this.detailTime(startTime))/1000
				}else if(Date.now()>this.detailTime(endRest)&&Date.now()<this.detailTime(endTime)){ // 已经休息完了,但是还没下班
					second = ((this.detailTime(startRest)-this.detailTime(startTime))+(Date.now()-this.detailTime(endRest)))/1000
				}else{ // 下班了
					second = (this.detailTime(endTime)-this.detailTime(startTime)-this.detailTime(endRest)+this.detailTime(startRest))/1000
				}
				// second = ((Date.now()-this.detailTime(startTime))/1000).toFixed(2)>0?((Date.now()-this.detailTime(startTime))/1000).toFixed(2):0
				this.money = isNaN(secondSalary*second)?0:(secondSalary*second).toFixed(2) //判断是否为NAN
			},
			
			
			
		},
		
		
	}
</script>

<style lang="scss">
	.content{
		width: 100%;
		height: 2000rpx;
		background-color: '#fad556';
		.off{
			display: flex;
			justify-content: center;
			background-color: #fad556;
			width: 100%;
			height: 200rpx;
			padding-top: 40rpx;
			font-size: 32rpx;
			font-weight: 700;
			font-size: 30rpx;
			color: #3d3d3d;
			view{
				font-size: 60rpx;
				
				// margin-top: -30rpx;
				margin-left: 4rpx;
				margin-right: 4rpx;
				color: #000;
				.u-count-down{
					font-size: 60rpx;
				}
			}
		}
		
		.money-content{
			 box-shadow: 10px 10px 5px #888888;
			margin-left: 15px;
			width: 90%;
			height: 300rpx;
			margin-top: -40rpx;
			background: #fff;
			border: 4rpx solid #fff;
			border-radius: 40rpx;
			box-shadow: 4rpx #ccc ;
			.money{
				position: relative;
				display: flex;
				flex-direction: column;
				image{
					transform: translate(2);
					width: 300rpx;
					position: absolute;
					top: 8rpx;
					right: 4rpx;
				}
				.btn{
					width: 100rpx;
					margin-left: 40rpx;
					margin-top: 60rpx;
				}
			}
		}
		
		// 第二模块 卡片组件
		
		// 第三模块 轮播图
		.programs{
			box-shadow: 10rpx 10rpx 10rpx #888;
			margin-top: 40rpx;
			margin-bottom: 40rpx;
			margin-left: 30rpx;
			width:90% ;
			height: 400rpx;
			.title{
				display: flex;
				padding-left: 40rpx;
				padding-bottom: 20rpx;
				flex-direction: column;
				.title1{
					font-size: 40rpx;
					font-weight: 700;
					title2{
						color: #979798;
					}
				}
			}
		}
	
	// 第四模块 节假日
	
	}

</style>
