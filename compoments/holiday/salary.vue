<template>
	<view class="salary_day">
		<u-popup :show="showSalary" mode="bottom" :round="10" style="height: 0rpx;" @close="close">
		        <view class="container">
					
		        	<view class="title">
		        		设置发工资日
		        	</view>
					<view class="content">
						<text>每月</text>
						<input type="number" maxlength="2" v-model="date">
						<text>号</text>
					</view>
		        </view>
				<view class="btn">
					<button class="cancel" @click="cancel">取消</button>
					<button class="confirm" @click="confirm(),showToast(list)">确认</button>
				</view>
				<view >
						<u-toast ref="uToast"></u-toast>
						
					</view>
			</u-popup>
	</view>
</template>

<script>
	export default{
		props:['showSalary'],
		data(){
			return {
				date:1, // 发工资日子
				salaryDay:0, // 距发工资的天数
				show:false,
				list: {
							type: 'error',
							message: "日期错误",
							iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png'
						}
			}
		},
		
		methods:{
			close(){
				this.$emit('showSalaryDate',false)
			},
			
			cancel(){
				this.$emit('showSalaryDate',false)
			},
			confirm(){
					if(this.date>=1&&this.date<=31){
						this.$emit('showSalaryDate',false)
						this.getDay()
						this.$store.commit('setSalaryDay',this.salaryDay) //提交到vuex中
						this.$emit('setSalaryDay',this.salaryDay)
						
					}
			},

			// 如果输入日期不正确，显示提示框
			showToast(params) {
						if(this.date<1||this.date>31){
							this.$refs.uToast.show({
								...params,
							})
						}
			},
			// 计算距发工资的天数
			getDay(){
				let date = new Date()
				let day = date.getDate()
				let year = date.getFullYear()
				let month = date.getMonth()+1
				if(day<this.date){
					this.salaryDay = this.date - day
				}else{
					this.salaryDay = this.date - day + new Date(year,month,0).getDate()
					
				}
			}
		},
		
	
	}
</script>

<style lang="scss" scoped>
	.salary_day{
		
		.container{
			background-color: #fad556;
			height: 200rpx;
			.title{
				margin-top: 20rpx;
				text-align: center;
				font-size: 50rpx;
				font-weight: 700;
				height: 50rpx;
				line-height: 50rpx;
			}
			.content{
				width: 100%;
				height: 100rpx;
				display: flex;
				margin-top: 30rpx;
				justify-content: center;
				align-items: center;
				font-size: 40rpx;
				input{
					width: 200rpx;
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
	
	.u-page {
			padding: 0;
		}
	
		.u-cell-icon {
			width: 36rpx;
			height: 36rpx;
			margin-right: 8rpx;
		}
	
		.u-cell-group__title__text {
			font-weight: bold;
		}
</style>