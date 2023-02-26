import request from './request.js'

export default {
	// 获取科室列表
	getConsultList(){
		return request('/consult','GET')
	},
	// 获取距离
	getLocation(params){
		return new Promise((resolve,reject)=>{
				uni.request({
					url:'https://apis.map.qq.com/ws/distance/v1/matrix',
					method:'GET',
					data:params
				}).then(res=>{
					resolve(res.data)
				})
			})
	},
	// 获取需要帮助的数据
	getHelpData(){
		return request('/help/allinfo','GET')
	},
	// 获取患者信息
	getPatients(){
		return request('/patient/mylist','GET')
	},
	// 添加患者
	addPatient(params){
		return request('/patient/add','POST',params)
	},
	// 删除患者
	removePatient(params){
		return request('/patient/remove','DELETE',params)
	},
	// 修改患者信息
	modifyPatient(params){
		return request('/patient/modify','PATCH',params)
	}
}
	
