import KbnTaskDetailForm from '@/components/molecules/KbnTaskDetailForm.vue'
import { mount, createLocalVue } from '@vue/test-utils'
import { expect } from 'chai'
import sinon from 'sinon'
import Vuex from 'vuex'
import i18n from '@/i18n'

describe('KbnTaskDetailForm', (): void => {
  let onupdateStub: any
  let taskDetailForm: any
  beforeEach(done => {
    // const localVue = createLocalVue()
    // localVue.use(Vuex)
    onupdateStub = sinon.stub()
    taskDetailForm = mount(KbnTaskDetailForm, {
      propsData: {
        task: {
          id: 1,
          name: 'Task Name',
          description: 'Task Description',
          listId: 1
        },
        onupdate: onupdateStub
      },
      i18n
      // ,localVue
    })
    taskDetailForm.setData({
      progress: false,
      error: ''
    })
    taskDetailForm.vm.$nextTick(done)
  })

  // 태스크 수정(업데이트) 테스트
  describe('handleClick 테스트', (): void => {
    it('resolve 됨', (done: any): void => {
      onupdateStub.resolves()

      // 기본값
      expect(onupdateStub.called).to.equal(false)
      expect(taskDetailForm.vm.progress).to.equal(false)
      expect(taskDetailForm.vm.error).to.equal('')

      // handleClick Trigger
      taskDetailForm.find('.form-actions button').trigger('click')
      expect(taskDetailForm.vm.progress).to.equal(true)

      taskDetailForm.vm.$nextTick(() => {
        expect(onupdateStub.called).to.equal(true)
        const updateInfo = onupdateStub.args[0][0]
        expect(updateInfo).to.deep.equal(taskDetailForm.props('task'))
        expect(taskDetailForm.vm.error).to.equal('')

        taskDetailForm.vm.$nextTick(() => {
          taskDetailForm.vm.$nextTick(() => {
            expect(taskDetailForm.vm.progress).to.equal(false)
            expect(taskDetailForm.vm.error).to.equal('')
            done()
          })
        })
      })
    })

    it('reject 됨', (done: any): void => {
      onupdateStub.rejects(new Error('taskUpdate error!'))

      // 기본값
      expect(onupdateStub.called).to.equal(false)
      expect(taskDetailForm.vm.progress).to.equal(false)
      expect(taskDetailForm.vm.error).to.equal('')

      // handleClick Trigger
      taskDetailForm.find('.form-actions button').trigger('click')
      expect(taskDetailForm.vm.progress).to.equal(true)

      taskDetailForm.vm.$nextTick(() => {
        expect(onupdateStub.called).to.equal(true)
        const updateInfo = onupdateStub.args[0][0]
        expect(updateInfo).to.deep.equal(taskDetailForm.props('task'))
        expect(taskDetailForm.vm.error).to.equal('')

        taskDetailForm.vm.$nextTick(() => {
          taskDetailForm.vm.$nextTick(() => {
            expect(taskDetailForm.vm.progress).to.equal(false)
            expect(taskDetailForm.vm.error).to.equal('taskUpdate error!')
            done()
          })
        })
      })
    })
  })
})
