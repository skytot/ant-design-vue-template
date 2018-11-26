<template>
<section>
    <div>
        <div :style="{ marginBottom: '16px' }" v-if="data.length<4">
            <a-button @click="add" type="primary" icon="plus">添加类目</a-button>
        </div>
        <a-table :columns="columns" :dataSource="data">
            <a slot="name" slot-scope="text" href="javascript:;">{{text}}</a>
            <span slot="customTitle"> Name</span>
            <span slot="action" slot-scope="text, record">
                <a-tooltip :arrowPointAtCenter="true">
                    <template slot="title">
                        <span>编辑</span>
                    </template>
                    <a-icon class="pointer" @click="edit(text)" type="edit" />
                </a-tooltip>
                <!-- <a href="javascript:;">Invite 一 {{record.add}}</a> -->
                <!-- <a-divider type="vertical" />
                <a-tooltip :arrowPointAtCenter="true">
                    <template slot="title">
                        <span>删除</span>
                    </template>
                    <a-popconfirm title="确认删除?" @confirm="confirm" @cancel="cancel" okText="Yes" cancelText="No">
                        <a href="#">
                            <a-icon class="pointer" type="delete" /></a>
                    </a-popconfirm>
                </a-tooltip> -->
            </span>
        </a-table>
        <a-modal :title="title" v-model="visible" @ok="hideModal" okText="确认" cancelText="取消">
            <span>详细地址： </span>
            <br/>
            <a-input-group compact>
                <a-input placeholder="请输入类目名称" v-model="name" />
            </a-input-group>
        </a-modal>
    </div>
</section>
</template>
<script>
import {
    category,
    categoryAdd,
    categoryPut
} from '../../api/api'
const columns = [{
    title: '类目名称',
    dataIndex: 'name',
    key: '1'
}, {
    title: '操作',
    key: '4',
    scopedSlots: {
        customRender: 'action'
    }
}]
export default {
    data() {
        return {
            data: [],
            columns,
            total: 0,
            name: '',
            title: '添加类目',
            visible: false,
            aid: 0
        }
    },
    methods: {
        getData() {
            category(sessionStorage.getItem('tx_eid'))
                .then((res) => {
                    if (res.status === 1) {
                        this.data = res.data
                    }
                })
        },
        add() {
            this.title = '添加类目'
            this.visible = true
            this.adds = ''
        },
        edit(i) {
            this.title = '编辑类目'
            this.visible = true
            this.name = i.name
            this.aid = i.categoryId
        },
        hideModal() {
            if (this.name === '') {
                this.$message.error('请填写类目名称')
            } else {
                if (this.title === '添加类目') {
                    categoryAdd({
                            enterpriseId: sessionStorage.getItem('tx_eid'),
                            name: this.name
                        })
                        .then((res) => {
                            if (res.status === 1) {
                                this.$message.success(res.msg)
                                this.visible = false
                                this.getData()
                            } else {
                                this.$message.error(res.msg)
                            }
                        })
                } else {
                    categoryPut({
                            categoryId: this.aid,
                            name: this.name
                        })
                        .then((res) => {
                            if (res.status === 1) {
                                this.$message.success(res.msg)
                                this.visible = false
                                this.getData()
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
        this.getData()
        // this.test()
    }
}
</script>
<style>

</style>
