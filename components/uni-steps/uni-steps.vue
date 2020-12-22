<template>
	<view class="uni-steps">
		<view :class="[direction==='column'?'uni-steps__column':'uni-steps__row']">
			<view :class="[direction==='column'?'uni-steps__column-text-container':'uni-steps__row-text-container']">
				<view v-for="(item,index) in options" :key="index" :class="[direction==='column'?'uni-steps__column-text':'uni-steps__row-text']">
					<text :style="{color:index<=active?activeColor:deactiveColor}" :class="[direction==='column'?'uni-steps__column-title':'uni-steps__row-title']">{{item.roleName}}</text>
					<text :style="{color:index<=active?activeColor:deactiveColor}" :class="[direction==='column'?'uni-steps__column-desc':'uni-steps__row-desc']">{{item.name}}&nbsp&nbsp{{item.cTime?item.cTime:'待审时间未定'}}</text>
					<text @click="open(index)" :style="{color:index<=active?activeColor:deactiveColor}" :class="[direction==='column'?'uni-steps__column-opinion':'uni-steps__row-opinion']">
						<!-- <image src="../../static/images/finished.png" mode="" v-if="item.remark"></image> {{item.remark?'审批意见':'未审批'}} -->
						<view class="" v-if="item.state==1">
							<image src="../../static/images/finished.png" mode=""></image> {{item.remark?'审批意见':'未审批'}}
						</view>
						<view class="reject" v-if="item.state==2">
							<image src="../../static/images/cha.jpg" mode=""></image> {{item.remark?'审批意见':'未审批'}}
						</view>
					</text>
				</view>
			</view>
			<view :class="[direction==='column'?'uni-steps__column-container':'uni-steps__row-container']">
				<view :class="[direction==='column'?'uni-steps__column-line-item':'uni-steps__row-line-item']" v-for="(item,index) in options"
				 :key="index">
					<view :class="[direction==='column'?'uni-steps__column-line':'uni-steps__row-line',direction==='column'?'uni-steps__column-line--before':'uni-steps__row-line--before']"
					 :style="{backgroundColor:index<=active&&index!==0?activeColor:index===0?'transparent':deactiveColor}"></view>
					<view :class="[direction==='column'?'uni-steps__column-check':'uni-steps__row-check']" v-if="index === active">
						<uni-icons :color="activeColor" type="checkbox-filled" size="14"></uni-icons>
					</view>
					<view :class="[direction==='column'?'uni-steps__column-circle':'uni-steps__row-circle']" v-else :style="{backgroundColor:index<active?activeColor:deactiveColor}"></view>
					<view :class="[direction==='column'?'uni-steps__column-line':'uni-steps__row-line',direction==='column'?'uni-steps__column-line--after':'uni-steps__row-line--after']"
					 :style="{backgroundColor:index<active&&index!==options.length-1?activeColor:index===options.length-1?'transparent':deactiveColor}"></view>
				</view>
			</view>
		</view>

		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog title="审批意见" type="success" message="成功消息" :content='remark' :duration="2000" :before-close="true"
			 @close="close" @confirm="confirm"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	// import Bus from "@/js/bus.js";
	import uniIcons from '../uni-icons/uni-icons.vue'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	export default {
		name: 'UniSteps',
		components: {
			uniIcons,
			uniPopup,
			uniPopupMessage,
			uniPopupDialog
		},
		props: {
			direction: {
				// 排列方向 row column
				type: String,
				default: 'row'
			},
			activeColor: {
				// 激活状态颜色
				type: String,
				default: '#1aad19'
			},
			deactiveColor: {
				// 未激活状态颜色
				type: String,
				default: '#999999'
			},
			active: {
				// 当前步骤
				type: Number,
				default: 0
			},
			options: {
				type: Array,
				default () {
					return []
				}
			} // 数据
		},
		data() {
			return {
				index: 0, //点击默认值
				remark: '1637',

			}
		},
		methods: {
			open(key) {
				console.log(this.options, 'options')
				this.remark = this.options[key].remark
				console.log(this.remake, 'remake')
				this.$refs.popup.open()
			},
			close(done) {
				// TODO 做一些其他的事情，before-close 为true的情况下，手动执行 done 才会关闭对话框
				// ...
				done()
			},
			confirm(done, value) {
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
	.uni-steps {
		/* #ifndef APP-NVUE */
		display: flex;
		width: 100%;
		/* #endif */
		/* #ifdef APP-NVUE */
		flex: 1;
		/* #endif */
		flex-direction: column;
		box-sizing: border-box;
		padding: 0 70rpx 0 30rpx;
	}

	.uni-steps__row {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
	}

	.uni-steps__column {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row-reverse;
	}

	.uni-steps__row-text-container {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
	}

	.uni-steps__column-text-container {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		flex: 1;
	}

	.uni-steps__row-text {
		/* #ifndef APP-NVUE */
		display: inline-flex;
		/* #endif */
		flex: 1;
		flex-direction: column;
	}

	.uni-steps__column-text {
		padding: 50rpx 0rpx 40rpx 20rpx;
		border-bottom-style: solid;
		border-bottom-width: 2rpx;
		border-bottom-color: $uni-border-color;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		position: relative;
	}

	.uni-steps__row-title {
		font-size: $uni-font-size-base;
		line-height: 16px;
		text-align: center;
	}

	//标题列
	.uni-steps__column-title {
		// font-size: $uni-font-size-base;
		font-size: 28rpx;
		text-align: left;
		line-height: 36rpx;
		padding-bottom: 28rpx;
		font-weight: 400;
	}

	.uni-steps__row-desc {
		font-size: 12px;
		line-height: 14px;
		text-align: center;
	}

	.uni-steps__column-desc {
		font-size: $uni-font-size-sm;
		text-align: left;
		line-height: 18px;
	}

	.uni-steps__column-opinion {
		position: absolute;
		right: 20rpx;
		top: 70rpx;
		color: #009053 !important;
		font-size: 28rpx;
		font-weight: 500;

		image {
			vertical-align: bottom;
			width: 35rpx;
			height: 35rpx;
			margin-right: 10rpx;
		}

	}


	.uni-steps__row-container {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
	}

	.uni-steps__column-container {
		/* #ifndef APP-NVUE */
		display: inline-flex;
		/* #endif */
		width: 30px;
		flex-direction: column;
	}

	.uni-steps__row-line-item {
		/* #ifndef APP-NVUE */
		display: inline-flex;
		/* #endif */
		flex-direction: row;
		flex: 1;
		height: 14px;
		line-height: 14px;
		align-items: center;
		justify-content: center;
	}

	.uni-steps__column-line-item {
		box-sizing: border-box;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		flex: 1;
		align-items: center;
		justify-content: center;
		// padding-right: 30px;
	}

	.uni-steps__row-line {
		flex: 1;
		height: 1px;
		background-color: $uni-text-color-grey;
	}

	.uni-steps__column-line {
		width: 1px;
		background-color: $uni-text-color-grey;
	}

	.uni-steps__row-line--after {
		transform: translateX(1px);
	}

	.uni-steps__column-line--after {
		flex: 1;
		transform: translate(0px, 1px);
	}

	.uni-steps__row-line--before {
		transform: translateX(-1px);
	}

	.uni-steps__column-line--before {
		height: 6px;
		transform: translate(0px, -1px);
	}

	.uni-steps__row-circle {
		width: 5px;
		height: 5px;
		border-radius: 100px;
		background-color: $uni-text-color-grey;
		margin: 0px 3px;
	}

	.uni-steps__column-circle {
		width: 5px;
		height: 5px;
		border-radius: 100px;
		background-color: $uni-text-color-grey;
		margin: 4px 0px 5px 0px;
	}

	.uni-steps__row-check {
		margin: 0px 6px;
	}

	.uni-steps__column-check {
		height: 14px;
		line-height: 14px;
		margin: 2px 0px;
	}
	.reject{
		color: red;
	}
</style>
