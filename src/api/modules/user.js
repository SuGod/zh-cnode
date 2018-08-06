import axios from '@/api/request'
import { getMessageCount } from './message'

/**
 * 获取用户信息
 * @param loginname
 */
export const getUserInfo = (loginname) => axios.get(`/user/${loginname}`)

/**
 * 获取用户收藏
 * @param loginname
 * @returns {*}
 */
export const getCollect = (loginname) => axios.get(`/topic_collect/${loginname}`)

export const getUserDetailCount = async (loginname) => {
  let [userInfo, collect, messages] = await Promise.all([getUserInfo(loginname), getCollect(loginname), getMessageCount()])
  return {
    score: String(userInfo.score),
    messageCount: String(messages.data),
    replysCount: String(userInfo.recent_replies.length),
    topicsCount: String(userInfo.recent_topics.length),
    collectCount: String(collect.length)
  }
}

/**
 * 验证token 是否正确
 * @param accesstoken
 */
export const authToken = (accesstoken) => axios.post('/accesstoken', { accesstoken })

/**
 * get /topic_collect/:loginname 用户所收藏的主题
 * @param loginname
 * @returns {*}
 */
export const getUserCollect = (loginname) => axios.get(`/topic_collect/${loginname}`)

