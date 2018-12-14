'use strict'

import axios from 'axios'
import logo from './logo'

axios.defaults.baseURL='/api'

export const xhr = (param, url, type = 'GET') => {
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


//请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
})

export const all = Arr => {
    return Promise.all(Arr)
}


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






//轮播图
export const getbanner = param => {
    return xhr(param, `/banner`)
}

//推荐歌单
export const getlized = param => {
    return xhr(param, `/personalized`)
}

//歌单详情
export const getplaylistdet = param => {
    return xhr(param, `/playlist/detail`)
}

