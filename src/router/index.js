import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '../views/layout/index'
import sysManageRouter from '../router/modules/sys-manage'
import sysChart from '../router/modules/sys-chart'

export const constantRoutes = [{
  path: '/login',
  name: 'Login',
  component: () =>
    import( /* webpackChunkName: "login" */ '~/views/login/index'),
  meta: {
    title: '系统登录'
  },
  hidden: true
}, {
  path: '/404',
  component: () =>
    import( /* webpackChunkName: "error 404" */ '~/views/error-page/404'),
  hidden: true
}, {
  path: '/401',
  component: () =>
    import( /* webpackChunkName: "error 401" */ '~/views/error-page/401'),
  hidden: true
}]
const asyncRoute = [
  ...sysManageRouter,
  ...sysChart
]
asyncRoute.map((item) => {
  console.log('map',item)
  item.component = Layout
})
export const asyncRoutes = [
  ...asyncRoute,
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]
const createRouter = () => new Router({
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})
const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}
export default router
