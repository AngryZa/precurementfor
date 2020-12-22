import Vue from 'vue'
import App from './App'
import request from '@/request/request.js'

Vue.prototype.$http = request.http;

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
