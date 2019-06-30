import Vue from 'vue'
import * as types from '@/store/mutation-types'
import { expect } from 'chai'
import sinon from 'sinon'

const mockMoveTaskFromAction: () => Promise<any> = () => {
  const actionsInjector = require('inject-loader!@/store/actions')
  const actionMocks = actionsInjector()
  return actionMocks.default.moveTaskFrom
}

describe('moveTaskFrom 액션', () => {
  let commit: any
  let future: any
  let moveInfo: any = { id: 1, listId: 1 }
  let state: any = { auth: { token: '123456789abcdef', userId: 1 } }

  describe('성공', () => {
    beforeEach((done: any) => {
      const action: any = mockMoveTaskFromAction()
      commit = sinon.spy()

      future = action({ commit, state }, moveInfo)
      Vue.nextTick(done)
    })

    it('커밋됨', () => {
      expect(commit.called).to.be.true
      expect(commit.args[0][0]).to.equal(types.MOVE_TASK_FROM)
      expect(commit.args[0][1].target).to.equal(moveInfo.id)
      expect(commit.args[0][1].from).to.equal(moveInfo.listId)
    })
  })
})
