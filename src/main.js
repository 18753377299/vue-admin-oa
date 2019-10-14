// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import axiosService from './axios/axios-api'

import VueCookies from 'vue-cookies'
// 全局整合axios
import axios from 'axios'

//http request 拦截器
axios.interceptors.request.use(
  config => {
    // Indicator.open({
    //   text: '加载中...',
    //   spinnerType: 'fading-circle'
    // })
    config.headers.jwtToken = 'lqk22'
    return config
  },
  err => {
    // Indicator.close()
    // Toast({
    //   message: '加载超时',
    //   position: 'middle',
    //   duration: 3000
    // })
    return Promise.reject(err)
  }
)

import VueAxios from 'vue-axios'
Vue.use(VueAxios,axios)

//全局整合iview
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);
import VueAccordionMenu from 'vue-accordion-menu'
Vue.use(VueAccordionMenu)

// import './assets/styles/layout/layout.less' // 引入布局样式
// import './assets/styles/base/base.less' // 全局变量
// import './assets/styles/cover/cover.less' // 覆盖样式


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
