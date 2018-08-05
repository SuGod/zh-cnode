/**
 * 消息通知
 */
import axios from '@/api/request'

/**
 * 获取未读消息数
 * @returns {*}
 */
export const getMessageCount = (accesstoken) => axios.get('/message/count', { params: { accesstoken } })

/**
 * 获取已读和未读消息
 * @returns {*}
 */
export const getMessages = (accesstoken) => axios.get('/messages', { params: { accesstoken } })
