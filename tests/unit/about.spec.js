import { mount } from '@vue/test-utils'
import About from '@/views/About.vue'
import { expect } from 'chai'

describe('About.vue', () => {
  let wrapper, vm

  beforeEach(() => {
    wrapper = mount(About)
    vm = wrapper.vm
  })

  it('div exists', () => {
    expect(wrapper.findAll('div').exists()).to.equal(true)
  })

  it('h1 exists', () => {
    expect(wrapper.find('h1').exists()).to.equal(true)
  })
})
