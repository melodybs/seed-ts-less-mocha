import * as types from './mutation-types'
import { Auth, Task, List } from '../api'
import State from './state'
import { ActionContext, ActionTree, ActionPayload, Payload, MutationPayload } from 'vuex'

// ActionTree<[current state], [root state]>
const actions: ActionTree<any, any> = {
  login: ({ commit }: ActionContext<any, any>, authInfo: { token: string, userId: number }): Promise<void> => {
    return Auth.login(authInfo)
      .then(({ token, userId }: { token: string, userId: number }) => {
        commit(types.AUTH_LOGIN, { token, userId })
      })
      .catch((err: Error): void => { throw err })
  },
  logout: ({ commit, state }: ActionContext<any, any>): Promise<void> => {
    return Auth.logout(state.auth.token)
      .then((): void => {
        localStorage.removeItem('token')
        commit(types.AUTH_LOGOUT, { token: null, userId: null })
      })
      .catch((err: Error): void => { throw err })
  },
  fetchLists: ({ commit, state }: ActionContext<any, any>): Promise<void> => {
    return List.fetch(state.auth.token)
      .then(({ lists }: any): void => {
        commit(types.FETCH_ALL_TASKLIST, lists)
      })
      .catch((err: Error): void => { throw err })
  },
  addTask: ({ commit, state }: ActionContext<any, any>, { listId, name }: any): Promise<void> => {
    return Task.add(state.auth.token, { listId, name })
      .then((task: any): void => {
        commit(types.ADD_TASK, task)
      })
      .catch((err: Error): void => { throw err })
  },
  updateTask: ({ commit, state }: ActionContext<any, any>, task: any): Promise<void> => {
    return Task.update(state.auth.token, task)
      .then((): void => {
        commit(types.UPDATE_TASK, task)
      })
      .catch((err: Error) => { throw err })
  },
  removeTask: ({ commit, state }: ActionContext<any, any>, { id, listId }: any): Promise<void> => {
    return Task.remove(state.auth.token, { id, listId })
      .then((): void => {
        commit(types.MOVE_TASK_DONE, { id, listId })
      })
      .catch((err: Error): void => { throw err })
  },
  moveTaskFrom: ({ commit, state }: any, { id, listId }: any): any => {
    commit(types.MOVE_TASK_FROM, { target: id, from: listId })
    return Promise.resolve()
  },
  moveToTask: ({ commit, state }: any, { id, listId }: any): any => {
    commit(types.MOVE_TO_TASK, { target: id, to: listId })
    return Promise.resolve()
  },
  performTaskMoving: ({ commit, state }: any): any => {
    const { target, from, to } = state.draggin
    return Task.move(state.auth.token, { id: target, from, to })
      .then((): void => {
        commit(types.MOVE_TASK_DONE, { target, from, to })
      })
      .catch((err: Error): void => { throw err })
  }
}

export default actions
