<template>
	<view class="questionDetail">
		<view class="form">
			<u-tabs :list="list2"
			 itemStyle="padding-left: 100rpx; padding-right: 100rpx; height: 100rpx;"
			  @click="select"></u-tabs>
			  
			  <!-- 第一个表单 -->
		    <u--form
			v-if="flag==0"
		    	labelPosition="top"
				labelWidth="200"
		    	:model="model"
		    	:rules="rules"
		    	ref="form1"
				>
		    			<u-form-item
		    					label="所需物品"
		    					prop="userInfo.name"
		    					ref="item1"
		    			>
		    				<u--input
		    						v-model="model.userInfo.name"
									placeholder="填写所需物品"
		    				></u--input>
		    			</u-form-item>
		    			<u-form-item
		    					label="求助者所在位置"
		    					prop="userInfo.address"
		    					ref="item2"
		    			>
		    				<u--input
		    						v-model="model.userInfo.address"
									placeholder="填写所在位置"
		    				></u--input>
							</u-form-item>
							
		    				<u-form-item
		    						label="求助者微信号"
		    						prop="userInfo.wechat"
		    						ref="item3"
		    				>
		    					<u--input
		    							v-model="model.userInfo.wechat"
										placeholder="您的微信号将被看到,便于联系到您"
		    					></u--input>
		    				</u-form-item>
							
							<u-form-item
									label="求助者手机号"
									prop="userInfo.phone"
									ref="item4"
							>
								<u--input
										v-model="model.userInfo.phone"
										placeholder="点击填写手机号"
								></u--input>
							</u-form-item>
							
						<u-form-item
								label="求助说明"
								prop="userInfo.description"
								ref="item5"
						>
							<u--textarea v-model="model.userInfo.description" confirmType="done" placeholder="请简单描述你需要的帮助,如填写药品名称,可以让更多人主动帮助您" count ></u--textarea>
						</u-form-item>
						<view class="tip">
							寻求帮助时请甄别信息真伪，防止被骗，你可以选择跑腿、闪送等传物方式降低被骗
						</view>
						<u-button type="success" text="提交" @click="submit1"></u-button>
		    		</u--form>
					
					<!-- 第二个表单 -->
					<u--form
						v-if="flag==1"
						labelPosition="top"
						labelWidth="200"
						:model="model2"
						:rules="rules2"
						ref="form2"
					>
							<u-form-item
								label="可以提供的物品"
								prop="userInfo.name"
								ref="item1"
							>
								<u--input
									v-model="model2.userInfo.name"
									placeholder="填写可以提供的物品"
									></u--input>
								</u-form-item>
								
							<u-form-item
								label="物品来源"
								prop="userInfo.checkboxValue"
								ref="item2"
								>
									<u-checkbox-group
									    	v-model="model2.userInfo.checkboxValue"
									    	placement="row"
									    	@change="checkboxChange"
									    >
									    	<u-checkbox
									    		:customStyle="{marginBottom: '8px'}"
									    		v-for="(item, index) in checkboxList"
									    		:key="index"
									    		:label="item.name"
									    		:name="item.name"
									    	>
									    		</u-checkbox>
									 </u-checkbox-group>
									 
							</u-form-item>
														
							<u-form-item
								label="帮助者所在位置"
								prop="userInfo.address"
								ref="item3"
							>
								<u--input
									v-model="model2.userInfo.address"
									placeholder="请填写您的微信"
								></u--input>
							</u-form-item>
														
							<u-form-item
								label="帮助者微信号"
								prop="userInfo.wechat"
								ref="item4"
							>
								<u--input
									v-model="model2.userInfo.wechat"
									placeholder="点击填写微信号"
								></u--input>
							</u-form-item>
														
							<u-form-item
								label="帮助者手机号"
								prop="userInfo.phone"
								ref="item5"
							>
								<u--input
									v-model="model2.userInfo.phone"
									placeholder="点击填写手机号"
								></u--input>
							</u-form-item>
														
							<u-form-item
									label="帮助说明"
									ref="item5"
							>
								<u--textarea v-model="model2.userInfo.description" placeholder="可以提供的帮助说明" confirmType="done" count ></u--textarea>
							</u-form-item>
									<view class="tip">
										提供帮助时请甄别信息真伪，防止被骗，你可以选择跑腿、闪送等传物方式降低被骗
									</view>
								<u-button type="success" text="提交" @click="submit2"></u-button>
				</u--form>
								
								
		</view>	
					
	</view>
</template>

<script>
</script>

<style>
</style>