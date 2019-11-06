import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import Cookies from 'js-cookie'

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
 * */

router.beforeEach((to, from, next) => {
  let token = Cookies.get('jwtToken')
  // 如果有token并且不是登录路径，则跳过
  if(token && to.path.indexOf('/login') === -1){
    console.log('token')
    next();
  }else {
     //进行登录
    if(to.path.indexOf('/login') !== -1){
      console.log('login')
      next();
    }else {
      next({ path: '/login' })
    }
  }

})

export default router
