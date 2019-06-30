import { expect } from 'chai'
import mutations from '@/store/mutations'

describe('ADD_TASK 뮤테이션', () => {
  it('새로 추가한 태스크(페이로드)가 스테이트에 있을 것', () => {
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
    let state: any = { board: { lists } }
    let task: any = { id: 2, name: 'name2', description: 'desc2', listId: 1 }

    mutations.ADD_TASK(state, task)
    expect(state.board.lists[0].items[1]).to.deep.equal(task)
  })
})
