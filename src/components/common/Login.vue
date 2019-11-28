<template>
  <div class="login" @keydown.enter="handleSubmit('formValidate')">
    <Card :bordered="false" class="login-modal" v-model="loginModal" :closable="false" :mask-closable="false">
      <!--<div class="login-bg"></div>-->
      <p slot="title" class="card-title">
        商业非车险风控服务平台
      </p>
      <div>
        <div class="login-bg"></div>
        <!--<h2 style="color:#abcdef;text-align:center">
          <img :src="require('@/assets/img/logo.png')" alt="" height="50"></h2>
        <h2 style="color: #ffffff">商业非车险风控服务平台</h2>-->
        <br>
        <div>
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" >
            <Form-item prop="name">
              <div class="line"></div>
              <Input v-model.trim="formValidate.name" placeholder="请输入工号">
                  <Icon type="ios-person-outline" slot="prepend"></Icon>
              </Input>
            </Form-item>
            <Form-item prop="password">
              <div class="line"></div>
              <Input v-model="formValidate.password" type="password" placeholder="请输入密码">
              <Icon type="ios-locked-outline" slot="prepend"></Icon>
              </Input>
            </Form-item>
            <span class="mes" style="display: block;">{{formValidate.errorMeg}}</span>
          </Form>
        </div>
      </div>
      <div class="changpass"><a v-on:click="change()">修改密码</a></div>
        <Button class="submit" type="primary" size="large" long :loading="modal_loading" @click="handleSubmit('formValidate')">登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录
        </Button>
      <br>
      <small style="text-align: center;display:block;margin-top: 25px;font-size: 12px;" class="subText">Copyright©2018中国人民财产保险股份有限公司</small>
      <div class="loginIconFolder">
        <a @click="downloadFile" title="手册下载"></a>
      </div>
    </Card>
    <!--<particles shapeType = "star"></particles>-->
    <Modal v-model="showModal" width="360" style="z-index: 9998" class="modifyPasswordModel" @on-cancel="cencel('modifyUser')">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>修改密码</span>
      </p>
      <div style="text-align:center">
        <Form ref="modifyUser" :model="modifyUser"  :rules="ruleValidate2">
          <Form-item prop="username" label="用户名：" >
            <Input v-model="modifyUser.username"  icon="ios-locked-outline" placeholder="请输入用户名..."
                   style="width: 300px"></Input>
          </Form-item>
          <Form-item prop="checkPassword" label="旧密码：" >
            <Input v-model="modifyUser.checkPassword" type="password" icon="ios-locked-outline" placeholder="请输入原密码..."
                   style="width: 300px"></Input>
          </Form-item>
          <Form-item prop="newPassword" label="新密码：" >
            <Input v-model="modifyUser.newPassword" type="password" icon="ios-locked-outline" placeholder="请输入新密码..."
                   style="width: 300px"></Input>
          </Form-item>
          <Form-item prop="confirmPassword" label="确认密码：">
            <Input v-model="modifyUser.confirmPassword" type="password" icon="ios-locked-outline" placeholder="请再次输入一遍新密码..."
                   style="width: 300px" autocomplete="off" ></Input>
            <Input type="password" style="width: 300px;display:none"></Input>
          </Form-item>
        </Form>
      </div>
      <div slot="footer">
        <Button type="warning" size="large" long :loading="modal_loading" @click="changePassword('modifyUser')">修改密码</Button>
      </div>
    </Modal>
    <!--<div class="logoImg">
      <img :src="require('@/assets/img/login1.png')" alt="">
    </div>-->
    <!--<div class="loginIconFolder">
      <a @click="downloadFile" ><Icon type="folder"></Icon>v1.0.0.1相关手册</a>
    </div>-->
  </div>
</template>
<script>
  import Cookies from 'js-cookie'
