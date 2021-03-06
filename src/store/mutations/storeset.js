// vuex中的数据源，我们需要保存的数据就保存在这里，可以在页面通过 this.$store.state来获取我们定义的数据
const  state = {
  count: 1,
  userInfo: ''
}
//数据我们在页面是获取到了，但是如果我们需要修改count值怎么办？
// 如果需要修改store中的值唯一的方法就是提交mutation来修改
const mutations = {
  SET_COUNT:(state,payload) => {
    // state.count = payload
    state.count = state.count +payload
    // state.count = state.count +1
  },
  SET_USERINFO:(state,payload)=>{
    state.userInfo = payload
  }
}
// commit提交mutations修改为使用dispatch来提交action
const actions = {
  SET_COUNT_ACTION: (context,value) =>{
    context.commit('SET_COUNT',value)
  }
}
// Getter相当于vue中的computed计算属性，getter 的返回值会根据它的依赖被缓存起来，
// 且只有当它的依赖值发生了改变才会被重新计算，这里我们可以通过定义vuex的Getter
// 来获取，Getters 可以用于监听、state中的值的变化，返回计算后的结果
const getters = {
  getStateCount: state => {
    return state.count+1
  },
  getUserInfo: state => {
    return state.userInfo
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}

