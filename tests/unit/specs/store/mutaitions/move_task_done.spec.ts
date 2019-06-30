import { expect } from 'chai'
import mutations from '@/store/mutations'

describe('MOVE_TASK_DONE 뮤테이션', () => {
  it('이동(삭제)될 태스크 정보가 스테이트(dragging)에 저장 될것', () => {
    let items1: object[] = [
      { id: 1, name: 'name', description: 'desc', listId: 1 }
    ]
    let items2: object[] = [
      { id: 2, name: 'name2', description: 'desc2', listId: 2 }
    ]
    let lists: object[] = [
      {
        id: 1,
        name: 'lists-name-1',
        items: items1
      },
      {
        id: 2,
        name: 'lists-name-2',
        items: items2
      }
    ]
    let target: number = 1 // id
    let from: number = 1 // from listId
    let to: number = 2 // to listId
    let dragging: object = { target, from, to }
    let state: any = {
      board: { lists },
      dragging
    }

    mutations.MOVE_TASK_DONE(state, { target, from, to })
    expect(state.dragging.target).to.be.null
    expect(state.dragging.from).to.be.null
    expect(state.dragging.to).to.be.null
    expect(state.board.lists[0].items.length).to.equal(0)
    expect(state.board.lists[1].items.length).to.equal(2)
    expect(state.board.lists[1].items[1].id).to.equal(1)
    expect(state.board.lists[1].items[1].name).to.equal('name')
    expect(state.board.lists[1].items[1].description).to.equal('desc')
    expect(state.board.lists[1].items[1].listId).to.equal(2)
  })
})
