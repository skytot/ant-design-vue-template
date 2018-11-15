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
                    <a-button type="primary" slot="extra" @click="addCop">修改信息</a-button>
                    <a-list itemLayout="horizontal" :dataSource="data2" size="small" :split="false">
                        <a-list-item slot="renderItem" slot-scope="item, index">
                            <a-list-item-meta :description="item.title">
                                <div slot="title">{{item.name}}</div>
                            </a-list-item-meta>
                        </a-list-item>
                    </a-list>
                </a-card>
            </a-tab-pane>
        </a-tabs>
    </div>
    <div>
        <a-modal title="修改企业信息" v-model="visible" @ok="hideModal" okText="确认" cancelText="取消">
            <!-- <a-form>
                <a-form-item :labelCol="formItemLayout.labelCol" :wrapperCol="formItemLayout.wrapperCol" label='Name' fieldDecoratorId="username" :fieldDecoratorOptions="{rules: [{ required: true, message: 'Please input your name' }]}">
                    <a-input placeholder='Please input your name' />
                </a-form-item>
                <a-form-item :labelCol="formItemLayout.labelCol" :wrapperCol="formItemLayout.wrapperCol" label='Nickname' fieldDecoratorId="nickname" :fieldDecoratorOptions="{rules: [{ required: checkNick, message: 'Please input your nickname' }]}">
                    <a-input placeholder='Please input your nickname' />
                </a-form-item>
                <a-form-item :labelCol="formTailLayout.labelCol" :wrapperCol="formTailLayout.wrapperCol">
                    <a-checkbox :checked="checkNick" @change="handleChange"> Nickname is required </a-checkbox>
                </a-form-item>
                <a-form-item :labelCol="formTailLayout.labelCol" :wrapperCol="formTailLayout.wrapperCol">
                    <a-button type='primary' @click="check">Check</a-button>
                </a-form-item>
            </a-form> -->
            <a-form layout="horizontal" :autoFormCreate="(form)=>{this.form = form}">
                <a-form-item label="企业名称：" :labelCol="formItemLayout.labelCol" :wrapperCol="formItemLayout.wrapperCol" required fieldDecoratorId="cname">
                    <a-input placeholder="请输入企业名称" />
                </a-form-item>
                <a-form-item label="法人名称：" required :labelCol="formItemLayout.labelCol" :wrapperCol="formItemLayout.wrapperCol">
                    <a-input v-model="copForm.fname" placeholder="请输入法人名称"></a-input>
                </a-form-item>
                <a-form-item label="手　　机：" required :labelCol="formItemLayout.labelCol" :wrapperCol="formItemLayout.wrapperCol">
                    <a-input v-model="copForm.tel" placeholder="请输入手机"></a-input>
                </a-form-item>
                <a-form-item label="加盟电话：" required :labelCol="formItemLayout.labelCol" :wrapperCol="formItemLayout.wrapperCol">
                    <a-input v-model="copForm.tel" placeholder="请输入加盟电话"></a-input>
                </a-form-item>
                <a-form-item label="公司地址：" required :labelCol="formItemLayout.labelCol" :wrapperCol="formItemLayout.wrapperCol">
                </a-form-item>
                <a-form-item label="备　　注" required :labelCol="formItemLayout.labelCol" :wrapperCol="formItemLayout.wrapperCol">
                    <a-input v-model="copForm.time" placeholder="请输入公司成立日期"></a-input>
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
        span: 4
    },
    wrapperCol: {
        span: 8,
        offset: 20
    }
}
const formTailLayout = {
    labelCol: {
        span: 4
    },
    wrapperCol: {
        span: 8,
        offset: 20
    }
}
export default {
    data() {
        return {
            data: [{
                    name: '企业名称',
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
            loading: false,
            copList: [],
            visible: false,
            copForm: {},
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
        hideModal() {
            this.visible = false
        },
        confirm() {},
        addCop() {
            this.visible = true
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
