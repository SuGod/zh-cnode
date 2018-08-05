/**
 * token 相关,暂不用 cookie
 * @type {string}
 */

export const TokenKey = 'accesstoken'

/**
 * 获取token
 * @returns {string | null}
 */
export const getToken = () => {
  return window.localStorage.getItem(TokenKey)
}

/**
 * 设置token
 * @param token
 */
export const setToken = (token) => {
  window.localStorage.setItem(TokenKey, token)
}

/**
 * 清理token
 */
export const clearToken = () => {
  window.localStorage.clear()
}
