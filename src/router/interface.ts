import {
  RouteMeta,
  RouteLocationNormalized,
  NavigationGuardNext,
} from 'vue-router'

export interface RouteMetaConf extends RouteMeta {
  title?: string
  breadcrumb_label?: string
}

export interface RouteConfig {
  name: string
  path: string
  meta: RouteMetaConf
  component: () => Promise<unknown>
  parent?: RouteConfig
  children?: RouteConfig[]
}

export interface RouteLocationNormalizedExtended
  extends RouteLocationNormalized {
  meta: RouteMetaConf
}

export interface NavigationValidator {
  (
    to: RouteLocationNormalizedExtended,
    from: RouteLocationNormalizedExtended,
    next: NavigationGuardNext
  ): boolean
}
