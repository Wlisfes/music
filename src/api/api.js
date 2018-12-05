'use strict'

import axios from 'axios'
import { http } from './apiConfig'

export const xhr = (param, url, type = 'GET') => {
    return new Promise((resolve, reject) => {
        axios({
            method: type,
            url: url,
            data: param
        }).then(res => {
            resolve(res.data)
        }).catch(e => {
            reject(e)
        })
    })
}


//轮播图
export const getbanner = (param) => {
    return xhr(param, `${http}/banner`)
}


export const getlized = (param) => {
    return xhr(param, `${http}/personalized`)
}
