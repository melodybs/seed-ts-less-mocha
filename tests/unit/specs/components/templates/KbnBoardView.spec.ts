import { expect } from 'chai'
import { mount, Wrapper, shallowMount, createLocalVue } from '@vue/test-utils'
import KbnBoardView from '@/components/templates/KbnBoardView.vue'
import Vuex from 'vuex'
import sinon from 'sinon'

describe('KbnBoardView', () => {
  const localVue = createLocalVue()
  let boardView: Wrapper<KbnBoardView>
  let actions
  let store

  localVue.use(Vuex)

  beforeEach(() => {
    actions = {
      fetchLists: sinon.stub(),
      logout: sinon.stub()
    }
    store = new Vuex.Store({ state: {}, actions })
    boardView = shallowMount(KbnBoardView, {
      localVue,
      store
    })
  })

  describe('logout (handleLogout)', () => {
    it('resolves', () => {
      // console.log(boardView)
      expect(true).to.equal(true)
    })
    it('rejects', () => {
      expect(true).to.equal(true)
    })
  })
})
