const baseUrl = 'http://192.168.0.163:8081/purchase';
// const baseUrl = 'http://bibi.cc';
const http = (method, url, data) => {
	let token = "";
	const value = uni.getStorageSync('personInfo');
	if (value) {
		token = value.token
	}
	//此token是登录成功后后台返回保存在storage中的
	let httpDefaultOpts = {
		url: baseUrl + url,
		data: data,
		method: method,
		header: {
			// 'token': token,
			'token': '396916CEE8CB053090DA44386A142B89;66',
			
			// 'X-Requested-With': 'XMLHttpRequest',
			// 'Content-Type': 'application/json'
		},
		// dataType: 'json',
	}
	let promise = new Promise(function(resolve, reject) {
		uni.showLoading({
			title: '加载中'
		})
		uni.request(httpDefaultOpts).then(
			(res) => {
				uni.hideLoading();
				if (res[1].statusCode != 200) {
					uni.showToast({
						title: '网络服务错误1',
						icon: 'none'
					})
					return
				}
				resolve(res[1].data)
			}
		).catch(
			(response) => {
				uni.showToast({
					title: '网络服务错误2',
					icon: 'none'
				})
				uni.hideLoading();
				reject(response)
			}
		)
	})
	return promise
};
export default {
	baseUrl,
	http
}
