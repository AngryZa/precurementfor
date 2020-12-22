<template>
	<view class="content">
		<view class="header-title">
			<text>欢迎登录</text>
		</view>
		<view class="input-phone">
			<image src="../../static/images/phone.png" mode="widthFix"></image>
			<input type="text" @blur="verification" placeholder="请输入手机号码" value="" v-model="loginInformation.phoneNumber" />
			<image @click="clearForm" class="icon" src="../../static/images/close.png" mode="widthFix"></image>
		</view>
		<view class="input-authcode">
			<image src="../../static/images/verification.png" mode="widthFix"></image>
			<input type="text" value="" placeholder="请输入验证码"  maxlength="6" v-model="loginInformation.authCode" />
			<text class="getcode" @click="sendMessage">{{btnText}}</text>
		</view>
		<view class="submit">
			<button type="primary" @click="submit" :disabled="btnDisabled">登录</button>
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
				},
				btnText: "| 获取验证码",
				btnDisabled: false //登陆按钮是否可选
			}
		},
		onLoad() {

		},
		methods: {
			// 手机号码验证函数
			regPhone(value) {
				value = parseInt(value)
				var bu = /^((1[3,5,8,7,9][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/.test(value)
				return bu
			},
			verification() {
				const res = this.regPhone(this.loginInformation.phoneNumber)
				if (!res) {
					uni.showToast({
						title: '请输入11位手机号码',
						icon: 'none',
						duration: 2000
					});
					// this.btnDisabled=true

				} else {
					// this.btnDisabled=false
				}
			},

			// 清除电话号码输入框数据
			clearForm() {
				this.loginInformation = {
					phoneNumber: "",
					authCode: "",
				}
			},
			// 发送验证码
			sendMessage() {
				/* uni.request({
					url: `http://192.168.0.163:8081/purchase/app/get-code/${this.loginInformation.phoneNumber}`, //仅为示例，并非真实接口地址。
					data: {
						// getcode: '13548077245'
					},
					header: {
						// 'custom-header': 'hello',
						//自定义请求头信息
					},
					success: (res) => {
						// console.log(res.data);
					}
				});
				if (this.btnDisabled) {
					return;
				} */
				/* this.$http('get',`/web/app/get-code/${this.loginInformation.phoneNumber}`).then((data)=>{
					console.log(123,data)
				}) */
				this.$http('get',`/web/app/get-code/${this.loginInformation.phoneNumber}`).then((data)=>{
					console.log(123,data)
				}).catch((err)=>{
					console.log(err,'shivaul')
				})
				
				
				this.getSecond(5);
			},
			getSecond(wait) {
				let _this = this;
				let _wait = wait;
				if (wait == 0) {
					this.btnDisabled = false;
					this.btnText = "获取验证码"
					wait = _wait;
				} else {
					this.btnDisabled = true;
					this.btnText = "验证码(" + wait + "s)"
					wait--;
					setTimeout(function() {
							_this.getSecond(wait);
						},
						1000);
				}
			}, // 登陆跳转
			submit() {
				
				if (!this.loginInformation.phoneNumber) {
					uni.showToast({
						title: '请输入手机号码',
						icon: 'none',
						duration: 2000
					});
					return false
				} else if (!this.loginInformation.authCode) {
					uni.showToast({
						title: '请输入短信验证码',
						icon: 'none',
						duration: 2000
					});
					return false
				}
				const url = `/web/app/login/${this.loginInformation.phoneNumber}/${this.loginInformation.authCode}`
				this.$http('get', url, "").then(res => {
					console.log(res, typeof res, 'res34843839jfdjhhf')

					if (res.code != 200) {
						uni.showToast({
							icon: "loading",
							title: res.msg,
							duration: 2000
						});
					} else {
						// 存储token
						uni.setStorage({
							key: 'personInfo',
							data: res.data,
							success: function() {
								uni.navigateTo({
									url: '../homepage/homepage?id=1&name=uniapp'
								});
							}
						});
					}
				})
				
				/* uni.navigateTo({
					url: '../homepage/homepage?id=1&name=uniapp'
				}); */

			},
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		font-family: PingFang SC;
		padding: 0 50rpx;

		.header-title {
			padding-top: 238rpx;
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
