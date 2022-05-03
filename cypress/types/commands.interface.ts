export interface RequestOptions extends Partial<Cypress.RequestOptions> {
  method: string
  body?: any
  headers?: Record<string, string>
  retries?: number
  function?: (response: Cypress.Response<any>) => void
  url: string
}
