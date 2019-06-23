import Vue, { CreateElement, VNode } from 'vue'
// import './plugins/vuetify'
import 'es6-promise' // 프라미스 폴리필
import App from './App.vue'
import ErrorBoundary from './ErrorBoundary.vue'
import router from './router'
import store from './store' // Vuex 스토어 인스턴스 임포트
import * as Sentry from '@sentry/browser'
import * as Integrations from '@sentry/integrations'

// Sentry
Sentry.init({
  dsn: 'https://470df340ba9e4d94b51d733391c10bf5@sentry.io/1486363',
  integrations: [new Integrations.Vue({ Vue, attachProps: true })]
})

/* Vue 전역 설정 */
// & https://kr.vuejs.org/v2/api/#silent
// Vue.config.silent = true
// & https://kr.vuejs.org/v2/api/#optionMergeStrategies
// Vue.config.optionMergeStrategies
// & https://kr.vuejs.org/v2/api/#devtools
// Vue.config.devtools = true
// & https://kr.vuejs.org/v2/api/#warnHandler
// Vue.config.warnHandler
// & https://kr.vuejs.org/v2/api/#ignoredElements
// Vue.config.ignoredElements
// & https://kr.vuejs.org/v2/api/#keyCodes
// Vue.config.keyCodes
// & https://kr.vuejs.org/v2/api/#productionTip
Vue.config.productionTip = true // false
// & https://kr.vuejs.org/v2/api/#performance
Vue.config.performance = true // NODE_EVN == 'development'로 설정하여 프로파일링 활성화

// & https://kr.vuejs.org/v2/api/#Vue-component
// 컴포넌트오류 처리. ErrorBoundary 컴포넌트 설치
Vue.component(ErrorBoundary.name, ErrorBoundary)

// & https://kr.vuejs.org/v2/api/#errorHandler
// 전역오류 처리.
Vue.config.errorHandler = (err, vm, info) => {
  console.error('errorHandler err:', err)
  console.error('errorHandler vm:', vm)
  console.error('errorHandler info:', info)
}

/* Vue 전역 API */
// & https://kr.vuejs.org/v2/api/#Vue-extend
// Vue.extend( options )
// & https://kr.vuejs.org/v2/api/#Vue-nextTick
// Vue.nextTick( [callback, context] )
// & https://kr.vuejs.org/v2/api/#Vue-set
// Vue.set( target, key, value )
// & https://kr.vuejs.org/v2/api/#Vue-delete
// Vue.delete( target, key )
// & https://kr.vuejs.org/v2/api/#Vue-directive
// Vue.directive( id, [definition] )
// & https://kr.vuejs.org/v2/api/#Vue-filter
// Vue.filter( id, [definition] )
// & https://kr.vuejs.org/v2/api/#Vue-component
// Vue.component( id, [definition] )
// & https://kr.vuejs.org/v2/api/#Vue-use
// Vue.use( plugin )
// & https://kr.vuejs.org/v2/api/#Vue-mixin
// Vue.mixin( mixin )
// & https://kr.vuejs.org/v2/api/#Vue-compile
// Vue.compile( template )
// & https://kr.vuejs.org/v2/api/#Vue-version
// Vue.version

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store, // 임포트한 스토어 인스턴스를 'store' 옵션으로 전달
  render: (h: CreateElement): VNode => h(App)
})
