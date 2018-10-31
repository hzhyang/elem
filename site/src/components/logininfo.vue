<template>
    <div class="logininfo">
        <div class="topinfo" @click="tologin" >
            <dl>
                <img src="../assets/img/login_logo.jpg" alt="">
            </dl>
            <span>
                <p>
                    <span>{{$store.state.login.userdata.username}}</span>
                    <em>{{$store.state.login.userdata.phone}}</em>
                </p>
                <i class="iconfont icon-arrow-right-copy"></i>
            </span>

        </div>
        <ul class="downinfo">
            <li>
                <img v-if="!token" src="../assets/img/wallet.jpg" alt="">
                <em v-if="token">
                    {{$store.state.login.userdata.money}}
                    <i>元</i>
                </em>
                <span>钱包</span>
            </li>
            <li>
                <img v-if="!token" src="../assets/img/red_packet.jpg" alt="">
                <em v-if="token">
                    {{$store.state.login.userdata.red_packet}}
                    <i>个</i>
                </em>
                <span>红包</span>
            </li>
            <li>
                <img v-if="!token" src="../assets/img/gold.jpg" alt="">
                <em v-if="token">
                    {{$store.state.login.userdata.gold}}
                    <i>个</i>
                </em>
                <span>金币</span>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "logininfo",
        data(){
          return{
              token:localStorage.token,

          }
        },
        methods:{
            tologin(){
                if(localStorage.token){ //待写个人信息页
                    this.$router.push("/userinfo")
                }
                else{
                    this.$router.push("/login")
                }

            }
        },
      mounted(){
        if(this.token){
            var tologin=this.tologin;
            var obj={
                token:localStorage.token,
                tologin
            }
            this.$store.dispatch('getinfo',obj);
        }


      }
    }
</script>

<style scoped>

</style>
