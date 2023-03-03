<template>
	<view class="content">
		<view v-if="restTime>0" class="off">还有<view style="margin-top: -16rpx;font-size: 60rpx;"> <u-count-down :time="restTime" format="HH:mm:ss"></u-count-down> </view>就下班啦！</view>
		<view class="off" v-else>
			下班啦，多运动哦！！
		</view>
		<view class="money-content">
			<view class="money">
				<view style="font-weight: 600;padding-top: 10rpx;padding-left: 16rpx;display: flex;">今日工作已赚到 <u-icon v-if="showEye" name="eye-fill" size='20' style="padding-left:10rpx" @click="checkout"></u-icon> <u-icon v-else name="eye-off" size='20' style="padding-left:10rpx" @click="checkout"></u-icon></view>
				<text v-if="showEye" style="font-size: 60rpx;font-weight: 700;padding-top: 40rpx;padding-left: 20rpx;"> {{money}} 元</text>
				<text v-else style="font-size: 60rpx;font-weight: 700;padding-top: 40rpx;padding-left: 20rpx;"> **** 元</text>
				<view class="btn">
					<u-button text="设置" color="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))" size='mini' @click="setUp"></u-button>
				</view>
				<image src="../../static/image/jiankangbaoxian.png" mode="widthFix"></image>
				
			</view>
			
		</view>
		
		<!-- 摸鱼项目合集 -->
		<!-- <Project></Project> -->
	
	<!-- 健康模块 -->
	<view class="programs">
		<Health></Health>
	</view>
	
	<!-- 健康知识 -->
	<view class="health_knowledge">
		<view class="title">
			健康知识
		</view>
		<u-tabs :list="list" :is-scroll="false" @change="change" lineColor="#fad556"
			        :activeStyle="{
			            color: '#303133',
			            fontWeight: 'bold',
			            transform: 'scale(1.05)'
			        }" lineWidth="30"></u-tabs>
	</view>
	<Article :articleData="articleData"></Article>
	<About></About>
	</view>

</template>

<script>
	
	import Project from '../../compoments/index/project.vue'
	import Holiday from '../../compoments/index/holiday.vue'
	import Health from '../../compoments/index/healthy.vue'
	import Article from '../../compoments/article/article.vue'
	import About from '../../compoments/index/about.vue'
	export default {
		components:{
			Project,
			Holiday,
			Health,
			Article,
			About
		},
		
		data() {
			return {
				 list:[
					 {name:"全部"},
					 {name:"女性健康"},
					 {name:"心脑血管"},
					 {name:"加油儿女"},
					 {name:"防癌抗癌"},
					 {name:"心理健康"},
					 {name:"专家辟谣"},
					 {name:"饮食营养"},
				 ],
				money:0,	
				restTime:"",
				interval:'',
				timeData:{},
				showEye:true, // 切换眼睛图标
				articleData:{}
			}
		},
		async onLoad() {
			 const res = await this.$api.getAllArticle()
			 this.articleData = res.articles
			 this.$store.commit('setArticles')
			 console.log(this.articleData)
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
			
			//切换可观看金额
			checkout(){
				this.showEye = !this.showEye
			},
			async change(item){
				console.log(item.name)
				const res = await this.$api.getArticleByTag(item.name)
				console.log(res)
				// this.articleData = res
			}
			
		},
		
		
	}
</script>

<style lang="scss">
	.content{
		width: 100%;
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
			 box-shadow: 20rpx 20rpx 10rpx #888888;
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
					width: 260rpx;
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
	
	// 健康知识
	.health_knowledge{
		margin-bottom: 20rpx;
		.title{
			font-size: 40rpx;
			font-weight: 700;
			margin-left: 30rpx;
		}
	}
	
	}

</style>
