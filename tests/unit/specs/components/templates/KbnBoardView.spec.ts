import { expect } from 'chai'
import { mount, Wrapper, shallowMount, createLocalVue } from '@vue/test-utils'
import KbnBoardView from '@/components/templates/KbnBoardView.vue'
import Vuex from 'vuex'
import sinon from 'sinon'
// import sinonStubPromise from 'sinon-stub-promise'
import state from '@/store/state'
import flushPromises from 'flush-promises'
import i18n from '@/i18n'

// sinonStubPromise(sinon)

describe('KbnBoardView', () => {
  const localVue = createLocalVue()
  let boardView: any
  let actions: any
  let store: any
  let $router: any

  localVue.use(Vuex)

  beforeEach(() => {
    actions = {
      fetchLists: sinon.stub(),
      logout: sinon.stub()
    }
    $router = { push: sinon.spy() }
    store = new Vuex.Store({ state, actions })
    boardView = mount(KbnBoardView, {
      mocks: { $router },
      i18n,
      localVue,
      store
    })
    sinon.spy(boardView.vm, 'throwReject')
    // boardView.vm.$nextTick(done)
  })
  afterEach(() => {
    boardView.vm.throwReject.restore() // spy 래핑 해제
  })

  describe('created (Lifecycle)', () => {
    describe('fetchLists (loadList)', () => {
      it('called, progress', () => {
        // console.log(123, boardView.vm.$options.created)
        // actions.fetchLists.resolves()
        expect(actions.fetchLists.called).to.be.true
        /* // 첫번째 틱
        boardView.vm.$nextTick(() => {
          expect(boardView.vm.$data.progress).to.be.false
          expect(boardView.vm.$data.message).to.equal('로딩 중...')
        }) */
        /* // 플러시
        await flushPromises()
        expect(boardView.vm.$data.progress).to.equal(false)
        expect(boardView.vm.$data.message).to.equal('') */
      })
      it('rejects', async () => {
        // actions.fetchLists.rejects(new Error('fetchLists error'))
        expect(actions.fetchLists.called).to.equal(true)
        /* // 첫번째 틱
        boardView.vm.$nextTick(() => {
          expect(boardView.vm.$data.progress).to.equal(true)
          expect(boardView.vm.$data.message).to.equal('로딩 중...')
        })
        // 두번째 틱
        boardView.vm.$nextTick(() => {
          const callInfo = boardView.vm.throwReject
          expect(callInfo.called).to.equal(true)
          expect(callInfo.args[0][0].message).to.equal('111')
        })
        // 플러시
        await flushPromises()
        expect(boardView.vm.$data.progress).to.equal(false)
        expect(boardView.vm.$data.message).to.equal('') */
      })
    })
  })

  describe('logout (handleLogout)', () => {
    it('resolves', () => {
      actions.logout.resolves()
      expect(actions.logout.called).to.be.false
      expect(boardView.vm.progress).to.be.false
      expect(boardView.vm.message).to.equal('')
      expect($router.push.called).to.be.false

      boardView.vm.handleLogout()

      // 첫번째 틱
      boardView.vm.$nextTick(() => {
        expect(actions.logout.called).to.be.true
        expect(boardView.vm.progress).to.be.true
        expect(boardView.vm.message).to.equal('로그아웃 중...')

        // 두번째 틱
        boardView.vm.$nextTick(() => {
          expect($router.push.called).to.be.true
          expect($router.push.args[0][0].path).to.equal('/login')

          // 세번째 틱
          boardView.vm.$nextTick(() => {
            const callInfo = boardView.vm.throwReject
            expect(callInfo.called).to.be.false

            // 네번째 틱
            boardView.vm.$nextTick(() => {
              expect(boardView.vm.progress).to.be.false
              expect(boardView.vm.message).to.equal('')
            })
          })
        })
      })
    })
    it('rejects', () => {
      actions.logout.rejects(new Error('logout error'))
      expect(actions.logout.called).to.be.false
      expect(boardView.vm.progress).to.be.false
      expect(boardView.vm.message).to.equal('')
      expect($router.push.called).to.be.false

      boardView.vm.handleLogout()

      // 첫번째 틱
      boardView.vm.$nextTick(() => {
        expect(actions.logout.called).to.be.true
        expect(boardView.vm.progress).to.be.true
        expect(boardView.vm.message).to.equal('로그아웃 중...')

        // 두번째 틱
        boardView.vm.$nextTick(() => {
          expect($router.push.called).to.be.false

          // 세번째 틱
          boardView.vm.$nextTick(async () => {
            const callInfo = boardView.vm.throwReject
            expect(callInfo.called).to.be.true
            expect(callInfo.args[0][0].message).to.equal('logout error')

            // 나머지 플러시
            await flushPromises()
            // expect(boardView.vm.progress).to.be.false
            // expect(boardView.vm.message).to.equal('')
          })
        })
      })
    })
  })
})
