/* 进行 http 通信 */
const axios = window.axios

//axios.defaults.withCredentials=true;
// 拦截器
axios.interceptors.request.use(config => {
    // loading
    config.timeout = 3000
    return config
}, error => {
    return Promise.reject(error)
})

axios.interceptors.response.use(response => {
    return response
}, error => {
    return Promise.resolve(error.response)
})

/**
 *@method HTTP
 *@param {String} addr 的http地址
 *@return {无} 返回值说明
 *@desc 通信类
 */
function HTTP(addr='/',prefix){
    this.addr = addr
    this.prefix = prefix || ''
}

function checkStatus (response) {
    // loading
    // 如果http状态码正常，则直接返回数据
    if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
        return response.data
        // 如果不需要除了data之外的数据，可以直接 return response.data
    }
    // 异常状态下，把错误信息返回去
    return {
        status: -404,
        error: '与服务器的连接网络异常!'
    }
}

function checkCode (res) {
    // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
    if (res.status === -404) {
        if( window && window.Bus)
            window.Bus.$emit('axios-error',res)
        throw(res)
    }
    if (res && (res.status !== 0)) {
        //throw(res.message || '与OJ服务器交互数据时发生末知错误')
        if( window && window.Bus)
            window.Bus.$emit('axios-error',res)
        throw(res)
    }
    return res
}

HTTP.prototype.post  = function(url, data) {
    return axios({
        method: 'post',
        baseURL: this.addr,
        url:this.prefix+url,
        data,
        headers: {
        }
    }).then(
        (response) => {
            return checkStatus(response)
        }
    ).then(
        (res) => {
            return checkCode(res)
        }
    )
}


HTTP.prototype.get  =  function(url, params) {
    return axios({
        method: 'get',
        baseURL: this.addr,
        url:this.prefix+url,
        params, // get 请求时带的参数
        headers: {
            'X-Requested-With': 'XMLHttpRequest'
        }
    }).then(
        (response) => {
            return checkStatus(response)
        }
    ).then(
        (res) => {
            return checkCode(res)
        }
    )
}

window.HTTP = HTTP

