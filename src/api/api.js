'use strict'

import xhr from './axios'


//使用手机号登录
export const phoneLogin = param => {
    return xhr(param, `/login/cellphone`)
}

//获取用户歌单
export const getUserPlaylist = param => {
    return xhr(param, `/user/playlist`)
}

//每日推荐歌曲
export const getRecommendSongs = param => {
    return xhr(param, `/recommend/songs`)
}

//轮播图
export const getbanner = param => {
    return xhr(param, `/banner`)
}

//每日推荐歌单
export const getRecommendResource = param => {
    return xhr(param, `/recommend/resource`)
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

//所有榜单
export const getToplist = param => {
    return xhr(param, `/toplist/detail`)
}




