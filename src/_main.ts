import Vue from 'vue'
import 'es6-promise/auto' //+ Vuex Promise 사용. 모든 브라우저 지원 위한 폴리필.
import App from './App.vue'
import router from './_router'
import store from './store'
import './registerServiceWorker'

//- Vue.config.productionTip = false
Vue.config.productionTip = process.env.NODE_ENV === 'production'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
