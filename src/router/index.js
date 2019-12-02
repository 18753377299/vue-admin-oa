import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import Cookies from 'js-cookie'
import axios from 'axios'
import store from '@/store'


Vue.use(Router)

const router = new Router({
  // (缩写) 相当于 routes: routes
  routes
})
/**
 1、Vue.beforeEach(function(to,form,next){}) 在跳转之前执行
 2.Vue.afterEach(function(to,form))在跳转之后判断
 */

/**
 * to: router即将进入的路由对象
 * from:当前导航即将离开的路由
 * next:Function,进行管道中的一个钩子，如果执行完了，
 * 则导航的状态就是 confirmed （确认的）；否则为false，终止导航。
 * next()一定要执行，否则将出现页面留白的现象。
 * */
router.beforeEach((to, from, next) => {
  let token = Cookies.get('jwtToken')
  // 如果有token并且不是登录路径，则跳过,否则都跳到登录页面，需要增加一个token过期的操作
  if(token && to.path.indexOf('/login') === -1){
    console.log('token')
    // axios.get中传递参数的问题，post可以直接传递data，但是get不可以
    axios.get('/MavenSSM/login/getUserInfo', {params: {jwtToken: token}}).then(response => {
      console.log(response)
      if(response.data.status === 1 || response.data.status === 5){
          store.commit("SET_USERINFO",response.data.data)
          Cookies.set("jwtToken",response.data.data.jwtToken)
          next()
      }else {
        Cookies.remove('jwtToken')
        store.commit("SET_USERINFO",null)
        next({ path: '/login' })
      }
    }).catch(response => {
      console.log(response)
      Cookies.remove('jwtToken')
      store.commit("SET_USERINFO",null)
      next({ path: '/login' })
    })
    // 如果token过期，需要重新进行登录，
  }else {
     //进行登录
    if(to.path.indexOf('/login') !== -1){
      console.log('login')
      // next()不会再次调用router.beforeEach(),next('login')会再次调用router.beforeEach()
      next();
    }else {
      next({ path: '/login' })
    }
  }

})

export default router
