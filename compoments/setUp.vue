<template>
	<view class="setup">
		<!-- 表单 -->
		<u--form
						labelPosition="left"
						:model="work"
						:rules="rules"
						ref="form1"
				>
					<u-form-item
							label="上下班时间"
							label-width="300rpx"
							prop="work.time"
							ref="item1"
							labelStyle="{'font-size':'40rpx'}"
					>
						<view class="pickTime">
							<view class="start" @click="show1=true">
								<view>
								        <u-datetime-picker
												ref="datetimePicker"
								                :show="show1"
												v-model="work.startTime"
								                mode="time"
												@confirm="confirmStart"
												@cancel="show1=false"
								        ></u-datetime-picker>
								        <text>{{work.startTime}}</text>
								    </view>
							</view>
							<text class="sign"> ~ </text>
							<view class="end" @click="show2=true">
								<view>
									        <u-datetime-picker
													ref="datetimePicker"
									                :show="show2"
													v-model="work.endTime"
									                mode="time"
													@confirm="confirmEnd"
													@cancel="show2=false"
									        ></u-datetime-picker>
									        <text>{{work.endTime}}</text>
								</view>
							</view>
						</view>
					</u-form-item>
					<u-form-item
							label="午休时间"
							label-width="300rpx"
							prop="work.rest"
					>
						<view class="pickTime">
							<view class="start" @click="show3=true">
								<view>
									        <u-datetime-picker
													ref="datetimePicker"
									                :show="show3"
													v-model="work.startRest"
									                mode="time"
													@confirm="confirmStartRest"
													@cancel="show3=false"
									        ></u-datetime-picker>
									        <text>{{work.startRest}}</text>
								</view>
							</view>
							<text class="sign"> ~ </text>
							<view class="end" @click="show4=true">
								<view>
									        <u-datetime-picker
													ref="datetimePicker"
									                :show="show4"
													v-model="work.endRest"
									                mode="time"
													@confirm="confirmEndRest"
													@cancel="show4=false"
									        ></u-datetime-picker>
									        <text>{{work.endRest}}</text>
								</view>
							</view>
						</view>
					</u-form-item>
					
					<u-form-item
							label="平均月薪"
							label-width="300rpx"
							label-height="100rpx"
							prop="work.salary"
							ref="item1"
					>
						<view class="salary">
							<input type="text" v-model="work.salary">
						</view>
					</u-form-item>
					
					<u-form-item
							label="月工作天数"
							label-width="300rpx"
							prop="work.workDay"
							
							ref="item1"
					>
						<view class="day">
							<input type="text" v-model="work.workDay">
						</view>
					</u-form-item>
					<view class="tip">
						注：秒薪=平均月薪/月工作天数/（上班时间-午休时长）
					</view>
				</u--form>
				
				<view class="btn">
					<button class="cancel" @click="cancel">取消</button>
					<button class="confirm" @click="confirm">确认</button>
				</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				show1:false,
				show2:false,
				show3:false,
				show4:false,
				work:{
					startTime:'09:00',
					endTime:'18:00',
					startRest:'12:00',
					endRest:'13:00',
					salary:10000,
					workDay:22,
					
				},
				rules: {
								'work.time': {
									type: 'string',
									required: true,
									message: '请选择时间',
									trigger: ['blur', 'change']
								},
								'work.rest': {
									type: 'string',
									required: true,
									message: '请选择时间',
									trigger: ['blur', 'change']
								},
								'work.salary': {
									type: 'number',
									required: true,
									message: '请输入薪资',
									trigger: ['blur', 'change']
								},
								'work.workDay': {
									type: 'number',
									min:0,
									max: 31,
									required: true,
									message: '请输入天数',
									trigger: ['blur', 'change']
								},
							},
			}
		},
		
		methods:{
			change(e) {
			          console.log('change', e);
			        },
			confirmStart(time){
				this.show1 = false
				this.work.startTime = time.value
			},
			confirmEnd(time){
				this.show2 = false
				this.work.endTime = time.value
			},
			confirmStartRest(time){
				this.show3 = false
				this.work.startRest = time.value
			},
			confirmEndRest(time){
				this.show4 = false
				this.work.endRest = time.value
			},
			confirm(){
				this.$store.commit('setTime',this.work)
				uni.switchTab({
					url:'/pages/index/index'
				})
				
			},
			cancel(){
				uni.navigateBack({
					delta:2
				})
			}
			
		}
	}
</script>

<style lang="scss">
	.u-form{
		background-color: #fad556;
	.u-form-item .label{
		font-size: 50rpx;
	}
	}
	
	
	.pickTime{
		display: flex;
		.start,.end{
			width: 150rpx;
			height: 80rpx;
			background-color: #fff;
			text-align: center;
			line-height: 80rpx;
		}
		.sign{
			text-align: center;
			line-height: 80rpx;
			margin: 0 20rpx;
			
		}
		
	}
	.salary,.day{
		width: 360rpx;
		height: 120rpx;
		text-align: center;
		line-height: 100rpx;
		background-color: #fff;
		input{
			margin-top: 36rpx;
		}
	}
	.btn{
		display: flex;
		background-color: #fff;
		margin-top: 50rpx;
		margin-top: 130rpx;
		width: 100%;
		height: 100rpx;
		.cancel{
			width: 200rpx;
			margin-right: -176rpx;
			background-color: #fef7dd;
			border-radius: 50rpx 0 0 50rpx;
		}
		.confirm{
			width: 200rpx;
			background-color: #fad556;
			border-radius: 0rpx 50rpx 50rpx 0rpx;
		}
	}
</style>