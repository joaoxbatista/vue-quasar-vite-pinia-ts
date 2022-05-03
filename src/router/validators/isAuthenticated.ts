import { NavigationGuardNext } from 'vue-router'
import { RouteLocationNormalizedExtended } from '../interface'
import storage from '@/support/utils/storage'

function isAuthenticated(
  to: RouteLocationNormalizedExtended,
  from: RouteLocationNormalizedExtended,
  next: NavigationGuardNext
) {
  if (!storage.get('access_token') && to.name !== 'login') {
    next({
      name: 'login',
    })
    return false
  }

  return true
}

export default isAuthenticated
