## Adicionando nova rota

Uma nova rota deve ser adicionada ao arquivo `app/pages/pagina/routes.ts`, ela deve ser definida através do método `createRouteConfig` e exportada como uma lista de rotas da seguinte forma:

```typescript
export const routes = {
  AUTH: createRouteConfig({
    name: 'AUTH',
    path: '/auth',
    component: Auth,
  }),
  HOME: createRouteConfig({
    name: 'HOME',
    path: '/',
    component: Home,
  }),
}

export default [routes.AUTH, routes.HOME]
```

O sistema de rotas é baseado na função `createRouteConfig`, que recebe os parâmetros de uma rota e retorna um objeto com as propriedades da rota. Esses parâmetros são iguais aos parâmetros de uma rota do [Vue Router](https://router.vuejs.org/guide/#javascript).

```typescript
export const createRouteConfig = <
  T extends RouteParamsRaw = Record<string, never>,
  G = Record<string, unknown>
>({
  name,
  meta,
  path,
  component,
  children,
}: RouteConfig) => {
  const route = {
    name,
    meta,
    path,
    ...children,
    component,
    /**
     * Retorna a url da rota com os parâmetros passados
     * @param params
     */
    location: (params?: T): RouteLocationRaw => {
      if (!params) {
        params = {} as T
      }
      return {
        name,
        params,
      }
    },
    /**
     * Vai para a rota com os parâmetros passados
     * @param params
     */
    push: (params: T) => {
      return router.push({
        name,
        params,
      })
    },
    /**
     * Define os filhos da rota
     * @param children
     */
    setChildren: (children: RouteConfig[]) => {
      route.children = children
      for (const child of children) {
        child.parent = route
      }
    },
    /**
     * Retorna o valor de um parâmetro da rota
     * @param param
     */
    getParam: (param: keyof T) => {
      const param_str = param.toString()
      return useRoute().params[param_str]
    },
    /**
     * Retorna o valor de um parâmetro da query da rota
     * @param param
     */
    getQueryParam: (param: keyof G) => {
      const param_name = param.toString()
      const param_value = useRoute().query[param_name]?.toString()
      if (!param_value) {
        return null
      }
      return param_value
    },
  }

  return route
}
```

```typescript
const route = createRouteConfig({
  name: 'home',
  meta: {
    title: 'Home',
  },
  path: '/',
  component: Home,
})
```

O `createRouteConfig` tambem pode receber dois parâmetros de tipo generics, o primeiro é o tipo dos parâmetros da rota e o segundo é o tipo dos parâmetros da query que a pode ter. Esses tipos são usados para checagem de tipos nas funções location, push, getParam e getQueryParam.

```typescript
const route = createRouteConfig<
  {
    id: number
    name: string
  },
  {
    page: number
  }
>({
  name: 'article',
  meta: {
    title: 'Article',
  },
  path: '/article/:id',
  component: Article,
})
```

Para usar esse nova rota, basta importar a função useRoutes definida em `src/router/index.ts` e acessar a rota pelo nome. Através disso é possivel substituir a utilização do useRoute ou useRouter pelo useRoutes. Também é possivel ter autocomplete para as rotas existentes no sistema.

```typescript
import { useRoutes } from '@/router'

const routes = useRoutes()
// esse codigo vai para a rota de autenticação, substutuindo o router.push('/auth')
routes.AUTH.push({})
// esse codigo vai pegar o id da rota de artigo, substituindo o route.params.id
routes.ARTICLE.getParam('id')
// esse codigo vai pegar o page da rota de artigo, substituindo o route.query.page
routes.ARTICLE.getQueryParam('page')
// esse codigo vai dar erro, pois a rota auth não tem o parâmetro id
routes.AUTH.getParam('id')
```
