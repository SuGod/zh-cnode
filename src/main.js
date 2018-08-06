import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Material Design 推荐使用 Roboto 字体
import 'typeface-roboto'
// muse-ui
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import '@/assets/styles/global.styl'
//主题
import theme from 'muse-ui/lib/theme'
// 全局加载进度条
import NProgress from 'muse-ui-progress'
import 'muse-ui-progress/dist/muse-ui-progress.css'
// 加载数据时显示动效
import Loading from 'muse-ui-loading'
import 'muse-ui-loading/dist/muse-ui-loading.css'
// Message 弹框
import Message from 'muse-ui-message'
import 'muse-ui-message/dist/muse-ui-message.css'
// 消息提示
import Toast from 'muse-ui-toast'

// 注册 全局 filter
import registerFilter from '@/filter/'
import registerDirective from '@/directive/'

// 移动端touch 事件
// import VueTouch from 'vue-touch'

// Vue.use(VueTouch, { name: 'v-touch' })

Vue.use(MuseUI)

// theme.use('dark')

/**
 * NProgress 默认配置
 * zIndex: 2000,          // progress z-index
 top: 0,                // position fixed top
 speed: 300,            // progress speed
 color: 'primary',      // color
 size: 2,               // progress size
 className: ''          // progress custom class
 */
Vue.use(NProgress)
/**
 * Loading 默认配置
 *overlayColor: 'hsla(0,0%,100%,.9)',        // 背景色
 size: 48,
 color: 'primary',                           // color
 className: ''                               // loading class name
 */
Vue.use(Loading)
/*
 * Message 默认配置
 *successIcon: 'check_circle',                    // 成功图标
  infoIcon: 'info',                               // 信息图标
  warningIcon: 'priority_high',                   // 提醒图标
  errorIcon: 'warning',                           // 错误图标
  iconSize: 24,                                   // 图标大小
  width: 350,                                     // 对话框的宽度
  maxWidth: '80%',                                // 对话框最大宽度
  className: '',                                  // 对话框的样式
  okLabel: '确定',                                 // 对话框确定按钮文字
  cancelLabel: '取消',                             // 对话框取消按钮文字
  transition: 'scale'                             // 对话框显示的动画 'slide-left', 'slide-right', 'fade', 'scale'
* */
Vue.use(Message)
/*
 * Toast 默认配置
 *position: 'bottom',               // 弹出的位置
  time: 2000,                       // 显示的时长
  closeIcon: 'close',               // 关闭的图标
  close: true,                      // 是否显示关闭按钮
  successIcon: 'check_circle',      // 成功信息图标
  infoIcon: 'info',                 // 信息信息图标
  warningIcon: 'priority_high',     // 提醒信息图标
  errorIcon: 'warning'              // 错误信息图标
* */
Vue.use(Toast, { position: 'top' })

Vue.config.productionTip = false

// document.addEventListener('touchmove', e => e.preventDefault(), false)

// 注册filter
registerFilter(Vue)
// 注册指令
registerDirective(Vue)

/**
 * 切换主题
 */

theme.use(eval(localStorage.getItem('darkTheme')) ? 'dark' : 'light')

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
