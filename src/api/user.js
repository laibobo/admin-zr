import request from '~/utils/request'

export function login(data) {
    return request({
        url: '/user/login',
        method: 'post',
        data
    })
}

export function getInfo(token) {
    return request({
        url: '/user/info',
        method: 'get',
        params: { token }
    })
}

export function logout() {
    return request({
        url: '/user/logout',
        method: 'post'
    })
}
export function getUserList() {
    return request({
        url: '/user/getUserList',
        method: 'get'
    })
}
export function testUser(params){
    return request({
        url:'/SysUser/GetById',
        method:'get',
        params
    })
}