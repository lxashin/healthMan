<template>
	<view class="post">
		<view class="main">
			<editor class="richInputContent" id="editor" @input="getEditorContent" @ready="onEditorReady" placeholder="请输入您的动态"></editor>
			<u-upload ref="uUpload" :action="action" :auto-upload="false" upload-text="选择图片"></u-upload>
		</view>
		<view class="btn">
			<u-button size="primary" @click="submit">提交</u-button>
			<u-button size="info">取消</u-button>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				action: 'http://www.example.com/upload',
				filesArr: []
			}
		},
		methods:{
			submit() {
				let files = [];
				// 通过filter，筛选出上传进度为100的文件(因为某些上传失败的文件，进度值不为100，这个是可选的操作)
				// files = this.$refs.uUpload.lists.filter(val => {
				// 	return val.progress == 100;
				// })
				// 如果您不需要进行太多的处理，直接如下即可
				files = this.$refs.uUpload.lists;
				console.log(files)
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