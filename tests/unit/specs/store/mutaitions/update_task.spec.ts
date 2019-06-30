import { expect } from 'chai'
import mutations from '@/store/mutations'

describe('UPDATE_TASK 뮤테이션', () => {
  it('업데이트한 태스크(페이로드)로 스테이트가 변경되어 있을 것', () => {
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
    let task: any = { id: 1, name: 'name2', description: 'desc2', listId: 1 }

    mutations.UPDATE_TASK(state, task)
    expect(state.board.lists[0].items[0]).to.deep.equal(task)
  })
})
