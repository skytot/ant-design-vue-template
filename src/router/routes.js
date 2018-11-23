/* eslint func-call-spacing: ['error', 'always'] */
// *******vue路由********
// ***首页模板****
const Home = () => import ('../layout/Home.vue')
// ***首页****
const Index = () => import ('../views/home/index.vue')
// ***404****
const NotFound = () => import ('../layout/404.vue')
// ***登录页****
const Login = () => import ('../login/Login.vue')
// ***注册页****
const Register = () => import ('../login/Register.vue')
// ***注册信息页****
const resinfo = () => import ('../register/index.vue')
// const Index2 = () => import ('../views/test/index2.vue')
// const Index3 = () => import ('../views/test/index3.vue')
// 企业信息
const corporate = () => import ('../views/corporate/corporate.vue')
const corporateInfo = () => import ('../views/corporate/corporateInfo.vue')
// 地址管理
const addAdmin = () => import ('../views/add/addAdmin.vue')
// 门店管理
const storeAdmin = () => import ('../views/store/storeAdmin.vue')
// 类目管理
const sortAdmin = () => import ('../views/sort/sortAdmin.vue')
// 文章管理
const articleAdmin = () => import ('../views/article/articleAdmin.vue')
const articleEdit = () => import ('../views/article/articleEdit.vue')
// 首页管理
const indexAdmin = () => import ('../views/index/indexAdmin.vue')

const routes = [
    {
        path: '/dashboard',
        component: Home,
        name: '控制台',
        redirect: '/dashboard/index',
        iconCls: 'icon icon-nav-home',
        leaf: true,
        key: '1',
        meta: {
            leaf: true,
            title: '首页',
            icon: 'home',
            permission: ['base']
        },
        children: [
            {
                path: '/dashboard/index',
                component: Index,
                name: '首页'
            }
        ]
    },
    // {
    //     path: '/test',
    //     component: Home,
    //     name: '测试',
    //     iconCls: 'icon icon-nav-home',
    //     leaf: false,  只有一个节点
    //     redirect: '/test/index',
    //     key: '2',
    //     meta: {
    //         title: '测试',
    //         icon: 'user',
    //         permission: ['base']
    //     },
    //     children: [
    //         {
    //             path: '/test/index',
    //             component: Index2,
    //             name: '二级页1',
    //             key: '3'
    //         }, {
    //             path: '/test/index2',
    //             component: Index3,
    //             name: '二级页2',
    //             key: '4'
    //         }
    //     ]
    // },
    {
        path: '/corporate',
        component: Home,
        name: '企业',
        redirect: '/corporate/mycorporate',
        iconCls: 'icon icon-nav-home',
        leaf: true,
        hidden: true,
        key: '2',
        meta: {
            leaf: true,
            title: '企业信息',
            icon: 'pie-chart',
            permission: ['base']
        },
        children: [
            {
                path: '/corporate/mycorporate',
                component: corporate,
                name: '我的企业'
            }, {
                path: '/corporate/mycorporateInfo',
                component: corporateInfo,
                name: '企业信息'
            }
        ]
    }, {
        path: '/addAdmin',
        component: Home,
        name: '地址管理',
        redirect: '/addAdmin/add',
        iconCls: 'icon icon-nav-home',
        leaf: true,
        key: '3',
        meta: {
            leaf: true,
            title: '地址管理',
            icon: 'schedule',
            permission: ['base']
        },
        children: [
            {
                path: '/addAdmin/add',
                component: addAdmin,
                name: '地址信息'
            }
        ]
    }, {
        path: '/storeAdmin',
        component: Home,
        name: '门店管理',
        redirect: '/storeAdmin/store',
        iconCls: 'icon icon-nav-home',
        leaf: true,
        key: '4',
        meta: {
            leaf: true,
            title: '门店管理',
            icon: 'shop',
            permission: ['base']
        },
        children: [
            {
                path: 'store',
                component: storeAdmin,
                name: '门店信息'
            }
        ]
    }, {
        path: '/sortAdmin',
        component: Home,
        name: '类目管理',
        redirect: '/sortAdmin/sort',
        iconCls: 'icon icon-nav-home',
        leaf: true,
        key: '5',
        meta: {
            leaf: true,
            title: '类目管理',
            icon: 'profile',
            permission: ['base']
        },
        children: [
            {
                path: 'sort',
                component: sortAdmin,
                name: '类目列表'
            }
        ]
    }, {
        path: '/indexAdmin',
        component: Home,
        name: '首页管理',
        redirect: '/indexAdmin/index',
        iconCls: 'icon icon-nav-home',
        leaf: true,
        key: '6',
        meta: {
            leaf: true,
            title: '首页管理',
            icon: 'desktop',
            permission: ['base']
        },
        children: [
            {
                path: 'index',
                component: indexAdmin,
                name: '首页信息'
            }
        ]
    }, {
        path: '/articleAdmin',
        component: Home,
        name: '文章管理',
        redirect: '/articleAdmin/article',
        iconCls: 'icon icon-nav-home',
        leaf: true,
        key: '7',
        meta: {
            leaf: true,
            title: '文章管理',
            icon: 'switcher',
            permission: ['base']
        },
        children: [
            {
                path: 'article',
                component: articleAdmin,
                name: '文章列表'
            }, {
                path: 'articleEdit',
                component: articleEdit,
                name: '文章编辑'
            }
        ]
    }, {
        path: '/login',
        component: Login,
        name: '',
        meta: 'base',
        leaf: true,
        hidden: true
    }, {
        path: '/resinfo',
        component: resinfo,
        name: '',
        meta: 'base',
        leaf: true,
        hidden: true
    }, {
        path: '/Register',
        component: Register,
        name: '',
        leaf: true,
        meta: 'base',
        hidden: true
    }, {
        path: '/404',
        component: NotFound,
        name: '',
        leaf: true,
        meta: 'base',
        hidden: true
    }, {
        path: '/',
        hidden: true,
        leaf: true,
        meta: 'base',
        redirect: {
            path: '/dashboard'
        }
    }
]
export default routes
