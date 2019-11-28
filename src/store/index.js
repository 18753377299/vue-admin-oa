import Vue from 'vue' // 引入vue
import Vuex from 'vuex' // 引入vuex
// 使用Vuex
Vue.use(Vuex)
import storePack from './mutations/storeset.js'

//创建Vuex实例
const store = new Vuex.Store({
  modules: {
     storePack
  }
})
// 导出store
export default  store
