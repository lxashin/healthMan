<template>
	<view class="article">
		<view class="title">
			{{articleData.title}}
		</view>
		<view class="time">
			{{articleData.createTime}}
		</view>
		<u-line color="#ccc" />
		<view class="content" v-html="articleData.content"></view>
		<view class="zan" @click="getStar(articleData)">
			<u-icon v-if="!articleData.islike" name="thumb-up" size="24"></u-icon>
			<u-icon v-else name="thumb-up-fill" color="red" size="24"></u-icon>
			<text>{{articleData.star}}</text>
			
		</view>
		<view class="comment_list">
			<view class="comment_title">评论列表（{{commentData.length}}）</view>
			<view class="write_comment" @click="show=true">
					<u-icon name="edit-pen" size="28"></u-icon>
					<text>写评论</text>
			</view>
		</view>
		<u-line color="#ccc" />
		<view class="comment">
			<view class="no_data" v-if="articleData.length==0">
				暂无数据
			</view>
			<view class="comment_item" v-else v-for="comment in commentData" key="comment._id">
				<view class="avatar">
					<image :src="comment.avatar"></image>
				</view>
				<view class="container">
					<view class="name">
						{{comment.userName}}
					</view>
					<view class="time">
						{{comment.createTime}}
						<u-icon name="chat" size="22" @click="open"></u-icon>
					</view>
					<view class="content">
						{{comment.content}}
					</view>
					
				</view>
			</view>
			<u-line color="#ccc" />
			
		</view>
	
	<!-- 写评论弹窗 -->
	<u-modal :show="show" :title-style="{color: 'red'}" @confirm="confirm" @cancel="cancel" confirmText="提交" confirmColor="rgb(45,195,182)" showCancelButton cancelText="关闭">
			<view class="content">
				<editor class="richInputContent" id="editor" v-model="content" placeholder="请输入您的评论"></editor>
			</view>
	</u-modal>
	<!-- 回复评论 -->
	<u-popup :show="setPopup" mode="bottom" @close="close" @open="open" safeAreaInsetBottom>
		<view class="pop">
			<input type="text" :focus="setFocus" v-model="reply" placeholder="请输入内容...">
			<button type="default" @click="send">发送</button>
		</view>
	</u-popup>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				show:false, // 写评论弹出框
				setFocus:false, // 回复评论键盘弹起
				setPopup:false, // 回复评论弹出
				content:"",
				reply:"",
				articleData:{},
				commentData:[],
				id:null
			}
		},
			onLoad() {
			this.getArticleData()
		},
		methods:{
			confirm(){
				this.show = false
			},
			cancel(){
				this.show = false
			},
			open() {
				this.setPopup = true
			},
			close() {
				this.setPopup = false
			},
			async getStar(item){
				// 点赞
				await this.$api.like(item.id)
				this.getArticleData()
			},
			// 获取文章数据
			async getArticleData(){
				// 兼容小程序，需要获取完整路径，如果直接使用this.$router.query.id在小程序中无法获取
				let pages = getCurrentPages()
				let page = pages[pages.length - 1].$page.fullPath
				this.id = page.split('id=')[1]
				let res = await this.$api.getArticleById(this.id)
				this.articleData = res.res
				let res2 = await this.$api.getArticleComment(this.id)
				this.commentData = res2.res
			},
			send(){
				if(this.reply==''){
					uni.showToast({
						title:"内容不能为空",
						duration:2000,
						icon:'none'
					})
				}else{
					this.reply = ""
					this.close()
					this.setFocus = false
				}
			},
			// 发表评论
			async confirm() {
				let comment = {
					articleId:Number(this.id),
					userName:this.$store.state.User.userName,
					avatar:this.$store.state.User.avatar,
					content:this.content.detail.text,
				}
				await this.$api.addComment(comment)
				this.getArticleData()
				this.show = false
			}
		}
	}
</script>

<style lang="scss" scoped>
	.article{
		margin-left: 30rpx;
		width: 90%;
		.title{
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 40rpx;
			font-weight: 800;
		}
		.time{
			font-size: 22rpx;
			color: rgb(127, 127, 127);
			margin: 20rpx 0;
		}
		.content{
			font-size: 30rpx;
			font-weight: 500;
			margin-top: 40rpx;
			editor{
				padding: 30rpx;
			}
		}
		.zan{
			display: flex;
			position: relative;
			left: 90%;
			text{
				display: flex;
				align-items: center;
			}
		}
		.comment_list{
			display: flex;
			justify-content: space-between;
			margin-top: 40rpx;
			margin-bottom: 10rpx;
			.comment_title{
				display: flex;
				align-items: center;
				margin-top: -8rpx;
			}
			.write_comment{
				display: flex;
				align-items: center;
				width: 180rpx;
				height: 60rpx;
				border: 1px solid #ccc;
				border-radius: 20rpx;
				text{
					margin-top: -8rpx;
				}
			}
		}
		.comment{
			margin: 40rpx 0;
			.no_data{
				display: flex;
				justify-content: center;
				align-items: center;
			}
			.comment_item{
				display: flex;
				margin: 30rpx 0;
				.avatar{
					width: 100rpx;
					height: 100rpx;
					border-radius: 50%;
					margin-right: 30rpx;
					image{
						border-radius: 50%;
						width: 100%;
						height: 100%;
					}
				}
				.container{
					margin-left: 20rpx;
					flex: 1;
					.time{
						display: flex;
						justify-content: space-between;
						align-items: center;
					}
					.content{
						margin-top: 10rpx;
					}
				}
			}
		}
		.u-modal{
			.content{
				width: 100%;
				border: 2rpx solid #ccc;
				border-radius: 20rpx;
			}
		}
		.pop{
			 width: 750rpx;height:100rpx;background-color: #FFFFFF;
			 display: flex;
			 padding: 20rpx;
			 box-sizing: border-box;
		}
		.pop button{
			font-size: 24rpx;height: 60rpx;margin-left: 10rpx;width:120rpx;
		}
		.pop input{
			width: 600rpx;height: 60rpx;border: 1rpx solid #999999;
			padding: 0 10rpx;
			margin-bottom: 20rpx;
			box-sizing: border-box;
		}
	}
	
</style>