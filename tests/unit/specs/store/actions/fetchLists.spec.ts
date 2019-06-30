import Vue from 'vue'
import * as types from '@/store/mutation-types'
import { expect } from 'chai'
import sinon from 'sinon'

const mockFetchListsAction: (fetch: any) => any = (fetch) => {
  const actionsInjector = require('inject-loader!@/store/actions')
  const actionMocks = actionsInjector({
    '../api': { List: { fetch } }
  })
  return actionMocks.default.fetchLists
}

describe('fetchLists 액션', () => {
  let commit: any
  let state: any
  let future: any
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
  let token: string = '123456789abcdef'
  let userId: number = 1
  let auth: any = { token, userId }

  beforeEach(() => {
    state = { auth, board: {} }
  })

  describe('List.fetch 성공', () => {
    beforeEach((done: any) => {
      const fetch: (token: string) => Promise<any> = (token) => {
        return Promise.resolve({ lists })
      }
      const action: any = mockFetchListsAction(fetch)
      commit = sinon.spy()

      future = action({ commit, state })
      Vue.nextTick(done)
    })

    it('성공함', () => {
      expect(commit.called).to.be.true
      expect(commit.args[0][0]).to.equal(types.FETCH_ALL_TASKLIST)
      expect(commit.args[0][1]).to.deep.equal(lists)
    })
  })

  describe('List.fetch 실패', () => {
    const message: string = 'failed fetch'
    beforeEach((done: any) => {
      const fetch: (token: string) => Promise<any> = (token) => {
        const err: Error = new Error(message)
        return Promise.reject(err)
      }
      const action: any = mockFetchListsAction(fetch)
      commit = sinon.spy()

      future = action({ commit, state })
      Vue.nextTick(done)
    })

    it('실패함', (done: any) => {
      expect(commit.called).to.be.false
      expect(state.board).to.be.empty
      future.catch((err: Error): void => {
        expect(err.message).to.equal(message)
        done()
      })
    })
  })
})
