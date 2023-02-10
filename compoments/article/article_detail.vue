<template>
	<view class="article">
		<view class="title">
			文章标题
		</view>
		<view class="time">
			2023-12-02
		</view>
		<u-line color="#ccc" />
		<view class="content">
			1、第一段点明要写的事物。
			
			2、举例说明像竹子一样的人。
			
			3、举例说明像梅花一样的人。
			
			4、举例说明像蜜蜂一样的人。
			
			5、举例说明像路灯一样的人。
			
			二、文章：
			
			生活中有许多事物有着美好的品质，就像我们生活中受人敬仰爱戴的人一样。比如，竹子的品质就是不屈不挠；梅花的品质就是不畏险阻；蜜蜂的品质就是默默无闻；路灯的品质就是无私奉献。
			
			竹子的突出特点就是气节，不屈不挠“戊戌六君子”中，为变法流血的谭嗣同就是这样一个人。面对整个社会，他并未失望，他们开始了变法，虽未完成，但他相信，终会有后继之人来完成者。这未竟之业，救国于水火之中。他本可以逃的，却选择了留下，年仅33岁的谭嗣同选择了用鲜血唤醒国人。
			
			梅花的特点是铁骨铮铮，傲雪盛开，刘胡兰就是这样一个人。刘胡兰被抓住后逼供，胁迫她出场坦白。审讯中，国民党千方百计，软硬兼施，想诱使其供出同党，并相许给她土地。刘胡兰百般不从，从容就义。就像梅花一样，芬芳又绚丽，开在凌冽的寒冬。
			
			蜜蜂象征辛勤劳动的人。就比如说在街头扫地的环卫工人们，她们都很辛苦，任劳任怨地为我们打扫着身边的环境。即使有人走过来往地上扔一个纸团，她们也一声不吭的把那团纸用长长的夹子夹起来，放进垃圾桶。没有多少人会在乎她们，帮助她们一起拾垃圾，顶多会跟她们擦肩而过。她们就是这样的无私。
			
			看着路灯，不禁让人想到了老师，老师跟路灯一样帮助着我们。当我们遇到难题时，老师总会用清晰明了的解题思路让我们豁然开朗；当我们思路出现错误时，老师及时帮我们纠正错误，使我们恍然大悟。老师就像路灯一样，指引着我们前进；老师也像路灯一样，无私奉献、不求回报。
		</view>
		<view class="zan">
			<u-icon name="thumb-up" size="24"></u-icon>
			<text>0</text>
		</view>
		<view class="comment_list">
			<view class="comment_title">评论列表（0）</view>
			<view class="write_comment" @click="show=true">
					<u-icon name="edit-pen" size="28"></u-icon>
					<text>写评论</text>
			</view>
		</view>
		<u-line color="#ccc" />
		<view class="comment">
			<!-- <view class="no_data">
				暂无数据
			</view> -->
			<view class="comment_item">
				<view class="avatar">
					<image src="../../static/image/avatar.jpg" mode="widthFix"></image>
				</view>
				<view class="container">
					<view class="name">
						ashin
					</view>
					<view class="time">
						2022-12-26 03:30:06
						<u-icon name="chat" size="22" @click="open"></u-icon>
					</view>
					<view class="content">
						评论内容
						评论内容
						评论内容
					</view>
					
				</view>
			</view>
			<u-line color="#ccc" />
			<view class="comment_item">
				<view class="avatar">
					<image src="../../static/image/avatar.jpg" mode="heightFix"></image>
				</view>
				<view class="container">
					<view class="name">
						ashin
					</view>
					<view class="time">
						2022-12-26 03:30:06
						<u-icon name="chat" size="22" @click="open"></u-icon>
					</view>
					<view class="content">
						评论内容
						评论内容
						评论内容
					</view>
					
				</view>
			</view>
			<u-line color="#ccc" />
			<view class="comment_item">
				<view class="avatar">
					<image src="../../static/image/avatar.jpg" mode="heightFix"></image>
				</view>
				<view class="container">
					<view class="name">
						ashin
					</view>
					<view class="time">
						2022-12-26 03:30:06
						<u-icon name="chat" size="22" @click="open"></u-icon>
					</view>
					<view class="content">
						评论内容
						评论内容
						评论内容
					</view>
					
				</view>
			</view>
		</view>
	
	<!-- 写评论弹窗 -->
	<u-modal :show="show" :title-style="{color: 'red'}" @confirm="confirm" @cancel="cancel" confirmText="提交" confirmColor="rgb(45,195,182)" showCancelButton cancelText="关闭">
			<view class="content">
				<editor class="richInputContent" id="editor" @input="getEditorContent" @ready="onEditorReady" placeholder="请输入您的评论"></editor>
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
				reply:"",
			}
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
			margin-bottom: 10rpx;
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
					background: red;
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