<template>
<div class="container">
    <div class="content">
        <div class="top" style="width:700px;margin:50px auto;">
            <a-steps :current="current">
                <a-step v-for="item in steps" :key="item.title" :title="item.title" />
            </a-steps>
        </div>
        <div class="steps-content step1" style="width:800px; margin: 50px auto" v-if="current ===0">
            <a-form layout="horizontal" :autoFormCreate="(form)=>{this.copForm = form}">
                <a-form-item label="企业名称：" :labelCol="formItemLayout.labelCol" :wrapperCol="formItemLayout.wrapperCol" required fieldDecoratorId="name" :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入正确企业名称', whitespace: true,min:2,max:25,validateTrigger: ['blur','change']}]}">
                    <a-input placeholder="请输入企业名称" />
                </a-form-item>
                <a-form-item label="法人名称：" fieldDecoratorId="legalname" required :labelCol="formItemLayout.labelCol" :wrapperCol="formItemLayout.wrapperCol" :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入正确法人名称', whitespace: true,min:2,max:6,validateTrigger: ['blur','change']}]}">
                    <a-input v-model="copForm.fname" placeholder="请输入法人名称"></a-input>
                </a-form-item>
                <!-- <a-form-item label="手　　机：" fieldDecoratorId="tel" required :labelCol="formItemLayout.labelCol" :wrapperCol="formItemLayout.wrapperCol" :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入正确的手机号码', whitespace: true,pattern: /^((\+?[0-9]{1,4})|(\(\+86\)))?(13[0-9]|14[59]|15[0-9]|16[56]|17[0-9]|18[0-9]|19[89])\d{8}$/}]}">
                    <a-input v-model="copForm.tel" placeholder="请输入手机"></a-input>
                </a-form-item> -->
                <a-form-item label="加盟电话：" fieldDecoratorId="code" required :labelCol="formItemLayout.labelCol" :wrapperCol="formItemLayout.wrapperCol" :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入正确的加盟电话', whitespace: true,min:8,max:13}]}">
                    <a-input v-model="copForm.tels" placeholder="请输入加盟电话"></a-input>
                </a-form-item>
                <a-form-item label="成立日期" fieldDecoratorId="founddate" required :labelCol="formItemLayout.labelCol" :wrapperCol="formItemLayout.wrapperCol":fieldDecoratorOptions="{rules: [{ required: true, message: '请选择成立日期'}]}" >
                    <a-date-picker style="width: 100%"  @change="onChange"  />
                </a-form-item>
                <a-form-item label="公司地址：" fieldDecoratorId="addressname" required :labelCol="formItemLayout.labelCol" :wrapperCol="formItemLayout.wrapperCol" >

                       <a-cascader :options="options" @change="change1"  style="width: 150px;margin-right:10px" placeholder="选择省份" changeOnSelect />
                       <a-cascader :options="option2" @change="change2" style="width: 150px;margin-right:10px" placeholder="选择省份" changeOnSelect />
                       <a-cascader :options="option3" @change="change3"  style="width: 150px;margin-right:10px"placeholder="选择省份" changeOnSelect />

                    <a-input v-model="add" placeholder="详细地址" ></a-input>
                </a-form-item>
                <a-form-item label="备　　注" fieldDecoratorId="description" :labelCol="formItemLayout.labelCol" :wrapperCol="formItemLayout.wrapperCol">
                    <a-textarea  placeholder="备注" :autosize="{ minRows: 4, maxRows: 6 }" />
                </a-form-item>
            </a-form>
        </div>
        <div class="steps-content step2" style="width:800px; margin: 50px auto" v-else-if="current === 1">
            <a-form layout="horizontal" :autoFormCreate="(form)=>{this.copForm = form}">
                <a-form-item label="营业执照：" :labelCol="formItemLayout.labelCol" :wrapperCol="formItemLayout.wrapperCol" required fieldDecoratorId="yy">
                    <a-upload name="file" listType="picture-card" class="avatar-uploader" :showUploadList="false" :action="upHost+enterpriseId+'/12'" :beforeUpload="beforeUpload1" @change="handleChange1">
                        <img v-if="imageUrl1" :src="imageUrl1" alt="avatar" />
                        <div v-else>
                            <a-icon :type="loading1 ? 'loading' : 'plus'" />
                            <div class="ant-upload-text">Upload</div>
                        </div>
                    </a-upload>
                </a-form-item>
                <!-- <form :action="upHost+enterpriseId+'/12'" method="post" enctype="multipart/form-data" >
    	选择:<input type="file" name="file" id="file"><br/>
    		 <input type="submit" value="提交">
