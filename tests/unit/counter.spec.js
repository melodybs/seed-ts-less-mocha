import { mount } from '@vue/test-utils'
import Counter from './counter'
import Vue from 'vue'
import { expect } from 'chai'

describe('Counter #1', () => {
  // Now mount the component and you have the wrapper
  const wrapper = mount(Counter)

  it('renders the correct markup', () => {
    expect(wrapper.html()).to.contain('<span class="count">0</span>')
  })
})

describe('Counter #2', () => {
  // Now mount the component and you have the wrapper
  const wrapper = mount(Counter)

  // it's also easy to check for the existence of elements
  it('has a button', () => {
    expect(wrapper.contains('button')).to.equal(true)
  })

  it('button click should increment the count', () => {
    expect(wrapper.vm.count).to.equal(0)
    const button = wrapper.find('button')
    button.trigger('click')
    expect(wrapper.vm.count).to.equal(1)
  })

  // this will not be caught
  /* it("will time out", done => {
    Vue.nextTick(() => {
      expect(true).to.equal(true);
      done();
    });
  }); */

  // the two following tests will work as expected
  /* it("will catch the error using done", done => {
    Vue.config.errorHandler = done;
    Vue.nextTick(() => {
      expect(true).to.equal(true);
      done();
    });
  });

  it("will catch the error using a promise", () => {
    return Vue.nextTick().then(function() {
      expect(true).to.equal(true);
    });
  }); */
})
