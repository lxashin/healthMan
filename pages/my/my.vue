<template>
	<view class="my">
		<view class="avatar_content" @click="getUser">
			<view class="avatar">
				<u-avatar :src="imgUrl" shape="circle" size='50'></u-avatar>
			</view>
			
			<view class="message">
				<text class="text" v-model="name">
					{{name}}
				</text>
				<text class="text">每天都是好心情~</text>
			</view>
			
		</view>

		<u-gap height="12" bgColor="#f2f2f2"></u-gap>
		
		<!-- 单元格 -->
		<u-cell-group>
			<u-cell title="重要公告" isLink @click="go">
				<u-icon slot="icon" size="28" name="chat" color='#fad556'></u-icon>
			</u-cell>
			<u-cell title="评测记录" isLink url="/pages/componentsB/badge/badge">
				<u-icon slot="icon" size="28" name="file-text" color='#fad556'></u-icon>
			</u-cell>
			<u-gap height="12" bgColor="#f2f2f2"></u-gap>
			<!-- <u-cell title="推荐给好友" isLink url="/pages/componentsB/badge/badge">
				<u-icon slot="icon" size="28" name="share-square" color='#fad556'></u-icon>
			</u-cell> -->
			<view class="feedback">
				<u-icon size="28" name="share-square" color='#fad556'></u-icon>
				<button open-type="share" class="btn">推荐给好友</button>
			</view>
			<u-cell title="文章收藏" isLink url="/pages/componentsB/badge/badge">
				<u-icon slot="icon" size="28" name="plus-square-fill" color='#fad556'></u-icon>
			</u-cell>
			<u-gap height="12" bgColor="#f2f2f2"></u-gap>
			
			<u-cell title="档案管理" isLink url="/pages/my/user/patient">
				<u-icon slot="icon" size="28" name="info-circle" color='#fad556'></u-icon>
			</u-cell>
			
			<u-cell title="关于我们" isLink url="../../compoments/person/about">
				<u-icon slot="icon" size="28" name="server-man" color='#fad556'></u-icon>
			</u-cell>
			
			<view class="feedback">
				<u-icon size="28" name="bell" color='#fad556'></u-icon>
				<button open-type="feedback" class="btn">意见反馈</button>
			</view>
			
			<!-- <u-cell title="意见反馈" isLink clickable>
			<u-icon slot="icon" size="28" name="bell" color='#fad556'></u-icon>
			</u-cell> -->
			
			<view class="feedback">
				<u-icon size="28" name="kefu-ermai" color='#fad556'></u-icon>
				<button open-type="contact" class="btn">联系客服</button>
			</view>
			<!-- <u-cell title="联系客服" isLink url="/pages/componentsB/badge/badge">
				<u-icon slot="icon" size="28" name="kefu-ermai" color='#fad556' style="margin-right: 20rpx;"></u-icon>
			</u-cell> -->
			
			<u-cell title="设置" isLink url="/pages/componentsB/badge/badge">
				<u-icon slot="icon" size="28" name="setting-fill" color='#fad556'></u-icon>
			</u-cell>
		</u-cell-group>
		<view class="logout" v-if="flag" @click="logout">
			退出登录
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				name: '点击展示我的信息',
				imgUrl:'',
				flag:false
			}
		},
		methods:{
			login() {
				let _this = this;
				// 获取登录用户code
				uni.login({
					success: (res) => {
					// console.log('res',res)
						if (res.code) {
								this.wxcode = res.code
								
							} else {
								uni.showToast({
								title: '微信登录失败！',
								duration: 2000
							});
						}
					},
				});
			},
			getUser(){
				//登录授权
				var _this = this;
				this.login()
				uni.getUserProfile({
					desc: '登录',
					success: (response) => {
							console.log('response', response)
							try {
									uni.showLoading({
										title: '登录中...'
										});
									// 授权登录后，更新头像和名称
									_this.name = response.userInfo.nickName
									_this.imgUrl = response.userInfo.avatarUrl
									this.$store.commit('getLoginCode',response.signature)
									this.flag = true  // 判断登录成功
									//请求后台，成功并隐藏加载
									uni.hideLoading({})
								} catch (e) {
									uni.showToast({
										title: "微信登录失败",
										icon: "none"
									});
								}
							},
							fail: (res) => {
								uni.showToast({
								title: "您已取消授权",
								icon: "none",
								
							});
						}
					});
				
			},
			
			async go(){
				// 判断是否已登陆，如未登录，先登录后再跳转页面
				if(!uni.getStorageSync('loginCode')){
					this.getUser()
					if(this.flag){
						uni.navigateTo({
							url:'../../compoments/person/importantNews'
						})
					}
					
				}else{
					uni.navigateTo({
						url:'../../compoments/person/importantNews'
					})
				}
			},
			logout(){
				uni.removeStorageSync('loginCode')
				this.flag = false
				this.imgUrl = ''
				this.name = '点击展示我的信息'
			}
			
		}
	}
</script>

<style lang="scss">
	.avatar_content{
		display: flex;
		width: 100%;
		height: 300rpx;
		background-color: #fff;
		align-items: center;
		padding-left: 100rpx;
		.avatar{
			width: 100rpx;
			height: 100rpx;
			border-radius: 50%;
			margin-top: -10rpx;
			margin-right: 40rpx;
		}
		.message{
			display: flex;
			flex-direction: column;
			.text{
				padding-bottom: 5rpx;
				&:last-child{
					color:#999;
					font-size: 28rpx;
				}
			}
		}
		
	}
	.feedback{
		border-bottom: 2rpx solid #ebebec;
		display: flex;
		justify-content: center;
		align-items: center;
		.u-icon{
			font-size: 50rpx;
			margin-left: 30rpx;
		}
		.btn{
			text-align: start;
			line-height: 100rpx;
			width: 100%;
			height: 100rpx;
			background-color: #fff;
			font-size: 15px;
			
		}
		button::after{
			border: none;
		}
	}
	.u-cell{
		.u-icon{
			margin-right: 10px;
		}
	}
	.logout{
		display: flex;
		justify-content: center;
		font-size: 36rpx;
		color: #fb8787;
		margin: 30rpx;
	}
	
</style>