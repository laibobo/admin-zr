import request from '~/utils/request'
/**
 * 用户登录
 */
export function login(data) {
    return request({
        url: '/user/login',
        method: 'post',
        data
    })
}
/**
 * 获取用户权限相关信息
 */
export function getInfo(token) {
    return request({
        url: '/user/info',
        method: 'get',
        params: { token }
    })
}
/**
 * 用户退出登录
 */
export function logout() {
    return request({
        url: '/user/logout',
        method: 'post'
    })
}
/**
 * 根据条件获取用户数据集合
 */
export function getUserList(data) {
    return request({
        url: '/SysUser/getPagedList',
        method: 'post',
        data
    })
}
/**
 * 修改用户状态
 */
export function updateUserStatus(data){
    return request({
        url:'/SysUser/UpdateUserStatus',
        method:'post',
        data
    })
}
/**
 * 删除用户
 */
export function deleteUser(data){
    return request({
        url:'/SysUser/Delete',
        method:'post',
        data
    })
}
/**
 * 添加用户信息
 */
export function addUser(data){
    return request({
        url:'/SysUser/Add',
        method:'post',
        data
    })
}
/**
 * 修改用户信息
 */
export function updateUser(data){
    return request({
        url:'/SysUser/Update',
        method:'post',
        data
    })
}