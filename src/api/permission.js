import request from '~/utils/request'

/**
 * 根据条件获取角色数据集合
 */
export function getPermissionList(data) {
    return request({
        url: '/SysPermissions/GetPermissionList',
        method: 'post',
        data
    })
}
/**
 * 删除
 */
export function deletePermission(data){
    return request({
        url:'/SysPermissions/Delete',
        method:'post',
        data
    })
}
/**
 * 添加
 */
export function addPermission(data){
    return request({
        url:'/SysPermissions/Add',
        method:'post',
        data
    })
}
/**
 * 修改
 */
export function updatePermission(data){
    return request({
        url:'/SysPermissions/Update',
        method:'post',
        data
    })
}
