import Vue from 'vue'
import axios from 'axios'


/* 创建axios实例 */
const axiosService = axios.create({
  baseURL: process.env.API_HOST, /* 在config/dev.evn.js、prod.evn.js里面进行配置 */
  timeout: 5000 /* 设置超时时间为5s */
})

/* request拦截器 ==> 对请求参数进行处理 */
axiosService.interceptors.request.use(
  config => {
    // config.method === 'post'
    //   ? config.data = qs.stringify({...config.data})
    //   : config.params = {...config.params}
    // /* 判断method是否为post，为post则对参数进行序列化，不为post择不进行序列化 */
    // config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    config.headers.jwtToken = 'lqk333'
    return config
  }, error => {
    Toast.error('错误，请重新操作...')
    Promise.reject(error)
  })

/* respone拦截器 ==> 对响应做处理 */
axiosService.interceptors.response.use(
  response => {
    if (response.data) {
      return response.data
    } else {
      Toast.error('数据错误，请重试...')
    }
  }, error => {
    /* 判断error的status代码，并将对应的信息告知用户 */
    let text = ''
    let err = JSON.parse(JSON.stringify(error))
    if (err.response.status) {
      switch (error.response.status) {
        case 400:
          text = '请求错误(400)，请重新申请'
          break
        case 401:
          text = '登录错误(401)，请重新登录'
          return this.$router.replace('/Login')
        case 403:
          text = '拒绝访问(403)'
          break
        case 404:
          text = '请求出错(404)'
          break
        case 408:
          text = '请求超时(408)'
          break
        case 500:
          text = '服务器错误(500)，请重启软件或切换功能页！'
          break
        case 501:
          text = '服务未实现(501)'
          break
        case 502:
          text = '网络错误(502)'
          break
        case 503:
          text = '服务不可用(503)'
          break
        case 504:
          text = '网络超时(504)'
          break
        case 505:
          text = 'HTTP版本不受支持(505)'
          break
        default:
          text = '网络连接出错'
      }
    } else {
      text = '连接服务器失败,请退出重试!'
    }
    Toast.error(text)
    return Promise.reject(error)
  }
)

/* 将写好的axios实例暴露出去 */
export default axiosService
