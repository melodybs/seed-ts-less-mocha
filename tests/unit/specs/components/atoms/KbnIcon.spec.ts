import { shallowMount, Wrapper } from '@vue/test-utils'
import KbnIcon from '@/components/atoms/KbnIcon.vue'
import { expect } from 'chai'

describe('KbnIcon', (): void => {
  describe('프로퍼티', (): void => {
    // name, 클래스, 텍스트 테스트
    describe('name', (): void => {
      describe('close', () => {
        it('kbn-icon, close 클래스를 갖고, text가 "x"인 span 요소로 구성됨', (): void => {
          const icon: Wrapper<KbnIcon> = shallowMount(KbnIcon, { propsData: { name: 'close' } })
          expect(icon.is('span')).to.equal(true)
          expect(icon.classes()).to.include('kbn-icon', 'close')
          expect(icon.text()).to.equal('x')
        })
      })

      describe('remove', () => {
        it('kbn-icon, remove 클래스를 갖고, text가 "x"인 span 요소로 구성됨', (): void => {
          const icon: Wrapper<KbnIcon> = shallowMount(KbnIcon, { propsData: { name: 'remove' } })
          expect(icon.is('span')).to.equal(true)
          expect(icon.classes()).to.include('kbn-icon', 'remove')
          expect(icon.text()).to.equal('x')
        })
      })

      describe('add', () => {
        it('kbn-icon, add 클래스를 갖고, text가 "+"인 span 요소로 구성됨', (): void => {
          const icon: Wrapper<KbnIcon> = shallowMount(KbnIcon, { propsData: { name: 'add' } })
          expect(icon.is('span')).to.equal(true)
          expect(icon.classes()).to.include('kbn-icon', 'add')
          expect(icon.text()).to.equal('+')
        })
      })
    })
  })
})
