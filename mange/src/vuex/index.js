import Vue from 'vue';
import Vuex from 'vuex';
import admin from '@/vuex/admin'
import shoptype from '@/vuex/shoptypelist'
import shops from '@/vuex/shoplist'
import goodstype from '@/vuex/goodstype'
import goods from '@/vuex/goods'
import advlist from '@/vuex/advlist'
Vue.use(Vuex);
export default new Vuex.Store({
    state:{
      isloading:false,
    },
    modules:{
        admin,
        shoptype,
        shops,
        goodstype,
        goods,
        advlist
    }
})
