import theme from 'muse-ui/lib/theme'

export default {
  state: {
    version: 0.1,
    systemTheme: localStorage.getItem('theme') || 'light'
  },
  mutations: {
    switchTheme (state, themeName) {
      state.systemTheme = themeName
    }
  },
  actions: {
    switchTheme (context, isDark) {
      let themeName = isDark ? 'dark' : 'light'
      theme.use(themeName)
      localStorage.setItem('theme', themeName)
      context.commit('switchTheme', themeName)
    }
  }
}
