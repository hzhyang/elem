<template>
    <div class="my">
        <mt-header title="我的">
            <router-link to="/" @click.native="jump('/','home')" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <loginInfo ></loginInfo>
        <main>
            <dl>
                <li>
                    <a href="">
                        <span>
                            <i class="iconfont icon-dingwei"></i>
                            <em>我的地址</em>
                        </span>
                        <i class="iconfont icon-arrow-right-copy"></i>
                    </a>
                </li>
            </dl>
            <ul>
                <li>
                    <a href="">
                        <span>
                            <i class="iconfont icon-dingwei"></i>
                            <em>我的地址</em>
                        </span>
                        <i class="iconfont icon-arrow-right-copy"></i>
                    </a>
                </li>
                <li>
                    <a href="">
                        <span>
                            <i class="iconfont icon-dingwei"></i>
                            <em>我的地址</em>
                        </span>
                        <i class="iconfont icon-arrow-right-copy"></i>
                    </a>
                </li>
            </ul>
            <ol>
                <li>
                    <a href="">
                        <span>
                            <i class="iconfont icon-dingwei"></i>
                            <em>我的地址</em>
                        </span>
                        <i class="iconfont icon-arrow-right-copy"></i>
                    </a>
                </li>
                <li>
                    <a href="">
                        <span>
                            <i class="iconfont icon-dingwei"></i>
                            <em>我的地址</em>
                        </span>
                        <i class="iconfont icon-arrow-right-copy"></i>
                    </a>
                </li>
            </ol>
        </main>
        <footbar></footbar>
    </div>
</template>

<script>
    import loginInfo from '@/components/logininfo'
    export default {
        name: "my",
        methods:{
            jump(to,id){ //路由跳转
                this.$router.push(to);
                this.$store.state.selected=id
            }
        },
        components:{
            loginInfo
        },
        created(){
          this.$store.state.selected='my';
        }
    }
</script>

<style scoped>

</style>
