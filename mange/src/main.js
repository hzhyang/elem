// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from '@/vuex';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import login from '@/components/login';
import Bus from '@/common/bus';
import Axios from 'axios';
import filters from '@/filters/index';
Vue.config.productionTip = false;
Vue.use(ElementUI);
const baseurl="http://10.9.153.188";
for(var key in filters){
    Vue.filter(key,filters[key])
}
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: {App, login},
    data: {
        islogin: false
    },
    methods: {
        init() {
            if (this.$store.state.admin.adminloginid) {
                this.islogin = true;
            }
            else {
                this.islogin = false;
            }
        }
    },
    template: `<components :is="islogin?'App':'login'"/>`,
    mounted() {
        this.init();
        Bus.$on('init', this.init);
        //请求拦截
        Axios.interceptors.request.use( (config)=> {
            this.$store.state.isloading=true;
            config.url=baseurl+config.url;
            return config;
        }), function (err) {
            console.log(err);
        };
        //响应拦截
        Axios.interceptors.response.use((res)=>{
            this.$store.state.isloading=false;
            return res.data
        });

    }
});
