import { Route } from '@/router/utils'

export const routesConfig = {
  LOGIN: new Route({
    name: 'login',
    path: '/auth',
    component: () => import('./index.vue'),
    meta: {
      title: 'Login',
      breadcrumb_label: 'Login',
    },
  }),
}

const routes = [routesConfig.LOGIN]

export default routes
