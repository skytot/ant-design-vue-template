import axios from 'axios'
import qs from 'qs'
const qiniuSdk = 'https://api.test.com/base'
// const token =
//     getCookie('token') ||
//     sessionStorage.getItem('token') ||
//     process.env.API_TOKEN
// 统一头部处理
const instance = axios.create({
    headers: {
        // "content-type": "application/x-www-form-urlencoded"
        'content-type': 'application/json;charset=UTF-8'
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
// get
export const archivesResult = params => {
    return instance.get(`${base}/api/Result/getInfo`, {params})
}
// post
export const getSchoolModules = params => {
    return instance.post(`${base}/api/SchoolManage/getSchoolModules`, qs.stringify(params)).then(res => res.data)
}
export const login = params => params => {
    return instance.post(`${qiniuSdk}/api/user/getData`, qs.stringify(params)).then(res => res.data)
}
