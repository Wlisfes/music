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

//推荐新音乐
export const getnewsong = param => {
    return xhr(param, `/personalized/newsong`)
}

//歌单详情
export const getplaylistdet = param => {
    return xhr(param, `/playlist/detail`)
}

//获取歌手
export const getSingerlist = param => {
    return xhr(param, `/top/artists`)
}

//获取歌曲url地址
export const getsongurl = param => {
    return xhr(param, `/song/url`)
}






