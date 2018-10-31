<template>
    <div class="login">
        <p>
            <img src="../assets/img/lo_login.jpg" alt="">
        </p>
        <h3>短信登录</h3>
        <div class="input">
            <p>
                <el-input
                    @keyup.native="checkinput"
                    placeholder="手机号"
                    v-model="phone">
                    <i slot="suffix":class="select" @click="getcode">获取验证码</i>
                </el-input>
            </p>
            <p>
                <el-input
                    placeholder="验证码"
                    v-model="$store.state.login.code">
                </el-input>
            </p>
            <span>
                温馨提示：未注册饿了么账号的手机号,登录时将自动注册，且代表您已同意《用户服务协议》
            </span>
        </div>
        <dl>
            <button @click="login">登录</button>
            <i>关于我们</i>
        </dl>

    </div>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        name: "login",
        data(){
            return{
                phone:'',
                select:''
            }
        },
        methods:{
            login(){
                var goback=()=>{
                    this.$router.go(-1);
                };
                var obj={
                    code:this.$store.state.login.code,
                    phone:this.phone,
                    goback
                }
                this.$store.dispatch('login',obj);
            },
            getcode(){
                if(this.select){
                    console.log(this.phone);
                    this.$store.dispatch("getcheck",this.phone)
                }

            },
            checkinput(){
                console.log(Number.isInteger(this.phone/1));
                console.log(this.phone.length);
                if(Number.isInteger(this.phone/1)&&this.phone.length==11){
                    console.log(123);
                    this.select="select";
                }
                else{
                    this.select=""
                }
            }
        }
    }
</script>

<style scoped>

</style>
