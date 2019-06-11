describe('로그인', () => {
  it('Visit the app root url(devServer)', () => {
    // 앱의 루트로 접근. 로그인 페이지 URL 확인. h1 문자열 확인.
    cy.visit('/')
    cy.url().should('include', '/#/login')
    cy.contains('h1', 'Kanban App')

    // 이메일/비밀번호 입력후 값 확인
    cy.get('input#email')
      .type('foo@domain.com')
      .should('have.value', 'foo@domain.com')
    cy.get('input#password')
      .type('12345678')
      .should('have.value', '12345678')

    // 로그인 버튼 클릭. 보드페이지로 리다이렉트 확인. 보드페이지 p 문자열 확인
    cy.contains('button', '로그인').click()
    cy.url().should('eq', 'http://localhost:8080/#/')
    cy.contains('#app p', '보드페이지')
  })
})
