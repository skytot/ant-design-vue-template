import axios from 'axios'
import qs from 'qs'
const HOST = '//wechat123.natapp1.cc'
// const token =
//     getCookie('token') ||
//     sessionStorage.getItem('token') ||
//     process.env.API_TOKEN
// 统一头部处理
const instance = axios.create({
    headers: {
        // 'content-type': 'application/x-www-form-urlencoded'
        'content-type': 'application/json;charset=utf-8'
    }
})
// 统一响应拦截器
instance.interceptors.response.use(response => {
    // 对响应数据统一判断
    const code = response.data.code
    if (code === '-99999') {
        return code
    }
    return response
}, error => {
    // 响应错误
    return Promise.reject(error)
})
const base = process.env.API_ROOT
// 上传
export const upHost = `${HOST}/imgs/enterprise/`
// 轮播图新加
export const broadcastAdd = `${HOST}/imgs/enterprise/broadcast/`
// 菜单图上传
export const menusAdd = `${HOST}/imgs/menu/`
// 文章图上传
export const imgHost = `${HOST}/imgs/article`
// 门店图上传
export const imgHost1 = `${HOST}/imgs/store/`

//  头像修改
// export const upImgHost = `${HOST}/imgs/enterprise/`
// 文章列表查询http://gangzhuhao.s1.natapp.cc/official/article/{enterpriseId}/{pageSize}/{pageId}
export const article = `${HOST}/official/article`
// get

export const archivesResult = params => {
    return instance.get(`${base}/api/Result/getInfo`, {params})
}
// post
export const getSchoolModules = params => {
    return instance.post(`${base}/api/SchoolManage/getSchoolModules`, qs.stringify(params)).then(res => res.data)
}
// 登录
export const login = params => {
    return instance.post(`${HOST}/users/enterprise/login`, JSON.stringify(params)).then(res => res.data)
}
// 注册
export const register = params => {
    return instance.post(`${HOST}/users/enterprise/register`, JSON.stringify(params)).then(res => res.data)
}
// 验证码
export const captcha = params => {
    return instance.get(`${HOST}/captcha`, params)
}
// 验证码验证
export const captchaCheck = params => {
    return instance.post(`${HOST}/captcha/check`, JSON.stringify(params)).then(res => res.data)
}
// 短信验证码
export const smscaptcha = params => {
    return instance.post(`${HOST}/smscaptcha`, JSON.stringify(params)).then(res => res.data)
}
// 短信验证码
export const smsCheck = params => {
    return instance.post(`${HOST}/smscaptcha/check`, JSON.stringify(params)).then(res => res.data)
}
// 注册基础信息
export const enterprises = params => {
    return instance.post(`${HOST}/enterprises`, JSON.stringify(params)).then(res => res.data)
}
// 区域
export const location = params => {
    return instance.get(`${HOST}/location/` + params).then(res => res.data)
}
// 基本信息
export const baseInfo = params => {
    return instance.get(`${HOST}/enterprises/` + params).then(res => res.data)
}
// 登录信息
export const loginInfo = params => {
    return instance.get(`${HOST}/official/mananger/index/` + params).then(res => res.data)
}
// 基本信息修改
// export const enterprisesUpdata = params => {
//     return instance.get(`${HOST}/enterprises` + params).then(res => res.data)
// }
export const enterprisesUpdata = params => {
    return instance.put(`${HOST}/enterprises`, JSON.stringify(params)).then(res => res.data)
}
// 资质查询
export const getImgs = params => {
    return instance.get(`${HOST}/imgs/enterprises/` + params).then(res => res.data)
}
// 地址查询
export const address = params => {
    return instance.get(`${HOST}/official/address/` + params).then(res => res.data)
}
// 地址门店新增http://gangzhuhao.s1.natapp.cc/official/address/store
export const store = params => {
    return instance.post(`${HOST}/official/address/store`, JSON.stringify(params)).then(res => res.data)
}
// 地址工厂新增http://gangzhuhao.s1.natapp.cc/official/address/store
export const adds = params => {
    return instance.post(`${HOST}/official/address`, JSON.stringify(params)).then(res => res.data)
}
export const addss = params => {
    return instance.put(`${HOST}/official/address`, JSON.stringify(params)).then(res => res.data)
}
// 门店信息
export const stores = params => {
    return instance.get(`${HOST}/official/stores` + '/' + params.enterpriseId + '/' + params.category + '/' + params.pageSize + '/' + params.pageId).then(res => res.data)
}
// 新加门店http://gangzhuhao.s1.natapp.cc/official/store
export const addStore = params => {
    return instance.post(`${HOST}/official/store`, JSON.stringify(params)).then(res => res.data)
}
// 修门店http://gangzhuhao.s1.natapp.cc/official/store
export const putStore = params => {
    return instance.put(`${HOST}/official/store`, JSON.stringify(params)).then(res => res.data)
}
// 类目http://gangzhuhao.s1.natapp.cc/official/category/:enterpriseId
export const category = params => {
    return instance.get(`${HOST}/official/category/` + params).then(res => res.data)
}
// 上传菜单轮播图http://gangzhuhao.s1.natapp.cc/official/category/:enterpriseId
export const categoryUp = params => {
    return instance.post(`${HOST}/official/category/` + params).then(res => res.data)
}
// 菜单目http://gangzhuhao.s1.natapp.cc/official/menu
export const menu = params => {
    return instance.get(`${HOST}/official/menu`).then(res => res.data)
}
// 类目add
export const categoryAdd = params => {
    return instance.post(`${HOST}/official/category/`, JSON.stringify(params)).then(res => res.data)
}
// 类目修改
export const categoryPut = params => {
    return instance.put(`${HOST}/official/category/`, JSON.stringify(params)).then(res => res.data)
}
// 轮播图查询
export const broadcast = params => {
    return instance.get(`${HOST}/official/broadcast/` + params).then(res => res.data)
}