</form> -->

                <a-form-item label="食品生产许可证" :labelCol="formItemLayout.labelCol" :wrapperCol="formItemLayout.wrapperCol" required fieldDecoratorId="sc">
                    <a-upload name="avatar" listType="picture-card" class="avatar-uploader" :showUploadList="false" :action="upHost+enterpriseId+'/14'" :beforeUpload="beforeUpload2" @change="handleChange2">
                        <img v-if="imageUrl2" :src="imageUrl2" alt="avatar" />
                        <div v-else>
                            <a-icon :type="loading2 ? 'loading' : 'plus'" />
                            <div class="ant-upload-text">Upload</div>
                        </div>
                    </a-upload>
                </a-form-item>
                <a-form-item label="食品流通许可证" :labelCol="formItemLayout.labelCol" :wrapperCol="formItemLayout.wrapperCol" required fieldDecoratorId="sp">
                    <a-upload name="avatar" listType="picture-card" class="avatar-uploader" :showUploadList="false" :action="upHost+enterpriseId+'/13'" :beforeUpload="beforeUpload3" @change="handleChange3">
                        <img v-if="imageUrl3" :src="imageUrl3" alt="avatar" />
                        <div v-else>
                            <a-icon :type="loading3 ? 'loading' : 'plus'" />
                            <div class="ant-upload-text">Upload</div>
                        </div>
                    </a-upload>
                </a-form-item>
                <a-form-item label="商标注册证" :labelCol="formItemLayout.labelCol" :wrapperCol="formItemLayout.wrapperCol" required fieldDecoratorId="sb">
                    <a-upload name="avatar" listType="picture-card" class="avatar-uploader" :showUploadList="false" :action="upHost+enterpriseId+'/15'" :beforeUpload="beforeUpload4" @change="handleChange4">
                        <img v-if="imageUrl4" :src="imageUrl4" alt="avatar" />
                        <div v-else>
                            <a-icon :type="loading4 ? 'loading' : 'plus'" />
                            <div class="ant-upload-text">Upload</div>
                        </div>
                    </a-upload>
                </a-form-item>
            </a-form>
        </div>
            <div class="steps-content step2" style="width:800px; margin: 50px auto" v-else-if="current === 2">
                <div class="" style="font-size:36px;text-align:center;padding:100px 0;">
                    <a-icon type="check-circle-o" style="font-size:40px;color:#52c41a" />
                    恭喜您注册成功！
                </div>

            </div>
        <div class="steps-action" style="text-align:center;">
            <a-button type="primary" size="large" @click="next"> {{nexts}} </a-button>
        </div>
    </div>
