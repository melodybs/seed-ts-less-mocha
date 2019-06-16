import { MutationTree } from 'vuex'
import * as types from './mutation-types'

const mutations: MutationTree<any> = {
  // 뮤테이션별 핸들러 스텁 코드, 뮤테이션핸들러는 액션에서 커밋이 일어날때 호출
  [types.AUTH_LOGIN] (state: any, payload: { token: string, userId: number }): void {
    state.auth = payload
  },
  [types.AUTH_LOGOUT] (state: any, payload: { token: string, userId: number }): void {
    state.auth = payload
  },
  [types.FETCH_ALL_TASKLIST] (state: any, payload: { [index: string]: [] }): void {
    state.board.lists = payload
  },
  [types.ADD_TASK] (state: any, payload: any): void {
    const task = payload
    for (let i = 0; i < state.board.lists.length; i++) {
      const list = state.board.lists[i]
      if (list.id === task.listId) {
        list.items.push(task)
        break
      }
    }
  },
  [types.UPDATE_TASK] (state: any, payload: any) {
    const task: any = payload
    for (let i: number = 0; i < state.board.lists.length; i++) {
      const list: any = state.board.lists[i]
      if (list.id !== task.listId) { continue }
      for (let j: number = 0; j < list.items.length; j++) {
        const item: any = list.items[j]
        if (item.id === task.id) {
          item.name = task.name
          item.description = task.description
          break
        }
      }
    }
  },
  [types.REMOVE_TASK] (state: any, payload: any): void {
    const { id, listId }: {id: number, listId: number } = payload
    for (let i: number = 0; i < state.board.lists.length; i++) {
      const list = state.board.lists[i]
      if (list.id !== listId) { continue }
      list.items = list.items.filter((item: any) => item.id !== id)
    }
  },
  [types.MOVE_TASK_FROM] (state: any, payload: any) : void {
    const { target, from }: any = payload
    state.dragging.target = target
    state.dragging.from = from
  },
  [types.MOVE_TO_TASK] (state: any, payload: any) {
    const { target, to }: any = payload
    state.dragging.target = target
    state.dragging.to = to
  },
  [types.MOVE_TASK_DONE] (state: any, payload: any): void {
    const { target, from, to }: any = payload
    const getTaskList = (lists: any, id: any): any => {
      return lists.find((list: any): any => list.id === id)
    }

    // 드래그앤드롭 처리에 사용되는 상태 초기화
    state.dragging.target = null
    state.dragging.from = null
    state.dragging.to = null

    // 원래 속했던 태스크 목록에서 해당 태스크를 꺼냄
    const fromTaskList: any = getTaskList(state.board.lists, from)
    const index: any = fromTaskList.items.findIndex((item: any):any => item.id === target)
    const task: any = fromTaskList.items[index]
    fromTaskList.items.splice(index, 1)

    // 태스크 목록 ID를 이동 대상으로 변경
    task.listId = to

    // 이동 대상 태스크 목록에 해당 태스크를 이동
    const toTaskList: any = getTaskList(state.board.lists, to)
    toTaskList.items.push(task)
  }
}

export default mutations
