<template>
	<view class="healthy_page">
		<view class="health_item" v-for="item in project" :key="item.id" @click="select(item)">
			<view class="icon">
				<view :class="['t-icon',item.icon]"></view>
			</view>
			<view class="content">
				{{item.content}}
			</view>
		</view>
		
		
	</view>
</template>

<script>
	export default{
		data(){
			return {
				project:[
					{
						id:0,
						icon:'t-icon-richangtijian',
						content:'每日检测'
					},
					{
						id:1,
						icon:'t-icon-xinlijiankang',
						content:'心理检测'
					},
					{
						id:2,
						icon:'t-icon-yuan_wuzi',
						content:'急速问诊',
						url:'/pages/consult/consultfast'
					},
					{
						id:3,
						icon:'t-icon-yisheng',
						content:'咨询医生'
					},
					{
						id:4,
						icon:'t-icon-tijian',
						content:'体检知识'
					},
					{
						id:5,
						icon:'t-icon-zhongyi',
						content:'中医养生'
					},
					{
						id:6,
						icon:'t-icon-yaopinshuomingshu',
						content:'药品知识'
					},
					{
						id:7,
						icon:'t-icon-zhuanjiajiangzuo',
						content:'专家讲座'
					},
				]
			}
		},
		methods:{
			select(item){
				console.log(111)
				let {url} = item
				uni.navigateTo({
					url
				})
			}
		}
	}
</script>

<style lang="scss">
	.healthy_page{
		display: flex;
		justify-content: space-between;
		align-content: flex-start;
		flex-wrap: wrap;
		.health_item{
			display: flex;
			flex-direction: column;
			width: 25%;
			margin-bottom: 30rpx;
			margin-top: 20rpx;
			.icon{
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
				display: flex;
				.t-icon{
					width: 100rpx;
					height: 100rpx;
				}
			}
			.content{
				margin-top: 20rpx;
				font-size: 30rpx;
				font-weight: 700;
				
			}
		}
		
	}
</style>