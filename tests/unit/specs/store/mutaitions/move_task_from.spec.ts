import { expect } from 'chai'
import mutations from '@/store/mutations'

describe('MOVE_TASK_FROM 뮤테이션', () => {
  it('이동(삭제)될 태스크 정보가 스테이트(dragging)에 저장 될것', () => {
    /* let items1: object[] = [
      { id: 1, name: 'name', description: 'desc', listId: 1 }
    ]
    let items2: object[] = [
      { id: 2, name: 'name2', description: 'desc2', listId: 2 }
    ]
    let lists: object[] = [
      {
        id: 1,
        name: 'lists-name-1',
        items1
      },
      {
        id: 2,
        name: 'lists-name-2',
        items2
      }
    ] */
    let target: number = 1 // id
    let from: number = 1 // listId
    let dragging: object = {
      target: null,
      from: null,
      to: null
    }
    let state: any = {
      // board: { lists },
      dragging
    }

    mutations.MOVE_TASK_FROM(state, { target, from })
    expect(state.dragging.target).to.equal(target)
    expect(state.dragging.from).to.equal(from)
  })
})
