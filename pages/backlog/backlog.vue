<template>
	<view class="wrapper">
		<view class="tab">
			<tabs :tabData="tabs" :activeIndex="activeIndex" @tabClick='tabClick' />
		</view>
		<view class="content">
			<li v-for="(item,key) in listData" :key="key">
				<view class="description">
					<text>申请日期：{{item.date}}</text>
					<text>申请单位：{{item.orgName}}</text>
					<text>采购项目负责人：{{item.username}}</text>
					<text>经费项目名称：{{item.name}}</text>
					<text>经费账号：{{item.account}}</text>
					<button  v-if="state==3?true:false"  type="default" class="btn" @click="open(item,key)">审批</button>
				</view>
				<view class="details">
					<text @click="checkDetail(item)">查看详情</text>
					<text @click="checkApprove">查看审批详情</text>
					<span class="datails-boundary">|</span>
				</view>
			</li>
		</view>


		<view class="popupz" v-if="showPopupz">
			<view class="substance">
				<view class="context">
					<view class="title">
						审批
					</view>
					<view class="state-choose">
						<text>状态</text>
						<easy-select class="selectz" :options="optionz" ref="easySelect" style="width: 200rpx;" :value="selecValue"
						 @selectOne="selectOne"></easy-select>
					</view>

					<view class="state-choose">
						<text> 意见</text>
						<textarea style="width: 300rpx;height: 150rpx; box-sizing: border-box; padding-top:22rpx; text-align: right;"
						 placeholder-style="color:#999999" placeholder="无" v-model="textareaz" />
						</view>
				</view>
				<view class="button-group">
					<view class="dialog-button" @click="closez">
						<text class="uni-dialog-button-text">取消</text>
					</view>
					<view class="dialog-button uni-border-left" @click="onOkz">
						<text class="uni-dialog-button-text uni-button-color">确定</text>
					</view>
				</view>
			</view>
		</view>



	</view>
</template>

