<template>
<a-layout id="components-layout-demo-side" style="min-height: 100vh">
    <a-layout-sider collapsible v-model="collapsed">
        <div class="logo" />
        <a-menu theme="dark" :defaultSelectedKeys="defaultKey" mode="inline">
            <a-menu-item :key="item.key" v-for="item in menus" v-if="item.leaf">
                <router-link :to="item.path" :data-keys="item.key">
                    <a-icon :type="item.meta.icon" />{{item.meta.title}}</router-link>
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
                    <a-tooltip class="header-item" title="退出" placement="bottom">
                        <a @click="logout">
                            <a-icon type="logout" />
                        </a>
                    </a-tooltip>
                    <!-- <header-notice class="header-item" />
                    <header-avatar class="header-item" /> -->
                </div>
            </div>
        </a-layout-header>
        <a-layout-content style="margin: 0 16px">
            <a-breadcrumb style="margin: 16px 0">
                <a-breadcrumb-item :key="item.path" v-for="(item, index) in breadcrumb">
                    <span v-if="index === 0"><a href="#/home">{{item.name}}</a></span>
                    <router-link v-else :to="item.path">
                        {{item.name}}
                    </router-link>
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
            defaultKey: []
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
                    _this.$router.push('/login')
                    // return new Promise((resolve, reject) => {
                    //         console.log(resolve, reject)
                    //         setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                    //     })
                    //     .catch(() => console.log('Oops errors!'));
                },
                onCancel() {}
            })
        }
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            const nav = vm.$router.options.routes.filter((i) => {
                return i.hidden !== true
            })
            var arr = []
            nav.map(i => {
                if (i.leaf) {
                    var ob = {}
                    ob.key = i.key
                    ob.path = i.path
                    arr.push(ob)
                } else if (!i.leaf) {
                    i.children.map(x => {
                        var obs = {}
                        obs.key = x.key
                        obs.path = x.path
                        arr.push(obs)
                    })
                }
                return arr
            })
            // vm.defaultKey.push(arr.filter(i => {
            //     return i.path === to.path
            // })[0].key)
            // console.log(vm.defaultKey)
        })
    },
    mounted() {
        this.breadcrumb = this.$route.matched
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
</style>
