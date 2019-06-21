import KbnTaskList from '@/components/organisms/KbnTaskList.vue'
import { mount, createLocalVue, Wrapper, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import sinon from 'sinon'
import { expect } from 'chai'

describe('KbnTaskList', () => {
  let taskList: Wrapper<KbnTaskList>
  let actions: any
  let store: any
  const localVue = createLocalVue()
  localVue.use(Vuex)
  actions = { removeTask: sinon.stub() }
  store = new Vuex.Store({ state: {}, actions })

  beforeEach((done: any): void => {
    taskList = shallowMount(KbnTaskList, {
      propsData: {
        id: 1,
        name: 'TODO',
        items: [
          { id: 1, name: 'name', description: 'description', listId: 1 },
          { id: 2, name: 'name2', description: 'description2', listId: 2 }
        ]
      },
      store,
      localVue
    })
    taskList.vm.$nextTick(done)
  })

  describe('removeTask (handleRemove)', () => {
    it('reject', () => {
      actions.removeTask.rejects()
      expect(actions.removeTask.called).to.equal(false)
      taskList.find('kbntaskcard-stub').trigger('click')
      taskList.vm.handleRemove({ id: 1, listId: 1 })
      expect(actions.removeTask.called).to.equal(true)
    })
  })
})
