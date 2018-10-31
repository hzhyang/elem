import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import AdminLoginList from '@/components/adminloginlist'
import error404 from '@/components/error404'
import adminList from '@/components/adminList'
import shoptypelist from '@/components/shoptypelist'
import shoplist from '@/components/shoplist'
import goodstype from '@/components/goodstype'
import goodslist from '@/components/goodslist'
import advlist from '@/components/advlist'
Vue.use(Router);

export default new Router({
    routes: [
        {
            path:'*',
            name:"404",
            component:error404
        },
        {
            path: '/',
            name: 'HelloWorld',
            component: HelloWorld
        },
        {
            path: '/loginList',
            name: 'adminLoginList',
            component: AdminLoginList
        },
        {
            path: '/adminList',
            name: 'adminList',
            component: adminList
        },
        {
            path: '/shoptypelist',
            name: 'shoptypelist',
            component: shoptypelist
        },
        {
            path: '/shoplist',
            name: 'shoplist',
            component: shoplist
        },
        {
            path: '/goodstype',
            name: 'goodstype',
            component: goodstype
        },
        {
            path: '/goodslist',
            name: 'goodslist',
            component: goodslist
        },
        {
            path: '/advlist',
            name: 'advlist',
            component: advlist
        }
    ]
})
