import { expect } from 'chai'
import axios, { AxiosError } from 'axios'
import { rejects } from 'assert'

// Task API 모듈을 사용하는 HTTP 클라이언트 목업을 만듦
const mockTask: any = (adapter: any) => {
  const injector: any = require('inject-loader!@/api/task')
  const clientMock: any = injector({
    './client': axios.create({ adapter })
  })
  return clientMock.default
}

describe('Task API 모듈', () => {
  const token: string = '1234567890abcdef'
  let id: number = 1
  let name: string = 'name'
  let description: string = 'desc'
  let listId: number = 1
  let item: object = { id, name, description, listId }

  describe('add', () => {
    describe('성공', () => {
      it('태스크 등록됨', (done: any) => {
        const adapter: (config: any) => any = (config) => {
          return new Promise((resolve, reject) => {
            resolve({ data: item, status: 201 })
          })
        }
        const task: any = mockTask(adapter)

        task.add(token, { name, listId })
          .then((res: any) => {
            expect(res).to.deep.equal(item)
          })
          .then(done)
      })
    })
    describe('실패', () => {
      it('오류 메시지 받아옴', (done: any) => {
        const message: string = 'failed add'
        const adapter: (config: any) => any = (config) => {
          return new Promise((resolve, reject) => {
            const err: any = new Error(message)
            err.response = { data: { message }, status: 401 }
            reject(err)
          })
        }

        const task: any = mockTask(adapter)
        task.add(token, { name, listId })
          .catch((err: any) => {
            expect(err.message).to.equal(message)
          })
          .then(done)
      })
    })
  })

  describe('update', () => {
    describe('성공', () => {
      it('태스크 업데이트 됨', (done: any) => {
        const adapter: (config: any) => any = (config) => {
          return new Promise((resolve, reject) => {
            resolve({ data: {}, status: 200 })
          })
        }
        const task: any = mockTask(adapter)

        task.update(token, item)
          .then(() => {})
          .then(done)
      })
    })
    describe('실패', () => {
      it('오류 메시지 받아옴', (done: any) => {
        const message: string = 'failed update'
        const adapter: (config: any) => any = (config) => {
          return new Promise((resolve, reject) => {
            const err: any = new Error(message)
            err.response = { data: { message }, status: 500 }
            reject(err)
          })
        }
        const task: any = mockTask(adapter)

        task.update(token, item)
          .catch((err: any) => {
            expect(err.message).to.equal(message)
          })
          .then(done)
      })
    })
  })

  describe('remove', () => {
    describe('성공', () => {
      it('태스크 삭제 됨', (done: any) => {
        const adapter: (config: any) => any = (config) => {
          return new Promise((resolve, reject) => {
            resolve({ data: {}, stauts: 204 })
          })
        }
        const task: any = mockTask(adapter)

        task.remove(token, { id, listId })
          .then(() => {})
          .then(done)
      })
    })
    describe('실패', () => {
      it('오류 메시지 받아옴', (done: any) => {
        const message: string = 'failed remove'
        const adapter: (config: any) => any = (config) => {
          return new Promise((resolve, reject) => {
            const err: any = new Error(message)
            err.response = { data: { message }, status: 500 }
            reject(err)
          })
        }

        const task: any = mockTask(adapter)
        task.remove(token, { id, listId })
          .catch((err: any) => {
            expect(err.message).to.equal(message)
          })
          .then(done)
      })
    })
  })

  describe('move', () => {
    describe('성공', () => {
      it('태스크 이동 됨', (done: any) => {
        const adapter: (config: any) => any = (config) => {
          return new Promise((resolve, reject) => {
            resolve({ data: {}, status: 200 })
          })
        }
        const task: any = mockTask(adapter)

        task.move(token, { id, from: 1, to: 2 })
          .then(() => {})
          .then(done)
      })
    })
    describe('실패', () => {
      it('오류 메시지 받아옴', (done) => {
        const message: string = 'failed move'
        const adapter: (config: any) => any = (config) => {
          return new Promise((resolve, reject) => {
            const err: any = new Error(message)
            err.response = { data: { message }, status: 500 }
            reject(err)
          })
        }
        const task: any = mockTask(adapter)

        task.move(token, { id, form: 1, to: 2 })
          .catch((err: Error) => {
            expect(err.message).to.equal(message)
          })
          .then(done)
      })
    })
  })
})
