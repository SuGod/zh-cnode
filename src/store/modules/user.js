import { authToken } from '@/api/modules/user'
import { getMessageCount } from '@/api/modules/message'

export default {
  state: {
    accesstoken: localStorage.getItem('accesstoken'),
    userInfo: JSON.parse(localStorage.getItem('userinfo')),
    messageCount: 0
  },
  mutations: {
    SET_ACCESSTOKEN (state, token) {
      state.accesstoken = token
    },
    UPDATE_USER_INFO (state, userInfo) {
      state.userInfo = { ...state.userInfo, ...userInfo }
    },
    UPDATE_MESSAGE_COUNT (state, count) {
      state.messageCount = count
    }
  },
  actions: {
    setToken ({ commit }, token) {
      commit('SET_ACCESSTOKEN', token)
      localStorage.setItem('accesstoken', token)
    },
    unreadMessageCount ({ commit }) {
      getMessageCount().then(res => {
        console.log(res)
      })
    },
    checkToken ({ commit }, accesstoken) {
      return new Promise(async (resolve, reject) => {
        authToken(accesstoken).then(res => {
          let { success, avatar_url, id, loginname } = res
          if (success) {
            commit('UPDATE_USER_INFO', { avatar_url, id, loginname })
            localStorage.setItem('userinfo', JSON.stringify({ avatar_url, id, loginname }))
            this.dispatch('setToken', accesstoken)
            resolve(res)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    logout ({ commit }) {
      window.localStorage.clear()
      window.location.reload()
    }
  }
}
