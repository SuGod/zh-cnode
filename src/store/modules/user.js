import { authToken } from '@/api/modules/user'

export default {
  state: {
    accesstoken: localStorage.getItem('accesstoken'),
    userInfo: JSON.parse(localStorage.getItem('userinfo'))
  },
  mutations: {
    SET_ACCESSTOKEN (state, token) {
      state.accesstoken = token
    },
    UPDATE_USER_INFO (state, userInfo) {
      state.userInfo = { ...state.userInfo, ...userInfo }
    }
  },
  actions: {
    setToken ({ commit }, token) {
      commit('SET_ACCESSTOKEN', token)
      localStorage.setItem('accesstoken', token)
    },
    checkToken ({ commit }, accesstoken) {
      console.log(this)
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
    }
  }
}
