<template>
	<view class="wrapper">
		<uni-steps class="steps" :options="listData.approval" direction="column" :active="activekey" active-color="#5592F7"></uni-steps>
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
				id: null, //该页面数据的id
				options: [{
					cTime: '主管领导意见',
					name: "张老师",
					cTime: '2018-11-11 12:04',
					opinion: "审批意见"

				}, {
					title: '卖家发货',
					cTime: '2018-11-12',
					opinion: "审批意见",
					name: "张老师",
				}, {
					title: '买家签收',
					cTime: '2018-11-13',
					name: "张老师",

				}, {
					title: '交易完成',
					cTime: '2018-11-14',
					name: "张老师",
				}],
				listData: {}, //传递渲染的数据
				activekey:0  	//step左边激活指数			
			}
		},
		methods: {

		},
		onLoad(option) {
			this.id = option.id
			this.$http('GET', `/web/api/purchaseInfo/get/${option.id}?null`).then(res => {
				console.log(res, 'res')
				if (res.code == 200) {
					this.listData = res.data
					this.activekey=res.data.approval.length-1
					// console.log(this.listData,this.activekey)
				} else {
					uni.showToast({
						icon: "loading",
						title: res.msg,
						duration: 1000
					});
				}
			})

		}
	}
</script>

<style lang="scss" scoped>
	.wrapper {
		/* .steps{
			padding: 0 30rpx;
			overflow: hidden;
		} */
	}
</style>
