<template>
	<view class="wrapper">
		<view class="content">
			<li @click="redirect">
				<view class="li-logo">
					<image src="../../static/images/member.png" mode=""></image>
				</view>
				<view class="li-text">
					<text>我的采购申报</text>
					<text class="last">My purchase declaration</text>
				</view>
				<view class="li-right">
					<image src="../../static/images/right.png" mode=""></image>
				</view>
			</li>
			<li @click="redirect2">
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
			<li @click='exit'>
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
				personInfo: null
			}
		},
		onLoad(option) {
			// console.log(option, typeof option)
			/* uni.getStorage({
			    key: 'personInfo',
			    success: function (res) {
					this.personInfo=res.data
			        console.log(this.personInfo,'this.personInfo');
			    }
			}); */


			try {
				const value = uni.getStorageSync('personInfo');
				if (value) {
					this.personInfo = value
					// console.log(value);
				}
			} catch (e) {
				// error
			}


		},
		methods: {
			//跳转到我的采购申报
			redirect() {
				// console.log(777)
				uni.navigateTo({
					url: '../procurement/procurement?id=1&name=uniapp'
				});
			},
			//跳转到我的待办页面
			redirect2() {
				console.log(this.personInfo)
				uni.navigateTo({
					url: `../backlog/backlog?id=${this.personInfo.id}&name=${this.personInfo.name}`
				});
			},
			//安全退出
			exit() {
				uni.request({
					url: `http://192.168.0.163:8081/purchase/app/login-out/975`, //仅为示例，并非真实接口地址。
					success: (res) => {
						console.log(res.data);
						if (res.data.code == 201) {
							console.log('errot')
							uni.showToast({
								icon: "loading",
								title: res.data.msg,
								duration: 2000
							});
						} else {
							uni.navigateTo({
								url: '../homepage/homepage?id=1&name=uniapp'
							});
						}
					}
				});


				uni.reLaunch({
					url: '../index/index'
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
