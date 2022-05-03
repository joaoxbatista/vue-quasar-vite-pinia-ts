

export const routesConfig = {
}

const routes = [
  {
    path: '/dashboard/',
    component: () => import('./layout.vue'),
    name: 'dashboard',
    children: [
    ],
    meta: {
      title: 'Dashboard',
      breadcrumb_label: 'Home',
    },
  },
]

export default routes
