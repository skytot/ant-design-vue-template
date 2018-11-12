import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)

// 应用初始状态
const state = {
    userInfo: null,
    userStatus: 0,
    userToken: ''
}

// 定义所需的 mutations
const mutations = {
    USER: (state, user) => {
        if (user) {
            state.userInfo = user
            state.userStatus = 1
        } else if (user === null) {
            sessionStorage.setItem('tx_ua', null)
            sessionStorage.setItem('tx_tk', '')
            state.userInfo = null
            state.userStatus = 0
            state.userToken = ''
        }
    },
    TOKEN: (state, token) => {
        if (token) {
            state.Token = token
        } else {
            sessionStorage.setItem('tx_ua', null)
            sessionStorage.setItem('tx_tk', '')
            state.userInfo = null
            state.userStatus = 0
            state.userYoken = ''
        }
    }
}

// 创建 store 实例
export default new Vuex.Store({actions, getters, state, mutations})
