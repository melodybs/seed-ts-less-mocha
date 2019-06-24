import KbnTaskForm from '@/components/molecules/KbnTaskForm.vue'
// import KbnButton from '@/components/atoms/KbnButton.vue'
import { mount, createLocalVue, shallowMount } from '@vue/test-utils'
// import { expect } from 'chai'
import Vuex from 'vuex'
import sinon from 'sinon'
import flushPromises from 'flush-promises'

describe('KbnTaskForm', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)

  let taskForm: any
  let actions: any
  let store: any
  // let KbnButtonComponentStub: any

  beforeEach((done: any): void => {
    actions = { addTask: sinon.stub() }
    store = new Vuex.Store({ state: {}, actions })
    taskForm = mount(KbnTaskForm, {
      propsData: { listId: 1 },
      store,
      localVue
    })
    taskForm.vm.$nextTick(done)
  })
  describe('handleAdd 테스트', (): void => {
    it('resolve 됨', (done: any): void => {
      actions.addTask.resolves()

      // 트리거 전
      expect(actions.addTask.called).toEqual(false)
      expect(taskForm.vm.name).toBe('')
      expect(taskForm.vm.progress).toEqual(false)
      expect(taskForm.vm.error).toBe('')
      expect(taskForm.findAll('.form-actions [type=button]').at(0).attributes('disabled')).toBeTruthy()
      expect(taskForm.emitted().close).toBeUndefined()

      // 트리거 (데이터 설정 후)
      taskForm.setData({ name: 'task name' })
      expect(taskForm.findAll('.form-actions [type=button]').at(0).attributes('disabled')).not.toBeTruthy()
      taskForm.vm.handleAdd()
      // taskForm.findAll('.form-actions [type=button]').at(0).trigger('click')

      // 트리거 직후
      expect(actions.addTask.called).toEqual(true)
      expect(taskForm.vm.progress).toEqual(true)
      expect(taskForm.vm.error).toBe('')

      // 트리거 첫번째 틱
      taskForm.vm.$nextTick(() => {
        const args = actions.addTask.args[0][1]
        expect(args.name).toBe('task name')
        expect(args.listId).toBe(1)
        // 트리거 두번째 틱
        taskForm.vm.$nextTick(() => {
          expect(taskForm.emitted().close.length).toBe(1)
          // 트리거 세번째 틱
          taskForm.vm.$nextTick(() => {
            // 트리거 네번째 틱
            taskForm.vm.$nextTick(() => {
              expect(taskForm.vm.progress).toEqual(false)
              expect(taskForm.vm.name).toBe('')
              expect(taskForm.findAll('.form-actions [type=button]').at(0).attributes('disabled')).toBeTruthy()
              done()
            })
          })
        })
      })
    })

    it('reject 됨', async (): Promise<void> => {
      actions.addTask.rejects(new Error('addTask error'))

      expect(taskForm.vm.error).toBe('')
      expect(taskForm.vm.name).toBe('')
      expect(taskForm.vm.progress).toEqual(false)
      expect(taskForm.vm.disableAddAction).toEqual(true)

      taskForm.setData({ name: 'task name' })
      taskForm.vm.handleAdd()

      expect(taskForm.vm.error).toBe('')
      expect(taskForm.vm.name).toBe('task name')
      expect(taskForm.vm.progress).toEqual(true)
      // expect(taskForm.vm.disableAddAction).toEqual(false)

      await flushPromises()

      expect(taskForm.vm.error).toBe('addTask error')
      expect(taskForm.vm.progress).toEqual(false)
      expect(taskForm.vm.disableAddAction).toEqual(true)
    })
  })

  describe('handleCancel', () => {
    it('emit close working', () => {
      expect(taskForm.emitted().close).toBeUndefined()

      taskForm.findAll('[type=button]').at(1).trigger('click')

      expect(taskForm.emitted().close.length).toBe(1)
    })
  })
})
