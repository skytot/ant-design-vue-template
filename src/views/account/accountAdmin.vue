<template>
<section>
    <div>
        <div :style="{ marginBottom: '16px' }">
            <a-button @click="add" type="primary" icon="plus">新增账号</a-button>
        </div>
        <a-table :columns="columns" :dataSource="data">
            <a slot="name" slot-scope="text" href="javascript:;">{{text}}</a>
            <span slot="customTitle"> Name</span>
            <span slot="action" slot-scope="text, record">
                <a-tooltip :arrowPointAtCenter="true">
                    <template slot="title">
                        <span>修改密码</span>
                    </template>
                    <a-icon class="pointer" @click="edit(text)" type="edit" />
                </a-tooltip>
                <!-- <a href="javascript:;">Invite 一 {{record.add}}</a> -->
                <!-- <a-divider type="vertical" />
                <a-tooltip :arrowPointAtCenter="true">
                    <template slot="title">
                        <span>删除</span>
                    </template>
                    <a-popconfirm title="确认删除?" @confirm="confirm" @cancel="cancel" okText="Yes" cancelText="No">
                        <a href="#">
                            <a-icon class="pointer" type="delete" /></a>
                    </a-popconfirm>
                </a-tooltip> -->
            </span>
        </a-table>
        <a-modal title="新增账号" v-model="visible" :footer="null" width="370px" :maskClosable="false" :closable="false">
            <div class="login">
                <a-form @submit="onSubmit" :autoFormCreate="(form) => this.form = form">
                    <a-form-item fieldDecoratorId="name" :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入正确的手机号码', whitespace: true,pattern: /^((\+?[0-9]{1,4})|(\(\+86\)))?(13[0-9]|14[59]|15[0-9]|16[56]|17[0-9]|18[0-9]|19[89])\d{8}$/}]}">
                        <a-input size="large" placeholder="请输入手机号">
                            <a-icon slot="prefix" type="user" />
                        </a-input>
                    </a-form-item>
                    <a-form-item>
                        <a-col :span="15">
                            <a-form-item fieldDecoratorId="captcha" :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入正确的手机验证码', whitespace: true,len:6}]}">
                                <a-input size="large" placeholder="请输入手机验证码">
                                    <a-icon slot="prefix" type="safety" />
                                </a-input>
                            </a-form-item>
                        </a-col>
                        <a-col :span="9" style="padding-left: 10px">
                            <a-button size="large" @click="getCode" type="primary" :disabled="codeStatus">{{codeMsg}}</a-button>
                        </a-col>
                    </a-form-item>
                    <a-form-item fieldDecoratorId="password" :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入密码,6到12位', whitespace: true,min:6,max:12}]}">
                        <a-input size="large" placeholder="密码" type="password">
                            <a-icon slot="prefix" type="lock" />
                        </a-input>
                    </a-form-item>
                    <a-form-item>
                        <a-button style="width: 48%;margin-top: 24px;margin-right:1.5%" size="large" @click="close">取消</a-button>
                        <a-button :loading="logging" style="width: 48%;margin-top: 24px" size="large" htmlType="submit" type="primary">确认</a-button>
                    </a-form-item>
                </a-form>
            </div>
        </a-modal>
        <a-modal title="修改密码" v-model="visible1" @ok="hideModal" okText="提交" cancelText="取消" width="360px" :maskClosable="false" :closable="false">
            <div>
                <a-form layout="horizontal">
                    <a-form-item>
                        <a-input size="large" placeholder="请输入手机号码" :value="reTel" @change="onChange1" :disabled="true">
                            <a-icon slot="prefix" type="mobile" />
                        </a-input>
                    </a-form-item>
                    <a-form-item>
                        <a-input size="large" placeholder="请输入新密码" :value="rePwd" @change="onChange2" type="password">
                            <a-icon slot="prefix" type="safety" />
                        </a-input>
                    </a-form-item>
                    <a-form-item>
                        <a-form-item>
                            <a-input size="large" placeholder="请重复输入新密码" :value="rePwds" @change="onChange3" type="password">
                                <a-icon slot="prefix" type="safety" />
                            </a-input>
                        </a-form-item>
                    </a-form-item>
                </a-form>
            </div>
        </a-modal>
    </div>
