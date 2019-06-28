import { expect } from 'chai'
import axios from 'axios'
// import List from '@/api/list'

// List API 모듈을 사용하는 HTTP 클라이언트 목업을 만듦
const mockList: any = (adapter: any) => {
  const injector: any = require('inject-loader!@/api/list')
  const clientMock: any = injector({
    './client': axios.create({ adapter })
  })
  return clientMock.default
}

describe('List API 모듈', (): void => {
  describe('fetch', (): void => {
    const token: string = '1234567890abcdef'
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

    /* describe('TEST 성공', () => {
      it('TEST 리스트 받아옴', () => {
        const r = List.fetch(token)
          .then(({ lists }: any): void => {
            console.log(0, lists)
          })
          .catch((err: Error): void => { console.log(1, err) })
        console.log(2, r)
      })
    }) */

    describe('성공', () => {
      it('리스트 받아옴', (done: any) => {
        const adapter: (config: any) => any = (config) => {
          return new Promise((resolve, reject) => {
            resolve({ data: { lists }, status: 200 })
          })
        }
        const list: any = mockList(adapter)

        list.fetch(token)
          .then((res: any) => {
            expect(res.lists[0].id).to.equal(1)
            expect(res.lists[0].name).to.equal('name')
            expect(res.lists[0].items).to.deep.equal(items)
          })
          .then(done)
      })
    })

    describe('실패', () => {
      it('오류 메시지', (done: any) => {
        const message: string = 'failed fetch'
        const adapter: (config: any) => any = (config) => {
          return new Promise((resolve, reject) => {
            const err: any = new Error(message)
            err.response = { data: { message }, status: 401 }
            reject(err)
          })
        }
        const list: any = mockList(adapter)

        list.fetch(token)
          .catch((err: any) => {
            expect(err.message).to.equal(message)
          })
          .then(done)
      })
    })
  })
})
