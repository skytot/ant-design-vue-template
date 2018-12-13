<template>
<section>
    <div class="card-container">
        <div class="gutter-example">
            <div style="margin:15px 0">轮播图列表</div>
            <a-row :gutter="16">
                <a-col class="gutter-row" :span="4" v-for="itm in dataImg" :key="itm.imgsId" style="overflow:hidden">
                    <div class="gutter-box data-content"><img :src="'//'+itm.url" alt="" height="200px"><i class="anticon anticon-delete" @click="del(itm,2)"></i></div>
                </a-col>
            </a-row>
            <div v-show="dataImg.length<6">
                <a-upload listType="picture-card" class="avatar-uploader" name="file" :multiple="false" :action="menuHost" @change="handleChange" :beforeUpload="beforeUpload" :showUploadList="false" :data="postData">
                    <div>
                        <a-icon :type="loading ? 'loading' : 'plus'" />
                        <div class="ant-upload-text">上传轮播图<br>支持JPG、PNG等图片格式，大小2M以下</div>
                        </div>
                        <div>横版大图：宽高比1.78，最低尺寸1280*720。<br> 竖版图片：宽高比0.56，最低尺寸720*1280。 </div>
                </a-upload>
            </div>
        </div>
    </div>
</section>
</template>
<script>
import {
    broadcastAdd,
    investment,
    upHost,
    delImg
} from '../../api/api'
export default {
    data() {
        return {
            data: [],
            dataImg: [],
            title: '',
            dataContent: '',
            mid: 0,
            loading: false,
            loading1: false,
            visible: false,
            imgHost: broadcastAdd,
            menuHost: upHost,
            enterpriseId: sessionStorage.getItem('tx_eid'),
            postData: {},
            postData1: {}
        }
    },
    methods: {
        getData() {
            investment()
                .then((res) => {
                    this.dataImg = res.data
                })
        },
        beforeUpload(file) {
            const isJPG = file.type === 'image/jpeg'
            const isPNG = file.type === 'image/png'
            if (!isJPG && !isPNG) {
                this.$message.error('只支持 JPG/PNG 图片!')
            }
            const isLt2M = file.size / 1024 / 1024 < 2
            if (!isLt2M) {
                this.$message.error('图片不能大于 0.5MB!')
            }
            const MAX = this.dataImg.length >= 6
            if (MAX) {
                this.$message.error('图片最多上传6张!')
            }
            this.postData.data = JSON.stringify({
                enterpriseId: this.enterpriseId,
                id: this.enterpriseId,
                category: 1,
                subcategory: 17
            })
            return (isJPG || isPNG) && isLt2M && !MAX
        },
        beforeUpload1(file) {
            const isJPG = file.type === 'image/jpeg'
            const isPNG = file.type === 'image/png'
            if (!isJPG && !isPNG) {
                this.$message.error('只支持 JPG/PNG 图片!')
            }
            const isLt2M = file.size / 1024 / 1024 < 1
            if (!isLt2M) {
                this.$message.error('图片不能大于 1MB!')
            }
            const MAX = this.dataContent.length > 10
            if (MAX) {
                this.$message.error('图片最多上传6张!')
            }
            this.postData1.data = JSON.stringify({
                menuId: this.mid,
                id: this.mid,
                category: 4
            })
            return (isJPG || isPNG) && isLt2M && !MAX
        },
        handleChange(info) {
            if (info.file.status === 'uploading') {
                this.loading = true
                return
            }
            if (info.file.status === 'done') {
                this.$message.success(info.file.response.msg)
                this.getData()
                this.loading = false
            }
            if (info.file.status === 'error') {
                this.$message.error(info.file.response.msg)
                this.loading = false
            }
        },
        handleChange1(info) {
            if (info.file.status === 'uploading') {
                this.loading1 = true
                return
            }
            if (info.file.status === 'done') {
                this.$message.success(info.file.response.msg)
                this.getContent(this.mid.toString()
                    .split(','))
                this.loading1 = false
            }
            if (info.file.status === 'error') {
                this.$message.error(info.file.response.msg)
                this.loading1 = false
            }
        },
        del(i, index) {
            const _this = this
            this.$confirm({
                title: '确定删除该内容?',
                content: '',
                okText: '确认',
                cancelText: '取消',
                onOk() {
                    delImg(i.imgsId)
                        .then((res) => {
                            if (index === 1) {
                                if (res.status === 1) {
                                    _this.$message.success(res.msg)
                                    _this.getContent(_this.mid.toString()
                                        .split(','))
                                } else {
                                    _this.$message.error(res.msg)
                                }
                            } else {
                                if (res.status === 1) {
                                    _this.$message.success(res.msg)
                                    _this.getData()
                                } else {
                                    _this.$message.error(res.msg)
                                }
                            }
                        })
                },
                onCancel() {}
            })
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

.avatar-uploader>.ant-upload {
    width: 323px;
    height: 200px;
    margin: 10px;
}

.ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
}

.data-content {
    position: relative;
    display: inline-block;
    width: auto;
    vertical-align: top;
}

.data-content i {
    position: absolute;
    top: 10px;
    left: 10px;
    content: "";
    display: none;
    width: 30px;
    height: 30px;
    font-size: 24px;
    color: #fff;
    cursor: pointer;
}

.data-content:hover i {
    display: block
}
</style>
