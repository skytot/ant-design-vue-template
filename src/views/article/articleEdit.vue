<template>
<section>
    <div class="deme">
        <div class="tool">
            <div class="tool-item">
                <a-form :layout="formLayout">
                    <a-form-item label="文章类目：" required>
                        <a-radio-group :value="def" buttonStyle="solid" @change="menuChange1">
                            <a-radio-button :value="itm.categoryId" v-for="itm in cList" :key="itm.categoryId">{{itm.name}}</a-radio-button>
                        </a-radio-group>
                    </a-form-item>
                </a-form>
            </div>
            <div class="tool-item">
                <a-form :layout="formLayout">
                    <a-form-item label="文章标题：" required>
                        <a-input-group style="width:calc(100% - 150px)">
                            <a-input placeholder="文章标题" v-model='title' />
                        </a-input-group>
                    </a-form-item>
                </a-form>
            </div>
            <div class="tool-item">
                <a-form :layout="formLayout">
                    <a-form-item label="文章概要：" required>
                        <a-input-group style="width:calc(100% - 150px)">
                            <a-textarea placeholder="文章概要" v-model="description" :autosize="{ minRows: 4, maxRows: 6 }" />
                        </a-input-group>
                    </a-form-item>
                </a-form>
            </div>
            <div class="tool-item">
                <a-form>
                    <a-form-item label="文章封面图：" required>
                        <a-input-group style="width:calc(100% - 150px)">
                            <a-upload name="file" listType="picture-card" class="avatar-uploader" :showUploadList="false" :action="upHost" :beforeUpload="beforeUpload" @change="handleChange">
                                <img v-if="image1" :src="image1" alt="file" style="width:200px" />
                                <div v-else>
                                    <a-icon :type="loading1 ? 'loading' : 'plus'" />
                                    <div class="ant-upload-text">Upload</div>
                                </div>
                            </a-upload>
                        </a-input-group>
                    </a-form-item>
                </a-form>
            </div>
            <div class="tool-item">
                <a-form>
                    <a-form-item label="文章正文" required>
                        <editor @getContent="getContent" :html="content"></editor>
                    </a-form-item>
                </a-form>
            </div>
            <div class="tool-item" style="margin-top:15px;">
                <a-button @click="back" style="margin-right:15px">退出</a-button>
                <a-button @click="push(1)" style="margin-right:15px">存草稿</a-button>
                <a-button type="primary" @click="push(2)">发布</a-button>
            </div>
        </div>
    </div>
