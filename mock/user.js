const info = {
    url: '/user/info',
    type: 'get',
    response: config => {
        const { token } = config.query
        if (token !== 'test_token') {
            return {
                code: 50008,
                message: '登录失败，无法获取用户详细信息。'
            }
        }
        return {
            code: 20000,
            data: {
                roles: ['A'],
                name: 'admin',
                avater: 'bobo',
                introduction: '',
                permissionIdents: ['User', 'SysManage', 'Role']
            }
        }
    }
}
const login = {
    url: '/user/login',
    type: 'post',
    response: _ => {
        return {
            code: 20000,
            token: 'test_token'
        }
    }
}
const logout = {
    url: '/user/logout',
    type: 'post',
    response: _ => {
        return {
            code: 20000,
            msg: '成功'
        }
    }
}
export default [
    info,
    login,
    logout
]