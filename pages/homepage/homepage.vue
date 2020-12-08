<template>
	<view class="wrapper">
		<view class="content">
			<li>
				<view class="li-logo">
					<image src="../../static/images/member.png" mode=""></image>
				</view>
				<view class="li-text">
					<text>我的采购申报</text>
					<text class="last">My purchase declaration</text>
				</view>
				<view class="li-right" @click="redirect">
					<image src="../../static/images/right.png" mode=""></image>
				</view>
			</li>
			<li>
				<view class="li-logo">
					<image src="../../static/images/document.png" mode=""></image>
				</view>
				<view class="li-text">
					<text>我的待办</text>
					<text class="last">My to-do</text>
				</view>
				<view class="li-right">
					<image src="../../static/images/right.png" mode=""></image>
				</view>
			</li>
			<li>
				<view class="li-logo">
					<image src="../../static/images/func.png" mode=""></image>
				</view>
				<view class="li-text">
					<text>安全退出</text>
					<text class="last">Safety exit</text>
				</view>
				<view class="li-right">
					<image src="../../static/images/right.png" mode=""></image>
				</view>
			</li>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onLoad(option) {
			// console.log(option, typeof option)
		},
		methods: {
			redirect(){
				console.log(777)
				uni.navigateTo({
					url: '../procurement/procurement?id=1&name=uniapp'
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrapper {
		// background-color: #6B6B6B;
	}

	li {
		list-style: none;
		width: 620rpx;
		height: 214rpx;
		// border: 1px solid black;
		margin-bottom: 30rpx;
		border-radius: 20rpx;
		box-shadow: 0px 1rpx 34rpx 0rpx rgba(107, 107, 107, 0.15);
		display: flex;
		align-items: center;
		justify-content: space-between;

		.li-logo {
			width: 190rpx;
			height: 190rpx;

			image {
				width: 190rpx;
				height: 190rpx;
			}
		}

		.li-text text:nth-child(1) {

			font-size: 34rpx;
			font-weight: bold;
			color: #666666;

		}
		.li-text {
			width: 300rpx;

			text {
				display: inline-block;
			}

			.last {
				width: 360rpx;
				color: blue;
				font-size: 24rpx;
				color: #999999;
				font-weight: 400;
			}
		}

		.li-right {
			width: 50rpx;
			// height: 50rpx;
			height: 100%;
			// vertical-align: middle;
			line-height: 100%;

			image {
				width: 16rpx;
				height: 28rpx;
				position: relative;
				top: 93rpx;
			}

			margin-right: 38rpx;
		}
	}

	.content {
		display: flex;
		flex-direction: column;
		padding-top: 62rpx;
		align-items: center;
	}
</style>
