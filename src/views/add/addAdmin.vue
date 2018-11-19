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
            <span>所在地区： </span>
            <br/>
            <a-input-group >
                <a-cascader :options="options" @change="change1" style="width: 120px;margin-right:10px;overflow:visible" placeholder="选择省份" :defaultValue='defaultValue1' changeOnSelect />
                <a-cascader :options="option2" @change="change2" style="width: 120px;margin-right:10px;overflow:visible" placeholder="选择市区" :defaultValue='defaultValue2' changeOnSelect />
                <a-cascader :options="option3" @change="change3" style="width: 120px;overflow:visible" placeholder="选择县域" :defaultValue='defaultValue3' changeOnSelect />
            </a-input-group>
            <br/>
            <span>详细地址： </span>
            <br/>
            <a-input-group compact>
                <a-textarea placeholder="请输入详细地址" v-model="adds" :autosize="{ minRows:3, maxRows: 5 }" />
            </a-input-group>
        </a-modal>
    </div>
</section>
</template>
<script>
import {
    address,
    location,
    store,
    adds,
    addss,
} from '../../api/api'
const columns = [{
    title: '所在地区',
    dataIndex: 'value',
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
const data = []
export default {
    data() {
        return {
            data: [],
            columns,
            total: 2,
            title: '添加地址',
            visible: false,
            defaultValue1: [],
            defaultValue2: [],
            defaultValue3: [],
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
            secondCity: '',
            secondPro: '',
            secondTown: '',
            adds: '',
            aid: 0,
            option2: [],
            option3: [],
        }
    },
    methods: {
        getData() {
            address(sessionStorage.getItem('tx_eid'))
                .then((res) => {
                    if (res.status === 1) {
                        this.data = res.data
                        this.data.map((i, index) => {
                            i.key = index + 1 + ''
                            i.value = (i.name1 + i.name2 + i.name3)
                            i.address = i.name;
                            i.status = '已启用'
                            return i
                        })
                        // res.data.map(i=>{
                        //     this.data
                        // })
                    }
                })
        },
        confirm(e) {
            this.$message.success(' Yes')
        },
        cancel(e) {
            this.$message.error(' No')
        },
        add() {
            this.title = '添加地址'
            this.visible = true;
            this.adds = ''
        },
        edit(i) {
            this.title = '编辑地址'
            this.visible = true
            this.adds = i.name
            this.aid = i.addressId
            this.defaultValue1 = [i.locationId1 + '']
            location(this.defaultValue1.toString())
                .then((res) => {
                    this.option2 = res.data.map(i => {
                        const n = {}
                        n.label = i.name
                        n.value = i.locationId+''
                        return n
                    })
                this.defaultValue2 = [i.locationId2 + '']
                location(this.defaultValue2.toString())
                    .then((res) => {
                        this.option3 = res.data.map(i => {
                            const n = {}
                            n.label = i.name
                            n.value = i.locationId+''
                            return n
                        })
                    this.defaultValue3 = [i.locationId3 + '']
                    })
                })

        },
        change1(value) {
            this.secondPro = value[0]
            const _this = this
            if(this.secondPro){
                location(value.toString())
                    .then((res) => {
                        _this.option2 = res.data.map(i => {
                            const n = {}
                            n.label = i.name
                            n.value = i.locationId+''
                            return n
                        })
                    })
            }
        },
        change2(value) {
            this.secondCity = value[0]

            if(this.secondCity){
                const _this = this
                location(value.toString())
                    .then((res) => {
                        _this.option3 = res.data.map(i => {
                            const n = {}
                            n.label = i.name
                            n.value = i.locationId+''
                            return n
                        })
                    })
            }

        },
        change3(value) {
            this.secondTown = value[0]
        },
        hideModal() {
            const pro = this.secondPro
            const city = this.secondCity
            const town = this.secondTown
            const add = this.adds
            if (city === '' || town === '' || add === '') {
                this.$message.error('请填写正确的详细地址信息')
            } else {
                if (this.title == '添加地址') {
                    adds({
                            enterpriseId: sessionStorage.getItem('tx_eid'),
                            name: add,
                            locationId: town
                        })
                        .then((res) => {
                            if (res.status === 1) {
                                this.$message.success(res.msg)
                                this.visible = false;
                                this.getData()
                            } else {
                                this.$message.error(res.msg)
                            }
                        })
                } else {
                    addss({
                            addressId: this.aid,
                            name: add,
                            locationId: town
                        })
                        .then((res) => {
                            if (res.status === 1) {
                                this.$message.success(res.msg)
                                this.visible = false;
                                this.getData()
                            } else {
                                this.$message.error(res.msg)
                            }
                        })
                }
            }
        },
        onChange(value) {
            console.log(value)
        },
        selChange(value) {
            console.log(value)
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
