import Vue from 'vue'
import Router from 'vue-router'
import my from '@/components/my'
import order from '@/components/order'
import discover from '@/components/discover'
import home from '@/components/home'
import login from '@/components/login'
import userinfo from '@/components/userinfo'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: home
        },
        {
            path: '/discover',
            name: 'Discover',
            component: discover
        },
        {
            path: '/order',
            name: 'Order',
            component: order
        },
        {
            path: '/my',
            name: 'My',
            component: my
        },
        {
            path: '/login',
            name: 'Login',
            component: login
        },
        {
            path: '/userinfo',
            name: 'Userinfo',
            component: userinfo
        }
    ]
})
