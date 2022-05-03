import auth, { routesConfig as authConfig } from './auth/routes'
import styleguide from './styleguide/routes'

console.log(styleguide)

export const routesConfig = { ...authConfig }
export default [
  ...auth,
  ...styleguide,
  {
    path: '/',
    redirect: '/styleguide'
  }
]

