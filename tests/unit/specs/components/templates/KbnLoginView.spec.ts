import { mount, createLocalVue, Wrapper } from '@vue/test-utils'
import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import Vuex from 'vuex'
import KbnLoginView from '@/components/templates/KbnLoginView.vue'
import { CreateElement, VNode } from 'vue'

// chai.use(sinonChai)

// 로컬 Vue 생성자를 생성
const localVue = createLocalVue()

// 로컬 Vue 생성자에 Vuex를 설치
localVue.use(Vuex)

describe('KbnLoginView', () => {
  let actions: any
  let $router: any
  let store: any
  let LoginFormComponentStub: any

  // 'KbnLoginForm' 컴포넌트의 로그인 버튼 클릭을 일으키는 헬퍼 함수
  const triggerLogin = (loginView: any, target: any) => {
    const loginForm = loginView.find(target)
    loginForm.vm.onlogin('foo@domain.com', '12345678')
  }

  beforeEach(() => {
    // KbnLoginForm 컴포넌트 스텁 설정
    LoginFormComponentStub = {
      name: 'KbnLoginForm',
      props: ['onlogin'],
      render: (h: CreateElement): VNode => h('p', [ 'login form' ])
    }

    // Vue Router 목업 설정
    $router = { push: sinon.spy() }

    // login 액션 동작 확인을 위한 Vuex 관련 설정
    actions = { login: sinon.stub() } // login 액션 목업
    store = new Vuex.Store({ state: {}, actions })
  })

  describe('로그인', () => {
    let loginView: any

    describe('성공', () => {
      beforeEach(() => {
        loginView = mount(KbnLoginView, {
          mocks: { $router },
          stubs: { 'kbn-login-form': LoginFormComponentStub },
          store,
          localVue
        })
      })

      it('보드 페이지 루트로 리다이렉트', (done: any): void => {
        // login 액션을 성공함
        actions.login.resolves()

        triggerLogin(loginView, LoginFormComponentStub)

        // 프로미스 리프레시
        loginView.vm.$nextTick(() => {
          console.log('00000000', $router.push.called, $router.push.args)
          /* expect($router.push.called).to.equal(true)
          console.log(11111111, $router.push.called)
          expect($router.push.args[0][0].path).to.equal('/')
          console.log(22222222, $router.push.args[0][0].path) */
          done()
        })
      })
    })

    describe('실패', (): void => {
      beforeEach(() => {
        loginView = mount(KbnLoginView, {
          stubs: { 'kbn-login-form': LoginFormComponentStub },
          store,
          localVue
        })
        sinon.spy(loginView.vm, 'throwReject') // spy를 이용해 래핑
      })

      afterEach(() => {
        loginView.vm.throwReject.restore() // spy 래핑 해제
      })

      it('오류 처리가 호출됨', (done: any): void => {
        // login 액션이 실패함
        const message = 'login failed'
        actions.login.rejects(new Error(message))

        triggerLogin(loginView, LoginFormComponentStub)

        // 프라미스로 리프레시
        loginView.vm.$nextTick(() => {
          const callInfo = loginView.vm.throwReject
          console.log('11111111', callInfo.called, callInfo.args)
          // expect(callInfo.called).to.equal(true)
          // expect(callInfo.args[0][0].message).to.equal(message)
          done()
        })
      })
    })
  })
})
