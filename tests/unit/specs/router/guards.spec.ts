import { expect } from 'chai'
import { mount, createLocalVue, Wrapper } from '@vue/test-utils'
import VueRouter, { NavigationGuard } from 'vue-router'
import Vuex, { Store } from 'vuex'
import { CreateElement, VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'
import State from '@/store/state'

/* // App 컴포넌트
@Component({ name: 'app' })
class App extends Vue {
  render = (h: CreateElement): VNode => h('router-view')
}
// Top 컴포넌트
@Component({ name: 'top' })
class Top extends Vue {
  render = (h: CreateElement): VNode => h('p', ['top'])
}
// Login 컴포넌트
@Component({ name: 'login' })
class Login extends Vue {
  render = (h: CreateElement): VNode => h('p', ['login'])
} */
// App 컴포넌트
const App = {
  name: 'app',
  render: (h: CreateElement): VNode => h('router-view')
}
// Top 컴포넌트
const Top = {
  name: 'top',
  render: (h: CreateElement): VNode => h('p', ['top'])
}
// Login 컴포넌트
const Login = {
  name: 'login',
  render: (h: CreateElement): VNode => h('p', ['login'])
}

// 네비게이션 가드 구현 파일 안에서 사용할 Vuex 스토어 목업을 만드는 헬퍼 함수
const mockAuthorizeToken = (store: Store<State>): NavigationGuard<Vue> => {
  const injector = require('inject-loader!@/router/guards')
  const storeMock = injector({ '../store': store })
  return storeMock.authorizeToken
}

const setup = (state: State): any => {
  // Vuex 스토어 생성
  const store: Store<State> = new Vuex.Store({ state })

  // Vue Router 생성
  const router: VueRouter = new VueRouter({
    routes: [
      {
        path: '/',
        component: Top,
        meta: { requiresAuth: true }
      },
      {
        path: '/login',
        component: Login
      }
    ]
  })

  // 네비게이션 가드 역할을 하는 authorizeToken 훅을 설치
  router.beforeEach(mockAuthorizeToken(store))

  // 마운트 및 래퍼 함수 반환
  return mount(App, {
    localVue,
    store,
    router
  })
}

// 생성자로 로컬Vue 인스턴스를 생성
const localVue = createLocalVue()

// 로컬Vue 인스턴스에 Vue Router 및 Vuex 설치
localVue.use(VueRouter)
localVue.use(Vuex)

describe('beforeEach 가드 훅', (): void => {
  describe('인증 토큰 있음', (): void => {
    it('그대로 진행함', (): void => {
      const app: any = setup({
        auth: {
          token: '1234567890abcdef',
          userId: 1
        }
      })
      expect(app.text()).to.equal('top')
    })
  })

  describe('인증 토큰 없음', (): void => {
    it('/login 으로 리다이렉트', () => {
      const app = setup({})
      expect(app.text()).to.equal('login')
    })
  })
})
