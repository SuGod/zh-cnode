import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import store from '@/store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes
})

router.afterEach((to, from) => {
  store.commit('updateShift', to.name)
})
/**
 * 全局路由守卫等.
 */

export default router
