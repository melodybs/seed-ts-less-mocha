import client from './client'

const Auth = {
  login: (authInfo: { token: string, userId: number }): Promise<any> => {
    return new Promise((resolve, reject) => {
      client.post('/auth/login', authInfo)
        .then((res) => {
          return resolve({ token: res.data.token, userId: res.data.userId })
        })
        .catch((err) => {
          reject(new Error(err.response.data.message || err.message))
        })
    })
  },
  logout: (token: string): Promise<void> => {
    return new Promise((resolve, reject): void => {
      client.delete('/auth/logout', { headers: { 'x-kbn-token': token } })
        .then((): void => resolve())
        .catch((err: any): void => {
          reject(new Error(err.response.data.message || err.message))
        })
    })
  }
}

export default Auth
