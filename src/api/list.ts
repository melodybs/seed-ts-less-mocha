import client from './client'
import { AxiosResponse } from 'axios'

const List = {
  fetch: (token: string): Promise<any> => {
    return new Promise((resolve, reject): void => {
      client.get('/lists', { headers: { 'x-kbn-token': token } })
        .then((res: AxiosResponse): void => resolve({ lists: res.data.lists }))
        .catch((err: any): void => {
          reject(new Error(err.response.data.message || err.message))
        })
    })
  }
}

export default List