</section>
</template>
<script>
import MD5 from 'md5'
import {
    childAccount,
    childAccountChange,
    childAccountAdd,
    smscaptcha,
    smsCheck
} from '../../api/api'
const columns = [{
    title: '用户名称',
    dataIndex: 'username',
    key: '1'
}, {
    title: '创建时间',
    dataIndex: 'createtime',
    key: '2'
}, {
    title: '编辑时间',
    dataIndex: 'edittime',
    key: '3'
}, {
    title: '操作',
    key: '4',
    scopedSlots: {
        customRender: 'action'
    }
}]
export default {
    data() {
        return {
            data: [],
            columns,
            total: 0,
            name: '',
            visible: false,
            visible1: false,
            aid: 0,
            codeMsg: '获取验证码',
            form: {},
            codeStatus: false,
            codeToken: '422639ad73ad45d48ce91c75379d3698',
            logging: false,
            eid: sessionStorage.getItem('tx_eid'),
            token: sessionStorage.getItem('tx_tk'),
            reTel: '',
            rePwd: '',
            rePwds: '',
            uid: 0
        }
    },
    methods: {
        getData() {
            childAccount()
                .then((res) => {
                    this.data = res.data
                })
        },
        getCode() {
            const tel = this.form.getFieldValue('name')
            const reg = /^((\+?[0-9]{1,4})|(\(\+86\)))?(13[0-9]|14[59]|15[0-9]|16[56]|17[0-9]|18[0-9]|19[89])\d{8}$/
            if (reg.test(tel)) {
                smscaptcha({
                        username: tel,
                        category: 0
                    })
                    .then((res) => {
                        if (res.status === 1) {
                            this.$message.success('验证码发送成功')
                            this.codeToken = res.data.token
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
        },
        close() {
            this.form.resetFields()
            this.visible = false
        },
        add() {
            this.visible = true
            this.adds = ''
        },
        edit(i) {
            this.visible1 = true
            this.reTel = i.username
            this.uid = i.userId
        },
        onChange1() {},
        onChange2(val) {
            const {
                value
            } = val.target
            this.rePwd = value
        },
        onChange3(val) {
            const {
                value
            } = val.target
            this.rePwds = value
        },
        onSubmit(e) {
            e.preventDefault()
            this.form.validateFields((err, values) => {
                if (!err) {
                    this.logging = true
                    smsCheck({
                            'token': this.codeToken,
                            'code': this.form.getFieldValue('captcha')
                        })
                        .then((res) => {
                            if (res.status === 1) {
                                childAccountAdd({
                                        token: this.token,
                                        username: this.form.getFieldValue('name'),
                                        password: MD5(this.form.getFieldValue('password'))
                                    })
                                    .then((res) => {
                                        this.logging = false
                                        if (res.status === 1) {
                                            this.$message.success(res.msg)
                                            this.form.resetFields()
                                            this.visible = false
                                            this.getData()
                                        } else if (res.status === -1) {
                                            this.$message.error(res.msg)
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
        hideModal() {
            const reg = /^((\+?[0-9]{1,4})|(\(\+86\)))?(13[0-9]|14[59]|15[0-9]|16[56]|17[0-9]|18[0-9]|19[89])\d{8}$/
            const tel = this.reTel
            const pwd = this.rePwd
            const pwds = this.rePwds
            if (!reg.test(tel)) {
                this.$message.error('请输入正确的手机号')
            } else if (pwd !== pwds) {
                this.$message.error('请输入一致的新密码')
            } else if (pwd.length > 12 || pwd.length < 6) {
                this.$message.error('新密码为6-12为数字字母组合')
            } else {
                childAccountChange({
                        username: tel,
                        password: MD5(pwd),
                        userId: this.uid
                    })
                    .then((res) => {
                        if (res.status === 1) {
                            this.$message.success(res.msg)
                            this.reTel = ''
                            this.rePwd = ''
                            this.rePwds = ''
                            this.visible1 = false
                            this.getData()
                        } else {
                            this.rePwd = ''
                            this.rePwds = ''
                            this.$message.error(res.msg)
                        }
                    })
            }
        }
    },
    watch: {},
    mounted() {
        this.getData()
        // this.test()
    }
}
</script>
<style>

</style>
