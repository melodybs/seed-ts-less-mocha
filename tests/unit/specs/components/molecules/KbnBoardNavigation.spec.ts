import { Wrapper, mount } from '@vue/test-utils'
import KbnBoardNavigation from '@/components/molecules/KbnBoardNavigation.vue'
import { expect } from 'chai'

describe('KbnBoardNavitaion', (): void => {
  /* let navigation: Wrapper<KbnBoardNavigation>
  beforeEach(done => {
    navigation = mount(KbnBoardNavigation)
    navigation.vm.$nextTick(done)
  }) */
  const navigation: Wrapper<KbnBoardNavigation> = mount(KbnBoardNavigation)

  // 렌더링 테스트 (타이틀, 로그아웃 버튼)
  describe('네비게이션 타이틀이 "Kanban App"인지 확인', (): void => {
    it('h1 text', () => {
      expect(navigation.find('.title h1').text()).to.equal('Kanban App')
    })
  })
  describe('로그아웃 버튼 존재 확인', (): void => {
    it('button exist', () => {
      expect(navigation.find('.kbn-button-text').text()).to.equal('로그아웃')
    })
  })
})