<script>
	import easySelect from '@/components/easy-select/easy-select.vue'
	// import uniPopup from '@/components/uni-popup/uni-popup.vue'
	// import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
	// import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	import Tabs from "@/components/tabs/tabs.vue";
	export default {
		components: {
			Tabs,
			easySelect
		},
		data() {
			return {
				tabs: [
					'待审核',
					'审核过',
					'驳回',
				],
				activeIndex: 0, //传入的值必须是NUMBER类型
				listData: [],
				state: 3, //记录数据的状态
				pageTotal: null, //总页数
				page: null, //当前页数
				showPopupz: false, //是否展示模态框
				confirmIndex: null, //选择框的选择结果
				checkData: null ,//审核数据条整条数据
				checkIndex:null   ,//审核数据索引
				optionz:[{
					value: '1',
					label: '通过'
				},{
					value: '2',
					label: '驳回'
				},{
					value: '3',
					label: '终止'
				}],
				selecValue:'通过' ,//select 初始选择
				selecState:1 ,
				textareaz:''
			}
		},
		onLoad(option) {
			// console.log(option, 'option')
			this.getData(3, 1)
			// console.log(this.listData, 123)
		},
		methods: {
			// 查看详情
			checkDetail(item){
				console.log(item,'checkData')
				let id=item.id
				uni.navigateTo({
					url: `../backlogDetail/backlogDetail?id=${id}`,
				});
			},
			selectOne(options){
				this.selecValue = options.label
				this.selecState=options.value
				// console.log(options,this.selecState)
			},
			// 自定义模态框取消
			closez() {
				this.showPopupz = false
				this.confirmIndex = 0
			},
			// 自定义模态框确认
			onOkz() {
				this.showPopupz = false
				this.confirmIndex = 1
				
				const id = this.checkData.id
				const state = this.selecState
				const remark = this.textareaz
				const userId = null
				
				let data = {
					"id": id,
					"state": state,
					"remark": remark,
					"userId": userId
				}
				console.log(this.selecState,'selecStare',data,this.textareaz)
				
				
				
				
				if(this.selecState==3){
					this.$http("PUT", '/web/api/purchaseApproval/update/stop', data).then(res => {
						console.log(res, 'rrrrrssssddd')
						if(res.code==200){
							this.listData.splice(this.checkIndex,1)
							uni.showToast({
								title: res.msg,
							});
							setTimeout(() => {
								uni.hideToast();
							}, 2000)
							console.log('终止成功')
						}else{
							uni.showToast({
								title: res.msg,
							});
							setTimeout(() => {
								uni.hideToast();
							}, 2000)
							// 删除失败了之后,将列表数据清零,然后进行赋值
							this.listData=[]
							this.getData(this.state,1)
						}
					})
				}else{
					this.$http("PUT", '/web/api/purchaseApproval/update/approval', data).then(res => {
						console.log(res, 'rrrrrssssddd')
						if(res.code==200){
							uni.showToast({
								title: res.msg,
							});
							setTimeout(() => {
								uni.hideToast();
							}, 2000)
							this.listData.splice(this.checkIndex,1)
						}else{
							uni.showToast({
								title: res.msg,
							});
							setTimeout(() => {
								uni.hideToast();
							}, 2000)
						}
					})
				}
				
			},
			// 点击Tab显示索引
			tabClick(index) {
				this.listData = []
				// this.getData(index,1)
				if (index == 0) {
					this.state = 3
					this.getData(3, 1)
				} else if (index == 1) {
					this.state = 1
					this.getData(1, 1)
				} else {
					this.state = 2
					this.getData(2, 1)
				}
				// console.log(index, 'index')
			},
			open(id,index) {
				this.showPopupz = true
				this.checkData = {}
				this.checkData = id
				this.checkIndex=index
			},
			//数据请求函数
			// j 状态  k 页数   
			getData(j, k) {
				this.$http('GET', `/web/app/get-upcoming/137/${j}/${k}/15`).then(res => {
					if (res.code != 200) {
						uni.showToast({
							title: 'res.msg',
						});
						setTimeout(() => {
							uni.hideToast();
						}, 200)
					} else {
						if (res.data.list.length == 0) {
							uni.showToast({
								title: '没有相关页面信息',
								// icon:'none'
							});
							setTimeout(() => {
								uni.hideToast();
							}, 2000)
						} else {
							uni.showToast({
								title: '更新页面成功',
							});
							setTimeout(() => {
								uni.hideToast();
							}, 2000)
							let rets = res.data.list
							this.pageTotal = res.data.pageTotal
							this.page = res.data.page
							for (var i in rets) {
								this.listData.push(rets[i]);
							}
						}
					}
				})
			},
			// 下拉刷新
			onPullDownRefresh() {
				
				const _this = this
				_this.listData = []
				setTimeout(function() {
					_this.getData(_this.state, 1)
					uni.stopPullDownRefresh();
				}, 1000);
			},
			onReachBottom() {
				if (this.page >= this.pageTotal) {
					uni.showToast({
						title: '没有更多数据加载',
					});
					setTimeout(() => {
						uni.hideToast();
					}, 2000)
				} else {
					this.getData(this.state, this.page + 1)
				}
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
		// height: 394rpx;
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

			.btn {
				position: absolute;
				width: 153rpx;
				height: 56rpx;
				line-height: 56rpx;
				top: 100rpx;
				right: 0;
				background-color: #DF7373;
				border-radius: 30rpx;
				color: #FFFFFF;
			}

			position: relative;
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

	//模态框
	.popupz {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.4);

		.substance {
			position: absolute;
			top: calc(50% - 177.5rpx);
			left: calc(50% - 273rpx);
			width: 546rpx;
			// height: 355rpx;
			border-radius: 5%;
			background: #FFFFFF;

		}
	}

	.substance {
		.context {
			text-align: center;
			height: 80%;

			.title {
				color: #3D8AF7;
				font-size: 40rpx;
				padding-top: 20rpx;
			}
			.state-choose{
				// font-size: 40rpx;
				color: #333333;
				display: flex;
				justify-content: space-between;
				// height: 88rpx;
				line-height: 88rpx;
					padding-left: 36rpx;
					padding-right: 36rpx;
				text{
				}
				.selectz{
					
				}
			}

		}

		.button-group {
			// height: 21%;
			height: 72rpx;
			display: flex;
			flex-direction: row;
			display: flex;
			flex: 1;
			flex-direction: row;
			justify-content: center;
			align-items: center;

			.dialog-button {
				height: 100%;
				color: #FFFFFF;
				background-color: #C4C4C4;
				width: 50%;
				text-align: center;

				text {
					display: block;
					position: relative;
					top: 50%;
					transform: translateY(-50%);
				}
			}

			.uni-border-left {
				background-color: #3D8AF7;
			}
		}
	}
</style>
