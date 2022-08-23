<template>
	<view class="im-holiday">
		<Week :show="show" @setShow='getShow' @setRestDay='setRestDay(arguments)'></Week>
		<Salary :showSalary='showSalary' @showSalaryDate="showSalaryDate" @setSalaryDay='setSalaryDay'></Salary>
		<Birthday :showBirthday='showBirthday' @birthdayShow="birthdayShow"></Birthday>
		<Festival :showFestival="showFestival" :festivalName="festivalName" :festivalContent="festivalContent" @closeFestival="closeFestival" @sendFestivalData="sendFestivalData(arguments)"></Festival>
		<view class="holiday">
			
			<view>
				<view class="img">
					<image src="../../static/image/xiuxiri.jpg" mode="heightFix"></image>
				</view>
				<view class="midText" @click="show=true">
					<text class="topText">距休息日</text>
					<text class="bottomText">就快可以躺平了</text>
					
				</view>
				<text class="day">{{restDay}}</text>
				<text class="tian">天</text>
				</view>
			<view>
				<view class="img">
					<image src="../../static/image/gongzi.jpg" mode="heightFix"></image>
				</view>
				<view class="midText" @click="showSalary=true">
					<text class="topText">距发工资</text>
					<text class="bottomText">就快可以吃大餐了</text>
				</view>
				<text class="day">{{salaryDay}}</text>
				<text class="tian">天</text>
				</view>
			<view>
				<view class="img">
					<image src="../../static/image/birthday.jpg" mode="heightFix"></image>
				</view>
				<view class="midText" @click="showBirthday=true">
					<text class="topText">距生日</text>
					<text class="bottomText">就快可以吃蛋糕了</text>
				</view>
				<text class="day">{{birthday}}</text>
				<text class="tian">天</text>
				</view>
			<view>
				<view class="img">
					<image src="../../static/image/jieri.jpg" mode="heightFix"></image>
				</view>
				<view class="midText" @click="showFestival=true">
					<text class="topText">距{{festivalName}}</text>
					<text class="bottomText">{{festivalContent}}</text>
				</view>
				<text class="day">{{festivalDay}}</text>
				<text class="tian">天</text>
				</view>
			
		</view>
	</view>
	
</template>

<script>
	import Week from '@/compoments/holiday/week.vue'
	import Salary from '@/compoments/holiday/salary.vue'
	import Birthday from '@/compoments/holiday/birthday.vue'
	import Festival from '@/compoments/holiday/festival.vue'
	export default{
		components:{
			Week,
			Salary,
			Birthday,
			Festival
		},
		
		data(){
			return{
				show:false,
				showSalary:false,
				showBirthday:false,
				showFestival:false,
				salaryDay:uni.getStorageSync('salaryDay')||0,
				restDay:uni.getStorageSync('restDay')||0,
				birthday:uni.getStorageSync('birthday')||1,
				festivalName:'中秋节',
				festivalDay:uni.getStorageSync('festivalDay')||0,
				festivalContent:'很快就能吃月饼啦~~~~~~~~~'
			}
		},
		
		methods:{
			
			getShow(data){  // 控制休息日弹窗
				this.show = data
			},
			showSalaryDate(data){
				// 设置发工资日弹窗的关闭
				this.showSalary = data
			},
			birthdayShow(data){
				// 接受子组件传来的关闭弹窗、和距离生日的天数
				this.showBirthday = data
				
				this.birthday = uni.getStorageSync('birthday')||0
			},
			closeFestival(data){
				//设置节假日弹窗关闭
				this.showFestival = data
			},
			setRestDay(data){
				// 接受子组件传来的距离休息日的天数和关闭弹窗
				this.show = data[0]
				// this.restDay = data[1]
				this.restDay = uni.getStorageSync('restDay')||0
			},
			setSalaryDay(data){
				this.salaryDay = uni.getStorageSync('salaryDay')||0
			},
			sendFestivalData(data){
				// 接受子组件传来的节日名称、内容，距离节日多少天
				this.festivalName = data[0]
				this.festivalContent = data[1]
				this.festivalDay = uni.getStorageSync('festivalDay')||0
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	.holiday{
		display: flex;
		flex-direction: column;
		margin-top: 30rpx;
		width: 90%;
		margin-left: 30rpx;
		box-shadow: 10rpx 10rpx 10rpx #888;
		view{
			position: relative;
			background-color: #fad556;
			display: flex;
			margin-top: 20rpx;
			border-bottom: 6rpx solid #fff;
			border-radius: 8rpx;
			width: 100%;
			height: 120rpx;
			image{
				height: 120rpx;
			}
			.midText{
				display: flex;
				flex-direction: column;
				margin-left: -240rpx;
				.topText{
					font-size: 38rpx;
					font-weight: 600;
					margin-bottom: 6rpx;
				}
				.bottomText{
					width: 340rpx;
					color: #6d6d6e;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					
				}
			}
			.day{
				position: absolute;
				top: 16rpx;
				right: 70rpx;
				font-size: 84rpx;
				font-weight: 700;
			}
			.tian{
				position: absolute;
				bottom: 8rpx;
				right: 8rpx;
				font-size: 36rpx;
			}
			
		}
	}
</style>