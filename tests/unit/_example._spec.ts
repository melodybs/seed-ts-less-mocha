import { expect } from 'chai'
import { shallowMount, mount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg }
    })
    expect(wrapper.text()).to.include(msg)
  })

  /* +'Vue Test Utils'를 사용한 단위테스트 예제
  it('should render correct contents', () => {
    expect(mount(HelloWorld).find('.hello h1').text())
      .to.equal('Welcome to Your Vue.js + TypeScript App')
  })*/
})
