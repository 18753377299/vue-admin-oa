<template>
  <Card>
    <div>
      <div>
        <Form ref="riskReportFireDangerProListC" :model="riskReportFireDangerList"  :label-width="140" >
          <Input type="text" v-model="name" ></Input>  <Button type="primary" @click="clickEvent">set</Button>
          <Row>
            <Col span="12">
              <FormItem label="消防水源供应" prop="fireWaterSupply">
                <CheckboxGroup v-model="riskReportFireDangerList.fireWaterSupply" >
                  <Checkbox label="A" :disabled=browseFlag><span>市政水源</span></Checkbox>
                  <Checkbox label="B" :disabled=browseFlag><span>消防水池且水位充足</span></Checkbox>
                  <Checkbox label="C" :disabled=browseFlag><span>天然水源</span></Checkbox>
                  <Checkbox label="D" :disabled=browseFlag><span>消防水池且水位不充足</span></Checkbox>
                  <Checkbox label="E" :disabled=browseFlag><span>无</span></Checkbox>
                </CheckboxGroup>
              </FormItem>
            </Col>
            <Col span="12">
            <FormItem label="风控建议" prop="fireWaterSupply_2_1">
              <RadioGroup v-model="fireWaterSupply_2_1">
                <Radio label="A" >谨慎承保</Radio>
                <Radio label="B" >提高条件承保</Radio>
                <Radio label="C" >竞争性承保</Radio>
              </RadioGroup>
            </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
      <div>
        <br/>
        fullName: {{fullName}} <br/>
        firstName: {{firstName}} <br/>
        lastName: {{lastName}}
      </div>
    </div>
    <div v-for="(result, index) in results">
      <Input v-model="result.marks">{{result.name}}</Input>
    </div>
    totalMarks总分数：{{totalMarks}}
    <div id="app">
      <h1>{{message}}</h1>
      <!--如果是method的时候{{methodTest}}  中应该有括号，否则会出现 “function () { [native code] }”-->
      <p class="test1">{{methodTest}}</p>
      <p class="test2-1">{{methodTest()}}</p>
      <p class="test2-2">{{methodTest()}}</p>
      <p class="test2-3">{{methodTest()}}</p>
      <p class="test3-1">{{computedTest}}</p>
      <p class="test3-2">{{computedTest}}</p>
    </div>
  </Card>
</template>
<script>
  export default {
    data () {
      return {
        riskReportFireDangerList:{
          fireWaterSupply: []
        },
        browseFlag: false,
        firstName: '',
        lastName: '',
        name: '',
        results: [
          {name: 'english',marks: 30},
          {name: 'chinese', marks: 40},
          {name: 'math',marks: 60}
        ],
        message: '哈喽撒'
      }
    },
//    computed里面的属性可以不用在data里面声明，就可以进行双向绑定
    computed: {
      fireWaterSupply_2_1(){
        return 'A'
      },
      fullName: {
        get: function () {
          return this.firstName+ " "+this.lastName
        },
        set: function (newValue){
            let names=newValue.split(" ")
            this.firstName = names[0]
            this.lastName = names[names.length-1]
        }
      },
      totalMarks: function () {
        let total = 0
        for (let i=0;i<this.results.length;i++){
          total+=parseInt(this.results[i].marks)
        }
        return total
      },
      computedTest() {
        return this.message + '现在我用的是computed'
      }
    },
    methods: {
      clickEvent(){
        this.fullName = this.name
        this.axios.put('/MavenSSM/into/test').then((response)=>{
          console.log('you are test!')
        }).catch((response)=>{
          console.log(response)
        })
      },
      methodTest() {
        return this.message + '现在我用的是methods'
      }
    }
  }
</script>
<style>

</style>
