<template>
  <Card>
    <div>
      <div>
        <Form ref="mainRefVo" :model="mainModelVo"  :rules="validateMainVo">
          <Row>
            <Col span="24">
            <Col span="16">
            <FormItem label="国民经济代码" prop="businessSourceCName">
              <Input type="text" v-model="mainModelVo.businessSourceCName"/>
            </FormItem>
            </Col>
            </Col>
          </Row>
          <Row>
            <Col span="8">
              <Button type="primary" @click="login('mainRefVo')" >点击</Button>
              <Button type="primary" @click="getEnter" >获取</Button>
            </Col>
          </Row>

        </Form>
      </div>
    </div>
  </Card>
</template>
<script>
import Cookies from 'js-cookie'
export default{
  name:'validatename',
  data (){
    const validateMainBusiness = (rule,value,callback) =>{
      var countNumber = 12342.232252
      countNumber = countNumber.toString()
      var flag = this.common.checkNumber(countNumber)
//      var flag = false
      if(!flag){
        callback(new Error('数字长度超过限制！'))
      }else {
        callback()
      }
    }
    return {
      mainModelVo:{
        businessSourceCName: ''
      },
      validateMainVo: {
        businessSourceCName:[
          {validator: validateMainBusiness, required: true,trigger: 'change'}
        ]
      }
    }
  },
  methods: {
    login(name){
      this.$refs['mainRefVo'].validate((valid) => {
        if (valid) {
          alert('success')
          Cookies.set('name','lqk')
        }else {
          alert('error')
        }
      })
    },
    getEnter () {
     let name= Cookies.get('name')
      alert(name)
    }
  }

}
</script>
<style>

</style>
