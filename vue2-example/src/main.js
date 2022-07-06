import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import VueLazyLoad from './plugins/vue-lazy-load'

Vue.use(VueLazyLoad, {
  preLoad: 1,
  loading: require('./assets/logo.png')
})

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
