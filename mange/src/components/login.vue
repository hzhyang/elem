<template>
    <el-form class="login-form" :model="login_form" :rules="login_rules" ref="lform">
        <h3 class="title">饿了么管理系统</h3>
        <el-form-item prop="adminname">
            <el-input type="text" placeholder="请输入用户名" v-model="login_form.adminname"autofocus></el-input>
        </el-form-item>
        <el-form-item prop="adminpass">
            <el-input type="password" placeholder="请输入密码" v-model="login_form.adminpass"></el-input>
        </el-form-item>
        <el-form-item class="button">
            <el-button type="primary" :loading="$store.state.isloading" @click="submitForm('lform')" round style="width: 100px ;margin-right:30px">登录</el-button>
            <el-button type="info" round style="width: 100px" @click="resetForm('lform')">重置</el-button>
        </el-form-item>

    </el-form>
</template>

<script>
    import Bus from '@/common/bus';
    import {mapActions} from "vuex";
    export default {
        name: "login",
        data() {
            var passrule=(rule,value,callback)=>{
              if(value.length<4 || value.length>16){
                  callback(new Error("密码长度必须大于4小于16"))
              }
              else{
                  callback()
              }
            };
            return {
                login_form:{
                    adminname:"",
                    adminpass:""
                },
                login_rules:{
                    adminname:[
                        {required:true,message:"账号不允许为空",trigger:"blur"}
                    ],
                    adminpass:[
                        {validator:passrule,trigger:"blur"}
                    ]
                }
            }
        },
        methods: {
            ...{
                success(){             //登录成功时
                    this.$notify({
                        title: '成功',
                        message: '登录成功',
                        type: 'success'
                    });
                    Bus.$emit("init");
                },
                error(){              ////登录失败时
                    this.$message({
                        showClose: true,
                        message: '网络错误，登录失败',
                        type: 'error'
                    });
                },
                resetForm(formname) {
                    this.$refs[formname].resetFields();   //重置表单
                },
                submitForm(formname) {                     //提交表单
                    this.$refs[formname].validate((valid) => {
                        if (valid) {
                            this.adminlogin({
                                adminName:this.login_form.adminname,
                                adminPass:this.login_form.adminpass,
                                success:this.success,
                                error:this.error
                            });
                        }
                        else {
                            this.$message({
                                showClose: true,
                                message: '输入数据有误',
                                type: 'error'
                            });
                        }
                    })
                }

            },
            ...mapActions(['adminlogin'])
        },
    }
</script>

<style scoped>
    .login-form {
        width: 350px;
        margin: 80px auto 0 auto;
        padding: 35px 35px 15px 35px;
        box-shadow: 0 0 5px blue;
    }

    .title {
        text-align: center;
        width: 350px;
    }

    .button {
        text-align: center;
    }
</style>
