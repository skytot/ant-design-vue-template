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
            <div>
                <!-- <a-radio-group defaultValue="1" buttonStyle="solid" style="margin-bottom:20px;width:100%" @change="change">
                    <a-radio-button value="1" style="width:49%;text-align:center">主账号</a-radio-button>
                    <a-radio-button value="2" style="width:49%;text-align:center">自媒体账号</a-radio-button>
                </a-radio-group> -->
            </div>
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
                <div v-show="type==1">
                    <a @click="forgetPwd">忘记密码</a>
                    <router-link style="float: right" to="/Register">注册账户</router-link>
                </div>
            </a-form>
        </div>
    </div>
    <a-modal title="忘记密码" v-model="visible" @ok="hideModal" okText="提交" cancelText="取消" width="360px" :maskClosable="false" :closable="false">
        <div>
            <a-form layout="horizontal">
                <a-form-item>
                    <a-input size="large" placeholder="请输入手机号码" :value="reTel" @change="onChange1">
                        <a-icon slot="prefix" type="mobile" />
                    </a-input>
                </a-form-item>
                <a-form-item>
                    <a-row :gutter="8" style="margin: 0 -4px">
                        <a-col :span="15">
                            <a-form-item>
                                <a-input size="large" placeholder="请输入手机验证码" :value="reCode" @change="onChange2">
                                    <a-icon slot="prefix" type="mail" />
                                </a-input>
                            </a-form-item>
                        </a-col>
                        <a-col :span="9">
                            <a-button style="width: 100%" class="captcha-button" size="large" @click="getCode" :disabled="codeStatus">{{codeMsg}}</a-button>
                        </a-col>
                    </a-row>
                </a-form-item>
                <a-form-item>
                    <a-input size="large" placeholder="请输入新密码" :value="rePwd" @change="onChange3" type="password">
                        <a-icon slot="prefix" type="safety" />
                    </a-input>
                </a-form-item>
                <a-form-item>
                    <a-form-item>
                        <a-input size="large" placeholder="请重复输入新密码" :value="rePwds" @change="onChange4" type="password">
                            <a-icon slot="prefix" type="safety" />
                        </a-input>
                    </a-form-item>
                </a-form-item>
            </a-form>
        </div>
    </a-modal>
</div>
</template>
<script>
import MD5 from 'md5'
import {
    login,
    captcha,
    captchaCheck,
    smsCheck,
    update,
    smscaptcha,
    childLogin
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
            codeToken: '',
            codeToken1: '',
            reTel: '',
            reCode: '',
            rePwd: '',
            rePwds: '',
            type: '1'
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
        change(val) {
            this.type = val.target.value
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
                                if (this.type === '1') {
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
                                    childLogin({
                                            username: this.form.getFieldValue('name'),
                                            password: MD5(this.form.getFieldValue('password'))
                                        })
                                        .then((res) => {
                                            this.logging = false
                                            if (res.status === 1) {
                                                sessionStorage.setItem('tx_tk', res.data.token)
                                                this.$store.dispatch('setToken', res.data.token)
                                                sessionStorage.setItem('tx_ts', 2)
                                                this.$router.push('/dashboard')
                                            } else {
                                                this.$message.error(res.msg)
                                            }
                                        })
                                }
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
        sign() {},
        forgetPwd() {
            this.visible = true
        },
        onChange1(val) {
            const {
                value
            } = val.target
            this.reTel = value
        },
        onChange2(val) {
            const {
                value
            } = val.target
            this.reCode = value
        },
        onChange3(val) {
            const {
                value
            } = val.target
            this.rePwd = value
        },
        onChange4(val) {
            const {
                value
            } = val.target
            this.rePwds = value
        },
        hideModal() {
            const reg = /^((\+?[0-9]{1,4})|(\(\+86\)))?(13[0-9]|14[59]|15[0-9]|16[56]|17[0-9]|18[0-9]|19[89])\d{8}$/
            const tel = this.reTel
            const code = this.reCode
            const pwd = this.rePwd
            const pwds = this.rePwds
            if (!reg.test(tel)) {
                this.$message.error('请输入正确的手机号')
            } else if (pwd !== pwds) {
                this.$message.error('请输入一致的新密码')
            } else if (pwd.length > 12 || pwd.length < 6) {
                this.$message.error('新密码为6-12为数字字母组合')
            } else if (this.codeToken1 === '') {
                this.$message.error('请获取验证码')
            } else if (code === '') {
                this.$message.error('请输入验证码')
            } else {
                smsCheck({
                        token: this.codeToken1,
                        code: code
                    })
                    .then((res) => {
                        if (res.status === 1) {
                            update({
                                    username: tel,
                                    password: MD5(pwd)
                                })
                                .then((res) => {
                                    if (res.status === 1) {
                                        this.$message.success(res.msg)
                                        this.reTel = ''
                                        this.reCode = ''
                                        this.codeToken1 = ''
                                        this.rePwd = ''
                                        this.rePwds = ''
                                        this.visible = false
                                    } else {
                                        this.rePwd = ''
                                        this.rePwds = ''
                                        this.$message.error(res.msg)
                                    }
                                })
                        } else {
                            this.$message.error('验证码错误，请重试')
                        }
                    })
            }
        },
        getCode() {
            const tel = this.reTel
            const reg = /^((\+?[0-9]{1,4})|(\(\+86\)))?(13[0-9]|14[59]|15[0-9]|16[56]|17[0-9]|18[0-9]|19[89])\d{8}$/
            if (reg.test(tel)) {
                smscaptcha({
                        username: tel,
                        category: 1
                    })
                    .then((res) => {
                        if (res.status === 1) {
                            this.$message.success('验证码发送成功')
                            this.codeToken1 = res.data.token
                        } else {
                            this.$message.error(res.msg)
                        }
                    })
                this.codeStatus = true
                const str = '重发 '
                let s = 60
                this.codeMsg = '重发 60s'
                const t = setInterval(() => {
                    if (s > 1) {
                        s--
                        this.codeMsg = str + s + 's'
                    } else {
                        clearInterval(t)
                        this.codeMsg = '获取验证码'
                        this.codeStatus = false
                    }
                }, 1000)
            } else {
                this.$message.error('请输入正确的手机号')
            }
        }
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
