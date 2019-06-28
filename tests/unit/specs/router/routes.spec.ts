/* import { expect } from 'chai'
import VueRouter, { NavigationGuard } from 'vue-router'
import Vuex, { Store } from 'vuex'
import routes from '@/router/routes'
import Vue, { CreateElement, VNode } from 'vue'
import { mount, createLocalVue, shallowMount } from '@vue/test-utils'

const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(Vuex)

const App = {
  name: 'app',
  render: (h: CreateElement): VNode => h('router-view')
}
const KbnBoardViewStub = {
  name: 'KbnBoardView',
  render: (h: CreateElement): VNode => h('p', ['KbnBoardView'])
}
const KbnTaskDetailModalStub = {
  name: 'KbnTaskDetailModal',
  render: (h: CreateElement): VNode => h('p', ['KbnTaskDetailModal'])
}
const KbnLoginViewStub = {
  name: 'KbnLoginView',
  render: (h: CreateElement): VNode => h('p', ['KbnLoginView'])
}

const mockAuthorizeToken = (store: Store<any>): NavigationGuard<Vue> => {
  const injector = require('inject-loader!@/router/guards')
  const storeMock = injector({ '../store': store })
  return storeMock.authorizeToken
}

const setup = (state: any): any => {
  const store: Store<any> = new Vuex.Store({ state })
  const router: VueRouter = new VueRouter({ routes })

  router.beforeEach(mockAuthorizeToken(store))

  return mount(App, {
    stubs: {
      'kbn-board-view': KbnBoardViewStub,
      'kbn-task-detail-modal': KbnTaskDetailModalStub,
      'kbn-login-view': KbnLoginViewStub
    },
    localVue,
    store,
    router
  })
}

describe('Routes', () => {
  describe('/', () => {
    it('인증 토큰 있음', () => {
      const app = setup({
        auth: {
          token: '1234567890abcdef',
          userId: 1
        }
      })
      console.log(1, app.html())
    })
    it('인증 토큰 없음', () => {
      const app = setup({
        auth: {
          token: null,
          userId: null
        }
      })
      console.log(2, app.html())
    })
  })

  describe('task/:id', () => {
    it('', () => {

    })
  })

  describe('/login', () => {
    it('', () => {

    })
  })

  describe('*', () => {
    it('', () => {

    })
  })
})
 */
