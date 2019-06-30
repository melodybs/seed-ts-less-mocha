import Vue from 'vue'
import * as types from '@/store/mutation-types'
import { expect } from 'chai'
import sinon from 'sinon'

const mockAddTaskAction: (add: any) => any = (add) => {
  const actionsInjector = require('inject-loader!@/store/actions')
  const actionMocks = actionsInjector({
    '../api': { Task: { add } }
  })
  return actionMocks.default.addTask
}

describe('addTask 액션', () => {
  let commit: any
  let state: any
  let future: any
  let token: string = '123456789abcdef'
  let userId: number = 1
  let auth: any = { token, userId }
  let task: any = { name: 'name2', listId: 1 }
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

  describe('Task.add 성공', () => {
    beforeEach((done: any) => {
      const add: (token: string, { name, listId }: { name: string, listId:number }) => Promise<any> =
        (token, { name, listId }) => {
          return Promise.resolve(task)
        }
      const action: any = mockAddTaskAction(add)
      commit = sinon.spy()

      future = action({ commit, state }, task)
      Vue.nextTick(done)
    })

    it('성공함', () => {
      expect(commit.called).to.be.true
      expect(commit.args[0][0]).to.equal(types.ADD_TASK)
      expect(commit.args[0][1].name).to.equal(task.name)
      expect(commit.args[0][1].listId).to.equal(task.listId)
    })
  })

  describe('Task.add 실패', () => {
    const message: string = 'failed add'
    beforeEach((done: any) => {
      const add: (token: string, { name, listId }: { name: string, listId:number }) => Promise<any> = (token, { name, listId }) => {
        const err: Error = new Error(message)
        return Promise.reject(err)
      }
      const action: any = mockAddTaskAction(add)
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
