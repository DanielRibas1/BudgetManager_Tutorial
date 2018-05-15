// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
//  import router from './router/index.js'
import VueCookie from 'vue-cookie'
import Vuetify from 'vuetify'
import Authentication from '@/components/pages/Authentication'
import router from './router/router'

// Components
import Header from './components/Header'
import List from './components/List/List'

// Styles
import('../node_modules/vuetify/dist/vuetify.min.css')

Vue.use(VueRouter)
Vue.use(VueCookie)
Vue.use(Vuetify)

// Register Components
Vue.component('app-header', Header)
Vue.component('list', List)

Vue.config.productionTip = false

Authentication.checkAuthentication()

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
