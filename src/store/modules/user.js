export default {
  state: {
    accesstoken: localStorage.getItem('accesstoken')
  },
  mutations: {
    SET_ACCESSTOKEN (state, token) {
      state.accesstoken = token
    }
  },
  actions: {
    setToken ({ commit }, token) {
      commit('SET_ACCESSTOKEN', token)
      localStorage.setItem('accesstoken', token)
    }
  }
}
