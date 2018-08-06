/*import HttpRequest from '@/utils/httpRequest'

const axios = new HttpRequest()

export default axios*/

import axios from 'axios'
import Toast from 'muse-ui-toast'
import baseURL from '_conf/url'
import * as TokenUtils from '@/utils/token'

// 创建 axios 实例
const instance = axios.create({
  baseURL,
  timeout: 5 * 1000,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'X-URL-PATH': location.pathname
  }
})

instance.interceptors.request.use(config => {
  // 如果请求地址为验证 token
  if (config.url.indexOf('/accesstoken') === -1) {
    let accesstoken = TokenUtils.getToken()
    if (accesstoken) {
      let { method } = config
      if (method === 'post') {
        config.data = { ...config.data, accesstoken }
      } else if (method === 'get') {
        config.params = { ...config.params, accesstoken }
      }
    }
   /* else {
      return Promise.reject('请登录后再操作.')
    }*/
  }
  return config
}, error => {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(res => {
  let { data } = res
  if (!(data instanceof Blob)) {
    if (data.hasOwnProperty('success') && data.success && data.data) {
      return data.data
    }
  }
  return data
}, (error) => {
  Toast.error('服务内部错误')
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default instance
