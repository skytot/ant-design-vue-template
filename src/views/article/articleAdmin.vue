<template>
<section>
    <div class="deme">
        <div class="tool">
            <div style="float:right">
                <a-button type="primary" slot="extra" @click="add">写文章</a-button>
            </div>
            <div class="tool-item">
                <span class="left">文章类目</span>
                <a-radio-group defaultValue="0" buttonStyle="solid" @change="menuChange1">
                    <a-radio-button value="0">全部</a-radio-button>
                    <a-radio-button :value="itm.categoryId" v-for="itm in cList" :key="itm.categoryId">{{itm.name}}</a-radio-button>
                </a-radio-group>
            </div>
            <div class="tool-item">
                <span class="left">文章状态</span>
                <a-radio-group defaultValue="0" buttonStyle="solid" @change="menuChange2">
                    <a-radio-button value="0">全部</a-radio-button>
                    <a-radio-button value="2">发布</a-radio-button>
                    <a-radio-button value="1">草稿</a-radio-button>
                </a-radio-group>
            </div>
        </div>
        <a-divider />
        <a-list itemLayout="vertical" size="large" :pagination="pagination" :dataSource="listData" :loading="loading">
            <!-- <div slot="footer"><b>ant design vue</b> footer part</div> -->
            <a-list-item slot="renderItem" slot-scope="item, index" key="item.id">
                <template slot="actions" v-for="{type, text} in actions">
                    <span :key="type" @click="tool(type,index)">
                        <a-icon :type="type" />
                        {{text}}
                    </span>
                </template>
                <span v-if="item.status ===2">已发布　</span>
                <span v-else>草稿箱　</span>
                <a-list-item-meta :description="item.description">
                    <a slot="title" :href="item.href">{{item.name}}</a>
                    <a-avatar slot="avatar" :src="item.avatar" />
                </a-list-item-meta>
                {{item.edittime}}
            </a-list-item>
        </a-list>
    </div>
</section>
</template>
<script>
import axios from 'axios'
import {
    article,
    delArt
} from '../../api/api'
// const listData = []
// for (let i = 0; i < 13; i++) {
//     listData.push({
//         href: 'https://vuecomponent.github.io/ant-design-vue/',
//         title: `ant design vue part ${i}`,
//         avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
//         description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
//         content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.'
//     })
// }
export default {
    data() {
        return {
            pagination: {
                onChange: (page) => {
                    this.pageId = page
                    this.getData()
                },
                pageSize: 10
            },
            actions: [{
                    type: 'edit',
                    text: '编辑'
                },
                {
                    type: 'delete',
                    text: '删除'
                }
            ],
            cList: [],
            loading: false,
            listData: [],
            enterpriseId: sessionStorage.getItem('tx_eid'),
            pageId: 1,
            menuId: 0,
            status: 0
        }
    },
    methods: {
        getData() {
            axios({
                    method: 'get',
                    url: article + '/' + this.enterpriseId + '/' + 10 + '/' + this.pageId,
                    headers: {
                        'status': Number(this.menuId),
                        'categoryId': Number(this.status)
                    }
                })
                .then((res) => {
                    this.cList = res.data.data.category
                    this.listData = res.data.data.article.data
                    this.loading = false
                })
            // article({
            //         enterpriseId: this.enterpriseId,
            //         pageSize: 10,
            //         pageId: this.pageId
            //     })
            //     .then((res) => {
            //         this.cList = res.data.category
            //     })
        },
        menuChange1(e) {
            this.status = e.target.value
            this.getData()
            //
        },
        menuChange2(e) {
            this.menuId = e.target.value
            this.getData()
        },
        add() {
            this.$router.push({
                path: 'articleEdit',
                query: {
                    status: 0
                }
            })
        },
        tool(i, e) {
            if (i === 'edit') {
                this.$router.push({
                    path: 'articleEdit',
                    query: {
                        status: this.listData[e].articleId
                    }
                })
            } else {
                const _this = this
                this.$confirm({
                    title: '确定删除该文章?',
                    content: '',
                    okText: '确定',
                    cancelText: '取消',
                    onOk() {
                        delArt(_this.listData[e].articleId)
                            .then((res) => {
                                if (res.status === 1) {
                                    _this.$message.success(res.msg)
                                    _this.getData()
                                } else {
                                    _this.$message.error(res.msg)
                                }
                            })
                    },
                    onCancel() {
                        console.log('取消')
                    },
                    class: 'test'
                })
            }
        }
    },
    watch: {},
    mounted() {
        if (Number(sessionStorage.getItem('tx_ts')) === 2) {
            this.actions = this.actions.filter(i => i.type === 'edit')
        }
        this.loading = true
        this.getData()
    }
}
</script>
<style>
.tool {}

.tool-item {
    margin: 10px 0
}

.tool-item .left {
    padding-right: 10px
}
</style>
