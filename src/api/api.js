import axios from 'axios'
const HOST = window.APIHOST
// const token =
//     getCookie('token') ||
//     sessionStorage.getItem('token') ||
//     process.env.API_TOKEN
// 发送cookie处理
// 统一头部处理
const instance = axios.create({
    withCredentials: true,
    headers: {
        'content-type': 'application/jsoncharset=utf-8'
    }
})
// 请求拦截器
instance.interceptors.request.use(response => {
    const token = sessionStorage.getItem('tx_tk')
    if (token) {
        response.headers['Token'] = token
    }
    return response
})
// 统一响应拦截器
instance.interceptors.response.use(response => {
    // 对响应数据统一判断
    const code = response.data.status
    if (code === -99999) {
        alert(response.data.msg)
        window.location.href = '/#/login'
    }
    return response
}, error => {
    // 响应错误
    return Promise.reject(error)
})
const base = process.env.API_ROOT
// 上传
export const upHost = `${HOST}/imgs`
// 轮播图新加
export const broadcastAdd = `${HOST}/imgs/enterprise/broadcast/`
// 菜单图上传
export const menusAdd = `${HOST}/imgs/menu/`
// 文章图上传
export const imgHost = `${HOST}/imgs/article`
// 门店图上传
export const imgHost1 = `${HOST}/imgs/`

//  头像修改
// export const upImgHost = `${HOST}/imgs/enterprise/`
// 文章列表查询http://gangzhuhao.s1.natapp.cc/official/article/{enterpriseId}/{pageSize}/{pageId}
export const article = `${HOST}/official/article`
// get

export const archivesResult = params => {
    return instance.get(`${base}/api/Result/getInfo`, {params})
}
// 修改密码
export const update = params => {
    return instance.put(`${HOST}/users/enterprise/change`, JSON.stringify(params)).then(res => res.data)
}
// 登录
export const login = params => {
    return instance.post(`${HOST}/users/enterprise/login`, JSON.stringify(params)).then(res => res.data)
}
// 退出
export const logout = params => {
    return instance.delete(`${HOST}/official/user/logout`, JSON.stringify(params)).then(res => res.data)
}
// 子账号登录
export const childLogin = params => {
    return instance.post(`${HOST}/users/child/login`, JSON.stringify(params)).then(res => res.data)
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
// 基本信息查询
export const baseInfo = params => {
    return instance.get(`${HOST}/official/enterprises/` + params).then(res => res.data)
}
// 登录信息
export const loginInfo = params => {
    return instance.get(`${HOST}/official/mananger/index`).then(res => res.data)
}
// 基本信息修改
export const enterprisesUpdata = params => {
    return instance.put(`${HOST}/official/enterprises`, JSON.stringify(params)).then(res => res.data)
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
    return instance.get(`${HOST}/imgs/broadcast/` + params).then(res => res.data)
}

// 轮播图修改接口
export const broadcastUp = params => {
    return instance.post(`${HOST}/imgs/` + params.enterpriseId + '/' + params.imgsId).then(res => res.data)
}
// 菜单详情查询
export const menuContent = params => {
    return instance.get(`${HOST}/imgs/menu/` + params).then(res => res.data)
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
// 账号获取 http://wechat123.natapp1.cc/users/child/{token}
export const childAccount = params => {
    return instance.get(`${HOST}/official/users/child`).then(res => res.data)
}
// 账号添加 http://wechat123.natapp1.cc/users/child/{token}
export const childAccountAdd = params => {
    return instance.post(`${HOST}/official/users/child`, JSON.stringify(params)).then(res => res.data)
}
// 账号修改 http://wechat123.natapp1.cc/users/child/{token}
export const childAccountChange = params => {
    return instance.put(`${HOST}/official/users/child`, JSON.stringify(params)).then(res => res.data)
}
// 招商加盟轮播图 http://wechat123.natapp1.cc/official/broadcast/investment
export const investment = params => {
    return instance.get(`${HOST}/official/broadcast/investment`).then(res => res.data)
}
// 品牌文化轮播图 http://wechat123.natapp1.cc/official/broadcast/culture
export const culture = params => {
    return instance.get(`${HOST}/official/broadcast/culture`).then(res => res.data)
}
