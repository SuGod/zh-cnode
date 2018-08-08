import theme from 'muse-ui/lib/theme'

export default {
  state: {
    version: 0.1,
    darkTheme: eval(localStorage.getItem('darkTheme')),
    shift: localStorage.getItem('shift') || 'home'
  },
  mutations: {
    switchTheme (state, themeName) {
      state.darkTheme = themeName
    },
    updateShift (state, shift) {
      localStorage.setItem('shift', shift)
      state.shift = shift
    }
  },
  actions: {
    switchTheme (context, isDark) {
      localStorage.setItem('darkTheme', isDark)
      context.commit('switchTheme', isDark)
      theme.use(isDark ? 'dark' : 'light')
    }
  }
}
