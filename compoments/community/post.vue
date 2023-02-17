<template>
	<view class="post">
		<view class="main">
			<editor class="richInputContent" id="editor" @input="getEditorContent" placeholder="请输入您的动态"></editor>
			<u-upload
					:fileList="imgList"
					@afterRead="afterRead"
					@delete="deletePic"
					name="1"
					multiple
					:maxCount="10"
					upload-text="选择图片"
					:previewFullImage="true"
				></u-upload>
		</view>
		<view class="btn">
			<u-button size="primary" @click="submit">提交</u-button>
			<u-button size="info" @click="cancel">取消</u-button>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				imgList: []
			}
		},
		methods:{
			// 删除图片
			deletePic(event) {
				this.imgList.splice(event.index, 1)
				console.log(this.imgList)
			},
			// 新增图片
			async afterRead(event) {
				// 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				let imgListLen = this.imgList.length
				lists.map((item) => {
					this.imgList.push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				console.log('imgList',this.imgList)
				for (let i = 0; i < lists.length; i++) {
					const result = await this.uploadFilePromise(lists[i].url)
					let item = this.imgList[imgListLen]
					this.imgList.splice(imgListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					}))
					imgListLen++
				}
			},
			uploadFilePromise(url) {
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: 'http://localhost:3000/upload',
						filePath: url,
						name: 'file',
						formData: {
							user: 'test'
						},
						success: (res) => {
							setTimeout(() => {
								resolve(JSON.parse(res.data).url)
							}, 1000)
						}
					});
				})
			},
			submit(){
				console.log(this.imgList)
			},
			cancel(){
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.post{
		margin-left: 20rpx;
		width: 90%;
		.main{
			margin-top: 30rpx;
			editor{
				height: 300rpx;
			}
			.u-upload{
				margin-top: 50rpx;
			}
		}
		.btn{
			margin-top: 100rpx;
			.u-button{
				margin-bottom: 40rpx;
				border-radius: 40rpx;
			}
		}
	}
</style>