<template>
	<view class="salary">
		<!-- 显示税后所得金额 -->
		<view class="show_salary">
			<view class="title">税后所得</view>
			<view class="show_money">
				<text class="money">{{userInfo.num}}</text>
				<text class="yuan">元</text>
			</view>
			<view class="bottomContent">
				<view>
					<text>个税：</text>
					<text class="num">{{geshui}}</text>
				</view>
				<view>
					<text>社保：</text>
					<text class="num">{{shebao}}</text>
				</view>
				<view>
					<text>公积金：</text>
					<text class="num">{{gjj}}</text>
				</view>
			</view>
		</view>

		<!--输入表单  -->
		<view>
			<!-- 注意，如果需要兼容微信小程序，最好通过setRules方法设置rules规则 -->
			<u--form labelPosition="left" :model="userInfo" :rules="rules" ref="form1">
				<u-form-item label="当前城市:" label-width="280rpx" prop="city" class="u-p-l-30 u-p-r-30">
						<CityPicker class="city" @change="change">{{city}}</CityPicker>
				</u-form-item>
				
				<u-form-item label="税前工资:" label-width="280rpx" prop="salary" borderBottom ref="item1">
					<u--input v-model="userInfo.salary" border="none" placeholder="请输入"></u--input>
				</u-form-item>
				<u-form-item label="是否缴纳社保" label-width="650rpx" prop="shebao" borderBottom ref="item1">
					<u-switch v-model="userInfo.shebaoShow" size="20" ></u-switch>
				</u-form-item>
				<u-form-item label="缴纳方式" v-if="this.userInfo.shebaoShow" label-width="280rpx" prop="type" borderBottom @click="showType= true;"
					ref="item1">
					<u--input
											v-model="userInfo.type"
											disabled
											disabledColor="#ffffff"
											placeholder="请选择缴纳方式"
											border="none"
									></u--input>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-form-item label="是否缴纳公积金" label-width="650rpx" prop="gjj" borderBottom ref="item1">
					<u-switch v-model="userInfo.gjjShow" size="20" ></u-switch>
				</u-form-item>
				<u-form-item label="缴纳比例(%)" v-if="this.userInfo.gjjShow" label-width="360rpx" prop="proportion" borderBottom @click="showProportion= true;" ref="item1">
					<u--input
											v-model="userInfo.proportion"
											disabled
											disabledColor="#ffffff"
											placeholder="请选择缴纳比例"
											border="none"
									></u--input>
					<!-- <text class="percent" style="position: relative;left: -346rpx;">%</text> -->
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
			
				<u-form-item label="医疗保险" label-width="300rpx" borderBottom ref="item1">
					<u--input style="margin-right: 20rpx;" v-model="userInfo.medical" border="none" readonly inputAlign="right" color="#aeaeae"></u--input>
				</u-form-item>
				<u-form-item label="养老保险" label-width="300rpx"  borderBottom ref="item1">
					<u--input style="margin-right: 20rpx;" v-model="userInfo.endowment" border="none" readonly inputAlign="right" color="#aeaeae"></u--input>
				</u-form-item>
				<u-form-item label="失业保险" label-width="300rpx" borderBottom ref="item1">
					<u--input style="margin-right: 20rpx;" v-model="userInfo.unemployment" border="none" readonly inputAlign="right" color="#aeaeae"></u--input>
				</u-form-item>
				<u-form-item label="工商保险" label-width="300rpx" borderBottom ref="item1">
					<u--input style="margin-right: 20rpx;" v-model="userInfo.commercial" border="none" readonly inputAlign="right" color="#aeaeae"></u--input>
				</u-form-item>
				<u-form-item label="生育保险" label-width="300rpx" borderBottom ref="item1">
					<u--input style="margin-right: 20rpx;" v-model="userInfo.maternity" border="none" readonly inputAlign="right" color="#aeaeae"></u--input>
				</u-form-item>
			</u--form>
			<u-action-sheet :show="showType" :actions="Type" title="请选择缴纳方式"
				@close="showType = false" @select="typeSelect">
			</u-action-sheet>
			<u-action-sheet :show="showProportion" :actions="Proportion" title="请选择缴纳比例"
				@close="showProportion = false" @select="proportionSelect">
			</u-action-sheet>
		</view>
		<view class="result">
			注：计算结果仅供参考
		</view>
	</view>
</template>

