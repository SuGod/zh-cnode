import moment from 'moment'

moment.locale('zh-cn')

const filters = {
  dateFilter (value) {
    // 使用moment这个日期格式化类库实现日期的格式化功能
    // return moment(input).format(fmtString)
    return moment(value).fromNow()
  },
  getIntro (value, len) {
    return value.replace(/<[^>]*>|/g, '').trim().substring(0, len)
  }
}

export default filters
