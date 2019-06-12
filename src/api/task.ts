import client from './client'
import { AxiosResponse } from 'axios';

const Task = {
  add: (token: string | null, { name, listId }: {name: string, listId: number}): Promise<{}> => {
    return new Promise((resolve, reject): void => {
      client.post(`/tasks/add`, { name, listId }, { headers: { 'x-kbn-token': token } })
        .then((res: AxiosResponse): void => resolve(res.data))
        .catch((err: any): void => {
          reject(new Error(err.response.data.message || err.message))
        })
    })
  },
  remove: (token: string | null, { id, listId }: any): any => {
    return new Promise((resolve, reject): any => {
      client.delete(`/tasks/${id}/remove`, { headers: { 'x-kbn-token': token } })
        .then((): any => resolve())
        .catch((err: any): any => {
          reject(new Error(err.response.data.message || err.message))
        })
    })
  })
}

export default Task
