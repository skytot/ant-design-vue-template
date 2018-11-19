<template>
<section>
    <div>
        <div :style="{ marginBottom: '16px' }">
            <a-button @click="add" type="primary" icon="plus">添加门店</a-button>
        </div>
        <a-table :columns="columns" :dataSource="data" :loading="loading" :pagination="pagination" @change="handleTableChange">
            <a slot="name" slot-scope="text" href="javascript:;">{{text}}</a>
            <span slot="customTitle"> Name</span>
            <span slot="act" slot-scope="text, record">
                <a-tooltip :arrowPointAtCenter="true">
                    <template slot="title">
                        <span>编辑</span>
                    </template>
                    <a-icon class="pointer" @click="edit" type="edit" />
                </a-tooltip>
                <!-- <a href="javascript:;">Invite 一 {{record.add}}</a> -->
                <a-divider type="vertical" />
                <a-tooltip :arrowPointAtCenter="true">
                    <template slot="title">
                        <span>删除</span>
                    </template>
                    <a-popconfirm title="确认删除?" @confirm="confirm" @cancel="cancel" okText="Yes" cancelText="No">
                        <a href="#">
                            <a-icon class="pointer" type="delete" /></a>
                    </a-popconfirm>
                </a-tooltip>
            </span>
        </a-table>
        <a-modal :title="title" v-model="visible" @ok="hideModal" okText="确认" cancelText="取消">
            <a-form layout="horizontal" :autoFormCreate="(form)=>{this.copForm = form}">
                <a-form-item label="门店名称：" :labelCol="formItemLayout.labelCol" :wrapperCol="formItemLayout.wrapperCol" required fieldDecoratorId="name" :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入正确企业名称', whitespace: true,min:2,max:25,validateTrigger: ['blur','change']}]}">
                    <a-input placeholder="请输入企业名称" />
                </a-form-item>
                <a-form-item label="　联系人" fieldDecoratorId="legalname" required :labelCol="formItemLayout.labelCol" :wrapperCol="formItemLayout.wrapperCol" :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入正确法人名称', whitespace: true,min:2,max:6,validateTrigger: ['blur','change']}]}">
                    <a-input v-model="copForm.fname" placeholder="请输入联系人"></a-input>
                </a-form-item>
                <a-form-item label="手　　机" fieldDecoratorId="tel" required :labelCol="formItemLayout.labelCol" :wrapperCol="formItemLayout.wrapperCol" :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入正确的手机号码', whitespace: true,pattern:/^((\+?[0-9]{1,4})|(\(\+86\)))?(13[0-9]|14[59]|15[0-9]|16[56]|17[0-9]|18[0-9]|19[89])\d{8}$/}]}">
                    <a-input v-model="copForm.tel" placeholder="请输入手机号码"></a-input>
                </a-form-item>
                <a-form-item label="开业日期" fieldDecoratorId="date" required :labelCol="formItemLayout.labelCol" :wrapperCol="formItemLayout.wrapperCol">
                        <a-date-picker style="width: 100%" @change="onChange" placeholder="请选择时间"/>
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</section>
</template>
<script>
import {
    stores,
    addStore
} from '../../api/api'
const columns = [{
    title: '门店名称',
    dataIndex: 'name',
    key: '1'
}, {
    title: '联系人',
    dataIndex: 'contact',
    key: '2'
}, {
    title: '性别',
    dataIndex: 'sex',
    key: '3'
}, {
    title: '出生日期',
    key: '4',
    dataIndex: 'birthday',
    scopedSlots: {
        customRender: 'date'
    }
}, {
    title: '联系电话',
    key: '5',
    dataIndex: 'tel',
    scopedSlots: {
        customRender: 'tel'
    }
}, {
    title: '从业经历年限',
    key: '6',
    dataIndex: 'year'
}, {
    title: '计划投入资金',
    key: '7',
    dataIndex: 'capital',
    scopedSlots: {
        customRender: 'money'
    }
}, {
    title: '店铺类型',
    key: '8',
    dataIndex: 'shoptype',
},{
    title: '加盟面积',
    key: '10',
    dataIndex: 'area',
}, {
    title: '经营方式',
    key: '11',
    dataIndex: 'managetype',
    scopedSlots: {
        customRender: 'bussiness'
    }
}, {
    title: '开业日期',
    key: '12',
    dataIndex: 'opendate',
    scopedSlots: {
        customRender: 'open'
    }
}, {
    title: '类别',
    key: '13',
    dataIndex: 'category',
    scopedSlots: {
        customRender: function(text,record){
            console.log(text)

        }
    }
}, {
    title: '状态',
    key: '14',
    dataIndex: 'status',
    scopedSlots: {
        customRender: 'status'
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
},{
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
            data:[],
            loading:false,
            columns,
            total: 0,
             pagination: {},
            title: '添加门店',
            visible: false,
            options: [{
                value: 'zhejiang',
                label: 'Zhejiang',
                isLeaf: false
            }, {
                value: 'jiangsu',
                label: 'Jiangsu',
                isLeaf: false
            }],
            copForm:{},
            formItemLayout,
            formTailLayout,
            time:'',
            pageId:1
        }
    },
    methods: {
        getData(){
            stores({enterpriseId:sessionStorage.getItem('tx_eid'),pageSize:10,pageId:this.pageId}).then((res)=>{
                this.loading = false;
                if(res.status ===1){
                    this.data = res.data.data.map(i=>{
                        if(i.sex ==0){
                            i.sex = '男'
                        }else if(i.sex ==1){
                            i.sex = '女'
                        }
                        if(i.category ==1){
                            i.category = '门店'
                        }else if(i.category ==1){
                            i.category = '经销商'
                        }
                        return i
                    })
                    const pagination = { ...this.pagination }
                    pagination.total  = res.data.total;
                    pagination.showTotal = function(){
                        return '共'+ res.data.total+'条'
                    }
                    this.pagination = pagination;
                }
            })
        },
        handleTableChange (pagination, filters, sorter) {
            console.log(pagination);
            const pager = { ...this.pagination };
            this.pageId = pagination.current;
            this.getData()
         },
         onChange(data,dateString){
             this.time = dateString
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
        edit() {
            this.title = '编辑门店'
            this.visible = true
        },
        hideModal() {
            this.copForm.validateFields((err, values) => {
                if (!err) {
                    console.log(this.time)
                    if(this.time ==''){
                        this.$message.error('请选择开业时间')
                    }else{
                        values.opendate = this.time;
                        addStore({
                            enterpriseId:sessionStorage.getItem('tx_eid'),
                            ...values
                        }).then((res)=>{
                            if(res.status ===1){
                                this.$message.success(res.msg);
                                 this.copForm.resetFields()
                                this.visible = false;
                                this.getData()
                            }else{
                                this.$message.error(res.msg)
                            }
                        })
                    }
                    console.log(values)
                }
            })
        },
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

</style>
