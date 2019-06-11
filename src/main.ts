import Vue, { CreateElement, VNode } from 'vue'
import 'es6-promise' // 프라미스 폴리필
import App from './App.vue'
import ErrorBoundary from './ErrorBoundary.vue'
import router from './router'
import store from './store' // Vuex 스토어 인스턴스 임포트

Vue.config.productionTip = false
Vue.config.performance = true // NODE_EVN == 'development'로 설정하여 프로파일링 활성화

// 컴포넌트오류 처리. ErrorBoundary 컴포넌트 설치
Vue.component(ErrorBoundary.name, ErrorBoundary)

// 전역오류 처리.
Vue.config.errorHandler = (err, vm, info) => {
  console.error('errorHandler err:', err)
  console.error('errorHandler vm:', vm)
  console.error('errorHandler info:', info)
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store, // 임포트한 스토어 인스턴스를 'store' 옵션으로 전달
  render: (h: CreateElement): VNode => h(App)
})
