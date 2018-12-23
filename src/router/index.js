import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    // mode: 'history',
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
                    path: ':id',
                    name: 'Songer',
                    component: () => import('@/components/chald/Songer')
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
            path: '/search',
            name: 'search',
            component: () => import('@/components/base/search'),
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