</section>
</template>
<script>
import {
    imgHost,
    category,
    articleAdd,
    detail,
    articleUp
} from '../../api/api'
import Editor from '../../components/Editor'
export default {
    data() {
        return {
            enterpriseId: sessionStorage.getItem('tx_eid'),
            title: '',
            description: '',
            upHost: imgHost + '/' + sessionStorage.getItem('tx_eid'),
            type: 0,
            cList: [],
            content: '',
            html: '',
            cid: 1,
            aid: 0,
            def: 0,
            dId: 0,
            image1: '',
            loading1: false,
            formLayout: 'horizontal'
        }
    },
    components: {
        Editor
    },
    methods: {
        getData() {
            detail(this.aid)
                .then((res) => {
                    this.title = res.data.name
                    this.content = res.data.content
                    this.def = res.data.categoryId
                    this.type = this.def
                    this.dId = res.data.detailId
                    this.image1 = res.data.url
                    this.description = res.data.summary
                })
        },
        getCategory() {
            const _this = this
            return new Promise(function(resolve, reject) {
                category(_this.enterpriseId)
                    .then((res) => {
                        _this.cList = res.data
                        resolve('1')
                    })
            })
        },
        getContent(data) {
            this.html = data.toString()
        },
        menuChange1(val) {
            this.type = val.target.value
            this.def = val.target.value
        },
        back() {
            this.$router.push('/articleAdmin/article')
        },
        beforeUpload(file) {
            const isJPG = file.type === 'image/jpeg'
            const isPNG = file.type === 'image/png'
            if (!isJPG && !isPNG) {
                this.$message.error('只支持 JPG/PNG 图片格式!')
            }
            const isLt5M = file.size / 1024 / 1024 < 1
            if (!isLt5M) {
                this.$message.error('请勿上传超过1MB!')
            }
            return (isJPG || isPNG) && isLt5M
        },
        handleChange(info) {
            if (info.file.status === 'uploading') {
                this.loading1 = true
                return
            }
            if (info.file.status === 'done') {
                this.$message.success(info.file.response.msg)
                this.loading1 = false
                this.image1 = '//' + info.file.response.data.url
            }
            if (info.file.status === 'error') {
                this.loading1 = false
                this.$message.error(info.file.response.msg)
            }
        },
        push(i) {
            if (i === 1) {
                if (this.title.length === 0) {
                    this.$message.error('请输入文章标题')
                } else if (this.title.length > 100) {
                    this.$message.error('文章标题不超过100字')
                } else {
                    if (this.aid === 0) {
                        articleAdd({
                                categoryId: this.type,
                                status: 1,
                                name: this.title,
                                content: this.html,
                                enterpriseId: this.enterpriseId,
                                url: this.image1,
                                summary: this.description
                            })
                            .then((res) => {
                                if (res.status === 1) {
                                    this.$message.success(res.msg)
                                    this.$router.push('/articleAdmin')
                                } else {
                                    this.$message.error(res.msg)
                                }
                            })
                    } else {
                        articleUp({
                                status: 1,
                                articleId: this.aid,
                                detailId: this.dId,
                                name: this.title,
                                content: this.html,
                                categoryId: this.type,
                                url: this.image1,
                                summary: this.description
                            })
                            .then((res) => {
                                if (res.status === 1) {
                                    this.$message.success(res.msg)
                                    this.$router.push('/articleAdmin')
                                } else {
                                    this.$message.error(res.msg)
                                }
                            })
                    }
                }
            } else {
                if (this.title.length === 0) {
                    this.$message.error('请输入文章标题')
                } else if (this.type === 0) {
                    this.$message.error('请选择文章类目')
                } else if (this.html.length === 0) {
                    this.$message.error('请输入文章内容')
                } else if (this.image1.length === 0) {
                    this.$message.error('请上传文章封面')
                } else if (this.description.length === 0 || this.description.length > 54) {
                    this.$message.error('请填写文章简介且不超过54个字')
                } else {
                    if (this.aid === 0) {
                        articleAdd({
                                categoryId: this.type,
                                status: 2,
                                name: this.title,
                                content: this.html,
                                enterpriseId: this.enterpriseId,
                                url: this.image1,
                                summary: this.description
                            })
                            .then((res) => {
                                if (res.status === 1) {
                                    this.$message.success(res.msg)
                                    this.$router.push('/articleAdmin')
                                } else {
                                    this.$message.error(res.msg)
                                }
                            })
                    } else {
                        articleUp({
                                categoryId: this.type,
                                status: 2,
                                detailId: this.dId,
                                articleId: this.aid,
                                name: this.title,
                                content: this.html,
                                url: this.image1,
                                summary: this.description
                            })
                            .then((res) => {
                                if (res.status === 1) {
                                    this.$message.success(res.msg)
                                    this.$router.push('/articleAdmin')
                                } else {
                                    this.$message.error(res.msg)
                                }
                            })
                    }
                }
            }
        }
    },
    watch: {},
    mounted() {
        this.getCategory()
            .then(() => {
                if (Number(this.$route.query.status) !== 0) {
                    this.aid = Number(this.$route.query.status)
                    this.getData()
                }
            })
    }
}
</script>
<style>
.tool .lefts {
    padding: 15px 0;
    display: inline-block
}
</style>
