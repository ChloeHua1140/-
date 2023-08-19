"use strict";

import axios from "axios"
//import { Loading, Message } from 'element-ui'
import store from '@/store'
import router from "@/router"

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
    baseURL: 'http://127.0.0.1:54326'
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function(config) {
    //  每次发送请求时如果存在token，那么向请求头中加入token字段发送给后端
    const token = store.getters.GET_TOKEN
    if (token) {
        config.headers.common.Authorization = token
    }
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);
// 自己封装的request、get、post
export const request = (url, method, params, callback) => {
    let loadingInstance = Loading.service({
        body: true,
        lock: true,
        text: '拼命加载中',
        background: 'rgba(255,255,255,0.8)'
    })
    const config = {
        method: method
    }
    if (method === 'excelPost') {
        config.responseType = 'blob'
        method = 'post'
        config.method = method
    }
    if (method === 'get') {
        config.params = params
    } else if (method === 'post' || method === 'put' || method === 'delete') {
        const formData = new FormData();
        for (const key in params) {
            formData.append(key, params[key])
        }
        config.data = formData
    }
    _axios.request(url, config).then(response => {
        if (response.data.code === 200 || !response.data.code) {
            callback(response.data)
            return
        }
        Message.error(response.data.message)
        if (response.data.code === 5002) {
            router.push('/login')
        }
    }).catch(error => {
        Message.error('请求发送出错了:' + error);
    }).finally(() => {
        loadingInstance.close()
    })
}
export const gy_axios = _axios;
export const get = (url, params, callback) => {
    request(url, 'get', params, callback)
}
export const post = (url, params, callback) => {
    request(url, 'post', params, callback)
}
export const del = (url, params, callback) => {
    request(url, 'delete', params, callback)
}
export const put = (url, params, callback) => {
    request(url, 'put', params, callback)
}
export const excelPost = (url, params, callback) => {
    request(url, 'excelPost', params, callback)
}
export const asyncRequest = async (url, method, params) => {
    const config = {
        method: method
    }
    if (method === 'get') {
        config.params = params
    } else if (method === 'post' || method === 'put' || method === 'delete') {
        const formData = new FormData();
        for (const key in params) {
            formData.append(key, params[key])
        }
        config.data = formData
    }
    return await _axios.request(url, config)
}
export const asyncGet = async (url, params) => {
    return await asyncRequest(url, 'get', params)
}
export const asyncPost = async (url, params) => {
    return await asyncRequest(url, 'post', params)
}
export const asyncDel = async (url, params) => {
    return await asyncRequest(url, 'delete', params)
}
export const asyncPut = async (url, params) => {
    return await asyncRequest(url, 'put', params)
}