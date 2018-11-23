<template>
<section>
    <div class="card-container">
        <a-tabs type="card">
            <a-tab-pane tab="门店管理" key="1">
                <div :style="{ marginBottom: '16px' }">
                    <a-button @click="add" type="primary" icon="plus">添加门店</a-button>
                    <a-input-search placeholder="输入门店名称搜索" style="width: 200px;float:right" @search="onSearch" enterButton />
                </div>
                <a-table :columns="columns" :dataSource="data" :loading="loading" :pagination="pagination" @change="handleTableChange">
                    <a slot="name" slot-scope="text" href="javascript:;">{{text}}</a>
                    <span slot="customTitle"> Name</span>
                    <span slot="act" slot-scope="text, record">
                        <a-tooltip :arrowPointAtCenter="true">
                            <template slot="title">
                                <span>编辑</span>
                            </template>
                            <a-icon class="pointer" @click="edit(text)" type="edit" />
                        </a-tooltip>
                        <!-- <a-divider type="vertical" />
                        <a-tooltip :arrowPointAtCenter="true">
                            <template slot="title">
                                <span>上传门店图片</span>
                            </template>
                            <a-icon class="pointer" @click="" type="upload" />
                        </a-tooltip> -->
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
                <a-modal :title="title" v-model="visible" @ok="hideModal" okText="确认" cancelText="取消">
                    <a-form layout="horizontal" :autoFormCreate="(form)=>{this.copForm = form}">
                        <a-form-item label="门店名称：" :labelCol="formItemLayout.labelCol" :wrapperCol="formItemLayout.wrapperCol" required fieldDecoratorId="name" :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入正确企业名称', whitespace: true,min:2,max:25,validateTrigger: ['blur','change']}]}">
                            <a-input placeholder="请输入企业名称" />
                        </a-form-item>
                        <a-form-item label="　联系人" fieldDecoratorId="contact" required :labelCol="formItemLayout.labelCol" :wrapperCol="formItemLayout.wrapperCol" :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入正确法人名称', whitespace: true,min:2,max:6,validateTrigger: ['blur','change']}]}">
                            <a-input v-model="copForm.contact" placeholder="请输入联系人"></a-input>
                        </a-form-item>
                        <a-form-item label="手　　机" fieldDecoratorId="tel" required :labelCol="formItemLayout.labelCol" :wrapperCol="formItemLayout.wrapperCol" :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入正确的手机号码', whitespace: true,pattern:/^((\+?[0-9]{1,4})|(\(\+86\)))?(13[0-9]|14[59]|15[0-9]|16[56]|17[0-9]|18[0-9]|19[89])\d{8}$/}]}">
                            <a-input v-model="copForm.tel" placeholder="请输入手机号码"></a-input>
                        </a-form-item>
                        <a-form-item label="开业日期" fieldDecoratorId="date" required :labelCol="formItemLayout.labelCol" :wrapperCol="formItemLayout.wrapperCol">
                            <a-date-picker :defaultValue='moment(defaultTime,dateFormat)' :format="dateFormat" @change="onChange" placeholder="请选择时间" />
                        </a-form-item>
                        <a-form-item label="门店地址" fieldDecoratorId="address" required :labelCol="formItemLayout.labelCol" :wrapperCol="formItemLayout.wrapperCol">
                            <a-cascader :options="options" @change="change1" style="width: 100px;margin-right:6px" placeholder="选择省份" changeOnSelect />
                            <a-cascader :options="option2" @change="change2" style="width: 100px;margin-right:6px" placeholder="选择市区" changeOnSelect />
                            <a-cascader :options="option3" @change="change3" style="width: 100px" placeholder="选择县域" changeOnSelect />
                            <a-input v-model="adds" placeholder="详细地址"></a-input>
                        </a-form-item>
                    </a-form>
                </a-modal>
            </a-tab-pane>
            <a-tab-pane tab="代理商管理" key="2">
                <a-table :columns="columns1" :dataSource="data1" :loading="loading1" :pagination="pagination1" @change="handleTableChange1">
                    <a slot="name" slot-scope="text" href="javascript:;">{{text}}</a>
                    <span slot="customTitle"> Name</span>
                    <span slot="act" slot-scope="text, record">
                        <a-tooltip :arrowPointAtCenter="true">
                            <template slot="title">
                                <span>编辑</span>
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
            </a-tab-pane>
        </a-tabs>
    </div>
