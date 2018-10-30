import Vue from 'vue'
import App from './App.vue'
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
    Col
} from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import routes from './router/routes'
Vue.config.productionTip = false
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
Vue.prototype.$message = message
Vue.prototype.$info = Modal.info
Vue.prototype.$success = Modal.success
Vue.prototype.$error = Modal.error
Vue.prototype.$warning = Modal.warning
Vue.prototype.$confirm = Modal.confirm
const router = new VueRouter({routes})
/* eslint eol-last: [0, "always"] */
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
