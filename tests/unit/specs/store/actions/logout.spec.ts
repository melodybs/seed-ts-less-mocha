import Vue from 'vue'
import * as types from '@/store/mutation-types'
import { expect } from 'chai'
import sinon from 'sinon'

const mockLogoutAction: (logout: any) => any = (logout) => {
  const actionsInjector = require('inject-loader!@/store/actions')
  const actionMocks = actionsInjector({
    '../api': { Auth: { logout } }
  })
  return actionMocks.default.logout
}

describe('logout 액션', () => {
  let commit: any
  let state: any
  let future: any
  let token: string = '123456789abcdef'
  let userId: number = 1

  beforeEach(() => {
    state = { auth: { token, userId } }
    window.localStorage.setItem('token', token)
  })
  afterEach(() => {
    window.localStorage.clear()
  })

  describe('Auth.logout 성공', () => {
    beforeEach((done: any) => {
      const logout: (token: string) => Promise<any> = (token) => {
        return Promise.resolve()
      }
      const action: any = mockLogoutAction(logout)
      commit = sinon.spy()

      future = action({ commit, state })
      Vue.nextTick(done)
    })
    it('성공함', () => {
      expect(commit.called).to.be.true
      expect(commit.args[0][0]).to.equal(types.AUTH_LOGOUT)
      expect(commit.args[0][1].token).to.be.null
      expect(commit.args[0][1].userId).to.be.null
      expect(window.localStorage.getItem('token')).to.be.null
    })
  })

  describe('Auth.logout 실패', () => {
    const message: string = 'failed logout'
    beforeEach((done: any) => {
      const logout: (token: string) => Promise<any> = (token) => {
        const err: any = new Error(message)
        return Promise.reject(err)
      }
      const action = mockLogoutAction(logout)
      commit = sinon.spy()

      future = action({ commit, state })
      Vue.nextTick(done)
    })
    it('실패함', (done: any) => {
      expect(commit.called).to.be.false
      expect(window.localStorage.getItem('token')).to.equal(token)
      future.catch((err: Error): void => {
        expect(err.message).to.equal(message)
        done()
      })
    })
  })
})
