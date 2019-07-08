import { getToken, setToken, removeToken } from '~/utils/auth'
import router, { resetRouter } from '~/router'
import { login, logout, getInfo } from '~/api/user'

const state = {
    token: getToken(),
    name: '',
    roles: [],
    permissionIdents: []
}

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_NAME: (state, name) => {
        state.name = name
    },
    SET_ROLES: (state, roles) => {
        state.roles = roles
    },
    SET_PERMISSONIDENTS: (state, permissionIdents) => {
        state.permissionIdents = permissionIdents
    }
}
const actions = {
    userLogin({ commit }, userInfo) {
        const { username, password } = userInfo
        return new Promise((resolve, reject) => {
            login({ username: username, password: password }).then(response => {
                commit('SET_TOKEN', response.token)
                setToken(response.token)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    getInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            getInfo(state.token).then(response => {
                if (!response) {
                    reject('验证失败，请重新登录')
                }
                const { data } = response
                const { roles, name, permissionIdents } = data

                if (!roles || roles.length <= 0) {
                    reject('获取用户信息: 角色必须是非空数组')
                }

                commit('SET_ROLES', roles)
                commit('SET_NAME', name)
                commit('SET_PERMISSONIDENTS', permissionIdents)
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    logout({ commit, state }) {
        return new Promise((resolve, reject) => {
            logout(state.token).then(() => {
                commit('SET_TOKEN', '')
                commit('SET_ROLES', [])
                commit('SET_PERMISSONIDENTS', [])
                removeToken()
                resetRouter()
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    resetToken({ commit }) {
        return new Promise(resolve => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            commit('SET_PERMISSONIDENTS', [])
            removeToken()
            resolve()
        })
    },
    changeRoles({ commit, dispatch }, role) {
        return new Promise(async resolve => {
            const token = role + '-token'
            commit('SET_TOKEN', token)
            setToken(token)
            const { roles } = await dispatch('getInfo')
            resetRouter()
            const accessRoutes = await dispatch('generateRoutes', roles, { root: true })
            router.addRoutes(accessRoutes)
            resolve()
        })
    }
}

export default {
    // namespaced: true,
    state,
    mutations,
    actions
}