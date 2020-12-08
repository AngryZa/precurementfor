<template>
	<view class="content">
		<view class="header-title">
			<text>欢迎登录</text>
		</view>
		<view class="input-phone">
			<image src="../../static/images/phone.png" mode="widthFix"></image>
			<input type="text" placeholder="请输入手机号码" value="" v-model="loginInformation.phoneNumber" />
			<image @click="clearForm" class="icon" src="../../static/images/close.png" mode="widthFix"></image>
		</view>
		<view class="input-authcode">
			<image src="../../static/images/verification.png" mode="widthFix"></image>
			<input type="text" value="" placeholder="请输入验证码" v-model="loginInformation.authCode" />
			<text class="getcode">| 获取验证码</text>
			
		</view>

		<view class="submit">
			<button type="primary" @click="submit">登录</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loginInformation: {
					phoneNumber: "",
					authCode: "",
				}
			}
		},
		onLoad() {

		},
		methods: {
			goto() {
				console.log(666)
			},
			clearForm() {
				this.loginInformation = {
					phoneNumber: "",
					authCode: "",
				}
			},
			submit(){
				// console.log(66)
				uni.navigateTo({
				    url: '../homepage/homepage?id=1&name=uniapp'
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		font-family: PingFang SC;
		padding: 0 50rpx;

		.header-title {
			margin-top: 238rpx;
			text-align: center;
			color: #333333;
			font-size: 32rpx;
			font-weight: 400;

			text {
				position: relative;
			}

			text:after {
				position: absolute;
				content: "";
				left: 20rpx;
				top: 60rpx;
				width: 92rpx;
				// padding-bottom: 19rpx;
				border-bottom: 4rpx solid #3285FF;
			}
		}

		.input-phone {
			margin-top: 126rpx;
			// border: 1px solid black;
			height: 110rpx;
			display: flex;
			align-items: center;
			justify-content: flex-start;
			position: relative;
			border-bottom: 1rpx solid #F5F5F5;

			image {
				height: 36rpx;
			}

			image:nth-child(1) {
				width: 24rpx;
				margin-right: 28rpx;
			}

			.icon {
				box-sizing: border-box;
				display: inline-block;
				padding: 15rpx 15rpx;
				width: 50rpx;
				height: 50rpx;
				position: absolute;
				right: 10rpx;
				top: 30rpx;
			}

			input {
				// border: 1px solid black;
				height: 100%;
				width: 80%;
				display: inline-block;
			}
		}

		.input-authcode {
			display: flex;
			height: 110rpx;
			// border: 1px solid black;
			border-bottom: 1rpx solid #F5F5F5;
			align-items: center;

			image {
				width: 33rpx;
				height: 37rpx;
				margin-right: 18rpx;
			}

			input {
				// border: 1px solid black;
				height: 100%;
				width: 60%;
			}

			.getcode {
				color: #4B7FF7;

				font-size: 26rpx;
				font-weight: 400;
			}
		}

		.submit {
			margin-top: 90rpx;
		}
	}
</style>
