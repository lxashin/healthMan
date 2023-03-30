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
	// 获取患者信息列表
	getPatients(){
		return request('/patient/mylist','GET')
	},
	// 查询患者详情
	getPatientDetail(id){
		return request(`/patient/info/${id}`,'GET')
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
		return request(`/consult/order/pre?type=${params.type}&illnessType=${params.illnessType}`, 'GET', params)
	},
	//生成订单
	createConsultOrder(params){
		return request('/consult/order', 'POST', params)
	},
	// 删除订单
	removeOrder(params){
		return request('/consult/removeorder','DELETE',params)
	},
	// 获取所有问诊订单
	getOrder(){
		return request('/consult/getAllOrder','GET')
	},
	// 获取支付地址  0 是微信  1 支付宝
	getConsultOrderPayUrl(params){
		return request('/consult/pay', 'POST', params)
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
	// 文章点赞与取消
	like(id){
		return request(`/article/like?id=${id}`,'GET')
	},
	// 文章发表评论
	addComment(params){
		return request('/comment/addcomment','POST',params)
	},
	// 根据tag标签获取文章
	getArticleByTag(tag){
		return request(`/article/findtag?tag=${tag}`,'GET')
	},
	// 获取抑郁测评试题
	getDepressionQuestion(){
		return request('/question/depression','GET')
	},
	// 提交测评获取测评结果
	getQuesstionResult(params){
		return request('/question/depressionresult','POST',params)
	},
	// 获取聊天记录
	getChat(){
		return request('/chat/history','GET')
	},
	// 获取所有社区动态
	getCommunity(){
		return request('/community/allinfo','GET')
	},
	// 朋友圈点赞
	communityLike(id){
		return request(`/community/like?_id=${id}`,'GET')
	}
}
	
