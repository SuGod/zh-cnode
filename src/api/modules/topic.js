import axios from '@/api/request'
import { pageSize } from '@/config/'
import { getToken } from '@/utils/token'

/**
 * get /topics 主题首页
 *
 * page Number 页数
 * tab String 主题分类。目前有 ask share job good
 * limit Number 每一页的主题数量
 * mdrender String 当为 false 时，不渲染。默认为 true，渲染出现的所有 markdown 格式文本。
 */
export const getTopics = ({ tab = 'all', page = 1, limit = pageSize } = {}) => axios.get('/topics', { params: { tab, page, limit } })

/**
 * get /topic/:id 主题详情
 * mdrender String 当为 false 时，不渲染。默认为 true，渲染出现的所有 markdown 格式文本。
 * accesstoken String 当需要知道一个主题是否被特定用户收藏以及对应评论是否被特定用户点赞时，才需要带此参数。会影响返回值中的 is_collect 以及 replies 列表中的 is_uped 值。
 */
export const getTopic = (id, accesstoken) => {
  let params = {}
  let token = getToken()
  if (token && accesstoken) {
    params.accesstoken = token
  }
  return axios.get(`/topic/${id}`, { params })
}
