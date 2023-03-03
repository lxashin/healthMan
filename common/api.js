import request from './request.js'

export default {
	// 登录接口
	login(params){
		return request('/user/login','POST',params)
	},
	// 注册接口
	register(params){
		return request('/user/register','POST',params)
	},
	// 发送验证码
	sendMobileCode(mobile){
		return request('/user/sendcode','POST',mobile)
	},
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
	},
	// 生成预订单信息
	getConsultOrderPre(params){
		return request('/patient/consult/order/pre', 'GET', params)
	},
	//生成订单
	createConsultOrder(params){
		return resuest('/patient/consult/order', 'POST', params)
	},
	// 获取支付地址  0 是微信  1 支付宝
	getConsultOrderPayUrl(params){
		return request('/patient/consult/pay', 'POST', params)
	},
	// 查询患者详情
	getPatientDetail(id){
		return request(`/patient/info/${id}`)
	},
	// 获取订单详情接口
	getConsultOrderDetail(orderId){
		return request('/patient/consult/order/detail', 'GET', { orderId })
	},
	// 获取文章接口
	getAllArticle(){
		return request('/article/findAllArticle','GET')
	},
	// 根据id获取文章内容显式文章详情页
	getArticleById(id){
		return request(`/article/findarticle?id=${id}`,'GET')
	},
	// 根据articleId获取该文章评论
	getArticleComment(id){
		return request(`/comment/getcomment?articleId=${id}`,'GET')
	},
	// 根据tag标签获取文章
	getArticleByTag(tag){
		return request(`article/findtag?tag=${tag}`,'GET')
	}
	
}
	
