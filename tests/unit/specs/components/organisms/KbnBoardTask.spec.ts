import { expect } from 'chai'
import { mount, Wrapper, createLocalVue, shallowMount } from '@vue/test-utils'
import KbnBoardTask from '@/components/organisms/KbnBoardTask.vue'
import KbnTaskList from '@/components/organisms/KbnTaskList.vue'
import Vuex from 'vuex'
import state from '@/store/state'
import { CreateElement, VNode } from 'vue'
import prettyFormat from 'pretty-format'

describe('KbnBoardTask', (): void => {
  let boardTask: Wrapper<KbnBoardTask>
  let store: any
  // let TaskListComponentStub: any
  const localVue = createLocalVue()
  localVue.use(Vuex)
  store = new Vuex.Store({ state: {
    board: {
      lists: [
        { id: 1, name: 'TODO', items: [] },
        { id: 2, name: 'WIP', items: [] },
        { id: 3, name: 'DONE', items: [] }
      ]
    }
  } })
  /* TaskListComponentStub = {
    name: 'KbnTaskList',
    props: [
      {
        id: 1,
        name: 'name',
        items: []
      }
    ],
    render: (h: CreateElement): VNode => h('p', [ 'task list' ])
  } */

  beforeEach((done: any) => {
    boardTask = shallowMount(KbnBoardTask, {
      propsData: {
        lists: store.state.board.lists
      },
      // stubs: { 'kbn-task-list': TaskListComponentStub },
      store,
      localVue
    })
    boardTask.vm.$nextTick(done)
  })

  describe('Prop', () => {
    it('lists', () => {
      // console.log(123, boardTask.html())
      expect(boardTask.findAll('kbntasklist-stub').at(0).attributes('id')).to.equal('1')
      expect(boardTask.findAll('kbntasklist-stub').at(0).attributes('name')).to.equal('TODO')
      expect(boardTask.findAll('kbntasklist-stub').at(1).attributes('id')).to.equal('2')
      expect(boardTask.findAll('kbntasklist-stub').at(1).attributes('name')).to.equal('WIP')
      expect(boardTask.findAll('kbntasklist-stub').at(2).attributes('id')).to.equal('3')
      expect(boardTask.findAll('kbntasklist-stub').at(2).attributes('name')).to.equal('DONE')
    })
  })
})
