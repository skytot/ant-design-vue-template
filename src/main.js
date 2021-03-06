import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import store from './vuex/store'
import VueRouter from 'vue-router'
import {
    Button,
    message,
    Layout,
    Icon,
    Menu,
    Modal,
    Alert,
    Breadcrumb,
    Tooltip,
    Form,
    Input,
    Checkbox,
    Tabs,
    Row,
    Col,
    Dropdown,
    Card,
    List,
    Avatar,
    Table,
    Divider,
    Popconfirm,
    Cascader,
    Upload,
    Steps,
    DatePicker,
    Select,
    Tree,
    Radio
} from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import routes from './router/routes'
Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(Button)
Vue.use(Layout)
Vue.use(Icon)
Vue.use(Menu)
Vue.use(Modal)
Vue.use(Alert)
Vue.use(Tooltip)
Vue.use(Modal)
Vue.use(Breadcrumb)
Vue.use(Form)
Vue.use(Input)
Vue.use(Checkbox)
Vue.use(Tabs)
Vue.use(Row)
Vue.use(Col)
Vue.use(Dropdown)
Vue.use(Card)
Vue.use(List)
Vue.use(Avatar)
Vue.use(Table)
Vue.use(Divider)
Vue.use(Popconfirm)
Vue.use(Cascader)
Vue.use(Upload)
Vue.use(Steps)
Vue.use(DatePicker)
Vue.use(Select)
Vue.use(Tree)
Vue.use(Radio)
Vue.prototype.$message = message
Vue.prototype.$info = Modal.info
Vue.prototype.$success = Modal.success
Vue.prototype.$error = Modal.error
Vue.prototype.$warning = Modal.warning
Vue.prototype.$confirm = Modal.confirm
const router = new VueRouter({routes})
router.beforeEach((to, from, next) => {
    if (to.path === '/') {
        next('/dashboard')
    } else if (to.path === '/login') {
        sessionStorage.removeItem('tx_tk')
        sessionStorage.removeItem('tx_eid')
        sessionStorage.removeItem('tx_url')
        sessionStorage.removeItem('tx_name')
        sessionStorage.removeItem('tx_ts')
        next()
    } else {
        next()
    }
})
/* eslint eol-last: [0, 'always'] */
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
