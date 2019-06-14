import client from './client'
import { AxiosResponse } from 'axios'

const Task = {
  add: (token: string, { name, listId }: {name: string, listId: number}): Promise<void> => {
    return new Promise((resolve, reject): void => {
      client.post(`/tasks/add`,
        { name, listId },
        { headers: { 'x-kbn-token': token } }
      )
        .then((res: AxiosResponse): void => resolve(res.data))
        .catch((err: any): void => {
          reject(new Error(err.response.data.message || err.message))
        })
    })
  },
  update: (token: string, { id, name, description, listId }: { id: number, name: string, description: string, listId: number }) => {
    return new Promise((resolve, reject): void => {
      client.put(
        `/tasks/${id}/update`,
        { name, description, listId },
        { headers: { 'x-kbn-token': token } }
      )
        .then((): void => resolve())
        .catch((err: any): void => {
          reject(new Error(err.response.data.message || err.message))
        })
    })
  },
  remove: (token: string, { id, listId }: { id: number, listId: number }): Promise<void> => {
    return new Promise((resolve, reject): void => {
      client.delete(
        `/tasks/${id}/remove`,
        { headers: { 'x-kbn-token': token } }
      )
        .then((): void => resolve())
        .catch((err: any): void => {
          reject(new Error(err.response.data.message || err.message))
        })
    })
  },
  move: (token: string, { id, from, to }: { id: number, from: number, to: number }): Promise<void> => {
    return new Promise((resolve, reject): void => {
      client.post(`tasks/${id}/move`,
        { from, to },
        { headers: { 'x-kbn-token': token } }
      )
        .then((): void => resolve())
        .catch((err: any): void => {
          reject(new Error(err.response.data.message || err.message))
        })
    })
  }
}

export default Task
