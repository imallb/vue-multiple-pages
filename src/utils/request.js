import Axios from 'axios'

// 创建axios实例
const service = Axios.create({
    baseURL: 'https://www.biuuu.top', // api的base_url
    timeout: 60 * 1000 // 请求超时时间（毫秒）
    // withCredentials: true, // 跨域请求携带cookie
});

// request拦截器
service.interceptors.request.use(config => {
    if (!config.params) config.params = {};
    config.params["chain"] = Date.now();

    return config;
});

// response拦截器
service.interceptors.response.use(
    response => {
        return response.data;
    }, error => {
        return Promise.reject(error)
    }
);

export default service;
// 网络请求
export async function request(apiPromise) {
    const requestHttp = apiPromise instanceof Array
        ? Axios.all(apiPromise).then(Axios.spread(allFormat))
        : service(apiPromise).then(serviceFormat)

    function allFormat() {
        const format = []
        for(var i = 0; i < apiPromise.length; i++) {
            format[i] = arguments[i].data
        }
        return format
    }

    function serviceFormat(res) {
        return res.data
    }

    return requestHttp.catch(error => {
        if (error.response) {
            // 请求已发出，但服务器响应的状态码不在 2xx 范围内
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log(error.message)
        }
    })
};
