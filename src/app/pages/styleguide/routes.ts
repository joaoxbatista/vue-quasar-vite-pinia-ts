import { Route } from '@/router/utils'

const styleguideRoute = new Route({
    path: '/styleguide',
    component: () => import('./layout.vue'),
    meta: {
      breadcrumb_label: 'test',
      title: 'test'
    },
    name: 'test',
    children: {
      HOME: new Route({
        name: 'home',
        component: () => import('./index.vue'),
        meta: {
          breadcrumb_label: 'Home',
          title: 'Home'
        },
        path: ''    
      }),
      BUTTONS: new Route({
        name: 'buttons',
        component: () => import('./buttons.vue'),
        meta: {
          breadcrumb_label: 'Buttons',
          title: 'buttons'
        },
        path: 'buttons'    
      })
    },
  })

export const routesConfig = {
  ...styleguideRoute.getRoutesConfig()
}

export default [ styleguideRoute ]
