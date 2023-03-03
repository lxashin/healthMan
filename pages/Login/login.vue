<template>
	<view class="login-page">
	    <view class="login-head">
	      <view>{{ isPass ? '密码登录' : '短信验证码登录' }}</view>
	      <a href="javascript:;" @click="isPass = !isPass">
	        <span>{{ !isPass ? '密码登录' : '短信验证码登录' }}</span>
	        <u-icon name="arrow-right"></u-icon>
	      </a>
	    </view>
	    <!-- form 表单 -->
	    <u-form :model="userInfo" :rules="rules" ref="form" class="form">
			<u-form-item prop="mobile">
				<u--input v-model="userInfo.mobile" placeholder="请输入手机号" border="bottom" clearable></u--input>
			</u-form-item>
			<u-form-item prop="password" v-if="isPass">
				<u--input v-model="userInfo.password" :type="show?'text':'password'" placeholder="请输入密码" :suffixIcon="`eye-${show?'fill':'off'}`" suffixIconStyle="color: #909399" border="bottom" clearable></u--input>
				<!-- <u-icon size="24" :name="`eye-${show?'fill':'off'}`" @click="show=!show"></u-icon> -->
			</u-form-item>
			
			<!-- 验证码 -->
			<u-form-item prop="codeNum" class="code" v-if="!isPass">
				<u--input v-model="userInfo.codeNum" placeholder="请输入验证码" border="bottom"></u--input>
				<text class="send" :class="{'active':time>0}" @click="send">{{time>0?`${time}s后再次发送`:'发送验证码'}}</text>
			</u-form-item>
	        
	      </van-field>
	      
	      <view class="checkbox_agree">
			  <u-checkbox-group @change="checkboxChange"><u-checkbox v-model="checked"></u-checkbox></u-checkbox-group>
	          <text>我已同意</text>
	          <a href="javascript:;">用户协议</a>
	          <text>及</text>
	          <a href="javascript:;">隐私条款</a>
	      </view>
	      <view class="login_btn">
	        <u-button type="primary" text="登 录 " @click="login"></u-button>
	      </view>
	      <view class="forget">
			  <text>注册</text> /
			  <text>忘记密码？</text>
	      </view>
	    </u-form>
	
	    <view class="login-other">
	      <view class="other">第三方登录</view>
	      <a class="icon" :href="qqUrl">
	        <img src="@/static/image/qq.svg" alt="" />
	      </a>
	    </view>
	  </view>
</template>

<script>
	export default{
		data(){
			return{
				userInfo:{
					mobile:'',
					password:'',
					codeNum:''
				},
				rules:{
					mobile:{
						required: true,
						len: 11,
						message: '请填写11位手机号',
						trigger: ['blur','change']
					},
					password:{
						required: true,
						message: '请填写密码',
						trigger: ['blur','change']
					},
					codeNum:{
						required: true,
						message: '请填写验证码',
						trigger: ['blur','change']
					},
				},
				isPass:true,
				checked:false,
				show:false,
				qqUrl:'',
				time:0
			}
		},
		methods:{
			send(){
				if(this.time>0) return
				this.$refs.form.validateField('mobile').then(async ()=>{
					// 手机号符合规范才去调用接口
					if(this.userInfo.mobile.length!=11) return
					await this.$api.sendMobileCode({mobile:this.userInfo.mobile})
					uni.showToast({
						title:'发送验证码成功'
					})
					this.time = 60
					let timeId = setInterval(()=>{
						this.time--
						if (this.time <= 0) window.clearInterval(timeId)
					},1000)
				})
			},
			checkboxChange(n){
				if(n.length) this.checked = true
				else this.checked = false
			},
			login(){
				this.$refs.form.validate().then(async ()=>{
					let res = await this.$api.login(this.userInfo)
					if(!this.checked) return uni.showToast({
						title:'請勾選我同意',
						icon:'none'
					})
					if(res.code===200){
						uni.showToast({
							title:'登录成功'
						})
						uni.switchTab({
							url:'/pages/index/index'
						})
					}else{
						uni.showToast({
							title:'賬號或密碼錯誤',
							icon:'error'
						})
					}
				})
			}
		},
		onLoad() {
			 this.qqUrl = `https://graph.qq.com/oauth2.0/authorize?client_id=102015968&amp;response_type=token&amp;scope=all&amp;redirect_uri=${encodeURIComponent(
			  'http://consult-patients.itheima.net' + '/login/callback'
			)}`
		}
	}
</script>

<style lang="scss" scoped>
.login {
  &_page {
	padding-top: 46px;
  }
  &-head {
	padding: 30px 30px 50px;
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	line-height: 1;
	view {
	  font-weight: normal;
	  font-size: 48rpx;
	}
	a {
		text-decoration: none;
		color: #000;
		font-size: 30rpx;
		display: flex;
	}
  }
  
  &-other {
	margin-top: 250rpx;
	.other{
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.icon {
	  display: flex;
	  justify-content: center;
	  img {
		width: 36px;
		height: 36px;
		padding: 4px;
	  }
	}
  }
}
a{
	text-decoration: none;
	color: #16C2A3;
}
.forget{
		margin-top: 40rpx;
		position: absolute;
		right: 40rpx;
		font-size: 28rpx;
		text{
			padding: 0 6rpx;
			color: #16C2A3;
		}
	}
.form{
	  margin-left: 50rpx;
	  width: 90%;
	  .checkbox_agree{
		  display: flex;
		  margin: 40rpx;
	  }
	  .send{
		  position: absolute;
		  right: 30rpx;
		  &.active {
		        color: rgba(22, 194, 163, 0.5);
		      }
	  }
	  .code{
		  color: #16C2A3;
	  }
  }
</style>