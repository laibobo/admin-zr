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
export function getUserList(data) {
    return request({
        url: '/SysUser/getPagedList',
        method: 'post',
        data
    })
}
export function updateUserStatus(data){
    return request({
        url:'/SysUser/UpdateUserStatus',
        method:'post',
        data
    })
}
export function testUser(params){
    return request({
        url:'/SysUser/FindById',
        method:'get',
        params
    })
}