<template>
	<view class="wrapper">
		<uni-steps class="steps" :options="options" direction="column" :active="1" active-color="#5592F7"></uni-steps>
	</view>
</template>

<script>
	import uniSteps from '@/components/uni-steps/uni-steps.vue'
	export default {
		components: {
			uniSteps
		},
		data() {
			return {
				options: [{
					title: '主管领导意见',
					approver:"张老师",
					desc:'2018-11-11 12:04',
					opinion:"审批意见"
					
				}, {
					title: '卖家发货',
					desc: '2018-11-12',
					opinion:"审批意见",
					approver:"张老师",
				}, {
					title: '买家签收',
					desc: '2018-11-13',
					approver:"张老师",
					
				}, {
					title: '交易完成',
					desc: '2018-11-14',
					approver:"张老师",
				}]
			}
		},
		methods: {

		},
		onload() {

		}
	}
</script>

<style lang="scss" scoped>
	.wrapper{
		/* .steps{
			padding: 0 30rpx;
			overflow: hidden;
		} */
	}
</style>
