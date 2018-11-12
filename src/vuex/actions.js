export const setUser = ({
    commit
}, user) => {
    commit('USER', user)
}
export const setToken = ({
    commit
}, token) => {
    commit('TOKEN', token)
}
