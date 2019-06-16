import { mount, createLocalVue, Wrapper } from '@vue/test-utils'
import KbnTaskCard from '@/components/molecules/KbnTaskCard.vue'
import { expect } from 'chai'
import VueRouter from 'vue-router'
import routes from '@/router/routes'

describe('KbnTaskCard', () => {
  const localVue: any = createLocalVue()
  const router: VueRouter = new VueRouter({ routes })
  localVue.use(VueRouter)

  const taskCard: Wrapper<KbnTaskCard> = mount(KbnTaskCard, {
    propsData: {
      id: 20,
      name: 'task name',
      listId: '3'
    },
    router,
    localVue
  })

  describe('태스크카드 id, name 확인', () => {
    it('id, name, description, listId', () => {
      console.log(taskCard.html())
      expect(taskCard.find('.name a').attributes('href')).to.equal('#/task/20')
      expect(taskCard.find('.name h3').text()).to.equal('task name')
    })
  })
})
