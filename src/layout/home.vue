<template>
<a-layout id="components-layout-demo-side" style="min-height: 100vh">
    <a-layout-sider collapsible :inlineCollapsed="collapsed">
        <div class="logo" />
        <a-menu theme="dark" :defaultSelectedKeys="defaultKey" mode="inline">
            <a-menu-item :key="item.key" v-for="item in menus" v-if="item.leaf">
                <router-link :to="item.path" :data-keys="item.key">
                    <a-icon :type="item.meta.icon" /> <span>{{item.meta.title}}</span></router-link>
            </a-menu-item>
            <!-- <a-sub-menu :key="item.key" v-for="item in menus" v-if="!item.leaf">
                <span slot="title">
                    <a-icon :type="item.meta.icon" /><span>{{item.name}}</span></span>
                <a-menu-item :key="itm.Key" v-for="itm in item.children">
                    <router-link :to="itm.path">
                        {{itm.name}}
                    </router-link>
                </a-menu-item>
            </a-sub-menu> -->
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
                            <img :src="copImg" alt="" width="40px">
                        </a>
                        <a-menu slot="overlay">
                            <a-menu-item>
                                <a href="javascript:;" @click="copInfo">
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
    loginInfo
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
            copImg: ''
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
                const v = [arr.filter(i => {
                    return this.$route.path.indexOf(i.path) !== -1
                })[0].key]
                return v
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
                    // console.log(this)
                    _this.$store.commit('USER', null)
                    _this.$router.push('/login')
                    // return new Promise((resolve, reject) => {
                    //         console.log(resolve, reject)
                    //         setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                    //     })
                    //     .catch(() => console.log('Oops errors!'));
                },
                onCancel() {}
            })
        },
        copInfo() {
            this.$router.push('/corporate/mycorporate')
        },
        getBreadcrumb() {
            this.breadcrumb = this.$route.matched
        },
        login() {
            loginInfo(sessionStorage.getItem('tx_tk'))
                .then((res) => {
                    if (res.status === 1) {
                        this.$store.dispatch('setUser', res.data.enterpriseId)
                        sessionStorage.setItem('tx_eid', res.data.enterpriseId)
                        sessionStorage.setItem('tx_name', res.data.name)
                        this.systemName = res.data.name
                        this.cop = res.data.name
                        this.copImg = res.data.url || 'static/img/user.jpg'
                        if (res.data.url) {
                            sessionStorage.setItem('tx_url', res.data.url)
                        } else {
                            sessionStorage.setItem('tx_url', 'static/img/user.jpg')
                        }
                    } else {
                        this.$message.error('获取基本信息失败，请重新登录')
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
            this.login()
        } else {
            this.copImg = sessionStorage.getItem('tx_url')
        }
        this.getBreadcrumb()
        this.menus = this.$router.options.routes.filter((i) => {
            return (i.hidden !== true)
        })
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
