import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css'
import './plugins/element.js'
import './plugins/echarts.js'
import axios from 'axios'
import '@/assets/css/global.scss'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'


axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'



axios.interceptors.request.use(config => {
  NProgress.start();
  config.headers.Authorization = window.sessionStorage.getItem("token")
  return config;
})
axios.interceptors.response.use(config => {
  NProgress.done();
  return config;
})
Vue.prototype.$http = axios



Vue.config.productionTip = false



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
