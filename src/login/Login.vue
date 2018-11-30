<template>
<div class="container">
    <div class="content">
        <div class="top">
            <!-- <div class="header">
                <img alt="logo" class="logo" src="/static/img/vue-antd-logo.png" />
                <span class="title">{{systemName}}</span>
            </div>
            <div class="desc">Power By Ant Design </div> -->
        </div>
        <div class="login">
            <a-form @submit="onSubmit" :autoFormCreate="(form) => this.form = form">
                <a-form-item fieldDecoratorId="name" :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入正确的手机号码', whitespace: true,pattern: /^((\+?[0-9]{1,4})|(\(\+86\)))?(13[0-9]|14[59]|15[0-9]|16[56]|17[0-9]|18[0-9]|19[89])\d{8}$/}]}">
                    <a-input size="large" placeholder="请输入手机号">
                        <a-icon slot="prefix" type="user" />
                    </a-input>
                </a-form-item>
                <a-form-item>
                    <a-col :span="15">
                        <a-form-item fieldDecoratorId="captcha" :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入正确的验证码', whitespace: true,len:4}]}">
                            <a-input size="large" placeholder="请输入验证码">
                                <a-icon slot="prefix" type="safety" />
                            </a-input>
                        </a-form-item>
                    </a-col>
                    <a-col :span="9" style="padding-left: 10px">
                        <a-button size="large" @click="getCodeImg" type="primary" v-if='codeImg == ""'>点击获取</a-button>
                        <img :src="codeImg" height="38px" alt="" v-else @click="changeCodeImg">
                    </a-col>
                </a-form-item>
                <a-form-item fieldDecoratorId="password" :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入密码', whitespace: true}]}">
                    <a-input size="large" placeholder="密码" type="password">
                        <a-icon slot="prefix" type="lock" />
                    </a-input>
                </a-form-item>
                <a-form-item>
                    <a-button :loading="logging" style="width: 100%;margin-top: 24px" size="large" htmlType="submit" type="primary">登 录</a-button>
                </a-form-item>
                <div>
                    <!-- <a>忘记密码</a> -->
                    <router-link style="float: right" to="/Register">注册账户</router-link>
                </div>
            </a-form>
        </div>
    </div>
</div>
</template>
<script>
import MD5 from 'md5'
import {
    login,
    captcha,
    captchaCheck
} from '../api/api'
export default {
    name: 'Login',
    data() {
        return {
            logging: false,
            error: '',
            visible: false,
            rememberMe: true,
            codeMsg: '获取验证码',
            form: {},
            codeStatus: false,
            codeImg: '',
            codeToken: ''
        }
    },
    computed: {
        systemName() {
            return 'admin'
        }
    },
    methods: {
        getCodeImg() {
            var n = this.form.getFieldValue('name')
            var reg = /^((\+?[0-9]{1,4})|(\(\+86\)))?(13[0-9]|14[59]|15[0-9]|16[56]|17[0-9]|18[0-9]|19[89])\d{8}$/
            if (reg.test(n)) {
                captcha({
                        'username': this.form.getFieldValue('name')
                    })
                    .then((res) => {
                        if (res.data.status === 1) {
                            this.codeImg = res.data.data.img
                            this.codeToken = res.data.data.token
                        } else {
                            this.$message.error(res.data.msg)
                        }
                    })
            } else {
                this.$message.error('请输入正确的手机账户')
            }
        },
        changeCodeImg() {
            this.getCodeImg()
        },
        onSubmit(e) {
            e.preventDefault()
            this.form.validateFields((err, values) => {
                if (!err) {
                    this.logging = true
                    captchaCheck({
                            'token': this.codeToken,
                            'code': this.form.getFieldValue('captcha')
                        })
                        .then((res) => {
                            if (res.status === 1) {
                                login({
                                        username: this.form.getFieldValue('name'),
                                        password: MD5(this.form.getFieldValue('password'))
                                    })
                                    .then((res) => {
                                        this.logging = false
                                        if (res.status === 1) {
                                            sessionStorage.setItem('tx_tk', res.data.token)
                                            // this.$store.dispatch('setUser', '{name:"admin"}')
                                            this.$store.dispatch('setToken', res.data.token)
                                            this.$router.push('/dashboard')
                                        } else if (res.status === -1) {
                                            sessionStorage.setItem('tx_tk', res.data.token)
                                            this.$store.dispatch('setToken', res.data.token)
                                            this.$message.error(res.msg)
                                            this.$router.push('/resinfo')
                                        } else {
                                            this.$message.error(res.msg)
                                        }
                                    })
                            } else {
                                this.logging = false
                                this.$message.error(res.msg)
                            }
                        })
                }
            })
        },
        userAgreement() {
            this.visible = true
        },
        sign() {}
    },
    mounted() {
        // this.getCodeImg()
    }
}
</script>

<style lang="scss" scoped>
.container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: auto;
    background: #f0f2f5 url("https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg") no-repeat center 110px;
    background-size: 100%;
    .content {
        padding: 32px 0;
        flex: 1;
        @media (min-width: 768px) {
            padding: 112px 0 24px;
        }
        .top {
            text-align: center;
            .header {
                height: 44px;
                line-height: 44px;
                a {
                    text-decoration: none;
                }
                .logo {
                    height: 44px;
                    vertical-align: top;
                    margin-right: 16px;
                }
                .title {
                    font-size: 33px;
                    color: rgba(0,0,0,.85);
                    font-family: 'Myriad Pro', 'Helvetica Neue', Arial, Helvetica, sans-serif;
                    font-weight: 600;
                    position: relative;
                    top: 2px;
                }
            }
            .desc {
                font-size: 14px;
                color: rgba(0,0,0,.45);
                margin-top: 12px;
                margin-bottom: 40px;
            }
        }
        .login {
            width: 368px;
            margin: 0 auto;
            @media screen and (max-width: 576px) {
                width: 95%;
            }
            @media screen and (max-width: 320px) {
                .captcha-button {
                    font-size: 14px;
                }
            }
            .icon {
                font-size: 24px;
                color: rgba(0, 0, 0, 0.2);
                margin-left: 16px;
                vertical-align: middle;
                cursor: pointer;
                transition: color 0.3s;

                &:hover {
                    color: #1890ff;
                }
            }
        }
    }
}
</style>
