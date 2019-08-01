<template>
  <Card>
    <div>
      aaa:<input type="text" v-model="cityName"/>
      bbb:<input type="text" v-model="result.name"/>
      <!--v-model也可以绑定函数，然后传参，像这样:-->
      <Input  :key="index" v-model="arr.join(';')" placeholder="请输入值" />
      <Input v-for="(val,index) in options" :key="index" v-model="val.join(';')" placeholder="请输入值" />
    </div>
  </Card>
</template>
<script>
  export default {
    data () {
     return {
       cityName: 'abc',
       result: {
         name: 'beijing',
         ins: 'aaa'
       },
       arr: [
         'aaa','bbb','ccc'
//         {name: 'aaa'},
//         {name: 'bbb'},
//         {name: 'ccc'},
       ],
       options: [
         [1,2,3],
         [4,5,6]
       ],
     }
    },
    methods: {
      nameChange(){
        console.log('122')
      },
      newVal(value){
        return value.join(';')
      }
    },
    watch: {
//      监听的第一种方式，当每次监听到 cityName 值发生改变时，执行函数
//      cityName(val,oldval){
//        console.log(val)
//      },
      // 第二种方式:所监听的数据后面直接加字符串形式的方法名
//      cityName: 'nameChange'
//      第三种方式：
      cityName:{
        handler (newName,oldName) {
          console.log(newName)
        },
        immediate: true
        // 这样使用watch时有一个特点，就是当值第一次绑定的时候，不会执行监听函数，
        // 只有值发生改变才会执行。如果我们需要在最初绑定值的时候也执行函数，
        // 则就需要用到immediate属性。
      },
      'result.name':{
        handler (newName,oldName) {
          console.log(newName)
        },
        immediate: true,
        deep: true
        // 当需要监听一个对象的改变时，普通的watch方法无法监听到对象内部属性的改变，
        // 只有data中的数据才能够监听到变化，此时就需要deep属性对对象进行深度监听。
      },
    }
  }
</script>
<style>

</style>
