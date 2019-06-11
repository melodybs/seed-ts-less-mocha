import sinon from 'sinon'
import { expect } from 'chai'
import Vue from 'vue'
import * as types from '@/store/mutation-types'

// login 액션 안에서 사용되는 의존성의 목업을 만듬
const mockLoginAction: Function = (login: any): any => {
  // inject-loader를 사용해 액션 내 의존성을 주입할 함수를 얻음
  const actionsInjector: any = require('inject-loader!@/store/actions')

  // 주입 함수를 사용해 Auth API 모듈의 목업을 만듬
  const actionMocks: any = actionsInjector({
    '../api': { Auth: { login } }
  })

  return actionMocks.default.login
}

describe('login 액션', () => {
  const address: string = 'foo@domain.com'
  const password: string = '12345678'
  let commit: any
  let future: any

  describe('Auth.login 성공', () => {
    const token: string = '123456789abcdef'
    const userId: number = 1

    beforeEach((done: any): void => {
      const login: Function =
        (_authInfo: any): Promise<{ token: string, userId: number }> => {
          return Promise.resolve({ token, userId })
        }
      const action: any = mockLoginAction(login)
      commit = sinon.spy()

      // login 액션 실행
      future = action({ commit }, { address, password })
      Vue.nextTick(done)
    })

    it('성공함', (): void => {
      // commit이 호출됐는지 확인
      expect(commit.called).to.equal(true)
      expect(commit.args[0][0]).to.equal(types.AUTH_LOGIN)
      expect(commit.args[0][1].token).to.equal(token)
      expect(commit.args[0][1].userId).to.equal(userId)
    })
  })

  describe('Auth.login 실패', () => {
    beforeEach((done: any): void => {
      const login: Function = (_authInfo: any): Promise<Error> => {
        return Promise.reject(new Error('login failed'))
      }
      const action = mockLoginAction(login)
      commit = sinon.spy()

      // login 액션 실행
      future = action({ commit })
      Vue.nextTick(done)
    })

    it('실패함', (done: any): void => {
      // commit이 호출되었는지 확인
      expect(commit.called).to.equal(false)

      // 오류가 throw 되었는지 확인
      future.catch((err: Error): void => {
        expect(err.message).to.equal('login failed')
        done()
      })
    })
  })
})
