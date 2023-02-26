<template>
	<view class="consult-dep-page">
		<!-- 导航栏 -->		
		<scroll-view scroll-y="true" class="nav_left" :scroll-into-view="scrollToRight" scroll-with-animation="" @scroll="scrolling">
				<view class="goods_list" v-for="(val, index) in allDep" :key="val.id" :class="{'active':index==id}" @click="id=index">
					<view class="goods_head" >{{ val.name }}</view>
				</view>
		</scroll-view>
		<scroll-view scroll-y="true" class="nav_right" :scroll-into-view="scrollToRight" scroll-with-animation="" @scroll="scrolling">
				<view class="goods_list" v-for="(val, index) in allDep[id].child" :key="val.id" @click="goIllness">{{val.name}}</view>
		</scroll-view>
	  </view>
</template>

<script>
import { Comment } from 'vue'
	import {getConsultList} from '../../common/api'
	export default{
		data(){
			return{
				allDep:[],
				active:0,
				scrollToRight: '',
				nodeHeight: [],
				scrollToLeft: 'idx0',
				id:2
			}
		},
		methods:{
			goIllness(){
				uni.navigateTo({
					url:'/pages/consult/consultIllness'
				})
			}
			
		},
		computed:{},
		async onShow() {
			// 获取科室列表
			const res = await this.$api.getConsultList()
			this.allDep = res.data
		}
	}
</script>

<style lang="scss" scoped>
.consult-dep-page{
	display: flex;
	.nav_left {
		overflow-y: scroll;
		overflow-x: hidden;
		// flex: 1;
		width: 30%;
		// height: 100%;
		display: flex;
		// padding: 0 30rpx;
		.goods_list{
			display: flex;
			padding: 0 30rpx;
			background-color: rgb(247,248,259);
			.goods_head{
				margin-top: 40rpx;
			}
		}
	}
	.nav_right{
		flex: 2;
		.goods_list{
			display: flex;
			margin: 30rpx;
		}
	}
	.active{
		background-color: red;
		color: red;
	}
}

	
	
</style>