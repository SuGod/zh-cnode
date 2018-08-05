import axios from 'axios'
import Toast from 'muse-ui-toast'
import baseURL from '_conf/url'
import * as TokenUtils from '@/utils/token'

class httpRequest {
  constructor () {
    this.options = {
      method: '',
      url: ''
    }
    // 存储请求队列
    this.queue = {}
  }
  
  // 销毁请求实例
  destroy (url) {
    delete this.queue[url]
    const queue = Object.keys(this.queue)
    return queue.length
  }
  
  // 请求拦截
  interceptors (instance, url) {
    // 添加请求拦截器
    instance.interceptors.request.use(config => {
      let accesstoken = TokenUtils.getToken()
      
      if (config.method === 'post') {
        if (accesstoken) {
          config.data = { ...config.data, accesstoken }
        } else {
          return reject('请登录后再操作.')
        }
      }
      return config
    }, error => {
      // 对请求错误做些什么
      return Promise.reject(error)
    })
    
    // 添加响应拦截器
    instance.interceptors.response.use(res => {
      let { data } = res
      const is = this.destroy(url)
      if (!is) {
        setTimeout(() => {
          // Spin.hide()
        }, 500)
      }
      if (!(data instanceof Blob)) {
        if (data.hasOwnProperty('success') && data.success) {
          return data.data
        }
        /* if (data.code !== 200) {
          if (data.code === 401) {
            TokenUtils.clearToken()
            window.location.href = '/#/login'
            Toast.error('未登录，或登录失效，请登录')
          } else {
            if (data.msg) Toast.error(data.msg)
          }
          return false
        } */
      }
      return data
    }, (error) => {
      Toast.error('服务内部错误')
      // 对响应错误做点什么
      return Promise.reject(error)
    })
  }
  
  // 创建实例
  static create () {
    let conf = {
      baseURL,
      timeout: 5 * 1000,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'X-URL-PATH': location.pathname
      }
    }
    return axios.create(conf)
  }
  
  // 合并请求实例
  /* mergeReqest (instances = []) {
    //
  } */
  
  // 请求实例
  request (options) {
    let instance = httpRequest.create()
    this.interceptors(instance, options.url)
    options = Object.assign({}, options)
    this.queue[options.url] = instance
    return instance(options)
  }
}

export default httpRequest
