import { shallowMount, Wrapper, mount } from '@vue/test-utils'
import KbnLocaleButton from '@/components/molecules/KbnLocaleButton.vue'
import { expect } from 'chai'
import i18n from '@/i18n'

describe('KbnLocaleButoon', () => {
  let localeButton: Wrapper<KbnLocaleButton>
  beforeEach(() => {
    localeButton = mount(KbnLocaleButton, { i18n })
  })

  describe('localeChange', () => {
    it('한국어 버튼, English 버튼', () => {
      // 기본 언어는 한국어
      expect(i18n.locale).to.equal('ko')

      // 영어로 변경후 테스트
      localeButton.findAll('button').at(1).trigger('click')
      expect(i18n.locale).to.equal('en')

      // 다시 한국어로 변경후 테스트
      localeButton.findAll('button').at(0).trigger('click')
      expect(i18n.locale).to.equal('ko')
    })
  })
})
