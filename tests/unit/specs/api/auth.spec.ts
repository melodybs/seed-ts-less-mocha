import { expect } from 'chai'
import axios from 'axios'

// Auth API 모듈을 사용하는 HTTP 클라이언트 목업을 만듦
const mockAuth: any = (adapter: any) => {
  const injector: any = require('inject-loader!@/api/auth')
  const clientMock: any = injector({
    './client': axios.create({ adapter })
  })
  return clientMock.default
}

describe('Auth API 모듈', (): void => {
  describe('login', (): void => {
    const token: string = '1234567890abcdef'
    const userId: number = 1
    const address: string = 'foo@domain.com'
    const password: string = '12345678'

    describe('성공', (): void => {
      it('token、userId를 받아옴', (done: any): any => {
        const adapter: Function = (config: any): any => {
          return new Promise((resolve, reject): any => {
            resolve({ data: { token, userId }, status: 200 })
          })
        }

        const auth: any = mockAuth(adapter)
        auth.login({ address, password })
          .then((res: any): any => {
            expect(res.token).to.equal(token)
            expect(res.userId).to.equal(userId)
          })
          .then(done)
      })
    })

    describe('실패', (): void => {
      it('오류 메시지를 받아옴', (done: any): void => {
        const message: string = 'failed login'
        const adapter: Function = (config: any): any => {
          return new Promise((resolve, reject) => {
            const err: any = new Error(message)
            err.response = { data: { message }, status: 401 }
            reject(err)
          })
        }

        const auth: any = mockAuth(adapter)
        auth.login({ address, password })
          .catch((err: any): void => {
            expect(err.message).to.equal(message)
          })
          .then(done)
      })
    })
  })
})
