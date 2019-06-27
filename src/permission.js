import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '~/utils/auth'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login']

router.beforeEach(async(to, from, next) => {
    NProgress.start()
    document.title = to.meta.title
    const hasToken = getToken()
    if (hasToken) {
        if (to.path === '/login') {
            next({ path: '/sysmanage' })
            NProgress.done()
        } else {
            const hasPermissionIdents = store.getters.permissionIdents && store.getters.permissionIdents.length > 0
            if (!hasPermissionIdents) {
                try {
                    const { permissionIdents } = await store.dispatch('getInfo')
                    const accessRoutes = await store.dispatch('generateRoutes', permissionIdents)
                    router.addRoutes(accessRoutes)
                    next({...to, replace: true })
                } catch (error) {
                    await store.dispatch('resetToken')
                    Message.error(error || 'has error')
                    next(`/login?redirect=${to.path}`)
                    NProgress.done()
                }
            } else {
                next()
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next(`/login?redirect=${to.path}`)
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    NProgress.done()
})