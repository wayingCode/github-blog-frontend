const axios = require('axios')
const Vue = require('vue')


const service = axios.create({
    baseURL: "https://api.github.com",
    timeout: 15000
})

service.interceptors.request.use(
    config => {
        // let token = store.state.token.token
        // if (token) {
        //     let sp = "?"
        //     if (config.url.indexOf("?") >= 0) {
        //         sp = "&"
        //     }
        //     config.url = config.url + sp + "access_token=" + token
        // }
        return config
    },
    error => {

    }
)


service.interceptors.response.use(
    response => {
        let responseJson = response.data
        return response
    },
    error => {
        let message
        switch (error.response.status) {
            case 401:
                message = "Token错误"
                break
            default:
                message = error.response.data.message
                break
        }
        Vue.prototype.$message({
            message: message,
            type: 'error'
        })
        return Promise.reject('error')
    }
)

module.exports = service
