<template>
	<view class="wrapper">
		<view class="tab">
			<tabs :tabData="tabs" :activeIndex="activeIndex" @tabClick='tabClick' />
		</view>
		<view class="content">
			<li>
				<view class="description">
					<text>申请日期：2020-01-01 12:10</text>
					<text>经费项目名称：采购设备</text>
					<text>经费账号：46231354623</text>
				</view>
				<view class="details">
					<text>查看详情</text>
					<text>查看审批详情</text>
					<span class="datails-boundary">|</span>
				</view>
			</li>
			<li>
				<view class="description">
					<text>申请日期：2020-01-01 12:10</text>
					<text>经费项目名称：采购设备</text>
					<text>经费账号：46231354623</text>
				</view>
				<view class="details">
					<text>查看详情</text>
					<text>查看审批详情</text>
					<span class="datails-boundary">|</span>
				</view>
			</li>
			<li>
				<view class="description">
					<text>申请日期：2020-01-01 12:10</text>
					<text>经费项目名称：采购设备</text>
					<text>经费账号：46231354623</text>
				</view>
				<view class="details">
					<text>查看详情</text>
					<text>查看审批详情</text>
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
					'已终止',
				],
				activeIndex: 0, //传入的值必须是NUMBER类型
			}
		},
		methods: {
			tabClick(index) {
				console.log(index, 'index')
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
		height: 286rpx;
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
