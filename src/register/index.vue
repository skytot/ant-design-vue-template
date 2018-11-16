<template>
<div class="container">
    <div class="content">
        <div class="top" style="width:700px;margin:50px auto;">
            <a-steps :current="current">
                <a-step v-for="item in steps" :key="item.title" :title="item.title" />
            </a-steps>
        </div>
        <div class="steps-content step1" style="width:800px; margin: 50px auto" v-if="current ==0">{{steps[current].content}}
            <a-form layout="horizontal" :autoFormCreate="(form)=>{this.copForm = form}">
                <a-form-item label="企业名称：" :labelCol="formItemLayout.labelCol" :wrapperCol="formItemLayout.wrapperCol" required fieldDecoratorId="name" :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入正确企业名称', whitespace: true,min:2,max:25,validateTrigger: ['blur','change']}]}">
                    <a-input placeholder="请输入企业名称" />
                </a-form-item>
                <a-form-item label="法人名称：" fieldDecoratorId="legalname" required :labelCol="formItemLayout.labelCol" :wrapperCol="formItemLayout.wrapperCol" :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入正确法人名称', whitespace: true,min:2,max:6,validateTrigger: ['blur','change']}]}">
                    <a-input v-model="copForm.fname" placeholder="请输入法人名称"></a-input>
                </a-form-item>
                <a-form-item label="手　　机：" fieldDecoratorId="tel" required :labelCol="formItemLayout.labelCol" :wrapperCol="formItemLayout.wrapperCol" :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入正确的手机号码', whitespace: true,pattern: /^((\+?[0-9]{1,4})|(\(\+86\)))?(13[0-9]|14[59]|15[0-9]|16[56]|17[0-9]|18[0-9]|19[89])\d{8}$/}]}">
                    <a-input v-model="copForm.tel" placeholder="请输入手机"></a-input>
                </a-form-item>
                <a-form-item label="加盟电话：" fieldDecoratorId="code" required :labelCol="formItemLayout.labelCol" :wrapperCol="formItemLayout.wrapperCol" :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入正确的加盟电话', whitespace: true,min:8,max:13}]}">
                    <a-input v-model="copForm.tels" placeholder="请输入加盟电话"></a-input>
                </a-form-item>
                <a-form-item label="成立日期" fieldDecoratorId="founddate" required :labelCol="formItemLayout.labelCol" :wrapperCol="formItemLayout.wrapperCol">
                    <a-date-picker style="width: 100%" />
                </a-form-item>
                <a-form-item label="公司地址：" fieldDecoratorId="addressname" required :labelCol="formItemLayout.labelCol" :wrapperCol="formItemLayout.wrapperCol" :fieldDecoratorOptions="{rules: [{ required: true, message: '请选择地址'}]}">
                    <a-select :defaultValue="provinceData[0]" style="width: 120px" @change="handleProvinceChange">
                        <a-select-option v-for="province in provinceData" :key="province">{{province}}</a-select-option>
                    </a-select>
                    <a-select v-model="secondCity" style="width: 120px">
                        <a-select-option v-for="city in cities" :key="city">{{city}}</a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item label="备　　注" fieldDecoratorId="description" :labelCol="formItemLayout.labelCol" :wrapperCol="formItemLayout.wrapperCol">
                    <a-input v-model="copForm.time" placeholder="备注"></a-input>
                </a-form-item>
            </a-form>
        </div>
        <div class="steps-content step2" style="width:800px; margin: 50px auto" v-else-if="current == 1">{{steps[current].content}}
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
                    <a-cascader style="width: 100%" placeholder="选择地区" />
                </a-form-item>
                <a-form-item label="简　　介" fieldDecoratorId="info" :labelCol="formItemLayout.labelCol" :wrapperCol="formItemLayout.wrapperCol">
                    <a-input v-model="copForm.time" placeholder="备注"></a-input>
                </a-form-item>
            </a-form>
        </div>
        <div class="steps-action" style="text-align:center;">
            <a-button type="primary" size="large" @click="next"> 下一步 </a-button>
        </div>
    </div>
</div>
</template>
<script>
const provinceData = ['Zhejiang', 'Jiangsu'];
const cityData = {
    Zhejiang: ['Hangzhou', 'Ningbo', 'Wenzhou'],
    Jiangsu: ['Nanjing', 'Suzhou', 'Zhenjiang'],
};
import {
    enterprises
} from '../api/api'
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
    name: 'Login',
    data() {
        return {
            current: 0,
            copForm: {},
            value1: '',
            provinceData,
            cityData,
            cities: cityData[provinceData[0]],
            secondCity: cityData[provinceData[0]][0],
            steps: [{
                title: '填写基础信息',
                content: '',
                }, {
                title: '提交资质认证',
                content: '',
                }, {
                title: '完成注册',
                content: '',
            }],
            formItemLayout,
            formTailLayout
        }
    },
    computed: {
        systemName() {
            return 'admin'
        }
    },
    methods: {
        handleProvinceChange(value) {
            this.cities = cityData[value]
            this.secondCity = cityData[value][0]
        },
        next() {
            if (this.current == 0) {
                this.copForm.validateFields((err, values) => {
                    if (!err) {
                        enterprises(values)
                            .then((res) => {})
                    }
                })
            }
        },
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

}
</style>
