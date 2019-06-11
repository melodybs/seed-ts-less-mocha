import { MutationTree } from 'vuex'
import State from './state'
import * as types from './mutation-types'

const mutations: MutationTree<State> = {
  // 뮤테이션별 핸들러 스텁 코드, 뮤테이션핸들러는 액션에서 커밋이 일어날때 호출
  [types.AUTH_LOGIN] (state: State, payload: { token: string, userId: number }): void {
    state.auth = payload
  },
  [types.AUTH_LOGOUT] (state: State, payload: { token: string, userId: number }): void {
    // TODO:
    throw new Error('AUTH_LOGOUT mutaition should be implemented')
  },
  [types.FETCH_ALL_TASKLIST] (state: State, payload: any): void {
    // TODO:
    throw new Error('FETCH_ALL_TASKLIST mutaition should be implemented')
  },
  [types.ADD_TASK] (state: State, payload: any): void {
    // TODO:
    throw new Error('ADD_TASK mutaition should be implemented')
  },
  [types.UPDATE_TASK] (state: State, payload: any): void {
    // TODO:
    throw new Error('UPDATE_TASK mutaition should be implemented')
  },
  [types.REMOVE_TASK] (state: State): void {
    // TODO:
    throw new Error('REMOVE_TASK mutaition should be implemented')
  }
}

export default mutations
