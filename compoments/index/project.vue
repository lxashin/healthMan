<template>
	<view class="moyuProject">
		<Popup :title='title' :index='index'></Popup>  
		<view class="check">
			<text>带薪摸鱼：{{sum}} 元</text>
			<view class="btn">
				<u-button text="查看记录" color="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))" size='mini'></u-button>
			</view>
		</view>
		<view class="project">
			<view class="pro" v-for="item,index in project" :key="item.id" :id="item.id" @click="setTime($event)">
				<view class="iconfont">
					<u-icon :name="item.icon" size="28"></u-icon>
				</view>
				<view class="textContent">
					<text>{{item.text}}</text>
					<text>{{item.time}} min</text>
				</view>
			</view>

		</view>
		
	</view>
</template>

<script>
	import Popup from '@/compoments/Popup/index.vue'
	import {mapState,mapGetters} from 'vuex'
	export default{
		components:{
			Popup
		},
		
		data(){
			return{
				title:'',
				index:0,
				project:[
					{
						id:0,
						icon:'info-circle-fill',
						text:'拉屎',
						time:this.$store.state.moyuObj.lashi
					},
					{
						id:1,
						icon:'coupon-fill',
						text:'吃外卖',
						time:this.$store.state.moyuObj.waimai
					},
					{
						id:2,
						icon:'level',
						text:'做核酸',
						time:this.$store.state.moyuObj.hesuan
					},
					{
						id:3,
						icon:'zhihu-circle-fill',
						text:'学习',
						time:this.$store.state.moyuObj.study
					},
					{
						id:4,
						icon:'map-fill',
						text:'闲逛',
						time:this.$store.state.moyuObj.saunter
					},
					{
						id:5,
						icon:'weixin-circle-fill',
						text:'聊天',
						time:this.$store.state.moyuObj.chat
					}
				],
				sum:0,
			}
		},
		
	
		methods:{
			setTime(e){
				if(e.currentTarget.id==0){
					this.$store.commit("updateShow",true)
					this.title='拉屎'
					this.index = 0
				}else if(e.currentTarget.id==1){
					this.$store.commit("updateShow",true)
					this.title='吃外卖'
					this.index = 1
				}else if(e.currentTarget.id==2){
					this.$store.commit("updateShow",true)
					this.title='做核酸'
					this.index = 2
				}else if(e.currentTarget.id==3){
					this.$store.commit("updateShow",true)
					this.title='学习'
					this.index = 3
				}else if(e.currentTarget.id==4){
					this.$store.commit("updateShow",true)
					this.title='闲逛'
					this.index = 4
				}else if(e.currentTarget.id==5){
					this.$store.commit("updateShow",true)
					this.title='聊天'
					this.index = 5
				}
				
				
			},
			
		},
		
		
		computed:{
			...mapState(['moyuObj','secondSalary']),
			moyuData(){
				return JSON.parse(JSON.stringify(this.moyuObj))
			},
			
			
		},
		
		watch:{
			moyuData:{
				handler(newVal,oldVal){
					if(newVal.lashi!==oldVal.lashi){
						this.project[0].time = newVal.lashi // 修改time的值引起页面变化
						// 计算摸鱼所得金额
						this.sum = ((parseInt(newVal.lashi)+parseInt(newVal.waimai)+parseInt(newVal.hesuan)+parseInt(newVal.study)+parseInt(newVal.saunter)+parseInt(newVal.chat))*60*this.secondSalary).toFixed(2)
					}else if(newVal.waimai!==oldVal.waimai){
						this.project[1].time = newVal.waimai
						this.sum = ((parseInt(newVal.lashi)+parseInt(newVal.waimai)+parseInt(newVal.hesuan)+parseInt(newVal.study)+parseInt(newVal.saunter)+parseInt(newVal.chat))*60*this.secondSalary).toFixed(2)
					}else if(newVal.hesuan!==oldVal.hesuan){
						this.project[2].time = newVal.hesuan
						this.sum = ((parseInt(newVal.lashi)+parseInt(newVal.waimai)+parseInt(newVal.hesuan)+parseInt(newVal.study)+parseInt(newVal.saunter)+parseInt(newVal.chat))*60*this.secondSalary).toFixed(2)
					}else if(newVal.study!==oldVal.study){
						this.project[3].time = newVal.study
						this.sum = ((parseInt(newVal.lashi)+parseInt(newVal.waimai)+parseInt(newVal.hesuan)+parseInt(newVal.study)+parseInt(newVal.saunter)+parseInt(newVal.chat))*60*this.secondSalary).toFixed(2)
					}else if(newVal.saunter!==oldVal.saunter){
						this.project[4].time = newVal.saunter
						this.sum = ((parseInt(newVal.lashi)+parseInt(newVal.waimai)+parseInt(newVal.hesuan)+parseInt(newVal.study)+parseInt(newVal.saunter)+parseInt(newVal.chat))*60*this.secondSalary).toFixed(2)
					}else if(newVal.chat!==oldVal.chat){
						this.project[5].time = newVal.chat
						this.sum = ((parseInt(newVal.lashi)+parseInt(newVal.waimai)+parseInt(newVal.hesuan)+parseInt(newVal.study)+parseInt(newVal.saunter)+parseInt(newVal.chat))*60*this.secondSalary).toFixed(2)
					}
				},
				deep:true
			},
			
			sum:{
				immediate:true,
				handler(newVal,oldVal){
					this.sum =isNaN(this.secondSalary)?0:((parseInt(this.$store.state.moyuObj.lashi)+parseInt(this.$store.state.moyuObj.waimai)+parseInt(this.$store.state.moyuObj.hesuan)+parseInt(this.$store.state.moyuObj.study)+parseInt(this.$store.state.moyuObj.saunter)+parseInt(this.$store.state.moyuObj.chat))*60*this.secondSalary).toFixed(2)
				}
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	.moyuProject{
		margin-top: 60rpx;
		margin-left: 30rpx;
		box-shadow: 10rpx 10rpx 10rpx 10rpx #888;
		width: 90%;
		height: 320rpx;
		
		.check{
			display: flex;
			justify-content: space-between;
			text{
				font-weight: 700;
				padding-left: 10rpx;
				
			}
			.btn{
				width: 160rpx;
				height: 10rpx;
				margin-right: 20rpx;
				margin-top: 10rpx;
			}
			
		}
		
		.project{
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
			margin-top: 40rpx;
			.pro{
				display: flex;
				width: 28%;
				height: 80rpx;
				margin-left: 20rpx;
				margin-top: 20rpx;
				border-radius: 10rpx;
				background-color: #fad556;
				.iconfont{
					padding-top: 12rpx;
					padding-left: 8rpx;
				}
				.textContent{
					display: flex;
					flex-direction: column;
					padding-left: 12rpx;
					padding-top: 6rpx;
					text{
						
						font-size: 28rpx;
					}
				}
			}
		}
		
	}
</style>