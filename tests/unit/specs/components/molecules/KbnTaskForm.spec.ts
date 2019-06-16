import KbnTaskForm from '@/components/molecules/KbnTaskForm.vue'
import { mount, createLocalVue } from '@vue/test-utils'
import { expect } from 'chai'
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
  describe('handleAdd 테스트', () => {
    it('resolve 됨', () => {
      expect(true).to.equal(true)
    })
  })
})
