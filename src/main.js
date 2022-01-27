import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import './plugins/base'
import './plugins/chartist'
import './plugins/vee-validate'
import vuetify from './plugins/vuetify'
import i18n from './i18n'
import auth from './services/auth'

import LoadScript from 'vue-plugin-load-script'

Vue.use(LoadScript)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) {
    if (!auth.getUser()) {
      next({
        path: '/login',
      })
    } else {
      if (!to.matched.length) {
        next('/404')
      } else {
        next()
      }
    }
  } else {
    if (!to.matched.length) {
      next('/404')
    } else {
      next()
    }
  }
})

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App),
}).$mount('#app')
