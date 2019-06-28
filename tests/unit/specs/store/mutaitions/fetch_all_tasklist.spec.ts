import { expect } from 'chai'
import mutations from '@/store/mutations'

describe('FETCH_ALL_TASKLIST 뮤테이션', () => {
  it('뮤테이션 페이로드 값에 board.lists가 있을 것 ', () => {
    const state: any = { board: {} }
    let items: object[] = [
      { id: 1, name: 'name', description: 'desc', listId: 1 }
    ]
    let lists: object[] = [
      {
        id: 1,
        name: 'name',
        items
      }
    ]

    mutations.FETCH_ALL_TASKLIST(state, lists)
    expect(state.board.lists).to.deep.equal(lists)
  })
})
