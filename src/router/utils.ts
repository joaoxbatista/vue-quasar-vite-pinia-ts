import router from '@/router'
import { Breadcrumb } from '@/support/common/types/components'
import {
  LocationQueryRaw,
  RouteLocation,
  RouteLocationNormalizedLoaded,
  RouteParamsRaw,
  useRoute,
} from 'vue-router'
import { RouteLocationRaw } from 'vue-router'
import { RouteMetaConf } from './interface'

interface RouteLocationCustom<
  T extends RouteParamsRaw,
  G extends LocationQueryRaw
> {
  params?: T
  query?: G
}

export class Route<
  T extends RouteLocationCustom<
    RouteParamsRaw,
    LocationQueryRaw
  > = RouteLocationCustom<Record<string, never>, Record<string, never>>,
  C = undefined
> {
  name: string
  meta: RouteMetaConf
  path: string
  component: () => Promise<unknown>
  children: Route[]
  childrenRecord: C | Record<string, never>
  parent?: Route<RouteLocationCustom<RouteParamsRaw, LocationQueryRaw>, C>
  private _vueRoute: RouteLocationNormalizedLoaded | null = null
  constructor(config: {
    name: string
    meta: RouteMetaConf
    path: string
    component: () => Promise<unknown>
    children?: C
  }) {
    this.name = config.name
    this.meta = config.meta
    this.component = config.component
    this.path = config.path
    this.children = Object.values(config.children || {})
    this.childrenRecord = config.children || {}
  }

  getRoutesConfig() {
    return { [this.name]: this, ...this.childrenRecord }
  }

  location(locationParams: T): RouteLocationRaw {
    return {
      name: this.name,
      params: locationParams.params,
      query: locationParams.query,
    }
  }

  resolve(locationParams: T): RouteLocation {
    const t = this.location(locationParams)
    return router.resolve(t)
  }

  push(locationParams: T) {
    return router.push({
      name: this.name,
      params: locationParams.params,
      query: locationParams.query,
    })
  }

  getParam(param: keyof T['params']): string | string[] | undefined {
    const param_str = param.toString()
    return this.vueRoute.params[param_str]
  }

  getQueryParam(param: keyof NonNullable<T['query']>) {
    const param_name = param.toString()
    const param_value = this.vueRoute.query[param_name]?.toString()
    if (!param_value) {
      return null
    }
    return param_value
  }

  updateQuery(partialQuery: Partial<T['query']>) {
    if (!partialQuery) {
      partialQuery = {}
    }
    const query = {
      ...this.vueRoute.query,
      ...partialQuery,
    } as LocationQueryRaw
    return router.replace({
      query,
    })
  }

  getBreacrumbs(locationParams: T): Breadcrumb[] {
    const breadcrumb: Record<string, Breadcrumb> = {}
    const routeMatched = this.resolve(locationParams).matched
    for (const route of routeMatched) {
      const { name, meta } = route
      const href = router.resolve({
        name: name,
        params: locationParams.params,
      }).href
      breadcrumb[href] = {
        label: (meta.breadcrumb_label || meta.title) as string,
        to: href,
      }
    }

    return Object.values(breadcrumb)
  }

  get vueRoute() {
    if (!this._vueRoute) {
      this._vueRoute = useRoute()
    }
    return this._vueRoute
  }
}
