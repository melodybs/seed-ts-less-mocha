import KbnTaskForm from '@/components/molecules/KbnTaskForm.vue'
import KbnButton from '@/components/atoms/KbnButton.vue'
import { mount, createLocalVue } from '@vue/test-utils'
// import { expect } from 'chai'
import Vuex from 'vuex'
import sinon from 'sinon'

describe('KbnTaskForm', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)

  let taskForm: any
  let actions: any
  let store: any

  beforeEach((): void => {
    actions = { addTask: sinon.stub() }
    store = new Vuex.Store({ state: {}, actions })
    taskForm = mount(KbnTaskForm, {
      propsData: { listId: 1 },
      store,
      localVue
    })
  })
  describe('handleAdd 테스트', (): void => {
    it('resolve 됨', (done: any): void => {
      actions.addTask.resolves()

      expect(taskForm.vm.name).toBe('')
      expect(taskForm.vm.progress).toEqual(false)
      expect(taskForm.vm.error).toBe('')
      expect(taskForm.find('.form-actions button').attributes('disabled')).toBe('disabled')

      console.log(taskForm.find('.form-actions button').html())
      taskForm.find('.form-actions button').trigger('click')
      console.log(taskForm.find('.form-actions button').html())
      taskForm.vm.$nextTick(() => {
        expect(actions.addTask.called).toEqual(true)
        // expect(taskForm.vm.progress).toEqual(true)
        done()
      })
    })
  })
})
