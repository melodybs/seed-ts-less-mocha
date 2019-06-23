import KbnTaskList from '@/components/organisms/KbnTaskList.vue'
import { mount, createLocalVue, Wrapper, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import sinon from 'sinon'
import { expect } from 'chai'
import flushPromises from 'flush-promises'
import prettyFormat from 'pretty-format'

describe('KbnTaskList', () => {
  let taskList: any
  let actions: any
  let store: any
  const localVue = createLocalVue()
  localVue.use(Vuex)
  actions = {
    removeTask: sinon.stub(),
    moveToTask: sinon.stub(),
    moveTaskFrom: sinon.stub(),
    performTaskMoving: sinon.stub()
  }
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
    it('reject', /* async */ () => {
      actions.removeTask.rejects(new Error('removeTask error'))
      expect(actions.removeTask.called).to.equal(false)

      const r = taskList.vm.handleRemove({ id: 1, listId: 1 })
      // await flushPromises()

      expect(actions.removeTask.called).to.equal(true)
      expect(r).to.instanceOf(Promise)
    })
  })

  describe('moveToTask (handleChange)', () => {
    it('added', /* async */ () => {
      actions.moveToTask.rejects(new Error('moveToTask error'))
      expect(actions.moveToTask.called).to.equal(false)

      // console.log(taskList.vm.$props.items[0])
      const r = taskList.vm.handleChange({ added: { element: taskList.vm.$props.items[0] } })
      // await flushPromises()

      expect(actions.moveToTask.called).to.equal(true)
      expect(r).to.instanceOf(Promise)
    })
    it('removed', /* async */ () => {
      actions.moveTaskFrom.rejects(new Error('moveTaskFrom error'))
      expect(actions.moveTaskFrom.called).to.equal(false)

      // console.log(taskList.vm.$props.items[0])
      const r = taskList.vm.handleChange({ removed: { element: taskList.vm.$props.items[0] } })
      // await flushPromises()

      expect(actions.moveTaskFrom.called).to.equal(true)
      expect(r).to.instanceOf(Promise)
    })
  })

  /* describe('performTaskMoving (handleEnd)', () => {
    it('rejects', () => {
      actions.performTaskMoving.rejects(new Error('performTaskMoving error'))
      expect(actions.performTaskMoving.called).to.equal(false)

      const r = taskList.vm.handleEnd()

      expect(actions.performTaskMoving.called).to.equal(true)
    })
  }) */
})
