<template>
  <div>
    <div style="padding: 10px;">
      <Card>
        <div class="title">
          <Icon type="search"></Icon>
          请假查询
        </div>
        <div>
          <!--v-show="selectShowFlag"-->
          <Form ref="leaveMainVo" :model="leaveMainVo" label-position="right" class="form1"  :rules="ruleValidate" :label-width="140">
            <Row>
              <Col span="8">
              <FormItem label="人员编号：" prop="classCode">
                <Input v-model="leaveMainVo.personNo" placeholder="请输入..." style="width: 100%;"/>
              </FormItem>
              </Col>
            </Row>

            <Row v-for="(item,index) in list" :key="'dL_A' + index">
              <Col span="8">
                <FormItem :label="item.value" :prop="item.key">
                  <Input v-model="item.key" placeholder="请输入..." style="width: 100%;"/>
                </FormItem>
              </Col>
            </Row>
            <Row v-for="(item,index) in list" :key="'dL_B' +index">
              <Col span="8">
                <FormItem :label="item.value" :prop="item.key">
                  <Input v-model="item.key" placeholder="请输入..." style="width: 100%;"/>
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
            <i aria-hidden="true"></i>
          </div>
        </div>
      </Card>
    </div>
    <!--<div style="padding: 10px;">-->
      <!--<Card v-if="showFlag">-->
        <!--<div class="title" :width="100" style="display:inline-block">-->
          <!--<Icon type="document-text"></Icon>-->
          <!--查询结果-->
        <!--</div>-->
        <!--<div style="float:right" :width="100">-->
          <!--<Poptip confirm @on-ok="deleteAll(multipleSelection)" title="您确认删除这些内容吗？">-->
            <!--<Button type="primary" size="small">删除</Button>-->
          <!--</Poptip>-->
        <!--</div>-->
        <!--<div style="padding-right:20px;float:right" :width="100">-->
          <!--<Button type="primary" size="small" v-on:click="exportRiskInsMainResult() ">导出</Button>-->
        <!--</div>-->
        <!--<div class="result-wrapper">-->
          <!--<div >-->
            <!--<Table stripe size="small" :loading="loading" :columns='riskReportMainColumns' :data='riskReportMainList' ref="selection"-->
                   <!--@on-row-dblclick="rowBrowse"  @on-sort-change="changeOrderType" @on-select-all="selectAll" @on-selection-change="selectOne"></Table>-->
            <!--<div :style="{textAlign:center}" class="btnbox">-->
              <!--<Page :total='mm.totalCount' :page-size="mm.pageSize" :current="mm.pageNo" show-total class='paging' @on-change='changepage' :page-size-opts="[5,15,50]" show-elevator showSizer @on-page-size-change="changepagesize"></Page>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</Card>-->
      <!--<CurrencyDialog :dialog-config="DialogConfig" @sync-dialog-show-flag="syncDialogShowFlag" @click-on-row="CurrencyDialogClickOnRow">-->
      <!--</CurrencyDialog>-->
    <!--</div>-->
    <!--<Modal v-model="modal1" :footer-hide="true" @on-cancel="cancel" title="风控报告审核流程">-->
      <!--<Timeline>-->
        <!--<div v-for="item in lctList">-->
          <!--<TimelineItem>-->
            <!--<p>审核步骤：{{item.nodeName}}</p>-->
            <!--<p> 审核人名称：{{item.operateName}}</p>-->
            <!--<p>审核时间：{{item.operateTime}}</p>-->
          <!--</TimelineItem>-->
        <!--</div>-->
      <!--</Timeline>-->
    <!--</Modal>-->
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
      return {
        center: 'center',
        leaveMainVo:{
          personNo: ''
        },
        list:[
          {key:'1',value: 'aaa'},
          {key:'2',value: 'bbb'},
          {key:'3',value: 'cccc'}
        ],
        ruleValidate:{}
      }
    },
    created(){

    },
    methods:{
      query(){
        this.axios.get('/MavenSSM/leave/test').then((response)=>{
          console.log('you are right!')
//          this.newsList=response.data.data;
        }).catch((response)=>{
          console.log(response);
        })
      }
    }
  }
</script>
<style>

</style>
