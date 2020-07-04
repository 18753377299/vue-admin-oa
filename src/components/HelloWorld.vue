<template>
  <div class="hello">
    <h1 @mouseover="overTest">{{ msg | ellipsis }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li>
        <a
          href="https://vuejs.org"
          target="_blank"
        >
          Core Docs
        </a>
      </li>
      <li>
        <a
          href="https://forum.vuejs.org"
          target="_blank"
        >
          Forum
        </a>
      </li>
      <li>
        <a
          href="https://chat.vuejs.org"
          target="_blank"
        >
          Community Chat
        </a>
      </li>
      <li>
        <a
          href="https://twitter.com/vuejs"
          target="_blank"
        >
          Twitter
        </a>
      </li>
      <br>
      <li>
        <a
          href="http://vuejs-templates.github.io/webpack/"
          target="_blank"
        >
          Docs for This Template
        </a>
      </li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li>
        <a
          href="http://router.vuejs.org/"
          target="_blank"
        >
          vue-router
        </a>
      </li>
      <li>
        <a
          href="http://vuex.vuejs.org/"
          target="_blank"
        >
          vuex
        </a>
      </li>
      <li>
        <a
          href="http://vue-loader.vuejs.org/"
          target="_blank"
        >
          vue-loader
        </a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/awesome-vue"
          target="_blank"
        >
          awesome-vue
        </a>
      </li>
    </ul>

  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      value: 'lqk'
    }
  },
  methods: {
    overTest(){
      this.$Modal.info({
        title: '详细信息',
        content: this.msg,
//        onOk: () => {
//          this.$Message.info('点击了确定');
//        },
//        onCancel: () => {
//          this.$Message.info('点击了取消');
//        }
      });
//      if(this.msg&&this.msg!==''&&this.msg!==null){
//        if(this.msg.length>10){
//          alert('5.获取未来第n天的气象局降雨面数据(用于展示降雨信息)--getWeatherNDayRainArea--gainWeatherNDayRainArea\n' +
//            '6.来获取降雨的数据的影响的标的信息,以不同的降雨等级进行汇总--operateRainArea--operateRainArea')
//        }
//      }

    }
  },
  filters: {
    ellipsis (value) {
      if (!value) return ''
      if (value.length > 20) {
        return value.slice(0,8) + '...'
      }
      return value
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
