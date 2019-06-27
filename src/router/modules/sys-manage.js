const User = () =>
    import ( /* webpackChunkName: "user" */ '~/views/sys-manage/user/index')
const Role = () =>
    import ( /* webpackChunkName: "role" */ '~/views/sys-manage/role/index')

const config = [{
    path: '/sysmanage',
    name: 'SysManage',
    redirect: '/sysmanage/user',
    meta: {
        title: '系统管理',
        icon: 'dizhi'
    },
    children: [{
        path: 'user',
        name: 'User',
        component: User,
        meta: {
            title: '用户管理',
            icon: 'dizhi1'
        }
    }, {
        path: 'role',
        name: 'Role',
        component: Role,
        meta: {
            title: '角色管理',
            icon: 'accessory'
        }
    }]
}]

export default config