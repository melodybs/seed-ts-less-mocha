import Vue from 'vue'
import * as types from '@/store/mutation-types'
import { expect } from 'chai'
import sinon from 'sinon'

const mockRemoveTaskAction: (remove: any) => Promise<any> = (remove) => {
  const actionsInjector = require('inject-loader!@/store/actions')
  const actionMocks = actionsInjector({
    '../api': { Task: { remove } }
  })
  return actionMocks.default.removeTask
}

describe('removeTask 액션', () => {
  let commit: any
  let state: any
  let future: any
  let token: string = '123456789abcdef'
  let userId: number = 1
  let auth: any = { token, userId }
  let task: any = { id: 1, listId: 1 }
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

  beforeEach(() => {
    state = { auth, board: { lists } }
  })

  describe('Task.remove 성공', () => {
    beforeEach((done: any) => {
      const remove: (token: string, { id, listId }: { id: number, listId: number }) => Promise<any> =
        (token, { id, listId }) => {
          return Promise.resolve()
        }
      const action: any = mockRemoveTaskAction(remove)
      commit = sinon.spy()

      future = action({ commit, state }, task)
      Vue.nextTick(done)
    })

    it('성공함', () => {
      expect(commit.called).to.be.true
      expect(commit.args[0][0]).to.equal(types.REMOVE_TASK)
      expect(commit.args[0][1]).to.deep.equal(task)
    })
  })

  describe('Task.remove 실패', () => {
    const message: string = 'failed remove'
    beforeEach((done: any) => {
      const remove: (token: string, { id, listId }: { id: number, listId: number }) => Promise<any> =
        (token, { id, listId }) => {
          const err: Error = new Error(message)
          return Promise.reject(err)
        }
      const action: any = mockRemoveTaskAction(remove)
      commit = sinon.spy()

      future = action({ commit, state }, task)
      Vue.nextTick(done)
    })

    it('실패함', () => {
      expect(commit.called).to.be.false
      future.catch((err: Error) => {
        expect(err.message).to.equal(message)
      })
    })
  })
})
