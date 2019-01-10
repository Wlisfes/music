'use strict'

import axios from 'axios'
import logo from './logo'

axios.defaults.baseURL='http://47.106.97.205:3000'


//请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
})

//响应拦截器
axios.interceptors.response.use(
    res => {
        logo(res.request, res)
        return res
    },
    err => {
        logo(err.request, err.response)
        return err
    }
)

const xhr = (param, url, type = 'GET') => {
    return new Promise((resolve, reject) => {
        if (type = 'GET')
            axios.get(url, param).then(res => {
                resolve(res.data)
            }).catch(e => {
                reject(e)
            })
        else
            axios.post(url, param.params).then(res => {
                resolve(res.data)
            }).catch(e => {
                reject(e)
            })

    })
}

export default xhr