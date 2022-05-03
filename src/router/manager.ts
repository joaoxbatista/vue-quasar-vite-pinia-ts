import {
  RouteLocationNormalizedExtended,
  NavigationValidator,
} from './interface'
import { Router, NavigationGuardNext } from 'vue-router'

function applyNavegationValidators(
  navegationValidators: NavigationValidator[],
  to: RouteLocationNormalizedExtended,
  from: RouteLocationNormalizedExtended,
  next: NavigationGuardNext
) {
  for (const navegationValidator of navegationValidators) {
    if (!navegationValidator(to, from, next)) {
      return false
    }
  }
  return true
}

function baseAction(
  to: RouteLocationNormalizedExtended,
  from: RouteLocationNormalizedExtended,
  next: NavigationGuardNext
) {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
}

export const createRouterManager = (
  router: Router,
  globalNavegationValidators?: NavigationValidator[]
) => {
  router.beforeEach((to, from, next) => {
    let isValid = true
    if (globalNavegationValidators) {
      isValid = applyNavegationValidators(
        globalNavegationValidators,
        to,
        from,
        next
      )
    }

    if (isValid) {
      baseAction(to, from, next)
    }
  })
}
