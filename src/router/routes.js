import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Main.vue'
// import Home from '@/components/layout/Home.vue'
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
import cycleValidate from '@/components/leave/CycleValidate'
const routes =  [
  {
    path: '/',
    name: 'Main',
    component: Home,
    children: [
      {
        path: '/RiskInfoClaimQuery',
        name: '典型案例分析',
        component: RiskInfoClaimQuery,
        icon: 'icon-wujiaoxing',
        level: 1,
        meta: {
          requiresAuth: true, // 是否需要登录
          search: false // 是否可搜索
        }
      },
      {
        path: '/riskinfo',
        name: 'LeaveSearch',
        component: LeaveSearch,
        icon: 'icon-wujiaoxing',
        level: 1,
        meta: {
          requiresAuth: true, // 是否需要登录
          search: false // 是否可搜索
        }
      }
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
  {
    path: '/cycleValidate',
    name: 'cycleValidate',
    component: cycleValidate,
    children:[]
  },
  {
    path: '/hello',
    name: 'HelloWorld',
    component: HelloWorld,
    children:[]
  }
]

export default routes
