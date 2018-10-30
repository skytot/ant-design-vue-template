/* eslint func-call-spacing: ["error", "always"] */
//* *******vue路由********
//* ***首页模板****
const Home = () => import ('../layout/Home.vue')
//* ***首页****
const Index = () => import ('../layout/index.vue')
//* ***404****
const NotFound = () => import ('../views/404.vue')
//* ***登录页****
const Login = () => import ('../login/Login.vue')
//* ***注册页****
const Register = () => import ('../login/Register.vue')
const routes = [
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'icon icon-nav-home',
        leaf: true, // 只有一个节点
        meta: 'base',
        children: [
            {
                path: '/index',
                component: Index,
                name: '首页 '
            }
        ]
    }, {
        path: '/login',
        component: Login,
        name: '',
        meta: 'base',
        hidden: true
    }, {
        path: '/Register',
        component: Register,
        name: '',
        meta: 'base',
        hidden: true
    }, {
        path: '/404',
        component: NotFound,
        name: '',
        meta: 'base',
        hidden: true
    }, {
        path: '*',
        hidden: true,
        meta: 'base',
        redirect: {
            path: '/404'
        }
    }
]
export default routes
