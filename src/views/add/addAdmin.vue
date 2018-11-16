<template>
<section>
    <div>
        <div :style="{ marginBottom: '16px' }">
            <a-button @click="add" type="primary" icon="plus">添加地址</a-button>
        </div>
        <a-table :columns="columns" :dataSource="data" :pagination="{'total':total,'showTotal':total =>`共 ${total} 条`}">
            <a slot="name" slot-scope="text" href="javascript:;">{{text}}</a>
            <span slot="customTitle"> Name</span>
            <span slot="action" slot-scope="text, record">
                <a-tooltip :arrowPointAtCenter="true">
                    <template slot="title">
                        <span>编辑</span>
                    </template>
                    <a-icon class="pointer" @click="edit" type="edit" />
                </a-tooltip>
                <!-- <a href="javascript:;">Invite 一 {{record.add}}</a> -->
                <a-divider type="vertical" />
                <a-tooltip :arrowPointAtCenter="true">
                    <template slot="title">
                        <span>删除</span>
                    </template>
                    <a-popconfirm title="确认删除?" @confirm="confirm" @cancel="cancel" okText="Yes" cancelText="No">
                        <a href="#">
                            <a-icon class="pointer" type="delete" /></a>
                    </a-popconfirm>
                </a-tooltip>
            </span>
        </a-table>
        <a-modal :title="title" v-model="visible" @ok="hideModal" okText="确认" cancelText="取消">
            <span>所在地区： </span>
            <br/>
            <a-input-group compact>
                <a-cascader style="width: 100%" :loadData="loadData" :options="options" placeholder="选择地区" @change="selChange" :defaultValue="['1']" />
            </a-input-group>
            <br/>
            <span>详细地址： </span>
            <br/>
            <a-input-group compact>
                <a-textarea placeholder="请输入详细地址" :autosize="{ minRows:3, maxRows: 5 }" />
            </a-input-group>
        </a-modal>
    </div>
</section>
</template>
<script>
import {} from '../../api/api'
const columns = [{
    title: '所在地区',
    dataIndex: 'add',
    key: '1'
}, {
    title: '地址名称',
    dataIndex: 'address',
    key: '2'
}, {
    title: '状态',
    dataIndex: 'status',
    key: '3'
}, {
    title: '操作',
    key: '4',
    scopedSlots: {
        customRender: 'action'
    }
}]
const data = [{
    key: '1',
    add: '福建',
    status: '已激活',
    address: 'New York No. 1 Lake Park'
}, {
    key: '2',
    add: '福建',
    status: '已激活',
    address: 'London No. 1 Lake Park'
}]
export default {
    data() {
        return {
            data,
            columns,
            total: 2,
            title: '添加地址',
            visible: false,
            options: [{
                value: '1',
                label: 'Zhejiang',
                isLeaf: false
      }, {
                value: '2',
                label: 'Jiangsu',
                isLeaf: false
      }]
        }
    },
    methods: {
        confirm(e) {
            this.$message.success(' Yes')
        },
        cancel(e) {
            this.$message.error(' No')
        },
        add() {
            this.title = '添加地址'
            this.visible = true
        },
        edit() {
            this.title = '编辑地址'
            this.visible = true
        },
        hideModal() {
            this.visible = false
        },
        onChange(value) {
            console.log(value)
        },
        selChange(value) {
            console.log(value)
        },
        loadData(selectedOptions) {
            const targetOption = selectedOptions[selectedOptions.length - 1]
            console.log(selectedOptions)
            targetOption.loading = true
            // load options lazily
            setTimeout(() => {
                targetOption.loading = false
                targetOption.children = [{
                    label: `${targetOption.label} Dynamic 1`,
                    value: '11',
                    children: [{
                        label: `${targetOption.label} Dynamic 11`,
                        value: '111'
                    }]
        }, {
                    label: `${targetOption.label} Dynamic 2`,
                    value: '22'
        }]
                this.options = [...this.options]
            }, 200)
        }
    },
    watch: {},
    mounted() {
        // this.test()
    }
}
</script>
<style>

</style>
