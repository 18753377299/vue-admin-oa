import Vue from 'vue'
import Router from 'vue-router'
import Cookies from 'js-cookie'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Main.vue'
import LeaveSearch from '@/components/leave/LeaveSearch.vue'
import RiskInfoClaimQuery from '@/components/riskinfo/RiskInfoClaimQuery.vue'
import RiskCheckMainQuery from '@/components/riskcheck/RiskCheckMainQuery.vue'
import Login from '@/components/common/Login'
import map from '@/components/riskmap/map'
import maptf from '@/components/riskmap/MapTF'
import mapcanvas from  '@/components/riskmap/MapCanvas'
import mappt from  '@/components/riskmap/mapPointTogether'
import mapfq from  '@/components/riskmap/MapFQ'
import mapmix from  '@/components/riskmapMixins/MapMixins'
import computedTest from  '@/components/myTest/ComputedTest'
import WatchTest from  '@/components/myTest/WatchTest.vue'
import  StoreTest from  '@/components/myTest/StoreTest'
import validateTest from  '@/components/myTest/ValidateTest'

Vue.use(Router)

const routes =  [
  {
    path: '/',
    name: 'Main',
    component: Home,
    children: [
      // {
      //   path: '/riskinfo',
      //   name: 'LeaveSearch',
      //   component: LeaveSearch,
      //   icon: 'icon-wujiaoxing',
      //   level: 1,
      //   meta: {
      //     requiresAuth: true, // 是否需要登录
      //     search: false // 是否可搜索
      //   }
      // },
      {
        path: '/RiskInfoClaimQuery',
        name: '典型案例分析',
        component: RiskInfoClaimQuery,
        icon: 'icon-wujiaoxing',
        level: 1,
        meta: {
          requiresAuth: true, // 是否需要登录
          search: false // 是否可搜索
        },
        children: [
          {
            path: '/riskinfo',
            name: 'LeaveSearch',
            component: LeaveSearch
          },
          {
            path: '/RiskCheckMainQuery',
            name: '风控巡检查询',
            component: RiskCheckMainQuery,
            icon: 'icon-wujiaoxing',
            level: 1,
            meta: {
              requiresAuth: true, // 是否需要登录
              search: false // 是否可搜索
            }
          }
        ]
      },
      // {
      //   path: '/RiskCheckMainQuery',
      //   name: '风控巡检查询',
      //   component: RiskCheckMainQuery,
      //   icon: 'icon-wujiaoxing',
      //   level: 1,
      //   meta: {
      //     requiresAuth: true, // 是否需要登录
      //     search: false // 是否可搜索
      //   }
      // }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    children:[]
  },
  {
    path: '/map',
      name: 'map',
    component: map,
    children:[]
  },
  {
    path: '/maptf',
    name: 'maptf',
    component: maptf,
    children:[]
  },
  {
    path: '/mapcan',
    name: 'mapcan',
    component: mapcanvas,
    children:[]
  },
  {
    path: '/mappt',
      name: 'mappt',
    component: mappt,
    children:[]
  },
  {
    path: '/mapfq',
    name: 'mapfq',
    component: mapfq,
    children:[]
  },
  {
    path: '/mapmix',
    name: 'mapmix',
    component: mapmix,
    children:[]
  },
  {
    path: '/comp',
    name: 'comp',
    component: computedTest,
    children:[]
  },
  {
    path: '/wat',
    name: 'wat',
    component: WatchTest,
    children:[]
  },
  {
    path: '/store',
    name: 'store',
    component: StoreTest,
    children:[]
  },
  {
    path: '/validate',
    name: 'validate',
    component: validateTest,
    children:[]
  },


]

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

// router.beforeEach((to, from, next) => {
//   let token = Cookies.get('jwtToken')
//   if(token){
//     console.log('token')
//     next();
//   }else {
//     console.log('token-next')
//     if(to.path === '/login'){
//       next()
//     }else {
//       next({
//         path: '/login'
//       })
//     }
//   }
//
// })

export default router
