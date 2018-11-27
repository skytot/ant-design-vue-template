<template>
<section>
    <div class="card-container">
        <a-tabs type="card">
            <a-tab-pane tab="菜单管理" key="1">
                <!-- <div :style="{ marginBottom: '16px' }">
                    <a-button @click="add" type="primary" icon="plus">添加门店</a-button>
                </div> -->
                <a-row>
                    <a-col :span="6">
                        <a-tree showLine @select="onSelect" :defaultExpandAll="true">
                            <a-tree-node key="0-0">
                                <span slot="title" style="color: #1890ff">菜单列表</span>
                                <a-tree-node :title="item.name" :key="item.id+''" v-for="item in data">
                                    <a-tree-node :title="itm.name" :key="itm.id+''" v-for="itm in item.webMenu" />
                                </a-tree-node>
                            </a-tree-node>
                        </a-tree>
                    </a-col>
                    <a-col :span="18">
                        <div>
                            <div style="padding:7px">内容管理</div>
                            <div v-show="mid !=0">
                                <div>
                                    <div v-for="itm in dataContent" style="width:100%;height:200px;margin:10px" class="data-content" :key="itm.id"><img :src="'//'+itm.url" alt="" style="height:200px"><i class="anticon anticon-delete" @click="del(itm,1)"></i></div>
                                </div>
                                <div v-show="dataContent.length<10">
                                    <a-upload listType="picture-card" name="file" class="avatar-uploader" :multiple="false" :showUploadList="false" :action="menuHost" @change="handleChange1" :beforeUpload="beforeUpload1" :data="postData1">
                                        <div>
                                            <a-icon :type="loading1 ? 'loading' : 'plus'" />
                                            <div class="ant-upload-text">上传内容图</div>
                                        </div>
                                    </a-upload>
                                </div>
                            </div>
                        </div>
                    </a-col>
                </a-row>
            </a-tab-pane>
            <a-tab-pane tab="轮播图管理" key="2">
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
                                <div class="ant-upload-text">上传轮播图</div>
                            </div>
                        </a-upload>
                    </div>
                </div>
            </a-tab-pane>
        </a-tabs>
    </div>
</section>
</template>
<script>
import {
    menu,
    broadcastAdd,
    broadcast,
    menuContent,
    menusAdd,
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
            postData:{},
            postData1:{},
        }
    },
    methods: {
        getData() {
            menu()
                .then((res) => {
                    this.data = res.data
                })
            broadcast(this.enterpriseId)
                .then((res) => {
                    this.dataImg = res.data
                })
        },
        onSelect(selectedKeys, info) {
            if (info.node.$children.length === 0 && info.node.$parent.eventKey !== '0-0') {
                this.getContent(selectedKeys)
            } else {
                this.mid = 0
            }
        },
        getContent(selectedKeys) {
            menuContent(selectedKeys[0])
                .then((res) => {
                    this.mid = Number(selectedKeys)
                    if (res.status === 1) {
                        this.dataContent = res.data
                    } else {
                        this.$message.error(res.msg)
                    }
                })
        },
        beforeUpload(file) {
            const isJPG = file.type === 'image/jpeg'
            if (!isJPG) {
                this.$message.error('只支持 JPG 图片!')
            }
            const isLt2M = file.size / 1024 / 1024 < 5
            if (!isLt2M) {
                this.$message.error('图片不能大于 5MB!')
            }
            const MAX = this.dataImg.length >= 6
            if (MAX) {
                this.$message.error('图片最多上传6张!')
            }
            this.postData.data = JSON.stringify({
                enterpriseId:this.enterpriseId,
                id:this.enterpriseId
            })
            return isJPG && isLt2M && !MAX
        },
        beforeUpload1(file) {
            const isJPG = file.type === 'image/jpeg'
            if (!isJPG) {
                this.$message.error('只支持 JPG 图片!')
            }
            const isLt2M = file.size / 1024 / 1024 < 5
            if (!isLt2M) {
                this.$message.error('图片不能大于 5MB!')
            }
            const MAX = this.dataContent.length > 10
            if (MAX) {
                this.$message.error('图片最多上传6张!')
            }
            this.postData1.data = JSON.stringify({
                menuId:this.mid,
                id:this.mid
            })
            return isJPG && isLt2M && !MAX
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
    background-color: #f5f5f5;
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
