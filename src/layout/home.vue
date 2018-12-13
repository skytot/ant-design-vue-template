<template>
<a-layout id="components-layout-demo-side" style="min-height: 100vh">
    <a-layout-sider collapsible :inlineCollapsed="collapsed">
        <div class="logo" />
        <a-menu theme="dark" :defaultSelectedKeys="defaultKey" mode="inline" @click="select" :selectedKeys="[current]">
            <a-menu-item :key="item.key" v-for="item in menus" v-if="item.leaf">
                <router-link :to="item.path" :data-keys="item.key">
                    <a-icon :type="item.meta.icon" /> <span>{{item.meta.title}}</span></router-link>
            </a-menu-item>
            <a-sub-menu :key="item.key" v-for="item in menus" v-if="!item.leaf">
                <span slot="title">
                    <a-icon :type="item.meta.icon" /><span>{{item.name}}</span></span>
                <a-menu-item :key="itm.Key" v-for="itm in item.children">
                    <router-link :to="itm.path">
                        {{itm.name}}
                    </router-link>
                </a-menu-item>
            </a-sub-menu>
        </a-menu>
    </a-layout-sider>
    <a-layout>
        <a-layout-header :class="[theme, 'global-header']">
            <div :class="['global-header-wide', layout]">
                <!-- <router-link v-if="isMobile || layout === 'head'" to="/" :class="['logo', isMobile ? null : 'pc', theme]">
                    <img width="32" src="static/img/vue-antd-logo.png" />
                    <h1 v-if="!isMobile">{{systemName}}</h1>
                </router-link> -->
                <a-divider v-if="isMobile" type="vertical" />
                <div v-if="layout === 'head'" class="global-header-menu">
                    <i-menu style="height: 64px; line-height: 64px;" :theme="theme" mode="horizontal" :menuData="menuData" @select="onSelect" />
                </div>
                <div :class="['global-header-right', theme]">
                    <!-- <header-search class="header-item" /> -->
                    <span>{{cop}}</span>
                    <a-dropdown>
                        <a class="ant-dropdown-link" href="#">
                            <img :src="copImg" alt="" width="35px" style="border-radius:50%;height:35px;">
                        </a>
                        <a-menu slot="overlay">
                            <a-menu-item>
                                <a href="javascript:;" @click="copInfo" v-if="type ===1">
                                    <a-icon type="user" />　企业信息　</a>
                            </a-menu-item>
                            <a-menu-item>
                                <a href="javascript:;" @click="logout">
                                    <a-icon type="logout" />　退出登录　</a>
                            </a-menu-item>
                        </a-menu>
                    </a-dropdown>
                    <!-- <a @click="logout">
                            <a-icon type="logout" />
                        </a> -->
                    <!-- <header-notice class="header-item" />
                    <header-avatar class="header-item" /> -->
                </div>
                <div :class="['global-header-left', theme]"> 　后台管理系统V1.0 </div>
            </div>
        </a-layout-header>
        <a-layout-content style="margin: 0 16px">
            <a-breadcrumb style="margin: 16px 0">
                <a-breadcrumb-item :key="item.path" v-for="item in breadcrumb">
                    <!-- <span v-if="index === 0"><a href="#/dashboard">{{item.name}}</a></span> -->
                    <span>
                        {{item.name}}
                    </span>
                </a-breadcrumb-item>
            </a-breadcrumb>
            <!-- <a-breadcrumb style="margin: 16px 0">
                <a-breadcrumb-item :key="item.path" v-for="(item, index) in breadcrumb">
                    <span v-if="index === 0"><a href="#/dashboard/workplace">{{item.name}}</a></span>
                    <span v-else>{{item.name}}</span>
                </a-breadcrumb-item>
            </a-breadcrumb> -->
            <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
                <transition name="fade" mode="out-in">
                    <router-view></router-view>
                </transition>
            </div>
        </a-layout-content>
        <a-layout-footer style="text-align: center"> tea admin ©2018 Created by Sky ,Power by Ant design</a-layout-footer>
    </a-layout>
