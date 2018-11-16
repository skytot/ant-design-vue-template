<template>
<div class="container">
    <div class="content">
        <div class="top">
            <div class="header">
                <!-- <img alt="logo" class="logo" src="/static/img/vue-antd-logo.png" /> -->
                <!-- <span class="title">注 册 用 户</span> -->
            </div>
            <div class="desc">注 册 用 户 </div>
        </div>
        <div class="login">
            <a-form @submit="onSubmit" :autoFormCreate="(form) => this.form = form">
                <div>
                    <a-form-item :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入正确的手机号码', whitespace: true,pattern: /^((\+?[0-9]{1,4})|(\(\+86\)))?(13[0-9]|14[59]|15[0-9]|16[56]|17[0-9]|18[0-9]|19[89])\d{8}$/}]}" fieldDecoratorId="tel">
                        <a-input size="large" placeholder="请输入手机号码">
                            <a-icon slot="prefix" type="mobile" />
                        </a-input>
                    </a-form-item>
                    <a-form-item>
                        <a-row :gutter="8" style="margin: 0 -4px">
                            <a-col :span="16">
                                <a-form-item fieldDecoratorId="code" :fieldDecoratorOptions="{rules: [{ type:'string',required: true, message: '请输入手机验证码', whitespace: true,len:6}]}">
                                    <a-input size="large" placeholder="请输入手机验证码">
                                        <a-icon slot="prefix" type="mail" />
                                    </a-input>
                                </a-form-item>
                            </a-col>
                            <a-col :span="8" style="padding-left: 4px">
                                <a-button style="width: 100%" class="captcha-button" size="large" @click="getCode" :disabled="codeStatus">{{codeMsg}}</a-button>
                            </a-col>
                        </a-row>
                    </a-form-item>
                    <a-form-item>
                        <a-form-item fieldDecoratorId="password" :fieldDecoratorOptions="{rules: [{ type:'string',required: true, message: '请输入密码', whitespace: true,min:6,max:18}]}">
                            <a-input size="large" placeholder="请输入密码">
                                <a-icon slot="prefix" type="mail" />
                            </a-input>
                        </a-form-item>
                    </a-form-item>
                </div>
                <!-- <div>
                    <a-checkbox :checked="true">已同意用户协议</a-checkbox>
                </div> -->
                <a-form-item>
                    <a-button :loading="logging" style="width: 100%;margin-top: 24px" size="large" htmlType="submit" type="primary">注 册</a-button>
                </a-form-item>
                <div>
                    <router-link style="float: right" to="/login">使用已有账户登录</router-link>
                </div>
            </a-form>
        </div>
    </div>
</div>
</template>
<script>
import {
    smscaptcha,
    register,
    smsCheck
} from '../api/api'
export default {
    data() {
        return {
            logging: false,
            error: '',
            rememberMe: true,
            codeMsg: '获取验证码',
            codeStatus: false
        }
    },
    computed: {
        systemName() {
            return 'admin'
        }
    },
    methods: {
        getCode() {
            const tel = this.form.getFieldValue('tel');
            const reg = /^((\+?[0-9]{1,4})|(\(\+86\)))?(13[0-9]|14[59]|15[0-9]|16[56]|17[0-9]|18[0-9]|19[89])\d{8}$/
            if (reg.test(tel)) {
                smscaptcha({
                        username: tel
                    })
                    .then((res) => {
                        if (res.status === 1) {
                            this.$message.success('验证码发送成功')
                            this.codeToken = res.data.token
                        } else {
                            this.$message.error(res.data.msg)
                        }
                    })
                this.codeStatus = true
                const str = '重发 '
                let s = 10
                this.codeMsg = '重发 10s'
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
        },
        onSubmit(e) {
            e.preventDefault()
            this.form.validateFields((err, values) => {
                if (!err) {
                    this.logging = true
                    smsCheck({
                            token: 'ac068efb08c04680a7455457de3a8725',
                            code: this.form.getFieldValue('code')
                        })
                        .then((res) => {
                            if (res.status == 1) {
                                this.logging = false
                                register({
                                        username: this.form.getFieldValue('tel'),
                                        password: this.form.getFieldValue('password')
                                    })
                                    .then((res) => {
                                        if (res.status == 1) {
                                            this.$message.success(res.msg);
                                            this.$router.push('/resinfo')
                                        } else {
                                            this.$message.error(res.msg)
                                        }
                                    })
                            } else {
                                this.$message.error('验证码错误，请重试')
                            }
                        })
                }
            })
        },
        sign() {}
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
