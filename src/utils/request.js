import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '~/store'
import { getToken } from './auth'

const service = axios.create({
    baseURL: require(`config/${process.env.NODE_ENV}.env.js`).BASE_API,
    timeout: 5000
})

service.interceptors.request.use(config=> {
    if (store.getters.token) {
        config.headers['X-Token'] = getToken()
        //config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    }
    return config
}, error => {
    console.log(`err:${error}`)
    return Promise.reject(error)
})

service.interceptors.response.use(response => {
    const res = response.data
    // if (res.code !== 20000) {
    //     Message({
    //         message: res.data,
    //         type: 'error',
    //         duration: 5 * 1000
    //     })
    //     if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
    //         MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
    //             confirmButtonText: '重新登录',
    //             cancelButtonText: '取消',
    //             type: 'warning'
    //         }).then(() => {
    //             store.dispatch('user/resetToken').then(() => {
    //                 location.reload()
    //             })
    //         })
    //     }
    //     return Promise.reject(new Error(res.message || 'Error'))
    // }
    return res
}, error => {
    console.log(`err:${error}`)
    Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
    })
    return Promise.reject(error)
})
export default service