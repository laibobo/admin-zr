import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const getters = {
    token: state => state.user.token,
    name: state => state.user.name,
    roles: state => state.user.roles,
    permissionIdents: state => state.user.permissionIdents,
    permission_routes: state => state.permission.routes,
}

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    const value = modulesFiles(modulePath)
    modules[moduleName] = value.default
    return modules
}, {})

const store = new Vuex.Store({
    modules,
    getters
})

export default store