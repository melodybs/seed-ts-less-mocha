import Vue from 'vue'
import * as types from '@/store/mutation-types'
import { expect } from 'chai'
import sinon from 'sinon'

const mockPerformTaskMovingAction: (move: any) => Promise<any> = (move) => {
  const actionsInjector = require('inject-loader!@/store/actions')
  const actionMocks = actionsInjector({
    '../api': { Task: { move } }
  })
  return actionMocks.default.performTaskMoving
}

describe('moveToTask 액션', () => {
  let commit: any
  let future: any
  let target: number = 1 // id
  let from: number = 1 // from listId
  let to: number = 2 // to listId
  let dragging: object = { target, from, to }
  let state: any = {
    auth: { token: '123456789abcdef', userId: 1 },
    dragging
  }

  describe('Task.move 성공', () => {
    beforeEach((done: any) => {
      const move: (token: string, { id, from, to }: {id: number, from: number, to: number }) => Promise<any> =
        (token, { id, from, to }) => {
          return Promise.resolve()
        }
      const action: any = mockPerformTaskMovingAction(move)
      commit = sinon.spy()

      future = action({ commit, state })
      Vue.nextTick(done)
    })

    it('성공함', () => {
      expect(commit.called).to.be.true
      expect(commit.args[0][0]).to.equal(types.MOVE_TASK_DONE)
      expect(commit.args[0][1]).to.deep.equal(dragging)
      /* expect(commit.args[0][1].target).to.equal(target)
      expect(commit.args[0][1].from).to.equal(from)
      expect(commit.args[0][1].to).to.equal(to) */
    })
  })

  describe('Task.move 실패', () => {
    const message: string = 'failed move'
    beforeEach((done: any) => {
      const move: (token: string, { id, from, to }: {id: number, from: number, to: number }) => Promise<any> =
        (token, { id, from, to }) => {
          const err: Error = new Error(message)
          return Promise.reject(err)
        }
      const action: any = mockPerformTaskMovingAction(move)
      commit = sinon.spy()

      future = action({ commit, state })
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
