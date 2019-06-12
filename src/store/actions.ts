import * as types from './mutation-types'
import { Auth, Task } from '../api'
import State from './state'
import { ActionContext, ActionTree, ActionPayload, Payload, MutationPayload } from 'vuex'

// ActionTree<[current state], [root state]>
const actions: ActionTree<State, State> = {
  login: ({ commit }: ActionContext<State, State>, authInfo: { token: string, userId: number }): Promise<void> => {
    return Auth.login(authInfo)
      .then(({ token, userId }: { token: string, userId: number }) => {
        commit(types.AUTH_LOGIN, { token, userId })
      })
      .catch((err: Error): void => { throw err })
  },
  logout: ({ commit }: ActionContext<State, State>): void => {
    // TODO:
    throw new Error('logout action should be implemented')
  },
  fetchLists: ({ commit }: ActionContext<State, State>): void => {
    // TODO:
    throw new Error('fetchLists action should be implemented')
  },
  addTask: ({ commit, state }: ActionContext<any, State>, { listId, name }: any): Promise<void> => {
    return Task.add(state.auth.token, { listId, name })
      .then((task: any): void => {
        commit(types.ADD_TASK, task)
      })
      .catch((err: Error): void => { throw err })
  },
  updateTask: ({ commit }: ActionContext<State, State>): void => {
    // TODO:
    throw new Error('updateTask action should be implemented')
  },
  removeTask: ({ commit, state }: ActionContext<State, State>, { id, listId }: any): void => {
    // 
  }
}

export default actions
