<template>
	
	<view class="container">
		<view class="tool">
			<u-icon name="plus-circle" size="26"></u-icon>
			<u-icon name="checkmark-circle" size="26"></u-icon>
		</view>
		<view class="title">
			<input type="text" v-model="title" placeholder="标题...">
		</view>
		<view class="content">
			<editor class="richInputContent" id="editor" @input="getEditorContent" @blur="onEditorReady" v-model="content" placeholder="开始输入..."></editor>
		</view>
		
		</view>
</template>

<script>
	export default {
			data() {
				return {
					title:'',
					content: '',
					
				}
			},
			methods: {
				onEditorReady() {
				    console.log(this.value)
				},
				
				getEditorContent(){
					console.log(111)
				},
				
				// 获取文章
				async getArticle(){
					const res = await uniCloud.callFunction({
						name:'Article',
						data:{
							action:'get',
							
						}
					})
					console.log(res)
				},
				// 获取某一条文章
				async getOneArticle(id){
					const res = await uniCloud.callFunction({
						name:'Article',
						data:{
							action:'getOne',
							id
						}
					})
					console.log(res)
				},
				// 添加文章
				async addArticle(title,content){
					const res = await uniCloud.callFunction({
						name:'Article',
						data:{
							action:'add',
							information:{
								title,
								content
							}
						}
					})
				},
				// 删除文章
				async delArticle(id){
					const res = await uniCloud.callFunction({
						name:'Article',
						data:{
							action:'delete',
							id:id
						}
					})
					if(res.result.deleted){
						uni.showToast({
							title:'删除成功',
							icon:'none'
						})
					}
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
								content
							}
						}
					})
				}
			},
			async mounted() {
				const res = await uniCloud.callFunction({
					name:'Article',
					data:{
						action:'get',
						
					}
				})
				console.log(res)
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