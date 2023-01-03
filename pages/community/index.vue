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
			              text="uView UI"
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
		<view class="" v-if="flag===1">
			222
		</view>
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
			}
		},
		methods:{
			select(item){
				this.flag = item.index
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
</style>