<template>
    <div class="home" >
        <header>
            <div class="title"><p>定位中</p></div>
            <div class="searchbox">
                <p class="search" @click="search">
                    <i class="iconfont icon-sousuo"></i>
                    搜索饿了么商家、商品名称
                </p>
            </div>
        </header>
        <main>
            <mt-swipe :auto="0" class="swipe">
                <mt-swipe-item>
                    <div>
                        <ul>
                            <li v-for="item in home.shoptypelist1">
                                <img :src="item.typeImg | chageurl" alt="">
                                <span>{{item.shopType}}</span>
                            </li>
                        </ul>
                    </div>
                </mt-swipe-item>
                <mt-swipe-item>
                    <div>
                        <ul>
                            <li v-for="item in home.shoptypelist2">
                                <img :src="item.typeImg | chageurl" alt="">
                                <span>{{item.shopType}}</span>
                            </li>
                        </ul>
                    </div>
                </mt-swipe-item>
            </mt-swipe>
            <div class="adv">
                <ul>
                    <li v-for=" item in home.advlistsmall">
                        <h3>{{item.title}}</h3>
                        <p>{{item.stitle}}</p>
                        <span>{{item.text}}</span>
                        <img :src="item.img | chageurl"></img>
                    </li>
                </ul>
                <p v-for="item in home.advlistbig">
                    <img :src="item.img|chageurl" alt="">
                </p>
            </div>
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
            <span  v-if="loaded"class="isdown">
                <em>加载中</em>
                <mt-spinner type="fading-circle" ></mt-spinner>
            </span>
            <span v-if="isshow" class="isdown">
                    已经到底了
            </span>
        </main>
        <footbar></footbar>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex'
    import "@/assets/css/index.css"
    import footbar from '@/components/footbar'
    import { Toast } from 'mint-ui';
    import { InfiniteScroll } from 'mint-ui';
    export default {
        name: "home",
        data(){
          return{
              typetop:"",
              value:3,
              loading:false,
              loaded:false,
              target:10,
              page:1,
              isget:false,
              isshow:false,
              searchtop:'',
              searchheight:'',
              num:true
          }
        },
        methods: {
            ... {
                loadMore() {
                    var istrue=()=>{
                        this.num=true
                    }
                    var sp=document.documentElement.scrollTop;
                    if(!this.isshow){
                        this.loaded=true;
                    }
                    if(this.num){this.num=false;
                        // this.num++;
                        // console.log("num",this.num);
                        console.log("page",this.page);
                        setTimeout(() => {
                            console.log(this.home.pageSum,this.page);
                            if(this.page<=this.home.pageSum){
                                this.loading=true;

                                this.getshops({istrue,page:this.page});
                                this.loading = false;
                                // this.loaded=false;

                                if(this.page===this.home.pageSum){
                                    this.isget=true
                                }
                                this.page+=1;
                            }
                            else{
                                if(this.page==1){
                                    this.num=false;
                                    this.getshops({istrue,page:this.page});
                                    this.page+=1
                                }
                                else if(this.isget){
                                    this.loading = false;
                                    // this.loaded=false;
                                    Toast({
                                        message: '我也是有底线的',
                                        position: 'bottom',
                                        duration: 800
                                    });
                                    this.isget=false;
                                    this.isshow=true;
                                }

                            }
                            this.loaded=false
                        }, 1500);

                    }


                },
                fixed() {
                    var sp=document.documentElement.scrollTop;
                    if (sp>=this.searchtop) {
                        if(sp >this.typetop-2*this.searchheight){
                            document.querySelector('.topbar').style.position = 'fixed';
                            document.querySelector('.topbar').style.top = this.searchheight+"px";
                            document.querySelector('.topbar').style.zIndex = 100;
                        }
                        else{
                            document.querySelector('.topbar').style.position = 'static';
                        }
                        document.querySelector('.searchbox').style.position = 'fixed';
                        document.querySelector('.searchbox').style.top = 0;
                        document.querySelector('.searchbox').style.zIndex = 100;
                    }
                    else {
                        document.querySelector('.searchbox').style.position = 'static';
                    }
                },
                search() {   //搜索的点击事件待写
                    console.log('执行了');
                },
            },
            ...mapActions(['getshopTypeList','getadv','getshops'])
        },
        computed: mapState(['home']),
        components: {
            footbar
        },
        mounted() {
            window.addEventListener("scroll",this.fixed,true);
            this.getshopTypeList(1);
            this.getshopTypeList(2);
            this.getadv({type:"small",num:2});
            this.getadv({type:"big",num:1})
            this.typetop=document.querySelector('.topbar').offsetTop
            this.searchtop = document.querySelector(".searchbox").offsetTop;
            this.searchheight= document.querySelector(".searchbox").offsetHeight;
        },
        beforeDestroy() {
            window.removeEventListener("scroll",this.fixed,true); // 离开页面 关闭监听 不然会报错
        }
    }
</script>

<style>
    header {
        height: 0.96rem;
        background-color: #26a2ff;
    }

</style>
