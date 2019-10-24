<template>
  <Card>
    <div>
      <h1> {{this.$store.state.count}}</h1>
      <h2>{{this.$store.getters.getStateCount}}</h2>
      <button @click="operate">修改</button>
    </div>
  </Card>
</template>
<script>
  export default{
    data(){

    },
    methods: {
      operate(){
        this.$store.commit('SET_COUNT',5)
      }
    }
  }
</script>
<style>

</style>