</div>
</template>
<script>
import {
    enterprises,
    location,
    upHost
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
    name: 'resinfo',
    data() {
        return {
            upHost:upHost,
            enterpriseId:'1',
            dateFormat: 'YYYY-MM-DD',
            provinceData: [],
            cityData: [],
            townData: [],
            time: '',
            add: '',
            nexts: '下一步',
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
    }
],
option2: [],
option3: [],
option4: [{
        value: 'zhejiang',
        label: 'Zhejiang'

      }, {
        value: 'jiangsu',
        label: 'Jiangsu'

    }],
            current:1,
            copForm: {},
            value1: '',
            secondCity: '',
            secondPro: '',
            secondTown: '',
            steps: [{
                title: '填写基础信息',
                content: ''
                }, {
                title: '提交资质认证',
                content: ''
                }, {
                title: '完成注册',
                content: ''
            }],
            formItemLayout,
            formTailLayout,
            imageUrl1: '',
            imageUrl2: '',
            imageUrl3: '',
            imageUrl4: '',
            loading1: false,
            loading2: false,
            loading3: false,
            loading4: false,
            imgStatus1:0,
            imgStatus2:0,
            imgStatus3:0,
            imgStatus4:0,
        }
    },
    computed: {
        systemName() {
            return 'admin'
        }
    },
    methods: {
        loadData(val) {
            // location(val).then((res)=>{
            //     this.options = res.data.map(i=>
            //         {const n = {};n.label = i.name;n.value = i.locationId;n.isLeaf = false
            //             return n})
            // })
        },
        onChange(date, dateString) {
     this.time = dateString
 },
                change1(value) {
this.secondPro = value[0]
             location(value.toString()).then((res) => {
                this.option2 = res.data.map(i => {
 const n = {}; n.label = i.name; n.value = i.locationId
                        return n
})
            })
        },
        change2(value) {
            this.secondCity = value[0]
            location(value.toString()).then((res) => {
               this.option3 = res.data.map(i => {
 const n = {}; n.label = i.name; n.value = i.locationId
                       return n
})
                   })
        },
        change3(value) {
            this.secondTown = value[0]
        },
        handleChange1(info) {
            if (info.file.status === 'uploading') {
                this.loading1 = true
                return
            }
            if (info.file.status === 'done') {
                this.loading1 = false
                this.$message.success(info.file.response.msg)
                this.imgStatus1 = 1;
            }
            if (info.file.status === 'error') {
                this.loading1 = false
                this.$message.error(info.file.response.msg)
            }
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
            return isJPG && isLt5M
        },
        handleChange2(info) {
            if (info.file.status === 'uploading') {
                this.loading2 = true
                return
            }
            if (info.file.status === 'done') {
                this.loading2 = false
                this.$message.success(info.file.response.msg)
                this.imgStatus2 = 1;
            }
            if (info.file.status === 'error') {
                this.loading2 = false
                this.$message.error(info.file.response.msg)
            }
        },
        beforeUpload2(file) {
            const isJPG = file.type === 'image/jpeg'
            if (!isJPG) {
                this.$message.error('只支持 JPG 图片格式!')
            }
            const isLt5M = file.size / 1024 / 1024 < 5
            if (!isLt5M) {
                this.$message.error('请勿上传超过5MB!')
            }
            return isJPG && isLt5M
        },
        handleChange3(info) {
            if (info.file.status === 'uploading') {
                this.loading2 = true
                return
            }
            if (info.file.status === 'done') {
                this.loading3 = false
                this.$message.success(info.file.response.msg)
                this.imgStatus3 = 1;
            }
            if (info.file.status === 'error') {
                this.loading3 = false
                this.$message.error(info.file.response.msg)
            }
        },
        beforeUpload3(file) {
            const isJPG = file.type === 'image/jpeg'
            if (!isJPG) {
                this.$message.error('只支持 JPG 图片格式!')
            }
            const isLt5M = file.size / 1024 / 1024 < 5
            if (!isLt5M) {
                this.$message.error('请勿上传超过5MB!')
            }
            return isJPG && isLt5M
        },
        handleChange4(info) {
            if (info.file.status === 'uploading') {
                this.loading2 = true
                return
            }
            if (info.file.status === 'done') {
                this.loading4 = false
                this.$message.success(info.file.response.msg)
                this.imgStatus4 = 1;
            }
            if (info.file.status === 'error') {
                this.loading4 = false
                this.$message.error(info.file.response.msg)
            }
        },
        beforeUpload4(file) {
            const isJPG = file.type === 'image/jpeg'
            if (!isJPG) {
                this.$message.error('只支持 JPG 图片格式!')
            }
            const isLt5M = file.size / 1024 / 1024 < 5
            if (!isLt5M) {
                this.$message.error('请勿上传超过5MB!')
            }
            return isJPG && isLt5M
        },
        next() {
            if (this.current === 0) {
                this.copForm.validateFields((err, values) => {
                    if (!err) {
                        const pro = this.secondPro
                        const city = this.secondCity
                        const town = this.secondTown
                        const add = this.add
                        if (pro == '' || city == ''||town=='' || add == '') {
                            this.$message.error('请填写详细地址信息')
                        } else {
                            values.locationId = town
                            values.addressname = add
                            values.founddate = this.time
                            enterprises({token: sessionStorage.getItem('tx_tk'), data: values})
                                .then((res) => {
                                    if (res.status === 1) {
                                        this.$message.success(res.msg)
                                        this.enterpriseId = res.data.enterpriseId;
                                        this.current++
                                    } else {
                                        this.$message.error(res.msg)
                                    }
                                })
                        }
                    }
                })
            } else if (this.current === 1) {
                if(this.imgStatus1 ===1&&this.imgStatus2 ===1&&this.imgStatus3 ===1&&this.imgStatus4 ===1){
                    this.current++
                    this.nexts = '进入系统'
                }else{
                    this.$message.error('请提交完整的资质认证材料')
                }

            } else {
                this.$router.push('/dashboard/index')
            }
        }
    },
    mounted() {
console.log(upHost)
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
