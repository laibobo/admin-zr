import config from 'config/index'
import Mock from 'mockjs'

const info = {
    url: '/user/info',
    type: 'get',
    response: ({ query }) => {
        const { token } = query
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
                permissionIdents: [{ pageCode: 'User', pageBtns: ['add', 'look'] }, { pageCode: 'SysManage' }, { pageCode: 'Role', pageBtns: ['add'] },{pageCode:'Permissions'}]
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
const userList = {
    url: '/user/getUserList',
    type: 'get',
    response: _ => {
        return {
            "data": {
                "list|10": [{
                    "id|+1": 1,
                    "userName": "@cname",
                    "sex|1": ["男", "女"],
                    "age|18-60": 20,
                    "portrait": Mock.Random.image('25x25'),
                    "enabled|1": ["启用", '禁用']
                }],
                "total": 10
            },
            "code": config.responseCode
        }
    }
}
export default [
    info,
    login,
    logout,
    userList
]