import { data } from 'uview-ui/libs/mixin/mixin'
import Vue from 'vue'
import Vuex from 'vuex'

const state = {
	consult:{}, // 问诊记录
}

const mutations = {
	// 设置病情描述
	setIllness(state,data){
		state.consult.illnessDesc = data.illnessDesc
		state.consult.illnessTime = data.illnessTime
		state.consult.consultFlag = data.consultFlag
		state.consult.imgList = data.imgList
	},
	// 设置问诊记录类型 1.找医生 2.快速问诊 3.开药问诊
	setType(state,data){
		state.consult.type = data 
	},
	// 设置急速问诊类型
	setIllnessType(state,data){
		state.consult.illnessType = data   // 0 或 1
	},
	
	// 设置患者
	setPatient(state,id){
		state.consult.patientId = id
	},
	// 设置优惠券
	setCoupon(state,id){
		state.consult.couponId = id
	},
	
	// 清空记录
	clear(state){
		state.consult = {}
	}
}

const actions = {
	
}

const getters = {
	
}

export default {
	state,
	mutations,
	actions,
	getters
}