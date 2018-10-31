<template>
    <div id="app">
        <el-container class="elcontainer">
            <el-header class="el-header">
                <el-col class="logo" :span="4" @click.native="home">饿了么管理系统</el-col>
                <el-col :span="10" style="text-align: left" >
                    <el-radio-group v-model="isCollapse" class="chage" >
                        <el-radio-button :label="false">展开</el-radio-button>
                        <el-radio-button :label="true">收起</el-radio-button>
                    </el-radio-group>
                </el-col>
                <el-col class="userInfo" :span="10">
                    <el-dropdown trigger="click">
                        <span class="el-dropdown-link">
                             <img src="./assets/zilong.jpg" alt="">
                             <span>{{$store.state.admin.adminloginname}}</span>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="goout">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-col>
            </el-header>

            <el-container class="elcontainer">
                <el-aside width="auto" style="height: 100%;overflow:hidden" :style="{width:isCollapse?'100px':'200px'}">

                    <el-menu default-active="1-4-1" :collapse-transition="false"class="el-menu-vertical-demo elcontainer" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
                        <el-menu-item index="1" @click.native="home" >
                            <i class="el-icon-menu"></i>
                            <span slot="title">首页</span>
                        </el-menu-item>
                        <el-menu-item index="2" @click.native="loginlist" >
                            <i class="el-icon-info"></i>
                            <span slot="title">管理员登录日志</span>
                        </el-menu-item>
                        <el-menu-item index="3" @click.native="$router.push('/adminList')">
                            <i class="el-icon-tickets"></i>
                            <span slot="title">管理员列表</span>
                        </el-menu-item>
                        <el-menu-item index="4" @click.native="$router.push('/shoptypelist')">
                            <i class="el-icon-news"></i>
                            <span slot="title">商铺类型列表</span>
                        </el-menu-item>
                        <el-menu-item index="5" @click.native="$router.push('/shoplist')">
                            <i class="el-icon-setting"></i>
                            <span slot="title">商铺列表</span>
                        </el-menu-item>
                        <el-menu-item index="6" @click.native="$router.push('/goodstype')">
                            <i class="el-icon-star-on"></i>
                            <span slot="title">商品类别</span>
                        </el-menu-item>
                        <el-menu-item index="7" @click.native="$router.push('/goodslist')">
                            <i class="el-icon-bell"></i>
                            <span slot="title">商品列表</span>
                        </el-menu-item>
                        <el-menu-item index="8" @click.native="$router.push('/advlist')">
                            <i class="el-icon-bell"></i>
                            <span slot="title">广告列表</span>
                        </el-menu-item>
                    </el-menu>
                </el-aside>

                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>

        </el-container>
    </div>
</template>

<script>
    import Bus from '@/common/bus'

    export default {
        name: 'App',
        data() {
            return {
                isCollapse: true
            };
        },
        methods: {
            loginlist(){
                this.$router.push("/loginList")
            },
            home(){
              this.$router.push("/")
            },
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            goout() {
                var that = this;
                var obj = {
                    bus() {
                        that.$notify({
                            title: '成功',
                            message: '退出成功',
                            type: 'success'
                        });
                        Bus.$emit("init")
                    }

                };
                this.$store.commit('logout', obj);

            }
        }
    }
</script>

<style>
    * {
        padding: 0;
        margin: 0;
    }
    a{
       text-decoration: none;
        color: #000;
    }
    #app{
        height: 100%;
    }
    .chage{
        display: inline-block;
        border: 1px solid #fff;
        border-radius: 5px;
    }
    body,html,.elcontainer{
        height: 100%;
    }
    .el-header {
        text-align: center;
        line-height: 50px;
        height: 50px !important;
        background: #409EFF;
    }

    .logo {
        width: 200px;
        text-align: left;
        color: #fff;
        font-size: 24px;
        font-weight: bold;
        cursor: pointer;
    }

    .userInfo {
        text-align: right;
        color: #fff;
        line-height: 50px;
    }

    .userInfo img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        vertical-align: middle;
        margin-right: 10px;
    }
    .el-dropdown{

    }
    .el-dropdown-link{
        cursor: pointer;
        padding-right: 30px;
    }
    .el-table td,.el-table .cell{
        text-align: center;
    }
    .el-pagination{
        float: right;
    }
    .toobar{
        width: 1015px;
        background:#f4f4f4;
        padding:8px;
        margin:10px 0;
    }
    .toobar .el-form-item{
        margin-bottom:0;
    }
    .el-dialog__body{
        padding:30px 20px 0 20px;
    }
    .el-pagination{
        margin-top: 10px;
        margin-right: 185px;
    }
    .el-main{
        padding-right:0;
    }
</style>
