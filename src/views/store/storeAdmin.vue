<template>
<section>
    <div class="card-container">
        <a-tabs type="card">
            <a-tab-pane tab="门店管理" key="1">
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
                            <a-icon class="pointer" @click="edit(text)" type="edit" />
                        </a-tooltip>
                        <!-- <a-divider type="vertical" />
                        <a-upload name="file" :showUploadList="false" :action="host" :beforeUpload="beforeUpload" @change="handleChange" v-if="text.status ===1" :data="postData">
                            <a-tooltip :arrowPointAtCenter="true">
                                <template slot="title">
                                    <span>上传门店图片</span>
                                </template>
                                <a-icon class="pointer" @click="upImg(text.storeId)" type="upload" />
                            </a-tooltip>
                        </a-upload>
                        <a-tooltip :arrowPointAtCenter="true" v-if="text.status ===2">
                            <template slot="title">
                                <span>编辑门店图片</span>
                            </template>
                            <a-icon class="pointer" @click="repImg(text)" type="picture" />
                        </a-tooltip> -->
                        <a-divider type="vertical" />
                        <a-tooltip :arrowPointAtCenter="true">
                            <template slot="title">
                                <span>编辑地址</span>
                            </template>
                            <a-icon class="pointer" type="environment-o" @click="editAddress(text)" />
                        </a-tooltip>
                    </span>
                </a-table>
                <a-modal :title="title" v-model="visible" @ok="hideModal" okText="确认" cancelText="取消">
                    <a-form layout="horizontal" :autoFormCreate="(form)=>{this.copForm = form}">
                        <a-form-item label="门店名称：" :labelCol="formItemLayout.labelCol" :wrapperCol="formItemLayout.wrapperCol" required fieldDecoratorId="name" :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入正确企业名称', whitespace: true,min:2,max:25,validateTrigger: ['blur','change']}]}">
                            <a-input placeholder="请输入门店名称" />
                        </a-form-item>
                        <a-form-item label="　联系人" fieldDecoratorId="contact" required :labelCol="formItemLayout.labelCol" :wrapperCol="formItemLayout.wrapperCol" :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入正确法人名称', whitespace: true,min:2,max:6,validateTrigger: ['blur','change']}]}">
                            <a-input v-model="copForm.contact" placeholder="请输入联系人"></a-input>
                        </a-form-item>
                        <a-form-item label="手　　机" fieldDecoratorId="tel" required :labelCol="formItemLayout.labelCol" :wrapperCol="formItemLayout.wrapperCol" :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入正确的手机号码', whitespace: true,pattern:/^((\+?[0-9]{1,4})|(\(\+86\)))?(13[0-9]|14[59]|15[0-9]|16[56]|17[0-9]|18[0-9]|19[89])\d{8}$/}]}">
                            <a-input v-model="copForm.tel" placeholder="请输入手机号码"></a-input>
                        </a-form-item>
                        <a-form-item label="开业日期" required :labelCol="formItemLayout.labelCol" :wrapperCol="formItemLayout.wrapperCol">
                            <a-date-picker :value='defaultTime' :format="dateFormat" @change="onChange" placeholder="请选择时间" :allowClear="false" />
                        </a-form-item>
                        <a-form-item label="门店地址" fieldDecoratorId="address" required :labelCol="formItemLayout.labelCol" :wrapperCol="formItemLayout.wrapperCol" v-if="title==='添加门店'">
                            <a-cascader :options="options" @change="change1" style="width: 100px;margin-right:6px" placeholder="选择省份" changeOnSelect />
                            <a-cascader :options="option2" @change="change2" style="width: 100px;margin-right:6px" placeholder="选择市区" changeOnSelect />
                            <a-cascader :options="option3" @change="change3" style="width: 100px" placeholder="选择县域" changeOnSelect v-show="selVisibles" />
                            <a-input v-model="adds" placeholder="详细地址"></a-input>
                        </a-form-item>
                    </a-form>
                </a-modal>
                <a-modal title="门店图片" v-model="visible2" @ok="hideModal2" okText="确认" cancelText="取消">
                    <div><img :src="img" class="pointer" alt="" width="100%"></div>
                    <div style="color:#999;padding-top:10px">tip:点击图片可上传并替换门店图片</div>
                </a-modal>
                <a-modal title="编辑地址" v-model="visible3" @ok="hideModal3" okText="确认" cancelText="取消">
                    <div>
                        <a-form layout="horizontal">
                            <a-form-item label="门店地址" fieldDecoratorId="address" required :labelCol="formItemLayout.labelCol" :wrapperCol="formItemLayout.wrapperCol">
                                <a-cascader :options="option4" :value="secondPro1" @change="change4" style="width: 100px;margin-right:6px" placeholder="选择省份" changeOnSelect />
                                <a-cascader :options="option5" :value="secondCity1" @change="change5" style="width: 100px;margin-right:6px" placeholder="选择市区" changeOnSelect />
                                <a-cascader :options="option6" :value="secondTown1" @change="change6" style="width: 100px" placeholder="选择县域" changeOnSelect v-show="selVisible" />
                                <a-input v-model="adds1" placeholder="详细地址"></a-input>
                            </a-form-item>
                        </a-form>
                    </div>
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
                            <a-icon class="pointer" @click="edit1(text)" type="edit" />
                        </a-tooltip>
                    </span>
                </a-table>
                <a-modal title="编辑代理商" v-model="visible1" @ok="hideModal1" okText="确认" cancelText="取消">
                    <a-form layout="horizontal" :autoFormCreate="(form)=>{this.copForm1 = form}">
                        <a-form-item label="代理商名称：" :labelCol="formItemLayout.labelCol" :wrapperCol="formItemLayout.wrapperCol" required fieldDecoratorId="name" :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入正确企业名称', whitespace: true,min:2,max:25,validateTrigger: ['blur','change']}]}">
                            <a-input placeholder="请输入代理商名称" />
                        </a-form-item>
                        <a-form-item label="　联系人" fieldDecoratorId="contact" required :labelCol="formItemLayout.labelCol" :wrapperCol="formItemLayout.wrapperCol" :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入正确法人名称', whitespace: true,min:2,max:6,validateTrigger: ['blur','change']}]}">
                            <a-input v-model="copForm.contact" placeholder="请输入联系人"></a-input>
                        </a-form-item>
                        <a-form-item label="性　　别" fieldDecoratorId="sex" required :labelCol="formItemLayout.labelCol" :wrapperCol="formItemLayout.wrapperCol">
                            <a-radio-group name="radioGroup" :defaultValue="0">
                                <a-radio :value="0">男</a-radio>
                                <a-radio :value="1">女</a-radio>
                            </a-radio-group>
                        </a-form-item>
                        <a-form-item label="出生日期" required :labelCol="formItemLayout.labelCol" :wrapperCol="formItemLayout.wrapperCol">
                            <a-date-picker :value='defaultTime1' :format="dateFormat" @change="onChange1" placeholder="请选择出生日期" :allowClear="false" />
                        </a-form-item>
                        <a-form-item label="联系电话" fieldDecoratorId="tel" required :labelCol="formItemLayout.labelCol" :wrapperCol="formItemLayout.wrapperCol" :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入正确的手机号码', whitespace: true,pattern:/^((\+?[0-9]{1,4})|(\(\+86\)))?(13[0-9]|14[59]|15[0-9]|16[56]|17[0-9]|18[0-9]|19[89])\d{8}$/}]}">
                            <a-input v-model="copForm.tel" placeholder="请输入手机号码"></a-input>
                        </a-form-item>
                        <a-form-item label="店铺类型" fieldDecoratorId="shoptype" required :labelCol="formItemLayout.labelCol" :wrapperCol="formItemLayout.wrapperCol">
                            <a-radio-group name="radioGroup" :defaultValue="1">
                                <a-radio :value="1">茶文化会所</a-radio>
                                <a-radio :value="2">标准店</a-radio>
                                <a-radio :value="3">精品店</a-radio>
                            </a-radio-group>
                        </a-form-item>
                        <a-form-item label="开业日期" required :labelCol="formItemLayout.labelCol" :wrapperCol="formItemLayout.wrapperCol">
                            <a-date-picker :value='defaultTime2' :format="dateFormat" @change="onChange2" placeholder="请选择时间" :allowClear="false" />
                        </a-form-item>
                    </a-form>
                </a-modal>
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
    location,
    agent,
    imgHost1,
    getAddress,
    storeImg,
    addressUp
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
            host: imgHost1,
            columns1,
            total: 0,
            total1: 0,
            pagination: {},
            pagination1: {},
            title: '添加门店',
            visible: false,
            visible1: false,
            visible2: false,
            visible3: false,
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
            option5: [],
            option6: [],
            option4: [
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
            secondCity: '',
            secondCity1: [],
            secondPro: '',
            secondPro1: [],
            secondTown: '',
            secondTown1: [],
            adds: '',
            adds1: '',
            copForm: {},
            copForm1: {},
            defaultTime: {},
            defaultTime1: '',
            defaultTime2: '',
            dateFormat: 'YYYY-MM-DD',
            formItemLayout,
            formTailLayout,
            time: '',
            time1: '',
            time2: '',
            pageId: 1,
            pageId1: 1,
            sid: 0,
            img: '',
            aid: 0,
            selVisible: true,
            selVisibles: true,
            postData: {}
        }
    },
    methods: {
        moment,
        getData() {
            stores({
                    enterpriseId: sessionStorage.getItem('tx_eid'),
                    category: 1,
                    pageSize: 10,
                    pageId: this.pageId
                })
                .then((res) => {
                    this.loading = false
                    if (res.status === 1) {
                        this.data = res.data.data.filter(i => {
                            return i.category === 1
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
        getData1() {
            stores({
                    enterpriseId: sessionStorage.getItem('tx_eid'),
                    category: 2,
                    pageSize: 10,
                    pageId: this.pageId1
                })
                .then((res) => {
                    this.loading = false
                    if (res.status === 1) {
                        this.data1 = res.data.data.map((i) => {
                            i.sex === 0 ? i.sex = '男' : i.sex = '女'
                            i.shoptype === 1 ? i.shoptype = '茶文化会所' : i.shoptype === 2 ? i.shoptype = '标准店' : i.shoptype = '精品店'
                            i.managetype === 1 ? i.managetype = '个人' : i.managetype === 2 ? i.managetype = '单位' : i.managetype === 3 ? i.managetype = '合伙人' : i.managetype = '其它'
                            return i
                        })
                        const pagination = { ...this.pagination1
                        }
                        pagination.total = res.data.total
                        pagination.showTotal = function() {
                            return '共' + res.data.total + '条'
                        }
                        this.pagination1 = pagination
                    }
                })
        },
        handleTableChange(pagination, filters, sorter) {
            this.pageId = pagination.current
            this.getData()
        },
        handleTableChange1(pagination, filters, sorter) {
            this.pageId1 = pagination.current
            this.getData1()
        },
        onChange(data, dateString) {
            this.time = dateString
            this.defaultTime = data
        },
        onChange1(data, dateString) {
            this.time1 = dateString
            this.defaultTime1 = data
        },
        onChange2(data, dateString) {
            this.time2 = dateString
            this.defaultTime2 = data
        },
        change1(value) {
            this.secondPro = value[0]
            this.secondTown = []
            this.secondCity = []
            if (value.length !== 0) {
                location(value.toString())
                    .then((res) => {
                        this.option2 = res.data.map(i => {
                            const n = {}
                            n.label = i.name
                            n.value = i.locationId + ''
                            return n
                        })
                    })
            }
        },
        change2(value) {
            this.secondCity = value[0]
            this.secondTown = []
            if (value.length !== 0) {
                location(value.toString())
                    .then((res) => {
                        this.option3 = res.data.map(i => {
                            const n = {}
                            n.label = i.name
                            n.value = i.locationId + ''
                            return n
                        })
                        if (this.option3.length === 0) {
                            this.selVisibles = false
                            this.secondTown1 = this.secondCity1
                        } else {
                            this.selVisibles = true
                        }
                    })
            }
        },
        change3(value) {
            this.secondTown = value[0]
        },
        change4(value) {
            this.secondPro1 = value
            this.secondTown1 = ['']
            this.secondCity1 = ['']
            if (value.length !== 0) {
                location(value.toString())
                    .then((res) => {
                        this.option5 = res.data.map(i => {
                            const n = {}
                            n.label = i.name
                            n.value = i.locationId + ''
                            return n
                        })
                    })
            }
        },
        change5(value) {
            this.secondCity1 = value
            this.secondTown1 = ['']
            if (value.length !== 0) {
                location(value.toString())
                    .then((res) => {
                        this.option6 = res.data.map(i => {
                            const n = {}
                            n.label = i.name
                            n.value = i.locationId + ''
                            return n
                        })
                        if (this.option6.length === 0) {
                            this.selVisible = false
                            this.secondTown1 = this.secondCity1
                        } else {
                            this.selVisible = true
                        }
                    })
            }
        },
        change6(value) {
            this.secondTown1 = value
        },
        beforeUpload(file) {
            const isJPG = file.type === 'image/jpeg'
            if (!isJPG) {
                this.$message.error('只支持 JPG 图片格式!')
            }
            const isLt5M = file.size / 1024 / 1024 < 5
            if (!isLt5M) {
                this.$message.error('请勿上传超过5MB!')
            }
            this.postData.data = JSON.stringify({
                id: this.sid,
                storeId: this.sid
            })
            return isJPG && isLt5M
        },
        handleChange(info) {
            if (info.file.status === 'uploading') {
                this.loading = true
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
        confirm(e) {
            this.$message.success(' Yes')
        },
        cancel(e) {
            this.$message.error(' No')
        },
        add() {
            this.title = '添加门店'
            this.defaultTime = this.moment('2018-01-01', this.dateFormat)
            this.time = '2018-01-01'
            this.visible = true
        },
        upImg(i) {
            this.sid = i
        },
        repImg(i) {
            storeImg(i.storeId)
                .then((res) => {
                    this.img = '//' + res.data[0].url
                    this.visible2 = true
                })
        },
        editAddress(i) {
            this.visible3 = true
            getAddress(i.storeId)
                .then((res) => {
                    this.adds1 = res.data.name
                    this.change4([String(res.data.locationId1)])
                    this.change5([String(res.data.locationId2)])
                    this.change6([String(res.data.locationId3)])
                    this.aid = res.data.addressId
                })
        },
        edit(i) {
            this.sid = i.storeId
            this.defaultTime = this.moment(i.opendate, this.dateFormat)
            this.time = i.opendate
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
            })
        },
        edit1(i) {
            this.sid = i.storeId
            this.defaultTime1 = this.moment(i.birthday, this.dateFormat)
            this.defaultTime2 = this.moment(i.opendate, this.dateFormat)
            this.time1 = i.birthday
            this.time2 = i.opendate
            this.visible1 = true
            this.$nextTick((_) => {
                this.copForm1.setFieldsValue({
                    name: i.name
                })
                this.copForm1.setFieldsValue({
                    sex: i.sex === '男' ? 0 : 1
                })
                this.copForm1.setFieldsValue({
                    shoptype: i.shoptype === '茶文化会所' ? 1 : i.shoptype === '标准店' ? 2 : 3
                })
                this.copForm1.setFieldsValue({
                    contact: i.contact
                })
                this.copForm1.setFieldsValue({
                    tel: i.tel
                })
            })
        },
        hideModal() {
            this.copForm.validateFields((err, values) => {
                if (!err) {
                    const town = this.secondTown
                    const add = this.adds
                    if (this.title === '添加门店') {
                        if (this.time === '') {
                            this.$message.error('请选择开业时间')
                        } else if (town === '' || add === '') {
                            this.$message.error('请填写正确的详细地址信息')
                        } else {
                            values.opendate = this.time
                            values.locationId = Number(town)
                            values.addressname = add
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
                        values.opendate = this.time
                        values.storeId = this.sid
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
            })
        },
        hideModal1() {
            this.copForm1.validateFields((err, values) => {
                values.birthday = this.time1
                values.opendate = this.time2
                values.storeId = this.sid
                if (!err) {
                    agent({ ...values
                        })
                        .then((res) => {
                            if (res.status === 1) {
                                this.visible1 = false
                                this.$message.success(res.msg)
                                this.getData1()
                            } else {
                                this.$message.error(res.msg)
                            }
                        })
                }
            })
        },
        hideModal2() {},
        hideModal3() {
            if (this.adds1 === '' || this.secondTown1.length === 0) {
                this.$message.error('请输入正确的地址信息')
            } else {
                addressUp({
                        addressId: this.aid,
                        locationId: Number(this.secondTown1[0]),
                        name: this.adds1
                    })
                    .then((res) => {
                        if (res.status === 1) {
                            this.visible3 = false
                            this.$message.success(res.msg)
                        } else {
                            this.$message.error(res.msg)
                        }
                    })
            }
        }
    },
    watch: {},
    mounted() {
        this.loading = true
        this.getData()
        this.getData1()
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
