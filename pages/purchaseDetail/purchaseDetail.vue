<template>
	<view class="wrapper">
		<view class="lists">
			<uni-list class="column1">
				<uni-list-item title="申请单位" note="" rightText="土木建筑工程"></uni-list-item>
				<uni-list-item title="申请单位" note="" rightText="土木建筑工程"></uni-list-item>
				<uni-list-item title="申请单位" note="" rightText="土木建筑工程"></uni-list-item>
				<uni-list-item title="申请单位" note="" rightText="土木建筑工程"></uni-list-item>
			</uni-list>

			<view class="list-table">
				<tbody>
					<view class="addborder header">
						<tr>
							<td>2</td>
							<td>2</td>
							<td>2</td>
							<td>2</td>
						</tr>
					</view>
					<view class="addborder">
						<tr>
							<td>2</td>
							<td>2</td>
							<td>2</td>
							<td>2</td>
						</tr>
					</view>
					<view class="addborder">
						<tr>
							<td>2</td>
							<td>2</td>
							<td>2</td>
							<td>2</td>
						</tr>
					</view>
				</tbody>
				</table>
			</view>

			<uni-list class="column2">
				<uni-list-item title="申请单位" link note="" rightText="土木建筑工程"></uni-list-item>
				<uni-list-item title="申请单位" link note="" rightText="土木建筑工程"></uni-list-item>
				<uni-list-item title="申请单位" link note="" rightText="土木建筑工程"></uni-list-item>
				<uni-list-item title="申请单位" link note="" rightText="土木建筑工程"></uni-list-item>
			</uni-list>



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
			// console.log(option)
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.wrapper {
		background-color: #E0E0E0;
		height: calc(100vh - 44px);

		// background-color: red;
		.lists {
			.list-table {
				background-color: #FFFFFF;
				margin-top: 30rpx;
				margin-bottom: 30rpx;
			}
		}
	}

	.list-table {
		width: 100%;

		.addborder {
			width: 100vw;
			height: 88rpx;
			line-height: 88rpx;
			border-bottom: 2rpx solid #E0E0E0;
			color: #999999;
		}

		.header {
			color: #333333;
			font-weight: 400;
		}

		td {
			width: 25vw;
			text-align: center;
		}
	}
</style>
