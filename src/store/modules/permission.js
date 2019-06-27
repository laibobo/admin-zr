import { asyncRoutes, constantRoutes } from '~/router'

/**
 * 确定当前用户是否具有权限
 * @param permissionIdents
 * @param route
 */
function hasPermission(permissionIdents, route) {
    if (route.name) {
        return permissionIdents.some(identName => route.name === identName)
    }
    return true
}

/**
 * 递归过滤异步路由表
 * @param routes asyncRoutes
 * @param permissionIdents
 */
export function filterAsyncRoutes(routes, permissionIdents) {
    const res = []
    routes.forEach(route => {
        const tmp = Array.isArray(route) ? route[0] : route
        if (hasPermission(permissionIdents, tmp)) {
            if (tmp.children) {
                tmp.children = filterAsyncRoutes(tmp.children, permissionIdents)
            }
            res.push(tmp)
        }
    })
    return res
}

const state = {
    routes: [],
    addRoutes: []
}

const mutations = {
    SET_ROUTES: (state, routes) => {
        state.addRoutes = routes
        state.routes = constantRoutes.concat(routes)
    }
}

const actions = {
    generateRoutes({ commit }, permissionIdents) {
        return new Promise(resolve => {
            let accessedRoutes = filterAsyncRoutes(asyncRoutes, permissionIdents)
            commit('SET_ROUTES', accessedRoutes)
            resolve(accessedRoutes)
        })
    }
}

export default {
    // namespaced: true,
    state,
    mutations,
    actions
}