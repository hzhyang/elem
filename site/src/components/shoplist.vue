<template>
    <div class="shops">
        <p class="shop_title">推荐商家</p>
        <ul class="topbar">
            <li>综合排序</li>
            <li>距离最近</li>
            <li>品质联盟</li>
            <li>筛选</li>
        </ul>
        <div class="shoplist"
             v-infinite-scroll="loadMore"
             infinite-scroll-disabled="loading"
             infinite-scroll-distance="target">
            <div v-for="item in home.shopslist">
                <div class="logo">
                    <img :src="item.shopImg | chageurl" alt="">
                </div>
                <div class="info">
                    <p>
                        <span>{{item.shopName}}</span>
                        <i></i>
                    </p>
                    <div>
                        <el-rate
                            v-model="item.starLevel/1"
                            disabled
                            show-score
                            text-color="#ff9900"
                            score-template="{value}">
                        </el-rate>
                        <span>月售<a>{{item.saleNum}}</a>单</span>
                    </div>
                    <span>
                                <a>¥<em>{{item.sendPrice}}</em>元起送 <i> | </i> <em>配送费¥5</em></a>
                                <a>100m <i> | </i> 32分钟</a>
                            </span>
                    <ul>{{item.shopTypeName}}</ul>
                    <dl>
                        <div>
                            <p>新用户下单立减17元</p>
                            <p>满25减12</p>
                        </div>
                        <span>5个活动</span>
                    </dl>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex'
    import "@/assets/css/index.css"
    import footbar from '@/components/footbar'
    import { Toast } from 'mint-ui';
    import { InfiniteScroll } from 'mint-ui';
    export default {
        name: "shoplist",
        data(){
            return{
                typetop:"",
                loading:false,
                target:10,
                page:1,
                value:3,
            }
        },
        methods: {
            ... {
                loadMore() {
                    console.log(11111);
                    setTimeout(() => {
                        if(this.page<this.home.pageSum){
                            this.loading = true;
                            this.page+=1;
                            this.getshops(this.page);
                            this.loading = false;
                        }
                        else{
                            if(this.page==1){

                            }
                            else{
                                this.loading = false;
                                Toast({
                                    message: '我也是有底线的',
                                    position: 'bottom',
                                    duration: 800
                                });
                            }

                        }

                    }, 1500);

                },
                search() {   //搜索的点击事件待写
                    console.log('执行了');
                },
            },
            ...mapActions(['getshopTypeList','getadv','getshops'])
        },
        computed: mapState(['home']),
    }
</script>

<style scoped>

</style>
