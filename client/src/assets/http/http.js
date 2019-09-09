import axios from 'axios'
import { Message, Loading } from 'element-ui'
import router from '../../router'

let loading
function startLoading () {
  loading = Loading.service({
    lock: true,
    text: '拼命加载中',
    background: 'rgba(0,0,0,0,7)'
  })
}

function endLoading () {
  loading.close()
}

// 请求拦截
axios.interceptors.request.use(config => {
  // 加载动画
  startLoading()
  // 请求头添加authorization
  config.headers.Authorization = localStorage.dhsToken
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截
axios.interceptors.response.use(response => {
  // 结束加加载动画
  endLoading()
  return response
}, error => {
  endLoading()
  // 获取错误状态码
  const { status } = error.response
  if (status === 401) {
    Message.error('token失效，请重新登录')
    localStorage.removeItem('dhsToken')
    router.push('/login')
  }
  if (status === 400) {
    Message.error('登录密码或邮箱错误')
  }
  return Promise.reject(error)
})

export default axios
