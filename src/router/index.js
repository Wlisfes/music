import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/Home'
        },
        {
            path: '/Home',
            name: 'Home',
            component: () => import('@/components/home/Home'),
            children: [
                {
                    path: '/search',
                    name: 'Home',
                    component: () => import('@/components/base/search'),
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
        }
    ]
})