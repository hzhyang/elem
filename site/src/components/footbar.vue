<template>
    <mt-tabbar v-model="selected">
        <mt-tab-item id="home" @click.native="jump('/','home')" >
            <i class="iconfont icon-changyonglogo40"></i>
            首页
        </mt-tab-item>
        <mt-tab-item id="discover" @click.native="jump('/discover','discover')">
            <i class="iconfont icon-faxian1"></i>
            发现
        </mt-tab-item>
        <mt-tab-item id="order" @click.native="jump('/order','order')">
            <i class="iconfont icon-dingdan"></i>
            订单
        </mt-tab-item>
        <mt-tab-item id="my" @click.native="jump('/my','my')" >
            <i class="iconfont icon-My "></i>
            我的
        </mt-tab-item>
    </mt-tabbar>
</template>

<script>

    export default {
        name: "footbar",
        data(){
            return{
                id:0,
                selected:this.$store.state.selected,
            }
        },
        methods:{
            jump(to,id){ //路由跳转
                this.$router.push(to);
                this.$store.state.selected=id
            }
        }
    }
</script>

<style scoped>
    .mint-tabbar {
        position: fixed;
        height: 0.50rem;
        width: 100%;
        bottom: 0;
        font-size: 0.12rem;
    }

    .mt-tab-item {
        font-size: 0.14rem;
    }

    i {
        display: block;
        margin-bottom: 0.03rem;
        font-size: 0.2rem;
    }
</style>
