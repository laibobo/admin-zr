import request from '~/utils/request'

/**
 * 根据条件获取角色数据集合
 */
export function getRoleList(data) {
    return request({
        url: '/SysRole/getPagedList',
        method: 'post',
        data
    })
}
/**
 * 删除角色
 */
export function deleteRole(data){
    return request({
        url:'/SysRole/Delete',
        method:'post',
        data
    })
}
/**
 * 添加角色信息
 */
export function addRole(data){
    return request({
        url:'/SysRole/Add',
        method:'post',
        data
    })
}
/**
 * 修改角色信息
 */
export function updateRole(data){
    return request({
        url:'/SysRole/Update',
        method:'post',
        data
    })
}
