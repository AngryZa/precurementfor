<template>
	<view class="wrapper">
		<view class="tab">
			<tabs :tabData="tabs" :activeIndex="activeIndex" @tabClick='tabClick' />
		</view>
		<view class="content">
			<li>
				<view class="description">
					<text>申请日期：2020-01-01 12:10</text>
					<text>申请单位：研究生院</text>
					<text>采购项目负责人：张三</text>
					<text>经费项目名称：逸夫楼消防中控柜</text>
					<text>经费账号：46231354623</text>
					<button type="default" class="btn" @click="open" >审批</button>
				</view>
				<view class="details">
					<text @click="checkDetail">查看详情</text>
					<text @click="checkApprove">查看审批详情</text>
					<span class="datails-boundary">|</span>
				</view>
			</li>
		</view>
		
		<!-- Popup 弹出框 -->
		<uni-popup ref="popup" type="dialog">
		    <uni-popup-dialog title="审批" type="success" message="成功消息" content="该条采购申请单是否通过？" :duration="2000" :before-close="true" @close="close" @confirm="confirm"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	import Tabs from "@/components/tabs/tabs.vue";
	export default {
		components: {
			Tabs,
			uniPopup,
			uniPopupMessage,
			uniPopupDialog
		},
		data() {
			return {
				tabs: [
					'待审核',
					'审核过',
					'驳回',
				],
				activeIndex: 0, //传入的值必须是NUMBER类型
			}
		},
		methods: {
			// 点击Tab显示索引
			tabClick(index) {
				console.log(index, 'index')
			},
			open(){
				this.$refs.popup.open()
			},
			close(done){
			            // TODO 做一些其他的事情，before-close 为true的情况下，手动执行 done 才会关闭对话框
			            // ...
			            done()
			        },
			confirm(done,value){
			            // 输入框的值
			            console.log(value)
			            // TODO 做一些其他的事情，手动执行 done 才会关闭对话框
			            // ...
			            done()
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
		height: 394rpx;
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
				
			.btn{
				position: absolute;
				width: 153rpx;
				height: 56rpx;
				line-height: 56rpx;
				top: 80rpx;
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
</style>
