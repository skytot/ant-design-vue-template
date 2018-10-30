<template>
<div class="container">
    <div class="content">
        <div class="top">
            <div class="header">
                <img alt="logo" class="logo" src="/static/img/vue-antd-logo.png" />
                <span class="title">{{systemName}}</span>
            </div>
            <div class="desc">Power By Ant Design </div>
        </div>
        <div class="login">
            <a-form @submit="onSubmit" :autoFormCreate="(form) => this.form = form">
                <div>
                    <a-alert type="error" :closable="true" v-show="error" :message="error" showIcon style="margin-bottom: 24px;" />
                    <a-form-item :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入正确的手机号码', whitespace: true,pattern: /^((\+?[0-9]{1,4})|(\(\+86\)))?(13[0-9]|14[59]|15[0-9]|16[56]|17[0-9]|18[0-9]|19[89])\d{8}$/}]}" fieldDecoratorId="tel">
                        <a-input size="large" placeholder="请输入手机号码">
                            <a-icon slot="prefix" type="mobile" />
                        </a-input>
                    </a-form-item>
                    <a-form-item>
                        <a-col :span="16">
                            <a-form-item fieldDecoratorId="captcha" :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入正确的验证码', whitespace: true,len:4}]}">
                                <a-input size="large" placeholder="请输入验证码">
                                    <a-icon slot="prefix" type="safety" />
                                </a-input>
                            </a-form-item>
                        </a-col>
                        <a-col :span="8" style="padding-left: 4px">
                            <img src="data:image/png;base64,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
"
                                height="38px" alt="">
                        </a-col>
                    </a-form-item>
                    <a-form-item>
                        <a-row :gutter="8" style="margin: 0 -4px">
                            <a-col :span="16">
                                <a-form-item fieldDecoratorId="code" :fieldDecoratorOptions="{rules: [{ type:'string',required: true, message: '请输入手机验证码', whitespace: true,len:4}]}">
                                    <a-input size="large" placeholder="请输入正确的手机验证码">
                                        <a-icon slot="prefix" type="mail" />
                                    </a-input>
                                </a-form-item>
                            </a-col>
                            <a-col :span="8" style="padding-left: 4px">
                                <a-button style="width: 100%" class="captcha-button" size="large">获取验证码</a-button>
                            </a-col>
                        </a-row>
                    </a-form-item>
                </div>
                <div>
                    <a-checkbox :checked="true">已同意用户协议</a-checkbox>
                </div>
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
export default {
    name: 'Login',
    data() {
        return {
            logging: false,
            error: '',
            rememberMe: true
        }
    },
    computed: {
        systemName() {
            return 'admin'
        }
    },
    methods: {
        onSubmit(e) {
            e.preventDefault()
            this.form.validateFields((err, values) => {
                if (!err) {
                    this.logging = true
                    this.$axios.post('/login', {
                            name: this.form.getFieldValue('name'),
                            password: this.form.getFieldValue('password')
                        })
                        .then((res) => {
                            this.logging = false
                            const result = res.data
                            if (result.code >= 0) {
                                const user = result.data.user
                                this.$router.push('/dashboard/workplace')
                                this.$store.commit('account/setuser', user)
                                this.$message.success(result.message, 3)
                            } else {
                                this.error = result.message
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
