import axios from '@/api/request'

export const replyPraise = (replyId, accesstoken) => axios.request({
  url: `/reply/${replyId}/ups`,
  method: 'post',
  data: { accesstoken }
})