//  import Particles from '../views/Particles.vue'
  //  import {SERVER_BASE_URL} from '@/api/config'
  export default {
    name: 'login',
//    components: {Particles},
    data () {
      const validateName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'))
        } else {
          var reg = /^[0-9a-zA-Z]+$/
          if (value.match(reg) === null) {
            callback(new Error('用户名只能是字母或数字'))
          } else {
            callback()
          }
        }
      }
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
//          var reg = /^[0-9a-zA-Z]+$/
//          if (value.match(reg) === null) {
//            callback(new Error('密码只能是字母或数字'))
//          }
          var newPassword = this.modifyUser.newPassword
          if (newPassword !== null && newPassword !== '' && newPassword === value) {
            callback(new Error('新密码与旧密码不能一致！'))
          } else {
            callback()
          }
          callback()
        }
      }
      const validateNewPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新密码！'))
        } else {
//          var reg = /^[0-9a-zA-Z]+$/
//          if (value.match(reg) === null) {
//            callback(new Error('密码只能是字母或数字'))
//          }
          var checkPassword = this.modifyUser.checkPassword
          if (checkPassword !== null && checkPassword !== '' && checkPassword === value) {
            callback(new Error('新密码与旧密码不能一致！'))
          } else {
            callback()
          }
          var confirmPassword = this.modifyUser.confirmPassword
          if (confirmPassword !== null && confirmPassword !== '' && confirmPassword !== value) {
            callback(new Error('确认密码与新密码不一致！'))
          } else {
            callback()
          }
          callback()
        }
      }
      const validateConfigPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('确认密码不能为空！'))
        } else {
//          var reg = /^[0-9a-zA-Z]+$/
//          if (value.match(reg) === null) {
//            callback(new Error('密码只能是字母或数字'))
//          }
          var newPassword = this.modifyUser.newPassword
          if (newPassword !== null && newPassword !== '' && newPassword !== value) {
            callback(new Error('确认密码与新密码不一致！'))
          } else {
            callback()
          }
          callback()
        }
      }
      return {
        a: '#ffffff',
        c: 20,
        showModal: false,
        loginModal: true,
        modal_loading: false,
        formValidate: {
          name: '',
          password: '',
          errorMeg: ''
        },
        modifyUser: {
          beforeFlag: 'outSideFlag',
          username: '',
          checkPassword: '',
          newPassword: '',
          confirmPassword: ''
        },
        ruleValidate2: {
          username: [
            {validator: validateName, required: true, trigger: 'change'}
          ],
          checkPassword: [
            {validator: validatePass, required: true, trigger: 'change'}
          ],
          newPassword: [
            {validator: validateNewPass, required: true, trigger: 'change'}
          ],
          confirmPassword: [
            {validator: validateConfigPass, required: true, trigger: 'change'}
          ]
        },
        ruleValidate: {
          name: [
            {required: true, message: '工号不能为空', trigger: 'change'}
          ],
          password: [
            {required: true, message: '密码不能为空', trigger: 'change'}
          ]
        }
      }
    },
    methods: {
      downloadFile () {
        var fileName = 'document_Doc.zip'
//        var url = config.dev.baseServerUrl + '/downloadFile/' + fileName
//        var url = this.SERVER_BASE_URL + '/downloadFile/' + fileName
        var url = '/downloadFile/' + fileName
        window.location.href = url
      },
      changePassword (name) {
        this.modal_loading = true
        this.$refs[name].validate((valid) => {
          setTimeout(() => {
            if (valid) {
              this.$api.postMethodBody('/login/outModifyPassword', this.modifyUser).then((response) => {
                if (response !== null) {
                  if (response.responseCode === 'success') {
                    this.$Message.success(response.errorMessage)
                    this.$router.push({path: '/login', query: {password: response.returnPassword}})
                    this.showModal = false
                  } else if (response.responseCode === 'error') {
                    this.$Message.error(response.errorMessage)
                    this.showModal = false
                  }
                }
              }, (response) => {
              })
            } else {
            }
            this.modal_loading = false
          }, 2000)
        })
      },
      // 修改密码前模态框重置
      change () {
        this.showModal = true
        this.$refs['modifyUser'].resetFields()
      },
      // 关闭模态框重置校验
      cencel (val) {
        this.$refs[val].resetFields()
      },
      handleSubmit (name) { // login
        this.$refs[name].validate((valid) => {
          this.modal_loading = true
          setTimeout(() => {
            if (valid) {
              let dd = {userCode: this.formValidate.name, passWord: this.formValidate.password}
              this.axios.post('/riskcontrol/login/userLogin', dd).then(response => {
                console.log(response)
                let status = response.data.status
//                let userInfo = response.userInfo
                let message = response.data.message
                if (status === 1) {
                  let token = response.data.data.jwtToken
                  Cookies.set('jwtToken', token)
                  this.$store.commit('SET_USERINFO', response.data.data)
                  const userInfo =this.$store.getters.getUserInfo
                  this.$Message.success('登录成功!')
                  this.$router.push('/')
                } else {
                  this.modal_loading = false
                  parse(message)
                  this.formValidate.errorMeg = message
                }
              }).catch(response => {
                this.modal_loading = false
                this.formValidate.errorMeg = '登陆异常，请联系管理员'
              })
            } else {
              this.modal_loading = false
            }
          }, 2000)
        })
      }
    }
  }
  //   返回数据格式化方法，处理checkbox数组等数据
  function parse (data) {
    for (var key in data) {
      if (data[key]) {
        if (typeof (data[key]) === 'string' && data[key].match(/^\[(.*)\]$/)) {
          data[key] = JSON.parse(data[key])
        } else if (data[key] instanceof Array) {
          for (let ikey in data[key]) {
            var obj = data[key][ikey]
            for (var index in obj) {
              if (typeof (obj[index]) === 'string' && obj[index].match(/^\[(.*)\]$/)) {
                obj[index] = JSON.parse(obj[index])
              }
            }
          }
        } else if (data[key] instanceof Object) {
          for (let ikey in data[key]) {
            if (typeof (data[key][ikey]) === 'string' && data[key][ikey].match(/^\[(.*)\]$/)) {
              data[key][ikey] = JSON.parse(data[key][ikey])
            }
          }
        }
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  .ivu-card{
    .ivu-card-head{
      border: none;
    }
  }
  .login{
    height: 100%;
    margin: 14px;
    padding: 300px;
    background-image: url('../../assets/img/login-bg.png');
    background-position: center bottom;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    margin-top: 0;
    position: relative;
    .login-modal{
      width: 300px;
      height: 330px;
      margin: auto;
      padding: 24px;
      background-color: #ffffff;
      background: -webkit-radial-gradient(35px at top right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0) 99%, #ffffff 0%);
      background: -o-radial-gradient(35px at top right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0) 99%, #ffffff 0%);
      background: -moz-radial-gradient(35px at top right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0) 99%, #ffffff 0%);
      background: radial-gradient(35px at top right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0) 99%, #ffffff 0%);
      position: absolute;
      top: 50%;
      right: 22%;
      margin-top: -230px;
      z-index: 9999;
      border-radius: 10px;
      box-shadow: 0 0 14px 6px rgba(12, 67, 123, 0.2);
      .card-title{
        display: inline-block;
        color: #4d4f7e;
        font-size: 18px;
        font-weight: normal;
        border: none;
        padding: 0;
        height: 18px;
        line-height: 18px;
        text-align: right;
        background: url("../../assets/img/picclogo.png") no-repeat 0 1px;
        margin-top: 10px;
      }
      .ivu-form-item{
        margin-bottom: 28px;
        .ivu-form-item-content{
          line-height: 40px;
          .line{
            width: 1px;
            height: 28px;
            background: #a5a9d1;
            position: absolute;
            top: 7px;
            left: 47px;
            z-index: 2000;
          }
          .ivu-input-group{
            height: 40px;
            .ivu-input-group-prepend{
              width: 48px;
              border-color: #d6d7eb;
            }
            .ivu-input{
              height: 52px;
            }
          }
        }
      }
      .changpass{
        width: 100%;
        height: 14px;
        font-size: 14px;
        line-height: 14px;
        text-align: right;
        margin-bottom: 15px;
        margin-top: 8px;
        a{
          color: #898d9d;
        }
      }
      .submit{
        height: 40px;
        border: none;
        background: url("../../assets/img/submitbg.png") no-repeat center center;
        font-size: 18px;
        color: #ffffff;
        border-radius: 10px;
      }
      .subText{
        width: 106%;
        height: 12px;
        font-size: 12px;
        line-height: 12px;
        text-align: center;
        position: absolute;
        bottom: -58px;
        left: 0;
        margin-left: -11px;
      }
      .login-bg{
        width: 100%;
        height: 100%;
        background-color: #EEEEEE;
        border-radius: 5px;
        position: absolute;
        top: 0;
        left: 0;
        opacity: .4;
        z-index: -1;
      }
      .ivu-card-body{
        padding: 15px 25px;
      }
    }
    .ivu-card-body{
      padding: 0;
      margin: 0;
      background-color: #ffffff;
    }
    .ivu-input:focus{
      border-color: #D7DDE4;
      outline: 0;
      box-shadow: 0 0 0 2px #D7DDE4;
    }
    .logoImg{
      width: 188px;
      height: 62px;
      position: fixed;
      top: 30px;
      left: 30px;
      z-index: 2000;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .loginIconFolder{
      width: 73px;
      height: 73px;
      position: absolute;
      top: -98px;
      right: -57px;
      color: #30aaed;
      background-color: #EEEEEE;
      background: url("../../assets/img/Folder.png") no-repeat center center;
      &:hover{
        background: url("../../assets/img/Folder1.png") no-repeat center center;
      }
      a{
        display: inline-block;
        width: 100%;
        height: 100%;
        cursor: pointer;
      }
    }
  }
  .mes{
    font-size: smaller;
    color: red;
  }
</style>

