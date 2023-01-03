<template>
	<view class="helps">
		<view class="header">
			<view class="needMedicine">
				<image src="/static/image/yao-2.png" mode="widthFix"></image>
				<view class="title">
					<text>我需要药</text>
					<text>填写求助信息</text>
				</view>
				
			</view>
			<view class="haveMedicine">
				<image src="/static/image/yaowu.png" mode="widthFix"></image>
				<view class="title">
					<text>我有多的药</text>
					<text>填写帮助信息</text>
				</view>
			</view>
		</view>
		<view>
		      <u-notice-bar :text="notice_text"></u-notice-bar>
		    </view>
		
		<view class="main">
			<view class="main_title">
				信息广场
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
				        itemStyle="padding-left: 100rpx; padding-right: 100rpx; height: 100rpx;"
						@click="selectHelp"
				    >
				    </u-tabs>
			</view>
		<view class="selector">
			<view @click="showSort=true">按{{sort===0?'附近':'时间'}}排序 <u-icon name="arrow-down" size="12"></u-icon></view>
			<view @click="showPersonType=true"><text>{{personText.length==0?'特殊人群':personText}}</text> <u-icon name="arrow-down" size="12"></u-icon></view>
			<view @click="showGoodsType=true"><text>所需物品</text> <u-icon name="arrow-down" size="12"></u-icon></view>
			<view @click="showResolveStatu=true">{{statu===0?'解决状态':statu===1?'未解决':'已解决'}} <u-icon name="arrow-down" size="12"></u-icon></view>
		</view>
		<!-- 求助信息 -->
		<view class="infomation" v-if="help===0">
			<view class="info_item">
				<view class="header">
					<p>需要 <text>退烧药</text></p>
					<u-icon name="more-dot-fill" @click="showShare=true"></u-icon>
				</view>
				<view class="container">
					<view class="timeAndDistance">
						<text class="time">2022-12-29 08:11 发布</text>
						<text class="distance">距离：1公里</text>
					</view>
					<view class="location">
						<view>位置</view>
						<view class="address">
							【沙河街道】 广东省南山区白石街55号南山区白石洲
						</view>
					</view>
					<view class="description">
						<view>
							描述
						</view>
						<view>
							<view class="btn">
								<u-button type="info" shape="circle" size="small" text="有痰"></u-button>
								<u-button type="info" shape="circle" size="small" text="发烧"></u-button>
								<u-button type="info" shape="circle" size="small" text="咳嗽"></u-button>
								
							</view>
							<view class="content">
								我与孩子都生病了，一直咳嗽，需要药我与孩子都生病了，一直咳嗽，需要药我与孩子都生病了，一直咳嗽，需要药
							</view>
						</view>
						
					</view>
				</view>
				<view class="provideHelp">
					<u-button text="我可以提供帮助" color="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))"></u-button>
				</view>
				<u-line></u-line>
			</view>
			
			<view class="info_item">
					<view class="header">
						<p>需要 <text>退烧药</text></p>
						<u-icon name="more-dot-fill"></u-icon>
					</view>
					<view class="container">
						<view class="timeAndDistance">
							<text class="time">2022-12-29 08:11 发布</text>
							<text class="distance">距离：1公里</text>
						</view>
						<view class="location">
							<view>位置</view>
							<view class="address">
								【沙河街道】 广东省南山区白石街55号南山区白石洲
							</view>
						</view>
						<view class="description">
							<view>
								描述
							</view>
							<view>
								<view class="btn">
									<u-button type="info" shape="circle" size="small" text="有痰"></u-button>
									<u-button type="info" shape="circle" size="small" text="发烧"></u-button>
									<u-button type="info" shape="circle" size="small" text="咳嗽"></u-button>
									
								</view>
								<view class="content">
									我与孩子都生病了，一直咳嗽，需要药我与孩子都生病了，一直咳嗽，需要药我与孩子都生病了，一直咳嗽，需要药
								</view>
							</view>
							
						</view>
					</view>
					<view class="provideHelp">
						<u-button text="我可以提供帮助" color="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))"></u-button>
					</view>
					<u-line></u-line>
				</view>
			
			<view class="info_item">
					<view class="header">
						<p>需要 <text>退烧药</text></p>
						<u-icon name="more-dot-fill"></u-icon>
					</view>
					<view class="container">
						<view class="timeAndDistance">
							<text class="time">2022-12-29 08:11 发布</text>
							<text class="distance">距离：1公里</text>
						</view>
						<view class="location">
							<view>位置</view>
							<view class="address">
								【沙河街道】 广东省南山区白石街55号南山区白石洲
							</view>
						</view>
						<view class="description">
							<view>
								描述
							</view>
							<view>
								<view class="btn">
									<u-button type="info" shape="circle" size="small" text="有痰"></u-button>
									<u-button type="info" shape="circle" size="small" text="发烧"></u-button>
									<u-button type="info" shape="circle" size="small" text="咳嗽"></u-button>
									
								</view>
								<view class="content">
									我与孩子都生病了，一直咳嗽，需要药我与孩子都生病了，一直咳嗽，需要药我与孩子都生病了，一直咳嗽，需要药
								</view>
							</view>
							
						</view>
					</view>
					<view class="provideHelp">
						<u-button text="我可以提供帮助" color="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))"></u-button>
					</view>
					<u-line></u-line>
				</view>
			
		</view>
		<!-- 帮助信息 -->
		<view class="infomation" v-if="help===1">
			<view class="info_item">
				<view class="header">
					<p>提供 <text class="green">退烧药</text></p>
					<u-icon name="more-dot-fill" @click="showShare=true"></u-icon>
				</view>
				<view class="container">
					<view class="timeAndDistance">
						<text class="time">2022-12-29 08:11 发布</text>
						<text class="distance">距离：1公里</text>
					</view>
					<view class="location">
						<view>位置</view>
						<view class="address">
							【沙河街道】 广东省南山区白石街55号南山区白石洲
						</view>
					</view>
					<view class="origin">
						<view>
							来源
						</view>
						<view>
							药店
						</view>
					</view>
					<view class="description">
						<view>
							描述
						</view>
						
							<view class="content">
								有多余的需要的请联系
							</view>
						
						
					</view>
				</view>
				<view class="provideHelp">
					<u-button text="我需要帮助" color="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))"></u-button>
				</view>
				<u-line></u-line>
			</view>
			
		</view>
		</view>
		<!-- 点击排序显示的遮罩层弹框 -->
		<u-overlay :show="showSort" @click="showSort = false">
			<view class="wrap">
				<view class="rect">
					<view class="distance" @click="sort=0" :class="{'active':sort==0}">
						按附近排序
					</view>
					<view class="time" @click="sort=1" :class="{'active':sort==1}">
						按时间排序
					</view>
				</view>
			</view>
		</u-overlay>
		<u-overlay :show="showPersonType" @click="showPersonType = false">
			<view class="wrap2">
				<view class="rect">
					<view class="distance">
						<view class="item" @click.stop="selectPerson(index)" :class="{'active':PersonType.indexOf(index)>-1}" v-for="(item,index) in personList" :key="index">
							{{item}}
						</view>
					</view>
					
					<view class="selected_btn" @click="showPersonType = false">
						<view class="btn1" @click="reset">
							重置
						</view>
						<view class="btn2">
							选好了
						</view>
					</view>
				</view>
			</view>
		</u-overlay>
		<u-overlay :show="showGoodsType" @click="showGoodsType = false">
			<view class="wrap3">
				<view class="rect">
					<p>选择物品</p>
					<p>药物</p>
					<view>
					        <u-checkbox-group
					            v-model="medicineValue"
					            placement="column"
					            @change="medicineChange"
					        >
					            <u-checkbox
					                :customStyle="{marginBottom: '16rpx'}"
					                v-for="(item, index) in goodsList.medicineList"
					                :key="index"
					                :label="item.name"
					                :name="item.name"
					            >
					            </u-checkbox>
					        </u-checkbox-group>
					    </view>
						<u-line></u-line>
					<p>办公用品</p>
					<view>
					        <u-checkbox-group
					            v-model="stationery"
					            placement="column"
					            @change="stationeryChange"
					        >
					            <u-checkbox
					                :customStyle="{marginBottom: '8px'}"
					                v-for="(item, index) in goodsList.stationeryList"
					                :key="index"
					                :label="item.name"
					                :name="item.name"
					            >
					            </u-checkbox>
					        </u-checkbox-group>
					    </view>
						<u-line></u-line>
					<p>防疫物品</p>
					<view>
					        <u-checkbox-group
					            v-model="COVIDGoods"
					            placement="column"
					            @change="COVIDGoodsChange"
					        >
					            <u-checkbox
					                :customStyle="{marginBottom: '8px'}"
					                v-for="(item, index) in goodsList.COVIDGoodsList"
					                :key="index"
					                :label="item.name"
					                :name="item.name"
					            >
					            </u-checkbox>
					        </u-checkbox-group>
					    </view>
						<view class="btn">
							<u-button type="info" text="取消" style="width:350rpx" @click="cancel"></u-button>
							<u-button type="success" text="选好了" style="width:350rpx" @click="confirm"></u-button>
						</view>
						
				</view>
			</view>
		</u-overlay>
		<u-overlay :show="showResolveStatu" @click="showResolveStatu = false">
			<view class="wrap4">
				<view class="rect">
					<view class="resolve" @click="statu=0" :class="{'active':statu==0}">
						全部
					</view>
					<view class="resolve" @click="statu=1" :class="{'active':statu==1}">
						未解决
					</view>
					<view class="resolve" @click="statu=2" :class="{'active':statu==2}">
						已解决
					</view>
				</view>
			</view>
		</u-overlay>
	<u-popup :show="showShare" :round="10" mode="bottom" @close="showShare=false">
			<view class="container">
	            <view>转发</view>
				<u-line color="#2979ff"></u-line>
				<view>举报</view>
				<u-line dashed></u-line>
				<view @click="showShare=false">取消</view>
			</view>
		</u-popup>
	
	</view>
