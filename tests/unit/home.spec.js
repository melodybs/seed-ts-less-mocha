import { mount } from '@vue/test-utils'
import Home from '@/views/Home.vue'
import HelloWorld from '@/components/HelloWorld.vue'
import { expect } from 'chai'

describe('Home.vue', () => {
  let wrapper, vm

  beforeEach(() => {
    wrapper = mount(Home)
    vm = wrapper.vm
  })

  it('img exists', () => {
    expect(wrapper.findAll('img').exists()).to.equal(true)
  })

  it('div exists', () => {
    expect(wrapper.findAll('div').exists()).to.equal(true)
  })

  it('HelloWorld exists', () => {
    expect(wrapper.find(HelloWorld).exists()).to.equal(true)
  })
})
