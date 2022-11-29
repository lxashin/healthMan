import { data } from 'uview-ui/libs/mixin/mixin'
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state:{
		time:{
			startTime:'09:00',
			endTime:'18:00',
			startRest:'12:00',
			endRest:'13:00',
			salary:10000,
			workDay:22,
			
		},
		show:false,
		moyuObj:{
			lashi:0.00,
			waimai:0.00,
			hesuan:0.00,
			study:0.00,
			saunter:0.00,
			chat:0.00
		},
		secondSalary:0,
		weekend:['星期六','星期日'],
		restDay:0, // 距离休息日的天数
		salaryDay:0, // 距离发工资的天数
		birthday:0,   //距离生日的天数
		festivalDay:0, // 距离节假日剩余的天数
		loginCode:'' // 登录后的code
	},
	mutations:{
		setTime(state,data){
			state.time = data
			uni.setStorageSync("timeData",{
				startTime:data.startTime,
				endTime:data.endTime,
				startRest:data.startRest,
				endRest:data.endRest,
				salary:data.salary,
				workDay:data.workDay,
				// timeData:data,
				success() {
					console.log('存储成功！')
				}
			})
		},
		updateShow(state,data){
			state.show = data
		},
		lashi(state,data){
			
			state.moyuObj.lashi = data
		},
		chiwaimai(state,data){
			state.moyuObj.waimai = data
		},
		hesuan(state,data){
			state.moyuObj.hesuan = data
		},
		study(state,data){
			state.moyuObj.study = data
		},
		saunter(state,data){
			state.moyuObj.saunter = data
		},
		chat(state,data){
			state.moyuObj.chat = data
		},
		setSecondSalary(state,data){
			state.secondSalary = data
		},
		setWeekend(state,data){
			state.weekend = data
			uni.setStorageSync('weekend',data)
		},
		setRestDay(state,data){
			state.restDay = data
			uni.setStorageSync('restDay',data)
		},
		setSalaryDay(state,data){
			state.salaryDay = data
			uni.setStorageSync('salaryDay',data)
		},
		setBirthday(state,data){
			state.birthday = data
			uni.setStorageSync('birthday',data)
		},
		setFestivalDay(state,data){
			state.festivalDay = data
			uni.setStorageSync('festivalDay',data)
		},
		getLoginCode(state,data){
			state.loginCode = data
			uni.setStorageSync('loginCode',data)
		}
	
	},
	actions:{
		
	},
	getters:{
		
	}
})

export default store