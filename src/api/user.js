import request from '~/utils/request'

export function login(data) {
    return Promise.resolve({
            'data': {
                token: 'test_token'
            }
        })
        // return request({
        //     url: '/user/login',
        //     method: 'post',
        //     data
        // })
}

export function getInfo(token) {
    return Promise.resolve({
            'data': {
                roles: ['A'],
                name: 'admin',
                avater: 'bobo',
                introduction: '',
                permissionIdents: ['User', 'SysManage', 'Role']
            }
        })
        // return request({
        //     url: '/user/info',
        //     method: 'get',
        //     params: { token }
        // })
}

export function logout() {
    return Promise.resolve('成功')
        // return request({
        //     url: '/user/logout',
        //     method: 'post'
        // })
}