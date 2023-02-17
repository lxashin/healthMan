<template>
	<view class="consult-dep-page">
		<van-button type="primary">主要按钮</van-button>
	    <scroll-view scroll-y="true" class="nave-left" :scroll-into-view="scrollToLeft">
			<view class="scroll">
				<view
					class="goods-type"
					:class="{ isSelect: scrollToLeft === 'idx' + index }"
					v-for="(val, index) in allDep"
					:key="val.id"
					@click="scrollRight(index)"
					:id="'idx' + index"
				>
					{{ val.name }}
				</view>
			</view>
	    </scroll-view>
		<!-- 二级导航栏 -->		
		<scroll-view scroll-y="true" class="nav-right" :scroll-into-view="scrollToRight" scroll-with-animation="" @scroll="scrolling">
			<view class="scroll">
				<view class="goods-list" v-for="(val, index) in allDep" :key="val.id" :id="'id' + index">
					<view class="goods-head">{{ val.name }}</view>
					<view class="goods-body" v-for="(item, idx) in val.child" :key="item.id">{{ item.name }}</view>
				</view>
			</view>
		</scroll-view>
		
	  </view>
</template>

<script>
	export default{
		data(){
			return{
				allDep:[],
				active:0,
				scrollToRight: '',
				nodeHeight: [],
				scrollToLeft: 'idx0',
			}
		},
		methods:{
			getGoodsLsit() {
				let view = uni
					.createSelectorQuery()
					.in(this)
					.selectAll('.goods-list');
	
				view.boundingClientRect(data => {
					console.log('得到布局位置信息');
					this.nodeHeight = data;
					console.log(data);
				}).exec();
			},
			scrollRight(index) {
				this.scrollToRight = 'id' + index;
				this.scrollToLeft = 'idx' + index;
			},
			scrolling(e) {
				this.scrollLeft(Math.ceil(e.detail.scrollTop));
				console.log(e.detail);
			},
			scrollLeft(e) {
				for (let i = 2; i < this.nodeHeight.length; i++) {
					if (e > this.nodeHeight[i - 1].top && e < this.nodeHeight[i].top) {
						this.scrollToLeft = 'idx' + (i - 1);
					} else if (e > this.nodeHeight[this.nodeHeight.length - 1].top) {
						this.scrollToLeft = 'idx' + (this.nodeHeight.length - 1);
					} else if (e < this.nodeHeight[1].top) {
						this.scrollToLeft = 'idx0';
						this.scrollToRight = 'id0';
					}
					this.scrollToRight = '';
				}
			}
		},
		computed:{
			subDep(){
				return this.allDep[this.active]?.child
			}
		},
		onShow() {
			uni.request({
				url:'http://localhost:3000/consult',
				method:'GET',
				success:(res) =>{
					this.allDep = res.data.data
					console.log(this.allDep)
				}
			})
		}
	}
</script>

<style lang="scss" scoped>
	.nave-left {
		width: 187rpx;
		height: 100%;
	}
	.nav-right {
		width: 562rpx;
		height: 100%;
	}
	.scroll {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	
	.goods-type {
		width: 150rpx;
		height: 80rpx;
		box-shadow: 0px 4px 7px 1px rgba(206, 148, 5, 0.24);
		border-radius: 20px;
	
		display: flex;
		align-items: center;
		justify-content: center;
	
		font-size: 24rpx;
		font-family: Microsoft YaHei UI;
		font-weight: 400;
		color: #a1a1a1;
	}
	
	.isSelect {
		border: 2rpx solid rgb(206, 148, 5);
	}
	
	.goods-list {
		width: 500rpx;
	}
	.goods-head {
		width: 500rpx;
		height: 80rpx;
		display: flex;
		align-items: center;
	}
	.goods-body {
		width: 500rpx;
		height: 150rpx;
	
		display: flex;
		align-items: center;
	
		box-shadow: 0px 4px 7px 1px rgba(206, 148, 5, 0.24);
		border-radius: 20px;
	}
</style>