<template>
    <div class="userinfo">
        <mt-header title="账户信息">
            <router-link to="/" @click.native="jump('/my','my')" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="main">
            <dl>
                <li>
                    <p>头像</p>
                    <span>
                        <img src="../assets/img/login_logo.jpg" alt="">
                        <i class="iconfont icon-arrow-right-copy"></i>
                    </span>
                </li>
                <li>
                    <p>用户名</p>
                    <span>
                        <em>{{$store.state.login.userdata.phone}}</em>
                        <i class="iconfont icon-arrow-right-copy"></i>
                    </span>
                </li>
            </dl>
            <ul class="account">
                <p>账户绑定</p>
                <li>
                    <p>手机</p>
                    <span>
                        <em>{{$store.state.login.userdata.phone}}</em>
                        <i class="iconfont icon-arrow-right-copy"></i>
                    </span>
                </li>
            </ul>
            <ul class="account">
                <p>安全设置</p>
                <li>
                    <p>登录密码</p>
                    <span>
                        <em>修改</em>
                        <i class="iconfont icon-arrow-right-copy"></i>
                    </span>
                </li>
            </ul>
            <ol>
                <p @click="goout">退出登录</p>
            </ol>
        </div>
    </div>
</template>

<script>
    export default {
        name: "userinfo",
        methods:{
            jump(to,id){ //路由跳转
                this.$router.push(to);
                this.$store.state.selected=id
            },
            goout(){
                this.$store.state.login.token="";
                this.$store.state.login.userid="";
                this.$store.state.login.userdata={
                    username:'登录/注册',
                        phone:'登录后享受更多特权',
                        money:0,
                        gold:0,
                        red_packet:0
                },
                localStorage.removeItem("token");
                localStorage.removeItem("userid");
                this.jump('/my',"my")
            }
        },
    }
</script>

<style scoped>

</style>
