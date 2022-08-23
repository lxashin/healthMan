<template>
	<view class="birthday">
		<u-datetime-picker
		                :show="showBirthday"
		                v-model="dateTime"
		                mode="date"
						@cancel="cancel"
						@confirm="confirm(),showToast(list)"
						@change="change"
		        ></u-datetime-picker>
				<view >
						<u-toast ref="uToast" style=""></u-toast>
						
					</view>
	</view>
</template>

<script>
	export default{
		props:['showBirthday'],
		data(){
			return{
				dateTime:Number(new Date()),
				birthdatDay:0,  //距离生日还剩多少天
				list: {
							type: 'error',
							message: "日期错误",
							iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png',
							position:'top'
						}
			}
		},
		
		methods:{
			cancel(){
				this.$emit('birthdayShow',false)
				
			},
			change(){
				
			},
			// 如果输入日期不正确，显示提示框
			showToast(params) {
				setTimeout(()=>{
					// 要使用延迟，否则选择的日期不能立即选择到，还是上次选择的日期
					let now = this.format(Date.now()) // 让当前时间精确到年月日
					let selDate = this.format(this.dateTime) // 让选择的时间为年月日
					if(this.toTimeStamp(now)>this.toTimeStamp(selDate)){ // 如果当前日期大于选择生日的日期，则弹出错误
						this.$refs.uToast.show({
							...params,
						})
						this.$emit('birthdayShow',true)
					}
				},100)
						
			},
			confirm() {
				let date = new Date()
				let year = date.getFullYear()
				let month = date.getMonth()+1
				let day = date.getDate()
				let now = `${year}-${month}-${day}`
				setTimeout(()=>{
					// 要使用延迟，否则选择的日期不能立即选择到，还是上次选择的日期
					if(this.toTimeStamp(now)<=this.dateTime){
						let birthday = this.format(this.dateTime)
						this.birthdatDay = this.getDistanceDays(birthday,now)
						this.$store.commit('setBirthday',this.birthdatDay)
						this.$emit('birthdayShow',false)
						
					}
					
				},100)
				
			},
			
			format(shijianchuo){
			var time = new Date(shijianchuo);
			var y = time.getFullYear()
			var m = time.getMonth()+1<10?'0'+(time.getMonth()+1):time.getMonth()+1
			var d = time.getDate()<10?'0'+time.getDate():time.getDate()
			return y+'-'+m+'-'+d;
			
			},
			 // 指定时间转换为时间戳
			toTimeStamp(dateString){
			  // dateString例如:'2022-03-05'
			  // 例如返回:1646611200000
				return new Date(dateString) - 0
			},
			// 计算两个日期距离的天数
			getDistanceDays(date1,date2){
			  // date1例如:'2022-03-05',date2例如:'2022-03-06'
			  const date1_timeStamp = this.toTimeStamp(date1)
			  const date2_timeStamp = this.toTimeStamp(date2)
			  let max = '', min = ''
			  if(date1_timeStamp>date2_timeStamp){
			    max = date1_timeStamp
			    min = date2_timeStamp
			  }else{
			    max = date2_timeStamp
			    min = date1_timeStamp
			  }
			 // 例如返回:'1'
			 return parseInt((max-min)/(24*60*60*1000))
			},
			
			
		},
		
		
	}
</script>

<style lang="scss" scoped>
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
	
</style>