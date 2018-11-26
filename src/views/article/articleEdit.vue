<template>
<section>
    <div class="deme">
        <div class="tool">
            <div class="tool-item">
                <span class="lefts">文章类目</span>
                <a-radio-group :value="def" buttonStyle="solid" @change="menuChange1" :disabled="disabled">
                    <a-radio-button :value="itm.categoryId" v-for="itm in cList" :key="itm.categoryId">{{itm.name}}</a-radio-button>
                </a-radio-group>
            </div>
            <div class="tool-item">
                <span class="lefts">文章标题</span>
                <a-input-group style="width:calc(100% - 150px)">
                    <a-input placeholder="文章标题" v-model='title' />
                </a-input-group>
            </div>
            <div class="tool-item">
                <span class="lefts">文章正文</span>
                <editor @getContent="getContent" :html="content"></editor>
            </div>
            <div class="tool-item" style="margin-top:15px;">
                <a-button @click="push(1)" style="margin-right:15px">存草稿</a-button>
                <a-button type="primary" @click="push(2)">发布</a-button>
            </div>
        </div>
    </div>
</section>
</template>
<script>
import {
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
            type: 0,
            cList: [],
            content: '',
            cid: 1,
            aid: 0,
            def: 0,
            dId: 0,
            disabled: false
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
                    this.def = this.cList.filter((i) => {
                        return i.name === res.data.categoryname
                    })[0].categoryId
                    this.type = this.def
                    this.dId = res.data.detailId
                    this.disabled = true
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
            this.content = data.toString()
        },
        menuChange1(val) {
            this.type = val.target.value
            this.def = val.target.value
        },
        push(i) {
            if (i === 1) {
                if (this.title.length === 0) {
                    this.$message.error('请输入文章标题')
                } else {
                    if (this.aid === 0) {
                        articleAdd({
                                categoryId: this.cid,
                                status: 1,
                                name: this.title,
                                content: this.content,
                                enterpriseId: this.enterpriseId
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
                                // categoryId: this.cid,
                                status: 1,
                                articleId: this.aid,
                                detailId: this.dId,
                                name: this.title,
                                content: this.content,
                                enterpriseId: this.enterpriseId
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
                } else if (this.content.length === 0) {
                    this.$message.error('请输入文章内容')
                } else {
                    if (this.aid === 0) {
                        articleAdd({
                                categoryId: this.cid,
                                status: 2,
                                name: this.title,
                                content: this.content,
                                enterpriseId: this.enterpriseId
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
                                // categoryId: this.cid,
                                status: 2,
                                detailId: this.dId,
                                articleId: this.aid,
                                name: this.title,
                                content: this.content,
                                enterpriseId: this.enterpriseId
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
                if (this.$route.query.status !== 0) {
                    this.aid = this.$route.query.status
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
