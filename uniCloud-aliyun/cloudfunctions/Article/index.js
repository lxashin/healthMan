'use strict';

const { title } = require("process");

const db = uniCloud.database()
const article = db.collection('article')
exports.main = async (event, context) => {
	// event指的是触发云函数的事件。当客户端调用云函数时，event就是客户端调用云函数时传入的参数
	// context 对象包含了本次请求的上下文，包括客户端的ip、ua、appId等信息，以及云函数的环境情况、调用来源source等信息。
	const {action} = event
	let res = {}
	if(action=='get'){
		return await article.get()
	}else if(action=='add'){
		const {information} = event
		res = await article.add({'title':information.title,'content':information.content,"date":information.date,"time":information.time})
	}else if(action=='delete'){
		// doc查询为字段
		const {id} = event
		res = await article.doc(id).remove()
	}else if(action == 'getArticle'){
		const {date} = event
		res = article.where({date:date}).get()
	}else if(action=='update'){
		const {form} = event
		res = article.where({_id:form.id}).update({
			title:form.title,
			content:form.content,
			date:form.date,
			time:form.time
		})
	}else if(action=='searchArticle'){
		const {keyword} = event
		res = article.where(db.command.or({title:new RegExp(keyword)},{content:new RegExp(keyword)})).get()
	}
	return res
};
