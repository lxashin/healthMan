<template>
	<view class="week">
		<u-popup :show="show" mode="bottom" :round="10" style="height: 0rpx;" @close="close" @open="open">
		        <view class="week-list">
		            <ul>
		            	<li v-for="item,index in checkboxList" :key="index" :class="{'active':item.checked===true}" @click='checkWeek(index)'>{{item.value}}</li>
		            	
		            </ul>
					<view class="btn">
						<button class="cancel" @click="cancel">取消</button>
						<button class="confirm" @click="confirm">确认</button>
					</view>
		        </view>
			</u-popup>
	</view>
		
	
</template>

<script>
	export default{
		props:['show'],
		data(){
			return {
				weekend:[],  // 休息日
				restDay:0,  // 距离休息日还剩几天
				
				// 基本案列数据
				checkboxList: [
					{
				      value: '星期一',
				      disabled: false,
					  checked:false,
				    },
				    {
				      value: '星期二',
				      disabled: false,
					  checked:false,
				    },
				    {
				      value: '星期三',
				      disabled: false,
					  checked:false,
				     },
					 {
					   value: '星期四',
					   disabled: false,
					  checked:false,
					  },
					  {
					    value: '星期五',
					    disabled: false,
					  checked:false,
					   },
					   {
					     value: '星期六',
					     disabled: false,
					  checked:false,
					    },
						{
						  value: '星期日',
						  disabled: false,
						  checked:false,
						 }
				],
			}
		},
		methods:{
			open(){
				
			},
			
			close(){
				this.$emit('setShow',false)
				
			},
			cancel(){
				this.$emit('setShow',false)
			},
			// 获取现在是星期几
			getWeekDate() {
				// var weeks = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
				var now = new Date();
				var day = now.getDay();
				// var week = weeks[day];
				return day;
			},
			confirm(){
				this.weekend = []
				this.checkboxList.forEach(item=>{
					if(item.checked){
						this.weekend.push(item.value)
					}
				})
				this.$store.commit('setWeekend',this.weekend)
				const startRest = uni.getStorageSync('weekend')[0]
				const endRest = uni.getStorageSync('weekend')[uni.getStorageSync('weekend').length-1]
				const now = this.getWeekDate()>0?this.getWeekDate():7
				let weekNum = new Map([['星期日',7],['星期一',1],['星期二',2],['星期三',3],['星期四',4],['星期五',5],['星期六',6]])
				if(now>=weekNum.get(startRest)&&now<=weekNum.get(endRest)){ // 如果当天在休息日范围内，设置为0
					this.restDay = 0
				}else if(weekNum.get(startRest)>now){ // 如果休息日的第一天大于当天 则 '休息日-当天'
					this.restDay = weekNum.get(startRest)-now
				}else{ //如果是负数的话加7
					this.restDay = weekNum.get(startRest)-now+7
				}
				this.$store.commit('setRestDay',this.restDay)
				this.$emit('setRestDay',false,this.restDay)
				
			},
			checkWeek(index){
				this.checkboxList[index].checked = !this.checkboxList[index].checked
			}
		}
	}
</script>

<style lang="scss" scoped>
	.week{
		.week-list{
			width: 100%;
			height: 900rpx;
			ul{
				display: flex;
				flex-direction: column;
				margin-right: 60rpx;
				li{
					list-style: none;
					font-size: 44rpx;
					text-align: center;
					line-height: 100rpx;
					width: 100%;
					height: 100rpx;
					background-color: #fff;
					border-bottom: 2rpx solid #ccc;
					
				}
				.active{
					background-color: #fef7dd;
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
	}
</style>