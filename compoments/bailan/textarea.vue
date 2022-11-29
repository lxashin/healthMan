<template>
	
	<view class="container">
		<view class="tool">
			<u-icon name="plus-circle" size="26"></u-icon>
			<u-icon name="checkmark-circle" size="26" @click="commit"></u-icon>
		</view>
		<view class="title">
			<input type="text" v-model="title" placeholder="标题...">
		</view>
		<view class="content">
			<editor class="richInputContent" id="editor" @input="getEditorContent" @ready="onEditorReady" placeholder="开始输入..."></editor>
		</view>
		
		</view>
</template>

<script>
	export default {
			data() {
				return {
					title:'',
					content: '',
					id:''  // 用来判断是否为修改文章，如果有id则是修改文章，没有则是发表文章
					
				}
			},
			onLoad(option){
				if(option.title||option.content){
					this.title=JSON.parse(decodeURIComponent(option.title))
					this.content = JSON.parse(decodeURIComponent(option.content))
					this.id = JSON.parse(decodeURIComponent(option.id))
					console.log(this.id)
				}
				
				
			},
			methods: {
				onEditorReady() {
					// 初始化文本内容
					uni.createSelectorQuery().select('#editor').context((res) => {
					                    var contentVal_1 = this.content;
					                    //将内容写入编辑器
					                    this.editorCtx = res.context;
					                    let EContent = {
					                        html: contentVal_1
					                    }
					                    this.editorCtx.setContents(EContent); //设置富文本编辑器的内容
					                }).exec()	   
				},
				
				getEditorContent(e){
					this.content = e.detail.text
					// console.log(this.content)
				},
				// 保存便签
				async commit(){
					if(this.id){
						// 如果有id则是修改文章
						const result = await this.updateArticle(this.id,this.title,this.content)
						uni.switchTab({
							url:'../../pages/bailan/bailan'
						})
						// location.reload()
						
					}else{
						// 发表文章
						const result = await this.addArticle(this.title,this.content)
							uni.switchTab({
								url:'../../pages/bailan/bailan'
							})
						// location.reload()
					}
					
					
					
				},
				// 获取当前年月日
				getNowDate(){
					var time = new Date()
					var y = time.getFullYear()
					var m = time.getMonth()+1<10?'0'+(time.getMonth()+1):time.getMonth()+1
					var d = time.getDate()<10?'0'+time.getDate():time.getDate()
					return y+'-'+m+'-'+d;
				},
				// 获取当前时分秒
				getNowTime(){
					let date = new Date()
					let hour = date.getHours()>=10?date.getHours():'0'+date.getHours()
					let minute = date.getMinutes()>=10?date.getMinutes():'0'+date.getMinutes()
					let second = date.getSeconds()>=10?date.getSeconds():'0'+date.getSeconds()
					return `${hour}:${minute}:${second}`
				},
				// 获取文章
				
				async getArticle(){
					const res = await uniCloud.callFunction({
						name:'Article',
						data:{
							action:'get'
						}
					})
					console.log(111)
				},
				// 添加文章
				async addArticle(title,content){
					const res = await uniCloud.callFunction({
						name:'Article',
						data:{
							action:'add',
							information:{
								title,
								content,
								date:this.getNowDate(),
								time:this.getNowTime()
							}
						}
					})
					return res.result.inserted
				},
				
				// 更新文章
				async updateArticle(id,title,content){
					const res = await uniCloud.callFunction({
						name:'Article',
						data:{
							action:'update',
							form:{
								id,
								title,
								content,
								date:this.getNowDate(),
								time:this.getNowTime()
							}
						}
					})
				}
			},
			async mounted() {
				
			}
		}
</script>

<style lang="scss">
	.container {
			.tool{
				width: 90%;
				height: 100rpx;
				margin-left: 5%;
				display: flex;
				justify-content: space-between;
				
			}
			.title{
				margin-top: 10rpx;
				margin-left: 10rpx;
				margin-bottom: 10rpx;
				input{
					border-bottom: 2rpx solid #ccc;
				}
			}
			.content{
				margin-left: 10rpx;
			}
		}
	
		#editor {
			width: 100%;
			height: 300px;
			
		}
	
		button {
			margin-top: 10px;
		}
</style>