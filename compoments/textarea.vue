<template>
	
	<view class="container">
		<editor class="richInputContent" id="editor" @input="getEditorContent" @blur="onEditorReady" v-model="value" placeholder="开始输入..."></editor>
		</view>
</template>

<script>
	export default {
			data() {
				return {
					value: '',
				}
			},
			methods: {
				onEditorReady() {
				    console.log(this.value)
				},
				
				getEditorContent(){
					console.log(111)
				}
			}
		}
</script>

<style lang="scss">
	.container {
			
		}
	
		#editor {
			width: 100%;
			height: 300px;
			
		}
	
		button {
			margin-top: 10px;
		}
</style>