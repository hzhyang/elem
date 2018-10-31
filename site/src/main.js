// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import store from '@/vuex'
import Axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
import footbar from '@/components/footbar'
import filters from '@/filters/index';
const baseurl="http://10.9.153.188"
// Axios.defaults.baseURL="http://10.9.153.188";
Vue.use(MintUI);
Vue.config.productionTip = false;
Vue.component('footbar', footbar);
/* eslint-disable no-new */
for(var key in filters){
    Vue.filter(key,filters[key])
}
//请求拦截
Axios.interceptors.request.use( (config)=> {
    config.url=baseurl+config.url;
    return config;
}), function (err) {
    console.log(err);
};
//响应拦截
Axios.interceptors.response.use((res)=>{
    return res.data

});
new Vue({
    el: '#app',
    router,
    store,
    components: {
        App
    },
    template: '<App/>',

});
