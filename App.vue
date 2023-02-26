<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "uview-ui/index.scss";
	@import url('/static/iconfont-weapp-icon.css');
	uni-modal{
		z-index: 19999 !important;
	}
	uni-showToast{
		z-index: 19999 !important;
	}
</style>
