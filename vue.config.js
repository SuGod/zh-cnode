const path = require('path')

const resolve = dir => path.join(__dirname, dir)

// 这里需要修改为你线上项目存放的路径
// 比如你打包的文件放到服务器的my-app文件夹，域名为a.com，则应改为
// http(s)://a.com/my-app/
// const BASE_URL = 'https://iview.github.io/iview-admin/'

module.exports = {
  // baseUrl: BASE_URL,
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src')) // key,value自行定义，
      .set('_conf', resolve('config'))
  }
}
