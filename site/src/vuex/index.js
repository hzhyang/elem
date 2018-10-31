import Vuex from 'vuex'
import Vue from 'vue'
import home from '@/vuex/home'
import login from '@/vuex/login'

Vue.use(Vuex);
export default new Vuex.Store({
    state:{
        selected:'home'
    },
    modules:{
        home,
        login
    }
})
