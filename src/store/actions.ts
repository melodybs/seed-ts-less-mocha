import * as types from './mutation-types'
import { Auth } from '../api'
import State from './state'
import { ActionContext, ActionTree } from 'vuex'

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
  addTask: ({ commit }: ActionContext<State, State>): void => {
    // TODO:
    throw new Error('addTask action should be implemented')
  },
  updateTask: ({ commit }: ActionContext<State, State>): void => {
    // TODO:
    throw new Error('updateTask action should be implemented')
  },
  removeTask: ({ commit }: ActionContext<State, State>): void => {
    // TODO:
    throw new Error('removeTask action should be implemented')
  }
}

export default actions
