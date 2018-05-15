import Vue from 'vue'
import VueRouter from 'vue-router'
import * as Authentication from './../components/pages/Authentication'

import routes from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: routes
})

const authDefault = Authentication.default
router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    if (authDefault.user.authenticated) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