// 轮播图修改接口
export const broadcastUp = params => {
    return instance.post(`${HOST}/imgs/` + params.enterpriseId + '/' + params.imgsId).then(res => res.data)
}
// 菜单详情查询
export const menuContent = params => {
    return instance.get(`${HOST}/official/menu/` + params).then(res => res.data)
}
// 删除图片http://gangzhuhao.s1.natapp.cc/imgs/{imgsId}
export const delImg = params => {
    return instance.delete(`${HOST}/imgs/` + params).then(res => res.data)
}
// 删除文章 http://wechat123.natapp1.cc/official/article/:articleId
export const delArt = params => {
    return instance.delete(`${HOST}/official/article/` + params).then(res => res.data)
}

// 文章新加http://wechat123.natapp1.cc/official/article
export const articleAdd = params => {
    return instance.post(`${HOST}/official/article`, JSON.stringify(params)).then(res => res.data)
}
// 文章查询 http://wechat123.natapp1.cc/official/article/detail/:articleId
export const detail = params => {
    return instance.get(`${HOST}/official/article/detail/` + params).then(res => res.data)
}
// 文章新加http://wechat123.natapp1.cc/official/article
export const articleUp = params => {
    return instance.put(`${HOST}/official/article`, JSON.stringify(params)).then(res => res.data)
}
// 代理商修改http://gangzhuhao.s1.natapp.cc/official/agent
export const agent = params => {
    return instance.put(`${HOST}/official/agent`, JSON.stringify(params)).then(res => res.data)
}
// 门店地址查询 http://gangzhuhao.s1.natapp.cc/official/address/store/:storeId
export const getAddress = params => {
    return instance.get(`${HOST}/official/address/store/` + params).then(res => res.data)
}
// 门店图片查询 http://wechat123.natapp1.cc/imgs/stores/:storeId
export const storeImg = params => {
    return instance.get(`${HOST}/imgs/stores/` + params).then(res => res.data)
}
// 门店地址更新 http://gangzhuhao.s1.natapp.cc/official/address
export const addressUp = params => {
    return instance.put(`${HOST}/official/address`, JSON.stringify(params)).then(res => res.data)
}
