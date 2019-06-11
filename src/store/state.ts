/*
// 상태 'Auth'와 'Board'의 Vuex state를 한곳에서 관리 할 수 있도록 정의
const state = {
  auth: {
    token: null,
    userId: null
  },
  board: {
    lists: []
  }
}
*/
export default class State {
  public auth?: { token: string | null, userId: number | null}
  public board?: { [index: string]: [] }

  constructor () {
    this.auth = { token: null, userId: null }
    this.board = { lists: [] }
  }
}
