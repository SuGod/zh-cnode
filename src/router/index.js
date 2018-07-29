import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes,
  scrollBehavior: (to, from, savedPosition) => savedPosition || { x: 0, y: 0 }
})
/**
 * 全局路由守卫等.
 */

export default router
