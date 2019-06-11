import { mount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import router from '@/router.js'
import { expect } from 'chai'

describe('router.js', () => {
  const localVue = createLocalVue()
  localVue.use(VueRouter)

  it('router /home', () => {
    const wrapper = mount(Home, { localVue, router })
    router.push('/home')
    expect(wrapper.find(Home).exists()).to.equal(true)
  })

  it('router /about', () => {
    const wrapper = mount(About, { localVue, router })
    router.push('/about')
    expect(wrapper.find(About).exists()).to.equal(true)
  })
})
