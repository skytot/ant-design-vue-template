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
                                <a-avatar name="file" v-if="index===0" slot="avatar" :src="url" />
                                <div slot="title" v-if="index===0">
                                    <a-upload :action="upHost" @change="handleChange1" :showUploadList="false" :beforeUpload="beforeUpload1" :data="postData">
                                        <a-button>
                                            <a-icon type="upload" /> 上传头像 </a-button>
                                    </a-upload>
                                </div>
                                <div slot="title" v-else>{{item.name}}</div>
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
                            <a-list-item-meta>
                                <div slot="title">{{item.name}}</div>
                            </a-list-item-meta>
                            <img slot="extra" width="250" alt="logo" :src="item.url" />
                        </a-list-item>
                    </a-list>
                </a-card>
            </a-tab-pane>
        </a-tabs>
    </div>
    <div>
        <a-modal title="修改企业信息" v-model="visible" @ok="submitForm" okText="确认" cancelText="取消" :maskClosable="false">
            <a-form layout="horizontal" :autoFormCreate="(form)=>{this.copForm = form}">
                <a-form-item label="企业名称：" :labelCol="formItemLayout.labelCol" :wrapperCol="formItemLayout.wrapperCol" required fieldDecoratorId="name" :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入正确企业名称', whitespace: true,min:2,max:25,validateTrigger: ['blur','change']}]}">
                    <a-input placeholder="请输入企业名称" v-model="copForms.name" />
                </a-form-item>
                <a-form-item label="法人名称：" fieldDecoratorId="legalname" required :labelCol="formItemLayout.labelCol" :wrapperCol="formItemLayout.wrapperCol" :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入正确法人名称', whitespace: true,min:2,max:6,validateTrigger: ['blur','change']}]}">
                    <a-input v-model="copForms.legalname" placeholder="请输入法人名称"></a-input>
                </a-form-item>
                <a-form-item label="手　　机：" fieldDecoratorId="tel" required :labelCol="formItemLayout.labelCol" :wrapperCol="formItemLayout.wrapperCol" :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入正确的手机号码', whitespace: true,pattern: /^((\+?[0-9]{1,4})|(\(\+86\)))?(13[0-9]|14[59]|15[0-9]|16[56]|17[0-9]|18[0-9]|19[89])\d{8}$/}]}">
                    <a-input v-model="copForms.tel" placeholder="请输入手机"></a-input>
                </a-form-item>
                <a-form-item label="加盟电话：" fieldDecoratorId="code" required :labelCol="formItemLayout.labelCol" :wrapperCol="formItemLayout.wrapperCol" :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入正确的加盟电话', whitespace: true,min:8,max:13}]}">
                    <a-input v-model="copForms.code" placeholder="请输入加盟电话"></a-input>
                </a-form-item>
                <!-- <a-form-item label="公司地址：" fieldDecoratorId="add" required :labelCol="formItemLayout.labelCol" :wrapperCol="formItemLayout.wrapperCol" :fieldDecoratorOptions="{rules: [{ required: true, message: '请选择地址'}]}">
                    <a-cascader style="width: 100%" :options="options" placeholder="选择地区" />
                </a-form-item> -->
                <a-form-item label="成立日期" fieldDecoratorId="founddate" :labelCol="formItemLayout.labelCol" :wrapperCol="formItemLayout.wrapperCol">
                    <a-date-picker style="width: 100%" @change="onChange" />
                </a-form-item>
                <a-form-item label="备　　注" fieldDecoratorId="description" :labelCol="formItemLayout.labelCol" :wrapperCol="formItemLayout.wrapperCol">
                    <a-input v-model="copForms.description" placeholder="备注"></a-input>
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
import {
    baseInfo,
    enterprisesUpdata,
    upHost,
    getImgs
} from '../../api/api'
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
                    name: '头像',
                    cname: 'avator',
                    title: '',
                    url: ''
              }, {
                    name: '企业名称',
                    cname: 'cname',
                    title: ''
                }, {
                    name: '法人名称',
                    title: ''
              }, {
                    name: '手　　机',
                    title: ''
              }, {
                    name: '加盟电话',
                    title: ''
              }, {
                    name: '地　　址',
                    title: ''
            }, {
                    name: '成立日期',
                    title: ''
                }, {
                    name: '备　　注',
                    title: ''
                }

            ],
            data2: [{
                    name: '营业执照',
                    title: 'Ant Design Title 1',
                    url: ''
                    }, {
                    name: '食品生产许可证',
                    title: 'Ant Design Title 1',
                    url: ''
                    }, {
                    name: '食品流通许可证',
                    title: 'Ant Design Title 1',
                    url: ''
                  }, {
                    name: '商标注册证',
                    title: 'Ant Design Title 1',
                    url: ''
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
            upHost: upHost,
            enterpriseId: '',
            imageUrl: '',
            url: '',
            dateFormat: '',
            copList: [],
            visible: false,
            visible2: false,
            copForm: {},
            copForms: {
                name: 'sss'
            },
            checkNick: false,
            time: '',
            formItemLayout,
            formTailLayout,
            postData: {},
            imgsId:0,
        }
    },
    methods: {
        getData() {
            baseInfo(this.enterpriseId)
                .then((res) => {
                    if (res.status === 1) {
                        this.data[0].url = typeof res.data.url === 'undefined' ? 'static/img/user.jpg' :'//'+ res.data.url
                        this.url = typeof res.data.url === 'undefined' ? 'static/img/user.jpg' :'//'+ res.data.url
                        this.data[1].title = res.data.name
                        this.data[2].title = res.data.legalname
                        this.data[3].title = res.data.tel
                        this.data[4].title = res.data.code
                        this.data[5].title = res.data.name
                        this.data[6].title = res.data.founddate
                        this.data[7].title = res.data.description
                        this.copForms = res.data
                        typeof res.data.imgsId === 'undefined'?'':this.imgsId = res.data.imgsId
                    } else {
                        this.$message.error(res.msg)
                    }
                })
            getImgs(this.enterpriseId)
                .then((res) => {})
        },
        beforeUpload1(file) {
            const isJPG = file.type === 'image/jpeg'
            if (!isJPG) {
                this.$message.error('只支持 JPG 图片格式!')
            }
            const isLt5M = file.size / 1024 / 1024 < 5
            if (!isLt5M) {
                this.$message.error('请勿上传超过5MB!')
            }
            if(this.imgsId){
                this.postData.data = JSON.stringify({
                    imgsId: this.imgsId,
                    id: this.enterpriseId,
                })
            }else{
                this.postData.data = JSON.stringify({
                    id: this.enterpriseId,
                    enterpriseId: this.enterpriseId,
                    category:1,
                    subcategory :11
                })
            }

            return isJPG && isLt5M
        },
        handleChange1(info) {
            if (info.file.status === 'uploading') {
                return
            }
            if (info.file.status === 'done') {
                this.$message.success(info.file.response.msg)
                this.getData()
            }
            if (info.file.status === 'error') {
                this.$message.error(info.file.response.msg)
            }
        },
        showModal() {
            this.visible = true
        },
        submitForm() {
            this.copForm.validateFields((err, values) => {
                if (!err) {
                    values.enterpriseId = Number(this.enterpriseId)
                    if (this.time) {
                        values.founddate = this.time
                    } else {
                        values.founddate = this.copForms.founddate
                    }
                    enterprisesUpdata(values)
                        .then((res) => {
                            if (res.status === 1) {
                                this.getData()
                                this.visible = false
                                this.$message.success(res.msg)
                            } else {
                                this.$message.error(res.msg)
                            }
                        })
                }
            })
        },
        onChange(date, dateString) {
            this.time = dateString
        },
        confirm() {},
        changeImg() {},
        addCop() {
            this.visible = true
            this.$nextTick((_) => {
                this.copForm.getFieldDecorator('name', {
                    initialValue: this.copForms.name
                })
                this.copForm.getFieldDecorator('legalname', {
                    initialValue: this.copForms.legalname
                })
                this.copForm.getFieldDecorator('tel', {
                    initialValue: this.copForms.tel
                })
                this.copForm.getFieldDecorator('code', {
                    initialValue: this.copForms.code
                })
                this.copForm.getFieldDecorator('description', {
                    initialValue: this.copForms.description
                })
            })
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
        this.enterpriseId = sessionStorage.getItem('tx_eid')
        this.getData()
    }
}
</script>
<style lang="scss">
@import "../../style/base.scss";
</style>
