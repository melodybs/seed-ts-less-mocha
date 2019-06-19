import { mount, Wrapper, shallowMount } from '@vue/test-utils'
import { expect } from 'chai'
import KbnTaskListHeader from '@/components/molecules/KbnTaskListHeader.vue'

describe('KbnTaskListHeader', (): void => {
  describe('태스크 리스트 헤더 렌더링 테스트', () => {
    let taskListHeader: Wrapper<KbnTaskListHeader>
    beforeEach(() => {
      taskListHeader = mount(KbnTaskListHeader, {
        propsData: { name: '' }
      })
    })

    describe('name 렌더링', (): void => {
      it('TODO', (): void => {
        taskListHeader.setProps({ name: 'TODO' })
        expect(taskListHeader.find('.title h2').text()).to.equal('TODO')
      })
      it('WIP', (): void => {
        taskListHeader.setProps({ name: 'WIP' })
        expect(taskListHeader.find('.title h2').text()).to.equal('WIP')
      })
      it('DONE', (): void => {
        taskListHeader.setProps({ name: 'DONE' })
        expect(taskListHeader.find('.title h2').text()).to.equal('DONE')
      })
    })

    describe('emit', (): void => {
      it('add', (): void => {
        expect(taskListHeader.emitted().add).to.be.undefined
        taskListHeader.find('.kbn-button-text').trigger('click')
        expect(taskListHeader.emitted().add.length).to.equal(1)
      })
    })
  })
})
