import { RouteRecordRaw } from 'vue-router'
import { Route } from '@/router/utils'

const areaRoute = new Route({
  name: 'areas',
  path: ':cameraId/areas',
  component: () => import('./areas/index.vue'),
  meta: {
    title: 'Áreas',
    breadcrumb_label: 'Áreas',
  },
  children: {
    AREA_LIST: new Route<{ params: { cameraId: string } }>({
      name: 'area-list',
      path: '',
      component: () => import('./areas/areas.vue'),
      meta: {
        title: 'Áreas',
        breadcrumb_label: 'Áreas',
      },
    }),
    AREA_EDIT: new Route<{ params: { areaId: string; cameraId: string } }>({
      name: 'area-edit',
      path: ':areaId/edit',
      component: () => import('./areas/area.vue'),
      meta: {
        title: 'Editar área',
        breadcrumb_label: 'Editar área',
      },
    }),
    AREA_CREATE: new Route<{ params: { cameraId: string } }>({
      name: 'area-create',
      path: 'create',
      component: () => import('./areas/area.vue'),
      meta: {
        title: 'Criar área',
        breadcrumb_label: 'Criar área',
      },
    }),
  },
})

const cameraRoute = new Route({
  name: 'camera',
  path: 'cameras',
  component: () => import('./index.vue'),
  meta: {
    title: 'Câmeras',
    breadcrumb_label: 'Câmeras',
  },
  children: {
    CAMERA_LIST: new Route({
      name: 'camera-list',
      path: '',
      component: () => import('./cameras.vue'),
      meta: {
        title: 'Câmeras',
        breadcrumb_label: 'Câmeras',
      },
    }),
    CAMERA_EDIT: new Route<{ params: { cameraId: string } }>({
      name: 'camera-edit',
      path: ':cameraId/edit',
      component: () => import('./camera.vue'),
      meta: {
        title: 'Editar câmera',
        breadcrumb_label: 'Editar câmera',
      },
    }),
    CAMERA_CREATE: new Route({
      name: 'camera-create',
      path: 'create',
      component: () => import('./camera.vue'),
      meta: {
        title: 'Criar câmera',
        breadcrumb_label: 'Criar câmera',
      },
    }),
    AREA: areaRoute,
  },
})

export const routesConfig = {
  CAMERAS: cameraRoute.childrenRecord.CAMERA_LIST,
  CAMERA_EDIT: cameraRoute.childrenRecord.CAMERA_EDIT,
  CAMERA_CREATE: cameraRoute.childrenRecord.CAMERA_CREATE,
  CAMERA_AREAS: areaRoute.childrenRecord.AREA_LIST,
  CAMERA_AREA_EDIT: areaRoute.childrenRecord.AREA_EDIT,
  CAMERA_AREA_CREATE: areaRoute.childrenRecord.AREA_CREATE,
}

const routes: Array<RouteRecordRaw> = [cameraRoute]

export default routes
