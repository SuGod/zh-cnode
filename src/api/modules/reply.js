import axios from '@/api/request'

/**
 * 评论点赞
 * @param replyId
 * @returns {AxiosPromise<any>}
 */
export const replyPraise = (replyId) => axios.post(`/reply/${replyId}/ups`)

/**
 * 发表评论
 * @param topicId
 * @param content
 * @param accesstoken
 * @returns {AxiosPromise<any>}
 */
export const createReply = (topicId, content, accesstoken) => axios.post(`/topic/${topicId}/replies`, { content, accesstoken })
