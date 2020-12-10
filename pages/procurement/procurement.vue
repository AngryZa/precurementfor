<template>
	<view class="wrapper">
		<view class="tab">
			<tabs :tabData="tabs" :activeIndex="activeIndex" @tabClick='tabClick' />
		</view>
		<view class="content">
			<li v-for="(item,index) in listData" :key="index">
				<view class="description">
					<text>申请日期：{{item.date}} 12:10</text>
					<text>经费项目名称：{{item.name}}</text>
					<text>经费账号：{{item.account}}</text>
				</view>
				<view class="details">
					<text @click="checkDetail(item.id)">查看详情</text>
					<text @click="checkApprove(item.id)">查看审批详情</text>
					<span class="datails-boundary">|</span>
				</view>
			</li>
		</view>
	</view>
</template>

<script>
	import Tabs from "@/components/tabs/tabs.vue";
	export default {
		components: {
			Tabs,
		},
		data() {
			return {
				tabs: [
					'待审核',
					'审批中',
					'待执行',
					'执行中',
					'已完结',
					'申请终止',
					'已终止',
				],
				activeIndex: 0, //传入的值必须是NUMBER类型
				listData: [],
				indicator: 0, //用于存储记忆当前页面的state
				bottomIndex: 0 //用于储存记忆触底事件
			}
		},
		onLoad() {
			this.$http('get', '/web/api/declare/get/count?null').then((res) => {
				console.log(res.data)
			})
			this.getData(0)
		},
		methods: {
			tabClick(index) {
				this.bottomIndex = 0
				this.listData = []
				this.indicator = index
				console.log(this.indicator, 'indicator')
				// 0开始
				this.getData(index)
			},
			//查看详情
			checkDetail(id) {
				uni.navigateTo({
					url: `../purchaseDetail/purchaseDetail?id=${id}`,
				});
			},
			//查看审批详情
			checkApprove(id) {
				// console.log(id)
				uni.navigateTo({
					url: `../approveDetail/approveDetail?id=${id}`,
				});
			},
			//数据请求函数
			getData(k, j) {
				const data = {
					page: j,
					size: 15,
					username: null,
					number: null,
					account: null,
					state: k + 1,
				}
				this.$http('POST', '/web/api/declare/select/page', data).then(res => {
					if (res.code != 200) {
						// console.log(res,'res')
						uni.showLoading({
							title: res.msg
						});
						setTimeout(function() {
							uni.hideLoading();
						}, 2000);
					} else {
						// console.log(res.data.list)
						if (res.data.list.length == 0) {
							uni.showToast({
								icon: "loading",
								title: ` 没有相关页面信息 `,
								duration: 500
							});
						}
						let rets = res.data.list
						for (var i in rets) {
							this.listData.push(rets[i]);
						}
					}
				})
			},
			//触底事件
			onReachBottom(e) {

				this.bottomIndex = this.bottomIndex + 1
				this.getData(this.indicator, this.bottomIndex + 1)
				console.log('触底加载更多');
			},
			onPullDownRefresh() {
				this.listData = []
				this.getData(this.indicator)
				setTimeout(function() {
					uni.stopPullDownRefresh();
				}, 1000);
			}
		}
	}
</script>

<style lang="scss" scoped>
	li {
		box-sizing: border-box;
		padding: 30rpx;
		list-style: none;
		width: 690rpx;
		// height: 286rpx;
		box-shadow: 0rpx 1rpx 34rpx 0rpx rgba(0, 0, 0, 0.09);
		border-radius: 20rpx;
		margin-bottom: 25rpx;

		.description {
			text {
				display: block;
				color: #333333;
				margin-left: 20rpx;
				font-size: 26rpx;
				font-weight: 400;
				line-height: 50rpx;
			}

			padding-bottom: 20rpx;
			border-bottom: 2rpx solid #E0E0E0;
			;
		}

		.details {
			position: relative;
			height: 85rpx;
			line-height: 85rpx;
			text-align: center;

			text {
				color: #3D94FF;
				font-weight: 400;
				font-size: 26rpx;
				display: inline-block;
				width: 50%;
			}

			text:nth-child(1) {
				// border-right:1px solid black;
			}

			.datails-boundary {
				font-size: 16rpx;
				position: absolute;
				left: 50%;
				color: #E0E0E0;
			}

			// line-height: 88rpx;
		}
	}

	.wrapper {
		.tab {
			border-top: 2rpx solid #E0E0E0;
		}

		.content {
			padding-top: 36rpx;
			display: flex;
			flex-direction: column;
			align-items: center;

			li {}
		}
	}

	//设置uniapp按钮默认样式
	/* uni-button[type=default] {
		color: #3D94FF;
		font-size: 26rpx;
		border-radius: none;
		display: inline-block!important;
	
	} */
</style>