<script>
	import CityPicker from '@/compoments/wangding-pickerAddress/wangding-pickerAddress.vue'
	export default {
		components:{
			CityPicker
		},
		data() {
			return {
				showType: false,
				showCity:false,
				showProportion:false,
				city:'北京市',
				geshui:0,
				shebao:0,
				gjj:0,
				userInfo: {
						num:0, // 税后工资
						salary: '', // 税前工资
						shebaoShow:true, //是否缴纳社保
						type:'', // 缴纳方式
						gjjShow:true, // 公积金
						proportion:12, // 缴纳比例
						medical:0,  //医疗保险
						endowment:0, // 养老保险
						unemployment:0, // 失业保险
						commercial:0, //工商保险
						maternity:0, // 生育保险
					},
					
				Type: [{name:'按照公司'},{name:'自定义'}],
				Proportion:[{name:12},{name:11},{name:10},{name:9},{name:8},{name:7},{name:6},{name:5}],
				rules: {
					'salary': {
						type: 'string',
						required: true,
						message: '请填写税前工资',
						trigger: ['blur', 'change']
					},
					'city': {
						type: 'string',
						max: 1,
						required: true,
						message: '请选择城市',
						trigger: ['blur', 'change']
					},
					'type': {
						type: 'string',
						required: true,
						message: '请选择缴纳方式',
						trigger: ['blur', 'change']
					},
					'gjj': {
						type: 'boolean',
						max: 1,
						required: true,
						trigger: ['blur', 'change']
					},
					'proportion': {
						type: 'number',
						required: true,
						trigger: ['blur', 'change']
					}
					
				},
				radio: '',
				switchVal: false
				}
			},
		
		methods: {
			typeSelect(e) {
				this.userInfo.type = e.name
				// this.$refs.form1.validateField('userInfo.type')
			},
			citySelect(e){
				this.userInfo.city = e.name
				// this.$refs.form1.validateField('userInfo.city')
			},
			// 选择地区回调
			regionConfirm(e) {
				this.form.region = e.province.label + '-' + e.city.label + '-' + e.area.label;
			},
			proportionSelect(e){
				this.userInfo.proportion = e.name
				// this.$refs.form1.validateField('userInfo.proportion')
			},
			change(data) {
				  this.city = data.data.join('')
				  console.log(data.data.join(''))
				  console.log(this.city);		
			},
			
			
		},
		computed:{
			dataChange(){
				const {salary,shebaoShow,gjjShow} = this.userInfo
				return {salary,shebaoShow,gjjShow}
			}
		},
		watch:{
				dataChange(newVal,oldVal){
				// 如果缴纳社保为false时
				if(newVal.shebaoShow==false){
					this.userInfo.medical=0
					this.userInfo.endowment=0
					this.userInfo.unemployment=0
					
				}else{
					this.userInfo.medical = Math.floor((newVal.salary>24167?24167:newVal.salary)*0.02*100)/100   // 保留两位小数
					this.userInfo.endowment = Math.floor((newVal.salary>24167?24167:newVal.salary)*0.08*100)/100
					this.userInfo.unemployment = Math.floor((newVal.salary>24167?24167:newVal.salary)*0.005*100)/100
				}
				// 如果缴纳公积金为false时
				if(newVal.gjjShow==false){
					this.gjj=0
				}else{
					this.gjj = Math.floor(((newVal.salary>24167?24167:newVal.salary)*this.userInfo.proportion/100)*100)/100
				}
				
				this.shebao = Math.floor((this.userInfo.medical+this.userInfo.endowment+this.userInfo.unemployment)*100)/100
				
				if(newVal.salary-5000-this.gjj-this.shebao<=0){
					this.geshui = 0
				}else if(newVal.salary-5000-this.gjj-this.shebao<=3000){
					this.geshui = Math.floor((newVal.salary-5000-this.gjj-this.shebao)*0.03*100)/100
				}else if(newVal.salary-5000-this.gjj-this.shebao>3000&&newVal.salary-5000-this.gjj-this.shebao<=12000){
					this.geshui = Math.floor(((newVal.salary-5000-this.gjj-this.shebao)*0.1-210)*100)/100
				}else if(newVal.salary-5000-this.gjj-this.shebao>12000&&newVal.salary-5000-this.gjj-this.shebao<=25000){
					this.geshui = Math.floor(((newVal.salary-5000-this.gjj-this.shebao)*0.2-1410)*100)/100
				}else if(newVal.salary-5000-this.gjj-this.shebao>25000&&newVal.salary-5000-this.gjj-this.shebao<=35000){
					this.geshui = Math.floor(((newVal.salary-5000-this.gjj-this.shebao)*0.25-2660)*100)/100
				}else if(newVal.salary-5000-this.gjj-this.shebao>35000&&newVal.salary-5000-this.gjj-this.shebao<=55000){
					this.geshui = Math.floor(((newVal.salary-5000-this.gjj-this.shebao)*0.3-4410)*100)/100
				}else if(newVal.salary-5000-this.gjj-this.shebao>55000&&newVal.salary-5000-this.gjj-this.shebao<=80000){
					this.geshui = Math.floor(((newVal.salary-5000-this.gjj-this.shebao)*0.35-7160)*100)/100
				}else{
					this.geshui = Math.floor(((newVal.salary-5000-this.gjj-this.shebao)*0.45-15160)*100)/100
					
				}
				this.userInfo.num = Math.floor((newVal.salary - this.shebao-this.gjj-this.geshui)*100)/100
				
			},
			
		}
	};
</script>

<style lang="scss">
	.show_salary{
		width: 100%;
		height: 300rpx;
		background-color: #fad556;
		.title{
			font-size: 44rpx;
			font-weight: 600;
		}
		.show_money{
			display: flex;
			height: 160rpx;
			align-items: center;
			margin-left: 60rpx;
			.money{
				font-size: 90rpx;
				font-weight: 700;
			}
			.yuan{
				font-size: 30rpx;
				padding-top: 30rpx;
				padding-left: 10rpx;
			}
		}
		.bottomContent{
			display: flex;
			justify-content: space-around;
			align-items: center;
			view{
				width: 33%;
				margin-left: 10rpx;
				margin-top: 20rpx;
			}
			.num{
				font-size: 24rpx;
				color: #000;
			}
		}
	}
	.result{
		width: 400rpx;
		color:#999999 ;
		margin: 40rpx 200rpx;
	}
</style>
