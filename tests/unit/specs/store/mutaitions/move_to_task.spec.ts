import { expect } from 'chai'
import mutations from '@/store/mutations'

describe('MOVE_TO_TASK 뮤테이션', () => {
  it('이동(추가)될 태스크 정보가 스테이트(dragging)에 저장 될것', () => {
    let target: number = 1 // id
    let to: number = 2 // listId
    let dragging: object = {
      target: null,
      from: null,
      to: null
    }
    let state: any = {
      dragging
    }

    mutations.MOVE_TO_TASK(state, { target, to })
    expect(state.dragging.target).to.equal(target)
    expect(state.dragging.to).to.equal(to)
  })
})
