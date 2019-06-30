import { expect } from 'chai'
import mutations from '@/store/mutations'

describe('REMOVE_TASK 뮤테이션', () => {
  it('삭제한 태스크(페이로드)가 스테이트가 없을 것', () => {
    let items: object[] = [
      { id: 1, name: 'name', description: 'desc', listId: 1 },
      { id: 2, name: 'name2', description: 'desc2', listId: 1 }
    ]
    let lists: object[] = [
      {
        id: 1,
        name: 'name',
        items
      }
    ]
    let state: any = { board: { lists } }

    expect(state.board.lists[0].items.length).to.equal(2)
    mutations.REMOVE_TASK(state, { id: 1, listId: 1 })
    expect(state.board.lists[0].items.length).to.equal(1)
    expect(state.board.lists[0].items.find((item: any) => item.id === 1)).to.be.undefined
  })
})
