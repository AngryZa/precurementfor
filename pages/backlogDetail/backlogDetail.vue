<template>
	<view class="wrapper">
		<view class="lists">
			<uni-list class="column1">
				<!-- <uni-list-item title="申请单位" note="" :rightText="info.orgName"></uni-list-item> -->
				<uni-list-item title="申请单位" note="" :rightText="finalOrgName"></uni-list-item>
				<uni-list-item title="项目负责人" note="" :rightText="info.username"></uni-list-item>
				<uni-list-item title="联系电话" note="" :rightText="info.phone"></uni-list-item>
				<uni-list-item title="申请日期" note="" :rightText="info.date"></uni-list-item>
				<uni-list-item title="经费账号" note="" :rightText="info.account"></uni-list-item>
				<uni-list-item title="项目名称" note="" :rightText="info.name"></uni-list-item>
				<uni-list-item title="计划单号" note="" :rightText="info.number"></uni-list-item>
				<uni-list-item title="采购是否含有批量集采目录中的货物" note="" rightText="否"></uni-list-item>
			</uni-list>

			<view class="list-table">
				<scroll-view scroll-x="true" scroll-left="0" scroll-y="true">
					<tbody>
						<view class="addborder header">
							<tr style="width: 100%;">
								<td>
									<view style="width: 150rpx;">
										序号
									</view>
								</td>
								<td>
									<view style="width: 150rpx;">
										货物服务名称
									</view>
								</td>
								<td>
									<view style="width: 150rpx;">
										采购类型
									</view>
								</td>
								<td>
									<view style="width: 150rpx;">
										是否属于政府集中采购目录
									</view>
								</td>
								<td>
									<view style="width: 150rpx;">
										参考品牌/规格/型号
									</view>
								</td>
								<td>
									<view style="width: 150rpx;">
										额定功率(W)
									</view>
								</td>
								<td>
									<view style="width: 150rpx;">
										单位（台/件/套/次）
									</view>
								</td>
								<td>
									<view style="width: 150rpx;">
										数量
									</view>
								</td>
								<td>
									<view style="width: 150rpx;">
										计划单价(元)
									</view>
								</td>
								<td>
									<view style="width: 150rpx;">
										计划总金额(元)
									</view>
								</td>
							</tr>
						</view>

						<!-- 循环渲染数据区域 -->
						<view class="addborder" v-for="(item,index) in batchList" :key="index">
							<!-- <scroll-view scroll-x="true" scroll-top="0" scroll-y="true"> -->
							<tr>
								<td>
									<view style="width: 150rpx;">
										{{index+1}}
									</view>
								</td>
								<td>
									<view style="width: 150rpx;">
										{{item.name}}
									</view>
								</td>
								<td>
									<view style="width: 150rpx;">
										{{item.type}}
									</view>
								</td>
								<td>
									<view style="width: 150rpx;">
										{{item.isBatch}}
									</view>
								</td>
								<td>
									<view style="width: 150rpx;">
										{{item.number}}
									</view>
								</td>
								<td>
									<view style="width: 150rpx;">
										{{item.power}}
									</view>
								</td>
								<td>
									<view style="width: 150rpx;">
										{{item.company}}
									</view>
								</td>
								<td>
									<view style="width: 150rpx;">
										{{item.num}}
									</view>
								</td>
								<td>
									<view style="width: 150rpx;">
										{{item.unitPrice}}
									</view>
								</td>
								<td>
									<view style="width: 150rpx;">
										{{item.money}}
									</view>
								</td>
							</tr>
						</view>


						<!-- 总计价格 -->
						<view class="addborder">
							<tr>
								<td>
									<view style="width: 150rpx;">
										总计
									</view>
								</td>
								<td>
									<view style="width: 150rpx;">
										{{totalMoney}}
									</view>
								</td>
							</tr>
						</view>


					</tbody>
				</scroll-view>
				</table>


			</view>

			<uni-list class="column2">
				<uni-list-item title="使用方向" note="" :rightText="useDirection"></uni-list-item>
				<uni-list-item title="急需说明" note="" :rightText="info.needContent"></uni-list-item>
				<uni-list-item title="论证 报告及其他附件" link note="" rightText="土木建筑工程"></uni-list-item>
				<uni-list-item title="情况说明" note="" :rightText="info.remark"></uni-list-item>
			</uni-list>



		</view>



	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: null, //采购申报列表详情ID
				listData: null,
				info: {},
				testText: 'niua',
				batchList: null,
				applicantList: null //申请单位列表
			}
		},
		onLoad(option) {

			// console.log(option,'option')
			this.id = option.id
			// console.log(this.id, 'id')
			this.getData(this.id)
		},
		computed: {
			useDirection() {
				if (this.info.useDirection == 1) {
					return "科研急需"
				} else if (this.info.useDirection == 2) {
					return "教学急需"
				} else {
					return "其他(批量集采的采购周期为6~12个月)"
				}
			},
			totalMoney() {

				if (this.batchList) {
					let total = 0
					// console.log(typeof(this.batchList[0].money), 'type')
					//确保传递的参数是number类型
					for (var i = 0; i < this.batchList.length; i++) {
						if (typeof(this.batchList[0].money) != 'number') {
							total += parseFloat(this.batchList[i].money)
						} else {
							total += this.batchList[i].money
						}
					}
					return total
				} else {

					return ''
				}
			},
			finalOrgName(){
				
				const key=this.info.orgId
				let orgArr=null
				if(this.applicantList){
					orgArr=this.applicantList.filter((item=>{
						return item.id==key
					}))
					console.log(orgArr,'b')
					return 1
				}else{
					return ''
				}
			}
		},
		methods: {
			// 获取申请单位列表
			async getList() {
				return new Promise((resolve, reject) => {
					this.$http('GET', '/web/api/org/select/all/to').then((res) => {
						if (res.code == 200) {
							// this.applicantList=res.data
							resolve(res.data)
						} else {
							/* uni.showToast({
								title:res.msg
							})
							setTimeout(()=>{
								uni.hideToast()
							},2000) */
							reject(res)
						}
					})
				})

			},
			async getData(id) {
				// this.$http('GET', `/web/api/purchaseInfo/get/${id}?null`, ).then(res => {

				var ret = await this.getList()
				// console.log(ret,'1')
				this.applicantList = ret
				this.$http('GET', `/web/api/purchaseApproval/get/${id}?null`, ).then(res => {
					// 错误处理
					if (res.code != 200) {
						uni.showToast({
							title: res.msg,
							duration: 2000,
							icon: 'loading'
						});
						setTimeout(() => {
							uni.hideToast();
						}, 1000)
					} else {
						// console.log(2,this.applicantList)
						uni.showToast({
							title: '更新页面成功',
							duration: 2000
						});
						setTimeout(() => {
							uni.hideToast();
						}, 1000)
						this.listData = res.data
						this.info = res.data.info
						this.batchList = res.data.inventory
					}
				})




			},
			onPullDownRefresh() {
				this.getData(this.id)
				setTimeout(function() {
					uni.stopPullDownRefresh();
				}, 1000);

			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrapper {
		background-color: #E0E0E0;
		height: calc(100vh - 44px);

		.lists {
			.list-table {
				width: 100vw;
				background-color: #FFFFFF;
				margin-top: 30rpx;
				margin-bottom: 30rpx;
			}
		}
	}

	.list-table {


		.addborder {
			// width: 100vw;
			overflow: hidden;
			font-size: 24rpx;
			padding-top: 22rpx;
			box-sizing: border-box;
			height: 88rpx;
			vertical-align: middle;
			border-bottom: 2rpx solid #E0E0E0;
			color: #999999;
		}

		.header {
			padding-top: 14rpx;
			height: 88rpx;
			align-items: center;
			color: #333333;
			line-height: auto;
			font-weight: bold;
			font-size: 24rpx;
		}

		td {
			width: 200rpx;
			text-align: center;
		}
	}

	.list-table td {
		width: auto;
	}
</style>
