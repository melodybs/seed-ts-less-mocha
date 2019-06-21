import { expect } from 'chai'
import { mount, Wrapper, createLocalVue } from '@vue/test-utils'
import KbnBoardTask from '@/components/organisms/KbnBoardTask.vue'
import Vuex from 'vuex'
import state from '@/store/state'

describe('KbnBoardTask', (): void => {
  let boardTask: Wrapper<KbnBoardTask>
  let store: any
  const localVue = createLocalVue()
  localVue.use(Vuex)
  store = new Vuex.Store({/*  state: {
    board: {
      lists: [
        { id: 1, name: 'TODO', items: [] },
        { id: 2, name: 'WIP', items: [] },
        { id: 3, name: 'DONE', items: [] }
      ]
    }
  }  */})

  beforeEach((done: any) => {
    boardTask = mount(KbnBoardTask, {
      propsData: {
        lists: () => []
      },
      store,
      localVue
    })
    boardTask.vm.$nextTick(done)
  })
  describe('Prop', () => {
    it('lists', () => {
      expect(true).to.equal(true)
    })
  })
})
