// https://docs.cypress.io/api/introduction/api.html

describe('My First Test', () => {
  it('Visits the app root url', () => {
    cy.visit('/')
    cy.contains('h1', 'Welcome to Your Vue.js + TypeScript App')
  })

  // +cypress first simpe test
  it('Visits the app "/#/about" url', () => {
    cy.visit('/#/about')
    cy.pause()
    cy.contains('h1', 'This is an about page')
  })
  it('Clicks the "Home" button', () => {
    cy.contains('a', 'Home').click()
    // Should be on a new URL which includes '/#/'
    cy.url().should('include', '/#/')
    // Get an input, type into it and verify that the value has been updated
    cy.get('#cypress-test-email')
      .type('fake@email.com')
      .should('have.value', 'fake@email.com')
  })
})
