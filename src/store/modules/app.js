import theme from 'muse-ui/lib/theme'

export default {
  state: {
    version: 0.1,
    darkTheme: eval(localStorage.getItem('darkTheme'))
  },
  mutations: {
    switchTheme (state, themeName) {
      state.darkTheme = themeName
    }
  },
  actions: {
    switchTheme (context, isDark) {
      console.log(isDark)
      localStorage.setItem('darkTheme', isDark)
      context.commit('switchTheme', isDark)
      theme.use(isDark ? 'dark' : 'light')
    }
  }
}
