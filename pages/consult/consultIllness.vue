<template>
	<view class="consult-illness-page">
		<!-- 医生提示 -->
		<view class="illness-tip">
			<image class="img" src="/static/image/avatar-doctor.svg" mode="widthFix"></image>
		  <view class="info">
			<view class="tit">在线医生</view>
			<view class="tip">
			  请描述你的疾病或症状、是否用药、就诊经历，需要我听过什么样的帮助
			</view>
			<view class="safe">
			  <u-icon name="error-circle"></u-icon>
			  <text>内容仅医生可见</text>
			</view>
		  </view>
		</view>
		
		<!-- 表单 -->
		<view class="illness-form">
			<u--textarea v-model="form.illnessDesc" confirmType="done" placeholder="请详细描述您的病情,病情描述不能为空" count ></u--textarea>
			<view class="item">
				<view class="tit">
					本次患病多久了？
				</view>
				<u-radio-group v-model="form.illnessTime">
					<u-radio shape="square" 
					  v-for="(item, index) in radiolist1"
					  :key="index"
					  :label="item.name"
					  :name="item.name" @change="radioChange1"></u-radio>
				</u-radio-group>
			</view>
			<view class="item">
				<view class="tit">
					此次病情是否去医院就诊过
				</view>
				<u-radio-group v-model="form.consultFlag">
					<u-radio shape="square" 
					  v-for="(item, index) in radiolist2"
					  :key="index"
					  :label="item.name"
					  :name="item.name" @change="radioChange2"></u-radio>
				</u-radio-group>
			</view>
			<view class="illness_img">
				<!-- 上传图片 -->
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
					<view class="tip" v-if="imgList.length==0">
						上传内容仅医生可见,最多9张图,最大5MB
					</view>
			</view>
			<u-button type="success" text="下一步" @click="next"></u-button>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				form:{
					illnessDesc:'',
					illnessTime:'',
					consultFlag:''
				},
				radiolist1:[
					{
						name: '一周内',
						disabled: false
					  },
						{
						  name: '一月内',
						  disabled: false
						},
						{
						  name: '半年内',
						  disabled: false
						},
						{
						  name: '一年内',
						  disabled: false
						},
				],
				radiolist2:[
					{
						name: '就诊过',
						disabled: false
					  },
						{
						  name: '没就诊过',
						  disabled: false
						},
				],
				imgList: [],
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
		    radioChange1(n) {
				this.form.illnessTime = n
		    },
			radioChange2(n) {
				this.form.consultFlag = n
			},
			next(){
				console.log(this.form)
				if (!this.form.illnessDesc){
					uni.showToast({
						title:"请输入病情描述",
						icon:'error'
					})
				}else if(!this.form.illnessTime){
					uni.showToast({
						title:"请选择患病时长",
						icon:"error"
					})
				}else if(!this.form.consultFlag){
					uni.showToast({
						title:'请选择是否已经就诊',
						icon:'error'
					})
				}else{
					uni.navigateTo({
						url:'/pages/my/user/patient'
					})
				}
				
			}
		}
	}
</script>

<style lang="scss" scoped>
.consult-illness-page {
  .illness-tip {
    display: flex;
    padding: 15px;
    .img {
      width: 52px;
      height: 52px;
      border-radius: 4px;
      overflow: hidden;
      margin-top: 10px;
    }
    .info {
      flex: 1;
      padding-left: 12px;
      .tit {
        font-size: 16px;
        margin-bottom: 5px;
      }
      .tip {
        padding: 12px;
        background: #F6F7F9;
        color: #6F6F6F;
        font-size: 13px;
        margin-bottom: 10px;
      }
      .safe {
        font-size: 10px;
        color: #6F6F6F;
        display: flex;
        align-items: center;
        .cp-icon {
          font-size: 12px;
          margin-right: 2px;
        }
      }
    }
  }
  .illness-form{
	  .item{
		  margin: 40rpx 20rpx;
		  .tit{
			  color: #6F6F6F;
			  font-weight: 600;
			  padding: 0 0 25rpx 15rpx;
		  }
		  .u-radio-group{
			  .u-radio{
				  margin-right: 30rpx;
			  }
		  }
	  }
	  .illness_img{
		  display: flex;
		  margin:40rpx 30rpx;
		  .u-upload{
			  flex: 1;
		  }
		  .tip{
			flex: 3;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 12px;
			color: #C3C3C5;
			
		  }
	  }
  }
}
</style>