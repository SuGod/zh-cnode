import moment from 'moment'

moment.locale('zh-cn')

const types = { share: '分享', ask: '问答', job: '招聘', good: '精华', top: '置顶', dev: '测试' }

const filters = {
  dateFilter (value) {
    // 使用moment这个日期格式化类库实现日期的格式化功能
    // return moment(input).format(fmtString)
    return moment(value).fromNow()
  },
  getIntro (value, len) {
    return value.replace(/<[^>]*>|/g, '').trim().substring(0, len)
  },
  typeFmt (value) {
    return types[value]
  },
}

export default filters
