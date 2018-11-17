<template>
<section>
    <div class="demo">
        <a-tabs type="card">
            <a-tab-pane tab="基本信息" key="1">
                <a-card :loading="loading" title="">
                    <a-button type="primary" slot="extra" @click="addCop">修改信息</a-button>
                    <a-list itemLayout="horizontal" :dataSource="data" size="small" :split="false">
                        <a-list-item slot="renderItem" slot-scope="item, index">
                            <a-list-item-meta :description="item.title">
                                <div slot="title">{{item.name}}</div>
                            </a-list-item-meta>
                        </a-list-item>
                    </a-list>
                </a-card>
            </a-tab-pane>
            <a-tab-pane tab="资质认证" key="2">
                <a-card :loading="loading" title="">
                    <a-button type="primary" slot="extra" @click="addCop2">修改信息</a-button>
                    <a-list itemLayout="horizontal" :dataSource="data2" size="large" :split="false">
                        <a-list-item slot="renderItem" slot-scope="item, index" key="index">
                            <img slot="extra" width="250" alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />
                            <a-list-item-meta>
                                <div slot="title">{{item.name}}</div>
                            </a-list-item-meta>
                        </a-list-item>
                    </a-list>
                </a-card>
            </a-tab-pane>
        </a-tabs>
    </div>
    <div>
        <a-modal title="修改企业信息" v-model="visible" @ok="submitForm" okText="确认" cancelText="取消" :maskClosable="false">
            <a-form layout="horizontal" :autoFormCreate="(form)=>{this.copForm = form}">
                <a-form-item label="企业名称：" :labelCol="formItemLayout.labelCol" :wrapperCol="formItemLayout.wrapperCol" required fieldDecoratorId="cname" :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入正确企业名称', whitespace: true,min:2,max:25,validateTrigger: ['blur','change']}]}">
                    <a-input placeholder="请输入企业名称" />
                </a-form-item>
                <a-form-item label="法人名称：" fieldDecoratorId="name" required :labelCol="formItemLayout.labelCol" :wrapperCol="formItemLayout.wrapperCol" :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入正确法人名称', whitespace: true,min:2,max:6,validateTrigger: ['blur','change']}]}">
                    <a-input v-model="copForm.fname" placeholder="请输入法人名称"></a-input>
                </a-form-item>
                <a-form-item label="手　　机：" fieldDecoratorId="tel" required :labelCol="formItemLayout.labelCol" :wrapperCol="formItemLayout.wrapperCol" :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入正确的手机号码', whitespace: true,pattern: /^((\+?[0-9]{1,4})|(\(\+86\)))?(13[0-9]|14[59]|15[0-9]|16[56]|17[0-9]|18[0-9]|19[89])\d{8}$/}]}">
                    <a-input v-model="copForm.tel" placeholder="请输入手机"></a-input>
                </a-form-item>
                <a-form-item label="加盟电话：" fieldDecoratorId="tels" required :labelCol="formItemLayout.labelCol" :wrapperCol="formItemLayout.wrapperCol" :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入正确的加盟电话', whitespace: true,min:8,max:13}]}">
                    <a-input v-model="copForm.tels" placeholder="请输入加盟电话"></a-input>
                </a-form-item>
                <a-form-item label="公司地址：" fieldDecoratorId="add" required :labelCol="formItemLayout.labelCol" :wrapperCol="formItemLayout.wrapperCol" :fieldDecoratorOptions="{rules: [{ required: true, message: '请选择地址'}]}">
                    <a-cascader style="width: 100%" :options="options" placeholder="选择地区" />
                </a-form-item>
                <a-form-item label="备　　注" fieldDecoratorId="info" :labelCol="formItemLayout.labelCol" :wrapperCol="formItemLayout.wrapperCol">
                    <a-input v-model="copForm.time" placeholder="备注"></a-input>
                </a-form-item>
            </a-form>
        </a-modal>
        <a-modal title="修改企业资质认证" v-model="visible2" @ok="submitForm" okText="确认" cancelText="取消" :maskClosable="false">
            <a-form layout="horizontal">
                <a-form-item label="营业执照：" :labelCol="formItemLayout.labelCol" :wrapperCol="formItemLayout.wrapperCol" required fieldDecoratorId="cname">
                    <a-upload name="avatar" listType="picture-card" class="avatar-uploader" :showUploadList="false" action="//jsonplaceholder.typicode.com/posts/" :beforeUpload="beforeUpload" @change="handleChange">
                        <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
                        <div v-else>
                            <a-icon :type="loading ? 'loading' : 'plus'" />
                            <div class="ant-upload-text">Upload</div>
                        </div>
                    </a-upload>
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</section>
</template>
<script>
import {} from '../../api/api'
const formItemLayout = {
    labelCol: {
        span: 4,
        offset: 1
    },
    wrapperCol: {
        span: 16,
        offset: 1
    }
}
const formTailLayout = {
    labelCol: {
        span: 4,
        offset: 1
    },
    wrapperCol: {
        span: 16,
        offset: 1
    }
}
export default {
    data() {
        return {
            data: [{
                    name: '企业名称',
                    cname: 'cname',
                    title: 'Ant Design Title 1'
              }, {
                    name: '法人名称',
                    title: 'Ant Design Title 2'
              }, {
                    name: '手　　机',
                    title: '15805555555'
              }, {
                    name: '加盟电话',
                    title: '0591-11111111'
              }, {
                    name: '地　　址',
                    title: '福建省福州市鼓楼区心啊实现完全下去下午去星期五向前向前'
            }, {
                    name: '备　　注',
                    title: 'Ant Design Title 4'
                }

            ],
            data2: [{
                    name: '营业执照',
                    title: 'Ant Design Title 1'
                    }, {
                    name: '食品生产许可证',
                    title: 'Ant Design Title 1'
                    }, {
                    name: '食品流通许可证',
                    title: 'Ant Design Title 1'
                  }, {
                    name: '商标注册证',
                    title: 'Ant Design Title 1'
                }
            ],
            options: [{
                value: '1',
                label: 'Zhejiang',
                isLeaf: false
            }, {
                value: '2',
                label: 'Jiangsu',
                isLeaf: false
            }],
            loading: false,
            imageUrl: '',
            copList: [],
            visible: false,
            visible2: false,
            copForm: {
                cname: ''
            },
            checkNick: false,
            formItemLayout,
            formTailLayout
        }
    },
    methods: {
        getData() {},
        showModal() {
            this.visible = true
        },
        submitForm() {
            this.copForm.validateFields((err, values) => {
                if (!err) {
                    console.log('Received values of form: ', values)
                }
            })
        },
        confirm() {},
        addCop() {
            this.visible = true
        },
        addCop2() {
            this.visible2 = true
        },
        handleChange(info) {
            if (info.file.status === 'uploading') {
                this.loading = true
                return
            }
            if (info.file.status === 'done') {
                // Get this url from response in real world.
                // getBase64(info.file.originFileObj, (imageUrl) => {
                //     this.imageUrl = imageUrl
                //     this.loading = false
                // })
            }
        },
        beforeUpload(file) {
            const isJPG = file.type === 'image/jpeg'
            if (!isJPG) {
                this.$message.error('You can only upload JPG file!')
            }
            const isLt2M = file.size / 1024 / 1024 < 2
            if (!isLt2M) {
                this.$message.error('Image must smaller than 2MB!')
            }
            return isJPG && isLt2M
        }
    },
    watch: {},
    mounted() {
        this.getData()
    }
}
</script>
<style lang="scss">
@import "../../style/base.scss";
</style>
