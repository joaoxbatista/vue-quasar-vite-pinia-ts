declare namespace Cypress {
  type RequestRetryOptions = import('./commands.interface').RequestOptions
  interface Chainable {
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
     */
    login(): Chainable<Response>
    fillForm({
      data,
      selectors,
    }: {
      data: Record<string, string>
      selectors?: string[]
    }): Chainable<Element>
    teskLinkButton(button: string): Chainable<Element>
    withSelectedCompanyId(
      callback: (companyId: string) => void
    ): Chainable<Element>
    requestApi<T = any>(options: RequestRetryOptions): Chainable<Response<T>>
    setup(): Chainable<Element>
    waitSuccess(query: string): Chainable<Response>
    retryRequest(options: RequestRetryOptions)
  }
}
