import routes, { routesConfig } from '../app/pages/routes'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export const useRoutes = () => {
  return routesConfig
}

export default router
