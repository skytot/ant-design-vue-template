<template>
<section>
    <div class="deme">
        <img src="../../assets/logo.png"> 二级页2</div>
    <!-- <el-dialog title="新增企业" :visible.sync="copDialog" width="600px" center :close-on-click-modal="false" top="30px">
        <el-form :label-position="labelPosition" label-width="170px" :model="copForm">
            <el-form-item label="公司名称：" required>
                <el-input v-model="copForm.cname" placeholder="请输入公司名称"></el-input>
            </el-form-item>
            <el-form-item label="法人名称：" required>
                <el-input v-model="copForm.fname" placeholder="请输入法人名称"></el-input>
            </el-form-item>
            <el-form-item label="加盟电话：" required>
                <el-input v-model="copForm.tel" placeholder="请输入加盟电话"></el-input>
            </el-form-item>
            <el-form-item label="公司简介：" required>
                <el-input type="textarea" :rows="4" placeholder="请输入公司简介,最多200字" v-model="copForm.info">
                </el-input>
            </el-form-item>
            <el-form-item label="成立日期：" required>
                <el-input v-model="copForm.time" placeholder="请输入公司成立日期"></el-input>
            </el-form-item>
            <el-form-item label="营业执照上传：" required>
                <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="uploadSuccess1" :before-upload="beforeUpload1">
                    <img v-if="imageUrl1" :src="imageUrl1" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="食品生产许可证上传：" required>
                <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="uploadSuccess2" :before-upload="beforeUpload2">
                    <img v-if="imageUrl2" :src="imageUrl2" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="食品流通许可证上传：" required>
                <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="uploadSuccess3" :before-upload="beforeUpload3">
                    <img v-if="imageUrl3" :src="imageUrl3" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="商标注册证上传：" required>
                <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="uploadSuccess4" :before-upload="beforeUpload4">
                    <img v-if="imageUrl4" :src="imageUrl4" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="copDialog = false">取 消</el-button>
            <el-button type="primary" @click="submitCop">确 定</el-button>
        </span>
    </el-dialog> -->
</section>
</template>
<script>
import {
    login
} from '../../api/api'
export default {
    data() {
        return {
            msg: 'vue-template',
            copDialog: false,
            labelPosition: 'right',
            copForm: {
                cname: '',
                fname: '',
                info: '',
                tel: '',
                time: '',
                bLicense: '',
                sLicense: '',
                lLicense: '',
                tLicense: ''
            },
            imageUrl1: '',
            imageUrl2: '',
            imageUrl3: '',
            imageUrl4: ''
        }
    },
    methods: {
        test() {
            login({
                    token: '8234e894a04abc486088b7c5156acb35b1a3cd445b950c5e04f8a'
                })
                .then((res) => {
                    console.log(res)
                })
                .catch((err) => {
                    console.warn(err)
                })
            // this.$http.get('https://a1.cnblogs.com/group/C1-C2-T2')
            //     .then((response) => {
            //         // get body data
            //         this.someData = response.body;
            //     }, (response) => {
            //         // error callback
            //     });
        },
        addCop() {
            this.copDialog = true
        },
        submitCop() {},
        submitUpload() {
            this.$refs.upload.submit()
        },
        uploadSuccess1(res, file) {
            this.imageUrl1 = URL.createObjectURL(file.raw)
            this.copForm.bLicense = URL.createObjectURL(file.raw)
        },
        beforeUpload1(file) {
            const isJPG = file.type === 'image/jpeg'
            const isLt2M = file.size / 1024 / 1024 < 2
            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!')
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!')
            }
            return isJPG && isLt2M
        },
        uploadSuccess2(res, file) {
            this.imageUrl2 = URL.createObjectURL(file.raw)
            this.copForm.sLicense = URL.createObjectURL(file.raw)
        },
        beforeUpload2(file) {
            const isJPG = file.type === 'image/jpeg'
            const isLt2M = file.size / 1024 / 1024 < 2
            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!')
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!')
            }
            return isJPG && isLt2M
        },
        uploadSuccess3(res, file) {
            this.imageUrl3 = URL.createObjectURL(file.raw)
            this.copForm.lLicense = URL.createObjectURL(file.raw)
        },
        beforeUpload3(file) {
            const isJPG = file.type === 'image/jpeg'
            const isLt2M = file.size / 1024 / 1024 < 2
            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!')
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!')
            }
            return isJPG && isLt2M
        },
        uploadSuccess4(res, file) {
            this.imageUrl4 = URL.createObjectURL(file.raw)
            this.copForm.tLicense = URL.createObjectURL(file.raw)
        },
        beforeUpload4(file) {
            const isJPG = file.type === 'image/jpeg'
            const isLt2M = file.size / 1024 / 1024 < 2
            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!')
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!')
            }
            return isJPG && isLt2M
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