</template>

<script>
	export default{
		data(){
			return {
				notice_text:'公益服务禁止买卖',
				list:[
					{name:'求助信息'},
					{name:'帮助信息'}
				],
				help:0, // 0:求助信息 1:帮助信息
				personList:['老人','孕妇','儿童','残障人士'],
				showSort:false,
				showPersonType:false,
				showGoodsType:false,
				showResolveStatu:false,
				sort:0, // 0:按附近排序，1:按时间排序
				PersonType:[], // 0:老人，1:孕妇 2:儿童 3:残障人士
				goodsType:[0], // 0:所需物品 1:药 2:食物
				resolveStatu:0, //0:全部 1:未解决 2:已解决
				personText:'', // 显示特殊人群还是老人儿童等，用来监听
				goodsText:'',// 显示所需物品，用来监听文字变化
				medicineValue:[], // 选择的药物
				stationery:[], // 办公用品
				COVIDGoods:[], // 新冠物资
				goodsList:{
					medicineList: [{
					                    name: '退烧药',
					                    disabled: false
					                },
					                {
					                    name: '止咳药',
					                    disabled: false
					                },
					                {
					                    name: '感冒药',
					                    disabled: false
					                }
					            ],
					stationeryList:[{
						                    name: '圆珠笔',
						                    disabled: false
						                },
						                {
						                    name: '笔记本',
						                    disabled: false
						                },
						                {
						                    name: '便利贴',
						                    disabled: false
						                }
						            ],
					COVIDGoodsList:[{
						                    name: '抗原2支',
						                    disabled: false
						                },
						                {
						                    name: '退热贴',
						                    disabled: false
						                },
						                {
						                    name: '体温计',
						                    disabled: false
						                }
						            ],
				},
			statu:0, // 0:全部 1:未解决 2:已解决
			showShare:false, // 点击... 显示分享或举报按钮
			}
		},
		methods:{
			close(){
				this.show = false
			},
			open(){
				this.show = true
			},
			selectHelp(item){
				this.help = item.index
			},
			selectPerson(index){
				this.showPersonType = true
				// 如果存在则在数组PersonType中删除该序号
				let ind = this.PersonType.indexOf(index)
				if(ind>-1){
					this.PersonType.splice(ind,1)
				}else{
					this.PersonType.push(index)
				}
				console.log(this.PersonType)
			},
			reset(){
				this.PersonType = []
			},
			medicineChange(n){
				
			},
			stationeryChange(n){
				
			},
			COVIDGoodsChange(n){
				
			},
			cancel(){
				this.showGoodsType = false
				this.medicineValue = this.medicineValue
				this.stationery = this.stationery
				this.COVIDGoods = this.COVIDGoods
			},			
			confirm(){
				console.log(this.medicineValue,this.stationery,this.COVIDGoods)
			}
		},
		watch:{
			PersonType(newVal,oldVal){
				if(newVal.length==0){
					this.personText = ''
					return ;
				}
				this.personText = ''
				for(const val of newVal){
					this.personText+=this.personList[val]
					
				}
			},
			
			
		}
	}
