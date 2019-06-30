import Vue from 'vue'
import * as types from '@/store/mutation-types'
import { expect } from 'chai'
import sinon from 'sinon'

const mockUpdateTaskAction: (update: any) => Promise<any> = (update) => {
  const actionsInjector = require('inject-loader!@/store/actions')
  const actionMocks = actionsInjector({
    '../api': { Task: { update } }
  })
  return actionMocks.default.updateTask
}

describe('updateTask 액션', () => {
  let commit: any
  let state: any
  let future: any
  let token: string = '123456789abcdef'
  let userId: number = 1
  let auth: any = { token, userId }
  let task: any = { id: 1, name: 'name2', description: 'desc2', listId: 1 }
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

  describe('Task.update 성공', () => {
    beforeEach((done: any) => {
      const update: (token: string, { id, name, description, listId }: { id: number, name: string, description: string, listId: number }) => Promise<any> =
        (token, { id, name, description, listId }) => {
          return Promise.resolve()
        }
      const action: any = mockUpdateTaskAction(update)
      commit = sinon.spy()

      future = action({ commit, state }, task)
      Vue.nextTick(done)
    })

    it('성공함', () => {
      expect(commit.called).to.be.true
      expect(commit.args[0][0]).to.equal(types.UPDATE_TASK)
      expect(commit.args[0][1]).to.deep.equal(task)
    })
  })

  describe('Task.update 실패', () => {
    const message: string = 'failed update'
    beforeEach((done: any) => {
      const update: (token: string, { id, name, description, listId }: { id: number, name: string, description: string, listId: number }) => Promise<any> =
        (token, { id, name, description, listId }) => {
          const err: Error = new Error(message)
          return Promise.reject(err)
        }
      const action: any = mockUpdateTaskAction(update)
      commit = sinon.spy()

      future = action({ commit, state }, task)
      Vue.nextTick(done)
    })

    it('실패함', (done: any) => {
      expect(commit.called).to.be.false
      future.catch((err: Error) => {
        expect(err.message).to.equal(message)
        done()
      })
    })
  })
})
