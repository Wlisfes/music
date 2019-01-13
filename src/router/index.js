import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/Home'
        },
        {
            //首页
            path: '/Home',
            name: 'Home',
            component: () => import('@/components/home/Home'),
            children: [
                {
                    //歌单详情
                    path: ':id',
                    name: 'Songer',
                    component: () => import('@/components/chald/Songer')
                },
                {
                    //推荐歌单详情页
                    path: '/playList',
                    name: 'playList',
                    component: () => import('@/components/chald/playList'),
                    children: [
                        {
                            //歌单详情
                            path: ':id',
                            name: 'playListSonger',
                            component: () => import('@/components/chald/Songer')
                        }
                    ]
                },
                {
                    //每日推荐歌单详情页
                    path: '/recommend',
                    name: 'recommend',
                    component: () => import('@/components/chald/recommend'),
                    children: [
                        {
                            //歌单详情
                            path: ':id',
                            name: 'recommendSonger',
                            component: () => import('@/components/chald/Songer')
                        }
                    ]
                }
            ]
        },
        {
            
            path: '/Rank',
            name: 'Rank',
            component: () => import('@/components/home/Rank')
        },
        {
            path: '/Singer',
            name: 'Singer',
            component: () => import('@/components/home/Singer')
        },
        {
            //搜索
            path: '/search',
            name: 'search',
            component: () => import('@/components/base/search'),
        },
        {
            //用户页面
            path: '/user',
            name: 'user',
            component: () => import('@/components/user/user'),
            children:[
                {
                    //登录界面
                    path: 'login',
                    name: 'login',
                    component: () => import('@/components/user/login')
                },
                {
                    //歌单详情
                    path: ':id',
                    name: 'userSonger',
                    component: () => import('@/components/chald/Songer')
                },
            ]
        }
    ]
})


router.beforeEach((to, from ,next) => {
    window.addEventListener('load', () => {

        if (to.name === "Songer") {
            router.replace('/Home')
        }

    })
    next()
})





export default router