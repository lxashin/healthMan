<template>
	<view class="patient_page">
		<view class="patient-change" v-if="isChange">
		      <h3>请选择患者信息</h3>
		      <view>以便医生给出更准确的治疗，信息仅医生可见</view>
		</view>
			
		<view class="patient-list">
		 <view
			class="patient-item"
			:class="{ selected: patientId === item.id }"
			@click="selectedPatient(item)"
			v-for="item in list"
			:key="item.id"
		  >
			<view class="info">
			  <text class="name">{{ item.name }}</text>
			  <text class="id">{{ item.idCard}}</text>
			  <text>{{ item.genderValue }}</text>
			  <text>{{ item.age }}岁</text>
			</view>
			<view class="icon" @click="showPopup(item)">
			  <u-icon name="share-square"></u-icon>
			</view>
			<view class="tag" v-if="item.defaultFlag === 1">默认</view>
		  </view>
		    
		  <view class="patient-add" v-if="list.length < 6" @click="add">
			<u-icon name="plus" size="24" color="#16C2A3"></u-icon>
			<view>添加患者</view>
		  </view>
		  <view class="patient-tip">最多可添加 6 人</view>
		</view>
		<!-- 添加患者 -->
		<u-popup :show="show" :round="10" mode="right" @close="close" @open="open">
				<view class="add">
					<view class="title">
						<u-icon name="arrow-left" size="25" @click="back"></u-icon>
						<text class="addpatient">{{patientId?'编辑患者':'添加患者'}}</text>
					</view>
					<view class="form">
						<u--form
							labelPosition="left"
							labelWidth="100"
							:model="patient"
							:rules="rules"
							ref="form"
						>
						<u-form-item
							label="真实姓名"
							prop="name"
							borderBottom
							ref="item1"
						>
							<u--input
								v-model="patient.name"
								placeholder="请输入姓名"
								border="none"
							></u--input>
						</u-form-item>
						<u-form-item
							label="身份证号"
							prop="idCard"
							borderBottom
							ref="item1"
						>
							<u--input
								v-model="patient.idCard"
								placeholder="请输入身份证号"
								border="none"
							></u--input>
						</u-form-item>
						<u-form-item
							label="性别"
							prop="genderValue"
							borderBottom
							@click="showSex = true;"
							ref="item1"
						>
							<u--input
								v-model="patient.genderValue"
								disabledColor="#ffffff"
								placeholder="请选择性别"
								border="none"
							></u--input>
							<u-icon
								slot="right"
								name="arrow-right"
							></u-icon>
						</u-form-item>
						<u-form-item
							label="默认就诊人"
							ref="item1"
						>
							<u-switch v-model="patient.defaultFlag" size="20"></u-switch>
						</u-form-item>
						<u-button type="success" text="保存" class="save" @click="save"></u-button>
						<u-button type="error" text="删除" class="delete" v-if="patientId" @click="remove"></u-button>
					</u--form>
					<u-action-sheet
						:show="showSex"
						:actions="actions"
						title="请选择性别"
						@close="showSex = false"
						@select="sexSelect">
							</u-action-sheet>
					</view>
				</view>
			</u-popup>
		<!-- 底部按钮 -->
		<view class="patient-next" v-if="isChange">
		  <u-button type="success" text="下一步" @click="next"></u-button>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				list:[],
				isChange:true,
				patientId:'',
				show:false,
				showSex: false,
				patient:{
					name:'',
					idCard:'',
					genderValue:'',
					defaultFlag:false
				},
				actions: [
					{
					name: '男',
					value:1
					},
					{
						name: '女',
						value:0
					},
				],
				rules: {
					'name': {
						type: 'string',
						required: true,
						message: '请填写姓名',
						trigger: ['blur', 'change']
					},
					'idCard': {
						type: 'string',
						required: true,
						message: '请填写身份证号',
						trigger: ['blur', 'change']
					},
					'genderValue': {
						type: 'string',
						max: 1,
						required: true,
						message: '请选择性别',
						trigger: ['blur', 'change']
					},
				},
			}
		},
		
		onLoad() {
			this.loadList()
		},
		methods:{
			back(){
				this.show = false
				setTimeout(()=>{
					this.patient = {}
					this.patientId = ''
				},200)
			},
			// 点击添加患者
			add(){
				this.show = true
				this.patientId = ''
			},
			// 获取患者信息
			loadList(){
				this.$api.getPatients().then(res=>{
					this.list = res.data
					// 如果是选择患者页面 并且有患者信息 需要设置默认选中病人
					  if (this.isChange && this.list.length) {
					    // 选中规则 有默认选中默认的,没有默认的选中数组第一个
					    const defPatient = this.list.find((item) => item.defaultFlag === 1)
					    if (defPatient) {
							this.patientId = defPatient.id
						}else{
							this.patientId = this.list[0].id
						} 
					}
				})
			},
			// 点击选中显式边框
			selectedPatient(item){
				this.patientId = item.id
			  },
			showPopup(item){
				this.patientId = item.id
				this.patient.name = item.name
				this.patient.idCard = item.idCard
				this.patient.genderValue = item.genderValue
				this.defaultFlag = item.defaultFlag
				this.show = true
			},
			open() {
				this.show = true
				console.log(this.patientId)
			},
			close() {
				this.show = false
			},
			sexSelect(e) {
				this.patient.genderValue = e.name
				this.$refs.form.validateField('gender')
			},
			radioChange(n){
				console.log(n)
			},
			 save(){
				// 校验姓名和身份证号是否填写
				this.$refs.form.validate().then(async () => {
						console.log(this.patientId)
						if(this.patientId){
							// 如果patientId存在则是修改患者，否则是创建患者
							const newPatient = {id:this.patientId,...this.patient}
							const res = await this.$api.modifyPatient({patient:newPatient})
							console.log(res)
							if(res.code==200){
								uni.showToast({
									title:'保存成功'
								})
								this.show = false
								this.loadList()
								this.patient = {}
								this.patientId = ''
							}
						}else{
							const res = await this.$api.addPatient(this.patient)
							console.log(res)
							if(res.code==200){
								uni.showToast({
									title:res.msg
								})
								this.show = false
								this.loadList()
								this.patient = {}
								this.patientId = ''
							}
						}
						
					}).catch(errors => {
						uni.$u.toast('请填写完整信息')
					})
						
			},
			remove(){
				console.log(this.patientId)
				if(this.patientId){
					uni.showModal({
						title: '提示',
						content:'确定删除吗',
						success: async (res) => {
							if(res.confirm){
								// uni.request({
								// 	url:'http://localhost:3000/patient/remove',
								// 	method:'DELETE',
								// 	success: (res) => {
								// 		console.log(res)
								// 	}
								// })
								const res = await this.$api.removePatient({id:this.patientId})
								console.log('res',res)
								if(res.code==200){
									uni.showToast({
										title:'删除成功'
									})
									this.show = false
									this.patient = {}
									this.loadList()
								}
							}
						}
					})
				}
			},
			next(){
				uni.navigateTo({
					url:'/pages/consult/consultPay'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.patient-page {
	  padding: 92rpx 0 160rpx;
	}
	.patient-list {
	  padding: 30rpx;
	  margin-bottom: 60rpx;
	}
	.patient-item {
	  display: flex;
	  align-items: center;
	  padding: 30rpx;
	  background-color: #F6F7F9;
	  border-radius: 16rpx;
	  margin-bottom: 30rpx;
	  position: relative;
	  border: 1px solid #F6F7F9;
	  transition: all 0.3s;
	  overflow: hidden;
	  .info {
	    display: flex;
	    flex-wrap: wrap;
	    flex: 1;
	    text {
	      color: #C3C3C5;
	      margin-right: 40rpx;
	      line-height: 60rpx;
	      &.name {
	        font-size: 32rpx;
	        color: #121826;
	        width: 150rpx;
	        margin-right: 0;
	      }
	      &.id {
			  font-size: 32rpx;
	        color: #3C3E42;
	        width: 360rpx;
	      }
	    }
	  }
	  .icon {
	    color: #848484;
	    width: 40rpx;
	    text-align: center;
	  }
	  .tag {
	    position: absolute;
	    right: 86rpx;
	    top: 42rpx;
	    width: 60rpx;
	    height: 32rpx;
	    font-size: 20rpx;
	    color: #fff;
	    background-color: #16C2A3;
	    border-radius: 4rpx;
	    display: flex;
	    justify-content: center;
	    align-items: center;
	  }
	  &.selected {
	    border-color: #16C2A3;
	    background-color: #EAF8F6;
	    .icon {
	      color: #16C2A3;
	    }
	  }
	}
	.patient-add {
	  display:flex;
	  flex-direction:column;
	  justify-content: center;
	  align-items: center;
	  background-color: #F6F7F9;
	  color: #16C2A3;
	  text-align: center;
	  padding: 30rpx 0;
	  border-radius: 16rpx;
	  .u-icon {
	    font-size: 48rpx;
	  }
	}
	.patient-tip {
	  color: #848484;
	  padding: 24rpx 0;
	}
	.patient-page {
	  padding: 92rpx 0 160rpx;
	}
	
	.patient-change {
	  padding: 30rpx;
	  > h3 {
	    font-weight: normal;
	    margin-bottom: 10rpx;
	  }
	  > view {
	    color: #6F6F6F;
	  }
	}
	.patient-next {
	  padding: 30rpx;
	  background-color: #fff;
	  position: fixed;
	  left: 0;
	  bottom: 0;
	  width: 100%;
	  height: 160rpx;
	  box-sizing: border-box;
	}
	.form{
		width: 90%;
		margin-left: 30rpx;
	}
	.add{
		padding-top: 20rpx;
		width: 750rpx;
		height: 100%;
		.title{
			display: flex;
			align-items: center;
			padding-right: 20rpx;
			.addpatient{
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
				font-size: 40rpx;
				font-weight: 700;
			}
		}
	}
	.u-form-item{
		margin-top: 30rpx;
	}
	.save{
		position: absolute;
		bottom: 180rpx;
		width: 80%;
		margin-left:65rpx;
		border-radius: 50rpx;
	}
	.delete{
		position: absolute;
		bottom: 60rpx;
		width: 80%;
		margin-left:65rpx;
		border-radius: 50rpx;
	}
	
</style>