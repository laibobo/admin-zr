const User = () =>
    import ( /* webpackChunkName: "user" */ '~/views/sys-manage/user/index')
const Role = () =>
    import ( /* webpackChunkName: "role" */ '~/views/sys-manage/role/index')
const Permissions = () => import( /* webpackChunName: "permissions" */ '~/views/sys-manage/permissions/index')

const config = [{
    path: '/chart',
    redirect: '/chart/index',
    children:[
       {
        path:'index',
        name:'BB',
        component: () => import( /* webpackChunkName: "chartb" */ '~/views/home/index'),        
        meta: {
          title: '报表',
          icon: 'dizhi1'
        }
       }
    ]
    
}]

export default config