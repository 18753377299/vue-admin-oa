<template>
  <div>
    <div style="padding: 10px;">
      <Card>
        <div class="title">
          <Icon type="search"></Icon>
          典型案例分析
        </div>
        <div >
          <!--v-show="selectShowFlag"-->
          <Form ref="riskInfoClaimVo"  :rules="ruleValidate"  :model="riskInfoClaimVo" label-position="right" class="form1" :label-width="140">
            <Row>
              <Col span="12">
              <FormItem label="案例名称：" prop="claimName">
                  <Input type="text" v-model="riskInfoClaimVo.claimName"></Input>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="产品名称：" prop="riskCname">
                <Input type="text" placeholder="请输入..."  v-model="riskInfoClaimVo.riskCname"/>
                </Input>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="出险年度：" prop="claimYear">
                <DatePicker type="year" placeholder="请选择" v-model="riskInfoClaimVo.claimYear" style="width: 100%" :editable="readFlag" @on-change="checkDate" @on-clear="closeDate"></DatePicker>
              </FormItem>
              </Col>
              <Col span="7">
              <FormItem label="赔款金额：" prop="claimAmountLow">
                <Input type="text" placeholder="请输入..." v-model="riskInfoClaimVo.claimAmountLow"/>
                </Input>
              </FormItem>
              </Col>
              <Col span="5">
              <FormItem label="至" prop="claimAmountHigh" :label-width="30">
                <Input type="text" placeholder="请输入..." v-model="riskInfoClaimVo.claimAmountHigh"/>
                </Input>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="查勘险类：" prop="riskNames">
                <Select v-model="riskInfoClaimVo.riskNames" filterable multiple>
                  <Option v-for="item in riskNameList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="查勘行业：" prop="professions">
                <Select v-model="riskInfoClaimVo.professions" multiple  filterable :loading="loadingP">
                  <Option v-for="item in professionList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
              </Col>
              <Col span='12'>
              <FormItem label="出险原因：" prop="claimReasons">
                <Select v-model="riskInfoClaimVo.claimReasons"  multiple filterable
                        :loading="loading" @click="remoteMethodSelect('claimReason')">
                  <Option v-for="item in claimReasonList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
              </Col>
              <Col span='12'>
              <FormItem label="案件来源：" prop="senders">
                <Select v-model="riskInfoClaimVo.senders"  multiple
                        filterable > <!--@click="remoteMethodSelect('sender')"-->
                  <!--:loading="loadingS"-->
                  <Option v-for="item in sendersList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
              </Col>
            </Row>
            <div :style="{textAlign:center}">
              <Button type="primary" icon="ios-search" @click="query()">查询</Button>
              <Button type="dashed" icon="refresh" >重置</Button>
            </div>
          </Form>
        </div>
        <div class="hideButton">
          <!--@click='changeselect'-->
          <div class="iconBox" >
            <i :class="showicon" aria-hidden="true"></i>
          </div>
        </div>
      </Card>
    </div>
    <div style="padding: 10px;">
    <Card v-if="showFlag">
    <div class="title" :width="100" style="display:inline-block">
    <Icon type="document-text"></Icon>
    查询结果
    </div>
    <!--<div style="float:right" :width="100">-->
      <!--<Poptip confirm @on-ok="deleteAll(multipleSelection)" title="您确认删除这些内容吗？">-->
        <!--<Button type="primary" size="small">删除</Button>-->
      <!--</Poptip>-->
    <!--</div>-->
    <!--<div style="padding-right:20px;float:right" :width="100">-->
      <!--<Button type="primary" size="small" v-on:click="exportRiskInsMainResult() ">导出</Button>-->
    <!--</div>-->
    <div class="result-wrapper">
    <div >
      <Table stripe size="small" :loading="loading" :columns='riskInfoClaimColumns' :data='riskInfoClaimList' ref="selection"></Table>
      <div :style="{textAlign:center}" class="btnbox">
        <!--<Page :total='mm.totalCount' :page-size="mm.pageSize" :current="mm.pageNo" show-total class='paging' @on-change='changepage' :page-size-opts="[5,15,50]" show-elevator showSizer @on-page-size-change="changepagesize"></Page>-->
      </div>
    </div>
    </div>
    </Card>
    <!--<CurrencyDialog :dialog-config="DialogConfig" @sync-dialog-show-flag="syncDialogShowFlag" @click-on-row="CurrencyDialogClickOnRow">-->
    <!--</CurrencyDialog>-->
    </div>
    <div v-show="false">
      <Col span="12" style="margin-bottom: 10px;position: relative;height: 300px;">
      <div id="myChart" style="width:330px;height: 300px;position: absolute;top: 0;left: 0;right: 0;bottom: 0;margin: auto;"></div>
      </Col>
    </div>
  </div>
</template>
<script>
  export default{
    data (){
      const validateClaimName = (rule, value, callback) => {
      }
      return {
        showicon: 'fa fa-angle-double-up fa-2x',
        center: "center",
        showFlag: false,
        riskInfoClaimVo: {
          claimName: '',
          riskCname:'',
          claimYear:'',
          claimAmountLow: '',
          claimAmountHigh: '',
          riskNames:[],
          professions:[],
          claimReasons:[],
          senders:[]
        },
        riskNameList:[],
        professionList:[],
        claimReasonList:[],
        sendersList:[],
        // table 表的列名称
        riskInfoClaimColumns:[
          {
            type: 'selection',
            minWidth: 40,
            align: 'center'
          },
          {
            title: '风险编号',
            key: 'riskFileNo',
            align: 'center',
            minWidth: 220
          },
          {
            title: '被保险人',
            key: 'insuredName',
            minWidth: 300,
            align: 'center'
          }
        ],
        // table表的列数据
        riskInfoClaimList: [],
        ruleValidate: {
//          claimName: [
////            {required: true,message: '不能为空',trigger: 'blur'},
//            {validator: validateClaimName}
//          ]
        }
      }
    },
    created(){

    },
    methods:{
      query(){
        this.$refs['riskInfoClaimVo'].validate((valid) => {
          if(valid){
            this.axios.post('/riskinfo-api/queryRiskInfoClaim',this.riskInfoClaimVo).then((response)=>{
              console.log('you are right!')
//          this.newsList=response.data.data;
            }).catch((response)=>{
              console.log(response)
            })
          }
        })

      }
    }
  }
</script>
<style>

</style>
