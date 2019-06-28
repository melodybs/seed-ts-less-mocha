import { expect } from 'chai'
import mutaitions from '@/store/mutations'

describe('AUTH_LOGOUT 뮤테이션', () => {
  it('뮤테이션 페이로드 값에 auth가 없을 것', () => {
    const token: string = '1234567890abcdef'
    const userId: number = 1
    const state: any = { auth: { token, userId } }
    // expect(state.auth.token).to.equal(token)
    // expect(state.auth.userId).to.equal(userId)

    // 로그아웃
    mutaitions.AUTH_LOGOUT(state, { token: null, userId: null })
    expect(state.auth.token).to.be.null
    expect(state.auth.userId).to.be.null
  })
})
