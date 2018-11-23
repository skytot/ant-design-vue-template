<template>
<section>
    <div class="deme">
        <div class="tool">
            <div class="tool-item">
                <span class="lefts">文章类目</span>
                <a-radio-group defaultValue="0" buttonStyle="solid" @change="menuChange1">
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
    articleAdd
} from '../../api/api'
import Editor from '../../components/Editor'
export default {
    data() {
        return {
            enterpriseId: sessionStorage.getItem('tx_eid'),
            title: '',
            type: 0,
            cList: [],
            content: '<p>4555</p>',
            cid: 1,
            aid: 0
        }
    },
    components: {
        Editor
    },
    methods: {
        getData() {},
        getCategory() {
            category(this.enterpriseId)
                .then((res) => {
                    this.cList = res.data
                })
        },
        getContent(data) {
            this.content = data.toString()
            console.log(this.content)
        },
        menuChange1(val) {
            this.type = val.target.value
        },
        push(i) {
            if (i === 1) {
                if (this.title.length === 0) {
                    this.$message.error('请输入文章标题')
                } else {
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
                }
            } else {
                if (this.title.length === 0) {
                    this.$message.error('请输入文章标题')
                } else if (this.type === 0) {
                    this.$message.error('请选择文章类目')
                } else if (this.content.length === 0) {
                    this.$message.error('请输入文章内容')
                } else {
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
                }
            }
        }
    },
    watch: {},
    mounted() {
        if (this.$route.query.status !== 0) {
            this.aid = this.$route.query.status
            this.getData()
        }
        this.getCategory()
    }
}
</script>
<style>
.tool .lefts {
    padding: 15px 0;
    display: inline-block
}
</style>
