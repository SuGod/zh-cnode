export default {
  version: state => state.app.version,
  darkTheme: state => state.app.darkTheme,
  accesstoken: state => state.user.accesstoken,
  userInfo: state => state.user.userInfo,
  shift: state => state.app.shift
}
