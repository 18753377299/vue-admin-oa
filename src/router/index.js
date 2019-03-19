import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Main.vue'
// import Home from '@/components/layout/Home.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Home,
      children: [
        {
          path: '/riskinfo',
          name: 'Main',
          component: Home,
          icon: 'icon-wujiaoxing',
          level: 1,
          meta: {
            requiresAuth: true, // 是否需要登录
            search: false // 是否可搜索
          }
        }
      ]
    }
  ]
})