</section>
</template>
<script>
import moment from 'moment'
import {
    stores,
    addStore,
    putStore,
    location
} from '../../api/api'
const columns1 = [
    {
        title: '代理商名称',
        dataIndex: 'name',
        key: '1'
    },
    {
        title: '联系人',
        dataIndex: 'contact',
        key: '2'
    },
    {
        title: '性别',
        dataIndex: 'sex',
        key: '3'
    },
    {
        title: '出生日期',
        key: '4',
        dataIndex: 'birthday',
        scopedSlots: {
            customRender: 'date'
        }
    },
    {
        title: '联系电话',
        key: '5',
        dataIndex: 'tel',
        scopedSlots: {
            customRender: 'tel'
        }
    },
    {
        title: '从业经历年限',
        key: '6',
        dataIndex: 'year'
    },
    {
        title: '计划投入资金',
        key: '7',
        dataIndex: 'capital',
        scopedSlots: {
            customRender: 'money'
        }
    },
    {
        title: '店铺类型',
        key: '8',
        dataIndex: 'shoptype'
    },
    {
        title: '加盟面积',
        key: '10',
        dataIndex: 'area'
    },
    {
        title: '经营方式',
        key: '11',
        dataIndex: 'managetype',
        scopedSlots: {
            customRender: 'bussiness'
        }
    },
    {
        title: '开业日期',
        key: '12',
        dataIndex: 'opendate',
        scopedSlots: {
            customRender: 'open'
        }
    },
    {
        title: '编辑时间',
        key: '16',
        dataIndex: 'edittime',
        scopedSlots: {
            customRender: 'edit'
        }
    },
    {
        title: '创建时间',
        key: '17',
        dataIndex: 'createtime'
    },
    {
        title: '操作',
        key: '18',
        scopedSlots: {
            customRender: 'act'
        }
    }
]
const columns = [{
    title: '门店名称',
    dataIndex: 'name',
    key: '1'
}, {
    title: '联系人',
    dataIndex: 'contact',
    key: '2'
}, {
    title: '联系电话',
    key: '5',
    dataIndex: 'tel',
    scopedSlots: {
        customRender: 'tel'
    }
}, {
    title: '开业日期',
    key: '12',
    dataIndex: 'opendate',
    scopedSlots: {
        customRender: 'open'
    }
}, {
    title: '编辑时间',
    key: '16',
    dataIndex: 'edittime',
    scopedSlots: {
        customRender: 'edit'
    }
}, {
    title: '创建时间',
    key: '17',
    dataIndex: 'createtime'
}, {
    title: '操作',
    key: '18',
    scopedSlots: {
        customRender: 'act'
    }
}]
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
            data: [],
            data1: [],
            loading: false,
            loading1: false,
            columns,
            columns1,
            total: 0,
            total1: 0,
            pagination: {},
            pagination1: {},
            title: '添加门店',
            visible: false,
            options: [
                {
                    'locationId': 430000,
                    'name': '湖南省',
                    label: '湖南省',
                    value: '430000',
                    'category': 1,
                    'parentId': 100000
                },
                {
                    'locationId': 140000,
                    'name': '山西省',
                    label: '山西省',
                    value: '140000',
                    'category': 1,
                    'parentId': 100000
                },
                {
                    'locationId': 340000,
                    'name': '安徽省',
                    label: '安徽省',
                    value: '340000',
                    'category': 1,
                    'parentId': 100000
                },
                {
                    'locationId': 520000,
                    'name': '贵州省',
                    label: '贵州省',
                    value: '520000',
                    'category': 1,
                    'parentId': 100000
                },
                {
                    'locationId': 350000,
                    'name': '福建省',
                    label: '福建省',
                    value: '350000',
                    'category': 1,
                    'parentId': 100000
                },
                {
                    'locationId': 310000,
                    'name': '上海市',
                    label: '上海市',
                    value: '310000',
                    'category': 1,
                    'parentId': 100000
                },
                {
                    'locationId': 540000,
                    'name': '西藏自治区',
                    label: '西藏自治区',
                    value: '540000',
                    'category': 1,
                    'parentId': 100000
                },
                {
                    'locationId': 460000,
                    'name': '海南省',
                    label: '海南省',
                    value: '460000',
                    'category': 1,
                    'parentId': 100000
                },
                {
                    'locationId': 630000,
                    'name': '青海省',
                    label: '青海省',
                    value: '630000',
                    'category': 1,
                    'parentId': 100000
                },
                {
                    'locationId': 130000,
                    'name': '河北省',
                    label: '河北省',
                    value: '130000',
                    'category': 1,
                    'parentId': 100000
                },
                {
                    'locationId': 110000,
                    'name': '北京市',
                    label: '北京市',
                    value: '110000',
                    'category': 1,
                    'parentId': 100000
                },
                {
                    'locationId': 120000,
                    'name': '天津市',
                    label: '天津市',
                    value: '120000',
                    'category': 1,
                    'parentId': 100000
                },
                {
                    'locationId': 220000,
                    'name': '吉林省',
                    label: '吉林省',
                    value: '220000',
                    'category': 1,
                    'parentId': 100000
                },
                {
                    'locationId': 650000,
                    'name': '新疆维吾尔自治区',
                    label: '新疆维吾尔自治区',
                    value: '650000',
                    'category': 1,
                    'parentId': 100000
                },
                {
                    'locationId': 610000,
                    'name': '陕西省',
                    label: '陕西省',
                    value: '610000',
                    'category': 1,
                    'parentId': 100000
                },
                {
                    'locationId': 230000,
                    'name': '黑龙江省',
                    label: '黑龙江省',
                    value: '230000',
                    'category': 1,
                    'parentId': 100000
                },
                {
                    'locationId': 330000,
                    'name': '浙江省',
                    label: '浙江省',
                    value: '330000',
                    'category': 1,
                    'parentId': 100000
                },
                {
                    'locationId': 510000,
                    'name': '四川省',
                    label: '四川省',
                    value: '510000',
                    'category': 1,
                    'parentId': 100000
                },
                {
                    'locationId': 150000,
                    'name': '内蒙古自治区',
                    label: '内蒙古自治区',
                    value: '150000',
                    'category': 1,
                    'parentId': 100000
                },
                {
                    'locationId': 640000,
                    'name': '宁夏回族自治区',
                    label: '宁夏回族自治区',
                    value: '640000',
                    'category': 1,
                    'parentId': 100000
                },
                {
                    'locationId': 210000,
                    'name': '辽宁省',
                    label: '辽宁省',
                    value: '210000',
                    'category': 1,
                    'parentId': 100000
                },
                {
                    'locationId': 500000,
                    'name': '重庆市',
                    label: '重庆市',
                    value: '500000',
                    'category': 1,
                    'parentId': 100000
                },
                {
                    'locationId': 360000,
                    'name': '江西省',
                    label: '江西省',
                    value: '360000',
                    'category': 1,
                    'parentId': 100000
                },
                {
                    'locationId': 450000,
                    'name': '广西壮族自治区',
                    label: '广西壮族自治区',
                    value: '450000',
                    'category': 1,
                    'parentId': 100000
                },
                {
                    'locationId': 370000,
                    'name': '山东省',
                    label: '山东省',
                    value: '370000',
                    'category': 1,
                    'parentId': 100000
                },
                {
                    'locationId': 440000,
                    'name': '广东省',
                    label: '广东省',
                    value: '440000',
                    'category': 1,
                    'parentId': 100000
                },
                {
                    'locationId': 620000,
                    'name': '甘肃省',
                    label: '甘肃省',
                    value: '620000',
                    'category': 1,
                    'parentId': 100000
                },
                {
                    'locationId': 410000,
                    'name': '河南省',
                    label: '河南省',
                    value: '410000',
                    'category': 1,
                    'parentId': 100000
                },
                {
                    'locationId': 320000,
                    'name': '江苏省',
                    label: '江苏省',
                    value: '320000',
                    'category': 1,
                    'parentId': 100000
                },
                {
                    'locationId': 530000,
                    'name': '云南省',
                    label: '云南省',
                    value: '530000',
                    'category': 1,
                    'parentId': 100000
                },
                {
                    'locationId': 820000,
                    'name': '澳门特别行政区',
                    label: '澳门特别行政区',
                    value: '820000',
                    'category': 1,
                    'parentId': 100000
                },
                {
                    'locationId': 420000,
                    'name': '湖北省',
                    label: '湖北省',
                    value: '420000',
                    'category': 1,
                    'parentId': 100000
                },
                {
                    'locationId': 810000,
                    'name': '香港特别行政区',
                    label: '香港特别行政区',
                    value: '810000',
                    'category': 1,
                    'parentId': 100000
                },
                {
                    'locationId': 710000,
                    'name': '台湾省',
                    label: '台湾省',
                    value: '710000',
                    'category': 1,
                    'parentId': 100000
                }],
            option2: [],
            option3: [],
            secondCity: '',
            secondPro: '',
            secondTown: '',
            adds: '',
            copForm: {},
            copForm1: {},
            defaultTime: '',
            dateFormat: 'YYYY-MM-DD',
            formItemLayout,
            formTailLayout,
            time: '',
            time1: '',
            pageId: 1,
            pageId1: 1
        }
    },
    methods: {
        moment,
        getData() {
            stores({
                    enterpriseId: sessionStorage.getItem('tx_eid'),
                    pageSize: 10,
                    pageId: this.pageId
                })
                .then((res) => {
                    this.loading = false
                    if (res.status === 1) {
                        this.data = res.data.data.filter(i => {
                            return i.category === 1
                        })
                        this.data1 = res.data.data.filter(i => {
                            if (i.sex === 0) {
                                i.sex = '男'
                            } else if (i.sex === 1) {
                                i.sex = '女'
                            }
                            return i.category === 2
                        })
                        const pagination = { ...this.pagination
                        }
                        pagination.total = res.data.total
                        pagination.showTotal = function() {
                            return '共' + res.data.total + '条'
                        }
                        this.pagination = pagination
                    }
                })
        },
        onSearch(i) {
            console.log(i)
        },
        handleTableChange(pagination, filters, sorter) {
            this.pageId = pagination.current
            this.getData()
        },
        handleTableChange1(pagination, filters, sorter) {
            this.pageId1 = pagination.current
            this.getData()
        },
        onChange(data, dateString) {
            this.time = dateString
        },
        change1(value) {
            this.secondPro = value[0]
            location(value.toString())
                .then((res) => {
                    this.option2 = res.data.map(i => {
                        const n = {}
                        n.label = i.name
                        n.value = i.locationId + ''
                        return n
                    })
                })
        },
        change2(value) {
            this.secondCity = value[0]
            location(value.toString())
                .then((res) => {
                    this.option3 = res.data.map(i => {
                        const n = {}
                        n.label = i.name
                        n.value = i.locationId + ''
                        return n
                    })
                })
        },
        change3(value) {
            this.secondTown = value[0]
        },
        confirm(e) {
            this.$message.success(' Yes')
        },
        cancel(e) {
            this.$message.error(' No')
        },
        add() {
            this.title = '添加门店'
            this.visible = true
        },
        edit(i) {
            this.defaultTime = i.opendate
            console.log(i)
            this.visible = true
            this.title = '编辑门店'
            this.$nextTick(() => {
                this.copForm.setFieldsValue({
                    name: i.name
                })
                this.copForm.setFieldsValue({
                    contact: i.contact
                })
                this.copForm.setFieldsValue({
                    tel: i.tel
                })
                this.copForm.setFieldsValue({
                    opendate: i.opendate
                })
            })
        },
        hideModal() {
            this.copForm.validateFields((err, values) => {
                if (!err) {
                    const pro = this.secondPro
                    const city = this.secondCity
                    const town = this.secondTown
                    const add = this.adds
                    if (this.title === '添加门店') {
                        if (this.time === '') {
                            this.$message.error('请选择开业时间')
                        } else if (pro === '' || city === '' || town === '' || add === '') {
                            this.$message.error('请填写正确的详细地址信息')
                        } else {
                            values.opendate = this.time
                            addStore({
                                    enterpriseId: sessionStorage.getItem('tx_eid'),
                                    ...values
                                })
                                .then((res) => {
                                    if (res.status === 1) {
                                        this.$message.success(res.msg)
                                        this.copForm.resetFields()
                                        this.visible = false
                                        this.getData()
                                    } else {
                                        this.$message.error(res.msg)
                                    }
                                })
                        }
                    } else if (this.title === '编辑门店') {
                        if (pro === '' || city === '' || town === '' || add === '') {
                            this.$message.error('请填写正确的详细地址信息')
                        } else {
                            values.opendate = this.time
                            putStore(values)
                                .then((res) => {
                                    if (res.status === 1) {
                                        this.copForm.resetFields()
                                        this.$message.success(res.msg)
                                        this.visible = false
                                        this.getData()
                                    } else {
                                        this.$message.error(res.msg)
                                    }
                                })
                        }
                    }
                }
            })
        }
    },
    watch: {},
    mounted() {
        this.loading = true
        this.getData()
        // this.test()
    }
}
</script>
<style>
.card-container {
    background: #F5F5F5;
    overflow: hidden;
    padding: 24px;
}

.card-container>.ant-tabs-card>.ant-tabs-content {
    min-height: 500px;
    margin-top: -16px;
}

.card-container>.ant-tabs-card>.ant-tabs-content>.ant-tabs-tabpane {
    background: #fff;
    padding: 16px;
}

.card-container>.ant-tabs-card>.ant-tabs-bar {
    border-color: #fff;
}

.card-container>.ant-tabs-card>.ant-tabs-bar .ant-tabs-tab {
    border-color: transparent;
    background: transparent;
}

.card-container>.ant-tabs-card>.ant-tabs-bar .ant-tabs-tab-active {
    border-color: #fff;
    background: #fff;
}
</style>
