import Vue from 'vue'
import Router from 'vue-router'
import modules from '@/views/modules'
import store from '@/store'
import { getToken } from '@/utils/auth'
import index from '@/views/layout/index'

Vue.use(Router)

function filterAsyncRouter (router, menuUrl) {
  const newRoutes = []
  router.forEach((item) => {
    const pathname = item.menuUrl.slice(1)
    const newRoute = {
      path: item.parentId ? pathname : item.menuUrl,
      name: pathname,
      component: item.parentId ? modules[pathname] : index,
      meta: {
        title: item.menuName,
        icon: item.icon,
        noCache: item.noCache
      }
    }
    if (item.subMenuInfoDTO.length) {
      newRoute.children = filterAsyncRouter(item.subMenuInfoDTO, item.menuUrl)
    }
    newRoutes.push(newRoute)
  })
  console.log(newRoutes)
  return newRoutes
}

export const constantRouterMap = [
  {
    path: '/403',
    component: () => import('@/views/errorPage/403.vue')
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/',
    component: index,
    redirect: '/modulea/moduleachilda'
  }
]

const exampleRouteMap = [
  {
    path: '/example',
    component: index,
    name: 'example',
    meta: {
      title: '示例',
      icon: 'ios-paper'
    },
    children: [
      {
        path: 'list',
        name: 'list',
        meta: {
          title: '列表'
        },
        component: () => import('@/views/example/index.vue')
      },
      {
        path: 'add',
        name: 'add',
        meta: {
          title: '新增'
        },
        component: () => import('@/views/example/add.vue')
      }
    ]
  }
]
const router = new Router({
  routes: constantRouterMap.concat(exampleRouteMap)
})

router.beforeEach((to, from, next) => {
  const token = getToken()
  if (to.path !== '/login' && !token) {
    next({
      path: 'login'
    })
  } else if (to.path !== '/login' && token && !store.state.menu.isGetMenu) {
    store.dispatch('GetMenu').then((res) => {
      const asyncRouter = filterAsyncRouter(res)
      router.options.routes = router.options.routes.concat(asyncRouter)
      router.addRoutes(asyncRouter)
      next({ ...to })
    })
  } else {
    next()
  }
})

export default router
