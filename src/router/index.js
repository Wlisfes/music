import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: () => import('@/components/home/Home')
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
    ]
})