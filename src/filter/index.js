import filters from './filters'

const registerFilter = Vue => {
  //注册 全局 filter
  Vue.filter('dateFmt', filters.dateFilter)
  Vue.filter('getIntro', filters.getIntro)
}

export default registerFilter
