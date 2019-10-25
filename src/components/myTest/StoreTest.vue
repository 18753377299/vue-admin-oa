<template>
  <Card>
    <div>
      <h1> {{this.$store.state.count}}</h1>
      <h2>{{this.$store.getters.getStateCount}}</h2>
      <button @click="operate">修改</button>
      <!--<h2>{{count}}</h2>-->
    </div>
  </Card>
</template>
<script>
  import {mapState} from 'vuex';
  export default{
    data(){

    },
    computed: {
//      ...mapState({
//        count:(state) => state.count
//      })
    },
    methods: {
      operate(){
        // 这个是直接提交到mutations
//        this.$store.commit('SET_COUNT',5)
        //使用dispatch来提交 actions
        this.$store.dispatch('SET_COUNT_ACTION',10)
      }
    }
  }
</script>
<style>

</style>
