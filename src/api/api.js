'use strict'

import xhr from './axios'


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

//获取歌手
export const getSingerlist = param => {
    return xhr(param, `/top/artists`)
}







