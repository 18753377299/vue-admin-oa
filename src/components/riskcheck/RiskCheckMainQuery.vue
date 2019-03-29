<template>
  <div>
    <div style="padding: 10px;">
      <Card>
        <div class="title">
          <Icon type="search"></Icon>
          巡检报告查询
        </div>
        <div >
          <!--v-show="selectShowFlag"-->
          <Form ref="riskCheckMainVo"  :rules="ruleValidate"  :model="riskCheckMainVo" label-position="right" class="form1" :label-width="140">
            <Row>
              <Col span="8">
              <FormItem label="被保险人：" prop="claimName">
                <Input type="text" v-model="riskCheckMainVo.insuredName"></Input>
              </FormItem>
              </Col>

              <Col span="8">
                <Upload action='' :before-upload="upload">
                  <i-button type="ghost" icon="ios-cloud-upload-outline">上传文件</i-button>
                </Upload>
              </Col>
              <!--<Col span="8">-->
              <!--<FormItem label="巡检编号：" prop="riskCname">-->
                <!--<Input type="text" placeholder="请输入..."  v-model="riskCheckMainVo.riskCname"/>-->
                <!--</Input>-->
              <!--</FormItem>-->
              <!--</Col>-->
              <!--<Col span="8">-->
              <!--<FormItem label="出险年度：" prop="claimYear">-->
                <!--<DatePicker type="year" placeholder="请选择" v-model="riskCheckMainVo.claimYear" style="width: 100%" :editable="readFlag" @on-change="checkDate" @on-clear="closeDate"></DatePicker>-->
              <!--</FormItem>-->
              <!--</Col>-->
              <!--<Col span="7">-->
              <!--<FormItem label="赔款金额：" prop="claimAmountLow">-->
                <!--<Input type="text" placeholder="请输入..." v-model="riskCheckMainVo.claimAmountLow"/>-->
                <!--</Input>-->
              <!--</FormItem>-->
              <!--</Col>-->
              <!--<Col span="5">-->
              <!--<FormItem label="至" prop="claimAmountHigh" :label-width="30">-->
                <!--<Input type="text" placeholder="请输入..." v-model="riskCheckMainVo.claimAmountHigh"/>-->
                <!--</Input>-->
              <!--</FormItem>-->
              <!--</Col>-->
              <!--<Col span="12">-->
              <!--<FormItem label="查勘险类：" prop="riskNames">-->
                <!--<Select v-model="riskCheckMainVo.riskNames" filterable multiple>-->
                  <!--<Option v-for="item in riskNameList" :value="item.value" :key="item.value">{{ item.label }}</Option>-->
                <!--</Select>-->
              <!--</FormItem>-->
              <!--</Col>-->
              <!--<Col span="12">-->
              <!--<FormItem label="查勘行业：" prop="professions">-->
                <!--<Select v-model="riskCheckMainVo.professions" multiple >-->
                  <!--&lt;!&ndash;filterable :loading="loadingP"&ndash;&gt;-->
                  <!--<Option v-for="item in professionList" :value="item.value" :key="item.value">{{ item.label }}</Option>-->
                <!--</Select>-->
              <!--</FormItem>-->
              <!--</Col>-->
              <!--<Col span='12'>-->
              <!--<FormItem label="出险原因：" prop="claimReasons">-->
                <!--<Select v-model="riskCheckMainVo.claimReasons"  multiple >-->
                  <!--&lt;!&ndash;filterable :loading="loading" @click="remoteMethodSelect('claimReason')"&ndash;&gt;-->
                  <!--<Option v-for="item in claimReasonList" :value="item.value" :key="item.value">{{ item.label }}</Option>-->
                <!--</Select>-->
              <!--</FormItem>-->
              <!--</Col>-->
              <!--<Col span='12'>-->
              <!--<FormItem label="案件来源：" prop="senders">-->
                <!--<Select v-model="riskCheckMainVo.senders"  multiple filterable >-->
                  <!--&lt;!&ndash;@click="remoteMethodSelect('sender')"&ndash;&gt;-->
                  <!--&lt;!&ndash;:loading="loadingS"&ndash;&gt;-->
                  <!--<Option v-for="item in sendersList" :value="item.value" :key="item.value">{{ item.label }}</Option>-->
                <!--</Select>-->
              <!--</FormItem>-->
              <!--</Col>-->
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
            <Table stripe size="small"  :columns='riskInfoClaimColumns' :data='riskInfoClaimList' ref="selection"></Table>
            <!--:loading="loading"-->
            <div :style="{textAlign:center}" class="btnbox">
              <Page :total='totalCount' :page-size="pageSize" :current="pageNo" show-total class='paging' @on-change='changepage' :page-size-opts="[5,15,50]" show-elevator showSizer @on-page-size-change="changepagesize"></Page>
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
  export default {
    data (){
      return {
        totalCount:'',
        pageSize: 5,
        pageNo: 1,
        riskCheckMainVo: {
          insuredName: ''
        }
      }
    },
    created(){},
    methods:{
      upload(file){
        var data ={file: file}
        let formData = new FormData();
        formData.append('file',file)
        this.axios.post('/riskcontrol/file/fileUpload',formData).then((response)=>{
          console.log('you are right!')
//          this.showFlag = true
//          this.riskInfoClaimList=response.data.result;
//          this.totalCount = response.data.totalCount
        }).catch((response)=>{
          console.log(response)
        })
      },
      changepage(index){
        this.pageNo = index
        this.query()
      },
      changepagesize(size){
        this.pageSize = size
        this.query()
      },
      query(){
        this.axios.post('/riskcontrol/riskinfo-api/queryRiskCheckMain',this._data).then((response)=>{
          console.log('you are right!')
//          this.showFlag = true
//          this.riskInfoClaimList=response.data.result;
//          this.totalCount = response.data.totalCount
        }).catch((response)=>{
          console.log(response)
        })
      }
    }
  }
</script>
<style>

</style>
