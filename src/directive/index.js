import directives from './directives'

const registerFilter = Vue => {
  //注册指令
  Vue.directive('highlight', directives.highlight)
}

export default registerFilter