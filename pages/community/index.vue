<template>
	<view class="community">
		<view class="search">
			<u-search placeholder="请输入搜索内容" v-model="keyword"></u-search>
		</view>
		<view class="tabs">
			<u-tabs
			        :list="list"
			        lineWidth="30"
			        lineColor="#fad556"
			        :activeStyle="{
			            color: '#303133',
			            fontWeight: 'bold',
			            transform: 'scale(1.05)'
			        }"
			        :inactiveStyle="{
			            color: '#606266',
			            transform: 'scale(1)'
			        }"
			        itemStyle="padding-left: 160rpx; padding-right: 160rpx; height: 68rpx;"
					@click="select"
			    >
			    </u-tabs>
		</view>
		<view class="main" v-if="flag===0">
			<view class="u-page">
			    <view class="u-demo-block">
			      <view class="u-demo-block__content">
			        <view class="album">
			          <view class="album__avatar">
			            <image
			              src="/static/uview/common/logo.png"
			              mode=""
			              style="width: 32px;height: 32px;"
			            ></image>
			          </view>
			          <view class="album__content">
			            <u--text
			              text="ashin"
			              type="primary"
			              bold
			              size="17"
			            ></u--text>
			            <u--text
			              margin="0 0 8px 0"
			              text="全面的组件和便捷的工具会让您信手拈来，如鱼得水"
			            ></u--text>
			            <u-album :urls="urls"></u-album>
			          </view>
			        </view>
			      </view>
				  <view class="icon">
				  	<u-icon name="chat" color="#8d8d8d" size="22"></u-icon>
					<text> 1 </text>
				  	<u-icon name="heart" color="#8d8d8d" size="22"></u-icon>
					<text> 5 </text>
				  </view>
			    </view>
			  </view>
			<view class="u-page">
			    <view class="u-demo-block">
			      <view class="u-demo-block__content">
			        <view class="album">
			          <view class="album__avatar">
			            <image
			              src="/static/uview/common/logo.png"
			              mode=""
			              style="width: 32px;height: 32px;"
			            ></image>
			          </view>
			          <view class="album__content">
			            <u--text
			              text="tony"
			              type="primary"
			              bold
			              size="17"
			            ></u--text>
			            <u--text
			              margin="0 0 8px 0"
			              text="全面的组件和便捷的工具会让您信手拈来，如鱼得水"
			            ></u--text>
			            <u-album :urls="urls"></u-album>
			          </view>
			        </view>
			      </view>
				  <view class="icon">
				  	<u-icon name="chat" color="#8d8d8d" size="22"></u-icon>
					<text> 1 </text>
				  	<u-icon name="heart" color="#8d8d8d" size="22"></u-icon>
					<text> 5 </text>
				  </view>
			    </view>
			  </view>
			<view class="u-page">
			    <view class="u-demo-block">
			      <view class="u-demo-block__content">
			        <view class="album">
			          <view class="album__avatar">
			            <image
			              src="/static/uview/common/logo.png"
			              mode=""
			              style="width: 32px;height: 32px;"
			            ></image>
			          </view>
			          <view class="album__content">
			            <u--text
			              text="jack"
			              type="primary"
			              bold
			              size="17"
			            ></u--text>
			            <u--text
			              margin="0 0 8px 0"
			              text="全面的组件和便捷的工具会让您信手拈来，如鱼得水"
			            ></u--text>
			            <u-album :urls="urls"></u-album>
			          </view>
			        </view>
			      </view>
				  <view class="icon">
				  	<u-icon name="chat" color="#8d8d8d" size="22"></u-icon>
					<text> 1 </text>
				  	<u-icon name="heart" color="#8d8d8d" size="22"></u-icon>
					<text> 5 </text>
				  </view>
			    </view>
			  </view>
		</view>
		<view class="main2" v-if="flag===1">
			<view class="question_item">
				<view class="user">
					<view class="avatar">
						<image src="../../static/image/avatar.jpg" mode="widthFix"></image>
					</view>
					<view class="username">
						ashin
					</view>
				</view>
				<view class="title">
					乌克兰和俄罗斯谁会赢得最终的胜利？
				</view>
				<view class="content">
					俄罗斯将会是最后的赢家，这个问题答案显而易见。其实讨论战争正义与否意义不大。因为胜利者永远是正义的。
					
					乌克兰目前的情况是靠欧盟，美国不断输血提供装备和资金才得以维持。也就是说，乌克兰只出人。乌克兰战争什么结束是西方说的算。而，美国不可能大规模出兵乌克兰和俄罗斯对抗。因为世界主导权还在美国手里。乌克兰不是北约成员。就像你是老大，为了一个没正式收下的马仔会搞得自己一身伤病吗？乌克兰和俄罗斯的国力差距是巨大的。乌克兰对于俄罗斯相当于朝鲜对于中国。俄罗斯不可能接受美国把军队放到乌克兰，就像中国不可能允许美国驻军到鸭绿江边。俄罗斯是可以在乌克兰战场上梭哈的，美国不会。单靠乌克兰自己以及西方支援是打不过俄罗斯的。只是俄罗斯不想把全部精力投送到乌克兰战场上，因为他需要保存大部分潜力应对北约，美国只会看这场战争能把俄罗斯削弱到什么程度。但目前为止美国没事。欧洲却明显耗不起了。所以现在摆在美国目前的问题是，耗干欧洲这个手底下最大的马仔以达到彻底削弱俄罗斯这个威胁值不值得。欧洲被耗干意味着，美国在面对下场比赛中只能用的日韩澳这些来消耗中国，但明显他们三个加美国就算把中国打败了，美国所有的盟友也死光了。并且美国自己也会元气大伤，到最后最可能便宜的国家反而是印度，土耳其这些二流大国。俄罗斯和欧盟可能会缓过来。最后结果是韩，日，澳彻底断气，中国被打回改革开放前的状态。美国元气大伤，导致自己变成二战后英国的状态。所以美国想不损失太大情况下打赢中国这场消耗战，必须保留欧洲这个最大的马仔性命。那这样，就明显达不到一劳永逸彻底削弱俄罗斯的问题的目的。但相对彻底削弱俄罗斯而言。还是保住美国目前的地位更重要。因为在牺牲欧洲以后，削弱俄罗斯以后，美国鹰派也会止不住的把美国往和中国对抗的决赛场上带。你觉得美国内心想成为第二个英国吗？
				</view>
				<view class="answer">
					<view class="left_text">
						<text>9.5k</text>人参与回答
					</view>
					<view class="hot">
						<u-icon name="bell-fill" color="rgb(255,161,44)" size="20"></u-icon>
						问答热榜 TOP2
					</view>
				</view>
			</view>
			<u-line color="#2979ff"></u-line>
			<view class="question_item">
				<view class="user">
					<view class="avatar">
						<image src="../../static/image/avatar.jpg" mode="widthFix"></image>
					</view>
					<view class="username">
						ashin
					</view>
				</view>
				<view class="title">
					乌克兰和俄罗斯谁会赢得最终的胜利？
				</view>
				<view class="content">
					俄罗斯将会是最后的赢家，这个问题答案显而易见。其实讨论战争正义与否意义不大。因为胜利者永远是正义的。
					
					乌克兰目前的情况是靠欧盟，美国不断输血提供装备和资金才得以维持。也就是说，乌克兰只出人。乌克兰战争什么结束是西方说的算。而，美国不可能大规模出兵乌克兰和俄罗斯对抗。因为世界主导权还在美国手里。乌克兰不是北约成员。就像你是老大，为了一个没正式收下的马仔会搞得自己一身伤病吗？乌克兰和俄罗斯的国力差距是巨大的。乌克兰对于俄罗斯相当于朝鲜对于中国。俄罗斯不可能接受美国把军队放到乌克兰，就像中国不可能允许美国驻军到鸭绿江边。俄罗斯是可以在乌克兰战场上梭哈的，美国不会。单靠乌克兰自己以及西方支援是打不过俄罗斯的。只是俄罗斯不想把全部精力投送到乌克兰战场上，因为他需要保存大部分潜力应对北约，美国只会看这场战争能把俄罗斯削弱到什么程度。但目前为止美国没事。欧洲却明显耗不起了。所以现在摆在美国目前的问题是，耗干欧洲这个手底下最大的马仔以达到彻底削弱俄罗斯这个威胁值不值得。欧洲被耗干意味着，美国在面对下场比赛中只能用的日韩澳这些来消耗中国，但明显他们三个加美国就算把中国打败了，美国所有的盟友也死光了。并且美国自己也会元气大伤，到最后最可能便宜的国家反而是印度，土耳其这些二流大国。俄罗斯和欧盟可能会缓过来。最后结果是韩，日，澳彻底断气，中国被打回改革开放前的状态。美国元气大伤，导致自己变成二战后英国的状态。所以美国想不损失太大情况下打赢中国这场消耗战，必须保留欧洲这个最大的马仔性命。那这样，就明显达不到一劳永逸彻底削弱俄罗斯的问题的目的。但相对彻底削弱俄罗斯而言。还是保住美国目前的地位更重要。因为在牺牲欧洲以后，削弱俄罗斯以后，美国鹰派也会止不住的把美国往和中国对抗的决赛场上带。你觉得美国内心想成为第二个英国吗？
				</view>
				<view class="answer">
					<view class="left_text">
						<text>9.5k</text>人参与回答
					</view>
					<view class="hot">
						<u-icon name="bell-fill" color="rgb(255,161,44)" size="20"></u-icon>
						问答热榜 TOP2
					</view>
				</view>
			</view>
		</view>
		<view class="publish" @click="show=true">
			<u-icon name="camera" color="#000" size="46" ></u-icon>
			<u-icon name="edit-pen" color="#000" size="30" class="pen"></u-icon>
		</view>
			<u-popup :show="show" mode="bottom" @close="show=false">
					<view class="container">
					    <view @click="post">动态</view>
						<view @click="question">提问</view>
					</view>
				</u-popup>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				keyword:'',
				list:[
					{name:'动态'},
					{name:'问答'}
				],
				urls: [
				        'https://cdn.uviewui.com/uview/album/1.jpg',
				        'https://cdn.uviewui.com/uview/album/2.jpg',
				        'https://cdn.uviewui.com/uview/album/3.jpg',
				        'https://cdn.uviewui.com/uview/album/4.jpg',
				        'https://cdn.uviewui.com/uview/album/5.jpg',
				        'https://cdn.uviewui.com/uview/album/6.jpg',
				        'https://cdn.uviewui.com/uview/album/7.jpg',
				        'https://cdn.uviewui.com/uview/album/8.jpg',
				        'https://cdn.uviewui.com/uview/album/9.jpg',
				        'https://cdn.uviewui.com/uview/album/10.jpg',
				            ],
				flag:0, // 0:动态，1:问答
				show:false,
			}
		},
		methods:{
			select(item){
				this.flag = item.index
			},
			post(){
				uni.navigateTo({
					url:'/compoments/community/post'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tabs{
		margin-top: 60rpx;
	}
	.main{
		margin-top: 40rpx;
		.u-page{
			margin-bottom: 60rpx;
			.icon{
				display: flex;
				justify-content: flex-end;
				padding: 20rpx;
				.u-icon{
					margin-left: 20rpx;
				}
				text{
					color: #8d8d8d;
					font-size: 32rpx;
					padding-left: 10rpx
				}
			}
		}
	}
	.main2{
		margin-left: 30rpx;
		width: 90%;
		.question_item{
			height: 400rpx;
			margin: 40rpx 0;
			.user{
				display: flex;
				align-items: center;
				margin-bottom: 20rpx;
				.avatar{
					width: 80rpx;
					height: 80rpx;
					border-radius: 50%;
					margin-right: 20rpx;
					image{
						width: 100%;
						height: 100%;
						border-radius: 50%;
					}
				}
				.username{}
			}
			.title{
				font-size: 40rpx;
				font-weight: 700;
			}
			.content{
				font-size: 34rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 3;
				-webkit-box-orient: vertical;
				height: 130rpx;
			}
			.answer{
				display: flex;
				justify-content: space-around;
				font-size: 20rpx;
				margin-top: 20rpx;
				.left_text{
					margin-top: 10rpx;
					text{
						font-weight: 700;
					}
				}
				
				.hot{
					width: 300rpx;
					height: 50rpx;
					border: #8d8d8d;
					border-radius: 20rpx;
					color: rgb(255,161,44);
					background-color: rgb(255,242,229);
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}
		}
	}
	.publish{
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		bottom: 300rpx;
		right: 50rpx;
		width: 150rpx;
		height: 150rpx;
		border: 4rpx solid #fad556;
		background-color: #fad556;
		opacity: .7;
		border-radius: 50%;
		.pen{
			margin-top: 6rpx;
		}
	}
	.album {
	        @include flex;
	        align-items: flex-start;
	
	        &__avatar {
	             background-color: $u-bg-color;
	             padding: 10rpx;
	             border-radius: 6rpx;
	         }
	    
	        &__content {
	             margin-left: 20rpx;
	             flex: 1;
	         }
	    }
		.u-popup{
			opacity: 0.5;
			.container{
				height: 400rpx;
				display: flex;
				justify-content: space-around;
				align-items: center;
				background-color: #fad556;
				border-radius: 20rpx;
				view{
					display: flex;
					justify-content: center;
					align-items: center;
					font-weight: 800;
					width: 200rpx;
					height: 70rpx;
					font-size: 40rpx;
					color: #000;
					border: 2rpx solid #fff;
					border-radius: 40rpx;
					background-color: #00aaff;
				}
			}
		} 
		
</style>