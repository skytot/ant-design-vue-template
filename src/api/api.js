import axios from 'axios'
import qs from 'qs'
const HOST = '//gangzhuhao.s1.natapp.cc'
// const token =
//     getCookie('token') ||
//     sessionStorage.getItem('token') ||
//     process.env.API_TOKEN
// 统一头部处理
const instance = axios.create({
    headers: {
        // "content-type": "application/x-www-form-urlencoded"
        'content-type': 'application/json;charset=utf-8'
    }
})
// 统一响应拦截器
instance.interceptors.response.use(
    response => {
        // 对响应数据统一判断
        const code = response.data.code
        if (code === '-99999') {
            return code
        }
        return response
    },
    error => {
        // 响应错误
        return Promise.reject(error)
    }
)
const base = process.env.API_ROOT
// 上传
export const upHost = `${HOST}/imgs/enterprise/`
// get

export const archivesResult = params => {
    return instance.get(`${base}/api/Result/getInfo`, {params})
}
// post
export const getSchoolModules = params => {
    return instance
        .post(`${base}/api/SchoolManage/getSchoolModules`, qs.stringify(params))
        .then(res => res.data)
}
// 登录
export const login = params => {
    return instance
        .post(`${HOST}/users/enterprise/login`, JSON.stringify(params))
        .then(res => res.data)
}
// 注册
export const register = params => {
    return instance
        .post(`${HOST}/users/enterprise/register`, JSON.stringify(params))
        .then(res => res.data)
}
// 验证码
export const captcha = params => {
    return instance.get(`${HOST}/captcha`, params)
}
// 验证码验证
export const captchaCheck = params => {
    return instance
        .post(`${HOST}/captcha/check`, JSON.stringify(params))
        .then(res => res.data)
}
// 短信验证码
export const smscaptcha = params => {
    return instance
        .post(`${HOST}/smscaptcha`, JSON.stringify(params))
        .then(res => res.data)
}
// 短信验证码
export const smsCheck = params => {
    return instance
        .post(`${HOST}/smscaptcha/check`, JSON.stringify(params))
        .then(res => res.data)
}
// 注册基础信息
export const enterprises = params => {
    return instance
        .post(`${HOST}/enterprises`, JSON.stringify(params))
        .then(res => res.data)
}
// 区域
export const location = params => {
    return instance
        .get(`${HOST}/location/` + params)
        .then(res => res.data)
}
// 基本信息
export const baseInfo = params => {
    return instance
        .get(`${HOST}/enterprises/` + params)
        .then(res => res.data)
}
// 登录信息
export const loginInfo = params => {
    return instance
        .get(`${HOST}/official/mananger/index/` + params)
        .then(res => res.data)
}
