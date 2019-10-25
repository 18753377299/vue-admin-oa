// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 全局整合axios  begin
import axios from 'axios'
//http request 拦截器
axios.interceptors.request.use(
  config => {
    config.headers.jwtToken = 'lqk22'
    return config
  },
  err => {
    return Promise.reject(err)
  }
)
import VueAxios from 'vue-axios'
Vue.use(VueAxios,axios)
// 全局整合axios  end
//全局整合iview begin
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);
//全局整合iview end
import VueAccordionMenu from 'vue-accordion-menu'
Vue.use(VueAccordionMenu)
// 全局引入store 20191024 begin
import store from './store'
// 全局引入store 20191024 end
// import './assets/styles/layout/layout.less' // 引入布局样式
// import './assets/styles/base/base.less' // 全局变量
// import './assets/styles/cover/cover.less' // 覆盖样式
// 引入公共js begin
import common from '../src/components/common/js/common.js'
Vue.prototype.common = common
// 引入公共js end
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