</script>

<style lang="scss" scoped>
	.helps{
		.header{
			display: flex;
			justify-content: space-around;
			margin-top: 20rpx;
			margin-bottom: 20rpx;
			.needMedicine{
				display: flex;
				image{
					width: 120rpx
				};
				.title{
					display: flex;
					justify-content: center;
					align-items: center;
					flex-direction: column;
					text:nth-child(1){
						font-size: 36rpx;
						color: #000;
						font-weight: 700;
					}
					text:nth-child(2){
						font-size: 20rpx;
						color: #b4b4b4;
					}
				}
				
			}
			.haveMedicine{
				display: flex;
				justify-content: center;
				align-items: center;
				image{
					width: 100rpx
				};
				.title{
					display: flex;
					flex-direction: column;
					margin-left: 20rpx;
					text:nth-child(1){
						font-size: 36rpx;
						color: #000;
						font-weight: 700;
					}
					text:nth-child(2){
						font-size: 20rpx;
						color: #b4b4b4;
					}
				}
			}
		}
		.main{
			margin-top: 40rpx;
			.main_title{
				font-weight: 700;
				font-size: 40rpx;
			}
			.tabs{
				margin-left: 30rpx;
				margin-top: 20rpx;
				width: 90%;
				border: 4rpx solid #ccc;
				border-top-left-radius: 40rpx;
				border-top-right-radius: 40rpx;
				box-shadow: 4rpx #ccc ;
			}
			.selector{
				display: flex;
				justify-content: space-around;
				view{
					display: flex;
					font-size: 24rpx;
					color: #8d8d8d;
					.u-icon{
						padding: 4rpx 0 0 4rpx;
					}
				}
				view:nth-child(2){
					text{
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						max-width: 130rpx;
					}
				}
				view:nth-child(3){
					text{
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						max-width: 130rpx;
					}
				}
			}
			.info_item{
				background-color: rgb(246, 247, 248);
				margin: 40rpx;
				
				.header{
					display: flex;
					justify-content: space-between;
					p{
						color: #000;
						font-weight: 800;
						text{
							font-weight: 500;
							color: red;
							padding-left: 10rpx;
						}
						.green{
							color: rgb(0,188,133);
						}
					}
				}
				.container{
					.timeAndDistance{
						display: flex;
						justify-content: space-between;
						font-size: 28rpx;
						color: rgb(153, 153, 153);
						
					}
					.location{
						display: flex;
						margin: 20rpx 0;
						view:nth-child(1){
							flex: 1;
							color: rgb(153, 153, 153);
						}
						view:nth-child(2){
							flex: 6;
						}
					}
					.origin{
						display: flex;
						margin-bottom: 20rpx;
						view:nth-child(1){
							flex: 1;
							color: rgb(153, 153, 153);
						}
						view:nth-child(2){
							flex: 6;
						}
					}
					.description{
						display: flex;
						view:nth-child(1){
							flex: 1;
							color: rgb(153, 153, 153);
						}
						view:nth-child(2){
							flex: 6;
							display: flex;
							flex-direction: column;
							.btn{
								display: flex;
								.u-button{
									background-color: #d9d9d9;
									flex: 1;
									height: 50rpx;
									color: rgb(153, 153, 153);
								}
								.u-button:nth-child(n+2){
									background-color: #d9d9d9;
									width: 150rpx;
									
								}
							}
							.content{
								margin-top: 20rpx;
							}
						}
					}
				}
				.provideHelp{
					margin: 100rpx 100rpx 40rpx;
					.u-button{
						width: 500rpx;
					}
				}
			}
		}
			.wrap{
				display: flex;
				justify-content: center;
				align-items: center;
				height: 100%;
				.rect{
					display: flex;
					justify-content: space-around;
					align-items: center;
					margin-top: -90rpx;
					width: 90%;
					height: 160rpx;
					background-color: #fff;
					border-bottom-left-radius: 30rpx;
					border-bottom-right-radius: 30rpx;
					.distance{
						background-color: #fff;
						display: flex;
						justify-content: center;
						align-items: center;
						width: 40%;
						height: 68rpx;
						color: #000;
						border: 2rpx solid #ccc;
					}
					.time{
						background-color: #fff;
						display: flex;
						justify-content: center;
						align-items: center;
						width: 40%;
						height: 68rpx;
						color: #000;
						border: 2rpx solid #ccc;
					}
					.active{
						border: 2rpx solid #fad556;
						background: #fad556;
					}
				}
				
			}
		.wrap2{
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			.rect{
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				align-items: center;
				margin-top: -90rpx;
				width: 90%;
				height: 160rpx;
				background-color: #fff;
				border-bottom-left-radius: 30rpx;
				border-bottom-right-radius: 30rpx;
				.distance{
					display: flex;
					justify-content: space-around;
					
					.item{
						margin-left: 20rpx;
						background-color: #fff;
						display: flex;
						justify-content: center;
						align-items: center;
						width: 140rpx;
						height: 68rpx;
						color: #000;
						border: 2rpx solid #ccc;
					}
					.active{
						border: 2rpx solid #fad556;
						background: #fad556;
					}
				}
				.selected_btn{
					display: flex;
					justify-content: space-between;
					view{
						display: flex;
						justify-content: center;
						align-items: center;
						margin-right: 20rpx;
						width: 200rpx;
						color: #000;
						border: 2rpx solid #8d8d8d;
						border-radius: 10rpx
					}
					.btn1{
						color: #989898;
					}
					.btn2{
						border: 2rpx solid #fad556;
						background: #fad556;
					}
				}
				
			}
		}
		.wrap3{
			position: absolute;
			bottom: 0;
			left: 0;
			width: 750rpx;
			height: 1000rpx;
			background-color: #fff;
			padding: 20rpx;
			p:nth-child(1){
				display: flex;
				justify-content: center;
				align-content: center;
				font-size: 40rpx;
				font-weight: 700;
				
			}
			p:nth-child(n+2){
				font-size: 32rpx;
				font-weight: 700;
				padding: 20rpx 0;
			}
			.btn{
				display: flex;
				justify-content: space-around;
				.u-button:nth-child(1){
					margin: 50rpx 30rpx
				}
				.u-button:nth-child(2){
					margin: 50rpx 50rpx 50rpx 0
				}
			}
		}
		.wrap4{
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			.rect{
				display: flex;
				justify-content: space-around;
				align-items: center;
				margin-top: -90rpx;
				width: 90%;
				height: 160rpx;
				background-color: #fff;
				border-bottom-left-radius: 30rpx;
				border-bottom-right-radius: 30rpx;
				.resolve{
					background-color: #fff;
					display: flex;
					justify-content: center;
					align-items: center;
					width: 30%;
					height: 68rpx;
					color: #000;
					border: 2rpx solid #ccc;
				}
				.active{
					border: 2rpx solid #fad556;
					background: #fad556;
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
		.u-popup{
			.container{
				display: flex;
				flex-direction: column;
				height: 400rpx;
				view{
					flex: 1;
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}
		}
</style>