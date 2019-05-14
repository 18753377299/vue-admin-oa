<template>
  <div>
    template2: {{num}}
  </div>
</template>
<script>
  import riskmapmixins from '@/components/riskdata/mixins/riskMap-mixins.js'
  export default {
    mixins:[riskmapmixins],
    data (){
        return{
        }
    },
    created(){
//      this.num++
    }

  }
</script>
