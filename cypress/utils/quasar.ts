export const getSelectItems = (dataCy: string) => {
  cy.get(`[data-cy=${dataCy}]`).first().click()
  return cy.get(`.${dataCy}`).first().find('.q-item')
}
