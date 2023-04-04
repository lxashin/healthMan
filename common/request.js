const baseUrl = "http://192.168.0.136:3000"

export default (url,method,params,tokens)=>{
	return new Promise((resolve,reject)=>{
		uni.showLoading({
			title:'加载中...'
		})
		uni.request({
			url:baseUrl+url,
			method:method,
			data:params,
			// header:{
			// 	token:tokens
			// }
		}).then((res)=>{
			// 请求成功的处理
			resolve(res[1].data)
			uni.hideLoading()
		}).catch(err=>{
			// 请求失败的处理
			console.log('请求失败')
			setTimeout(()=>{
				uni.hideLoading()
				uni.showToast({
					title:'请求失败',
					icon:'error'
				})
			},2000)
		})
	})
}