// 상태 'Auth'와 상태 'Board'를 Vuex의 스테이트로 일괄 관리할 수 있도록 정의
const state = {
  auth: { // 상태 'Auth'
    token: null, // 'token'을 null로 초기화
    userId: null // 'userId'를 null로 초기화
  },
  board: { // 상태 'Board'
    lists: [] // 상태 'TaskList'는 빈 리스트로 초기화
  },
  dragging: { // 드래그앤드롭 된 태스크를 처리하기 위한 상태를 저장
    target: null, // 드래그앤드롭 대상 태스크 ID
    from: null, // 원래 속했던 태스크 목록 ID
    to: null // 드롭된 태스크 목록 ID
  }
}
export default state

/* export default class State {
  public auth?: { token: string | null, userId: number | null}
  public board?: { [index: string]: [] }
  public dragging?: { target: number | null, from: number | null, to: number | null}

  constructor () {
    this.auth = { token: null, userId: null }
    this.board = { lists: [] }
    this.dragging = { target: null, from: null, to: null }
  }
} */