</a-layout>
</template>
<script>
import {
    loginInfo,
    logout
} from '../api/api'
export default {
    data() {
        return {
            collapsed: false,
            isMobile: false,
            layout: false,
            theme: 'light',
            systemName: 'admin',
            breadcrumb: [],
            menus: [],
            cop: '福鼎润泽茶业有限公司',
            copImg: '',
            type: 0,
            current: '1'
        }
    },
    computed: {
        // 计算属性的 getter
        defaultKey: function() {
            var arr = []
            const nav = this.$router.options.routes.filter((i) => {
                return i.hidden !== true
            })
            if (this.$route.path.indexOf('corporate') === -1) {
                nav.map(i => {
                    if (i.leaf) {
                        var ob = {}
                        ob.key = i.key
                        ob.path = i.path
                        arr.push(ob)
                    }
                    // } else if (!i.leaf) {
                    //     i.children.map(x => {
                    //         var obs = {}
                    //         obs.key = x.key
                    //         obs.path = x.path
                    //         arr.push(obs)
                    //     })
                    // }
                    return arr
                })
                // const v = [arr.filter(i => {
                //     return this.$route.path.indexOf(i.path) !== -1
                // })[0].key]
                return ['61']
            } else {
                return ['1']
            }
        }
    },
    methods: {
        logout() {
            const _this = this
            this.$confirm({
                title: '确定退出?',
                content: '',
                okText: '确认',
                cancelText: '取消',
                onOk() {
                    _this.exit()
                },
                onCancel() {}
            })
        },
        exit() {
            logout()
                .then((res) => {
                    this.$store.commit('USER', null)
                    this.$router.push('/login')
                })
        },
        copInfo() {
            this.$router.push('/corporate/mycorporate')
        },
        getBreadcrumb() {
            this.breadcrumb = this.$route.matched
        },
        select(e) {
            sessionStorage.setItem('key', e.key)
            this.current = e.key
        },
        login() {
            loginInfo()
                .then((res) => {
                    if (res.status === 1) {
                        this.$store.dispatch('setUser', res.data.enterpriseId)
                        sessionStorage.setItem('tx_eid', res.data.enterpriseId)
                        sessionStorage.setItem('tx_name', res.data.name)
                        this.systemName = res.data.name
                        this.cop = res.data.name
                        if (res.data.url) {
                            sessionStorage.setItem('tx_url', '//' + res.data.url)
                            this.copImg = '//' + res.data.url
                        } else {
                            sessionStorage.setItem('tx_url', 'static/img/user.jpg')
                            this.copImg = 'static/img/user.jpg'
                        }
                    } else if (res.status === -1) {
                        sessionStorage.setItem('tx_eid', res.data.enterpriseId)
                        sessionStorage.setItem('tx_url', 'static/img/user.jpg')
                        this.$message.error('获取资质信息失败，请重新重新上传')
                        this.$router.push({
                            path: '/resinfo',
                            query: {
                                status: 1
                            }
                        })
                    } else {
                        this.$message.error('获取基本信息失败，请重新登录')
                        this.$router.push('/login')
                    }
                })
        }
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            if (sessionStorage.getItem('tx_ua') && sessionStorage.getItem('tx_tk')) {
                vm.$store.dispatch('setUser', sessionStorage.getItem('tx_ua'))
            } else {
                vm.$store.dispatch('setUser', null)
                vm.$router.push('/login')
            }
        })
    },
    watch: {
        $route() {
            this.getBreadcrumb()
        }
    },
    create() {},
    mounted() {
        if (!sessionStorage.getItem('tx_eid')) {
            if (!sessionStorage.getItem('tx_tk')) {
                this.$router.push('/login')
            } else {
                this.login()
            }
        } else {
            this.copImg = sessionStorage.getItem('tx_url')
        }
        this.type = sessionStorage.getItem('tx_ts') || 1
        if (Number(this.type) === 2) {
            this.menus = this.$router.options.routes.filter((i) => {
                return (i.hidden !== true && i.meta.permission[0] === 'child')
            })
            this.$router.push('/articleAdmin')
        } else {
            this.menus = this.$router.options.routes.filter((i) => {
                return (i.hidden !== true)
            })
        }
        this.getBreadcrumb()
        this.current = sessionStorage.getItem('key') || '1'
    }
}
</script>

<style lang="scss">
#components-layout-demo-side .logo {
    height: 32px;
    background: rgba(255, 255, 255, .2);
    margin: 16px;
}
.trigger {
    font-size: 20px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
    &:hover {
        color: #1890ff;
    }
}
.header-item {
    padding: 0 12px;
    display: inline-block;
    height: 100%;
    cursor: pointer;
    vertical-align: middle;
    i {
        font-size: 16px;
        color: rgba(0,0,0,.65);
    }
}
.global-header {
    padding: 0 12px 0 0;
    -webkit-box-shadow: 0 1px 4px rgba(0,21,41,.08);
    box-shadow: 0 1px 4px rgba(0,21,41,.08);
    position: relative;
    &.light {
        background: #fff;
    }
    &.dark {
        background: #001529;
    }
    .global-header-wide {
        &.head {
            max-width: 1400px;
            margin: auto;
        }
        &.side {}
        .logo {
            height: 64px;
            line-height: 58px;
            vertical-align: top;
            display: inline-block;
            padding: 0 12px 0 24px;
            cursor: pointer;
            font-size: 20px;
            &.pc {
                padding: 0 12px 0 0;
            }
            img {
                display: inline-block;
                vertical-align: middle;
            }
            h1 {
                display: inline-block;
                font-size: 16px;
            }
            &.dark h1 {
                color: #fff;
            }
        }
        .global-header-menu {
            display: inline-block;
        }
        .global-header-right {
            float: right;
            &.dark {
                color: #fff;
                i {
                    color: #fff;
                }
            }
        }
    }
}
.pointer {
    cursor: pointer;
}
</style>
