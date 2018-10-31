<template>
    <div>
        <el-form :inline="true" class="toobar" :model="search">
            <el-form-item>
                <el-input type="text" v-model="search.keyword" @keyup.native="adminsearch({keyword:search.keyword,page:1})"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" icon="el-icon-edit" @click="dialogFormVisible  = true">添加</el-button>
            </el-form-item>
        </el-form>
        <template>
            <el-table
                :data="$store.state.admin.adminList"
                border
                v-loading="$store.state.isloading"
                element-loading-text="穿梭时空程序加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                style="width: 1031px">
                <el-table-column
                    fixed
                    label="id"
                    width="300">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row._id}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="管理员名称"
                    width="300">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.adminName}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作"
                    width="430">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
                        <el-button type="text" size="small" @click="handleDelete(scope.row._id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>

        <el-dialog title="添加管理员"   :visible.sync="dialogFormVisible" style="width: 1000px; margin:0 auto;height: 500px">
            <el-form :model="form" status-icon style="width: 90%" :rules="rules" ref="addAdmin">
                <el-form-item label="管理员名称" prop="name" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autoComplete="off"></el-input>
                </el-form-item>
                <el-form-item label="管理员密码" prop="pass" :label-width="formLabelWidth">
                    <el-input type="password" v-model="form.pass" autoComplete="off"></el-input>
                </el-form-item>
                <el-form-item label="重复密码" prop="repass" :label-width="formLabelWidth">
                    <el-input type="password" v-model="form.repass" autoComplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" style="width: 90%">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" :loading="$store.state.isloading" @click="submit">确 定</el-button>
            </div>
        </el-dialog>
        <el-pagination
            background
            :current-page="admin.adminListPage"
            :page-size="admin.adminListPageNum"
            :total="admin.adminListCount"
            @current-change="chagepage"
            layout="prev, pager, next"
        >
        </el-pagination>

        <el-dialog title="修改管理员"   :visible.sync="chagedialogFormVisible" style="width: 1000px; margin:0 auto;height: 600px">
            <el-form :model="form" status-icon style="width: 90%" :rules="rules" ref="chageaddAdmin">
                <el-form-item label="管理员名称" prop="chagename" :label-width="formLabelWidth">
                    <el-input v-model="form.chagename" autoComplete="off"></el-input>
                </el-form-item>
                <el-form-item label="原密码" prop="oldpass" :label-width="formLabelWidth">
                    <el-input type="text" v-model="form.oldpass" autoComplete="off"></el-input>
                </el-form-item>
                <el-form-item label="管理员密码" prop="chagepass" :label-width="formLabelWidth">
                    <el-input type="password" v-model="form.chagepass" autoComplete="off"></el-input>
                </el-form-item>
                <el-form-item label="重复密码" prop="chagerepass" :label-width="formLabelWidth">
                    <el-input type="password" v-model="form.chagerepass" autoComplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" style="width: 90%">
                <el-button @click="chagecancel">取 消</el-button>
                <el-button type="primary" :loading="$store.state.isloading" @click="chagesubmit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {mapActions,mapState} from 'vuex';
    export default {
        name: "adminList",
        methods: {
            ...{
                chagepage(v){
                  if(this.search.keyword){
                      this.adminsearch({keyword:this.search.keyword,page:v})
                  }
                  else{
                      this.adminList(v)
                  }
                },
                handleDelete(id){
                    this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(()=>{
                        this.admindel({id,page:this.admin.adminListPage});
                        this.search.keyword="";
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    }).catch(()=>{
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    })

                },
                handleClick(row) {

                    var update=()=>{
                        this.form.chagename=this.admin.updatename;
                        // this.form.chagepass=this.admin.updatepass;
                        // this.form.chagerepass=this.admin.updatepass;;
                    };
                    this.updateAdmin({id:row._id,page:this.admin.adminListPage,update:update});
                    this.chagedialogFormVisible = true;


                },
                chagesubmit(){
                    this.$refs.chageaddAdmin.validate((valid) => {
                        if (valid) {
                            //调用actions
                            this.updateAdmin({
                                id:this.admin.updateid,
                                page:this.admin.adminListPage,
                                data:{
                                    adminName:this.form.chagename,
                                    adminOldPass:this.form.oldpass,
                                    adminPass:this.form.chagepass
                            }});
                            this.chagedialogFormVisible = false;
                            this.$refs.chageaddAdmin.resetFields();

                        }
                        else {
                            return false;
                        }
                        this.search.keyword="";
                    });

                },
                chagecancel() { //取消
                    this.chagedialogFormVisible = false;
                    this.$refs.chageaddAdmin.resetFields();
                },
                cancel() { //取消
                    this.dialogFormVisible = false;
                    this.$refs.addAdmin.resetFields();
                },
                submit() {//提交
                    this.$refs.addAdmin.validate((valid) => {
                        if (valid) {
                            //调用actions
                            this.addAdmin({
                                adminName:this.form.name,
                                adminPass:this.form.pass
                            });
                            this.dialogFormVisible = false;
                            this.$refs.addAdmin.resetFields();

                        }
                        else {
                            return false;
                        }
                        this.search.keyword="";
                    });

                }
            },
            ...mapActions(['addAdmin','adminList','admindel','adminsearch','updateAdmin'])
        },
        computed:{
            ...mapState(['admin'])
        },
        data() {
            var validatechPass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('管理员密码不能为空'));
                } else {
                    if(this.form.chagepass.length<4||this.form.chagepass.length>8){
                        callback(new Error("密码长度应为4-8位"));
                    }
                    else if(this.form.chagerepass !== '') {
                        this.$refs.chageaddAdmin.validateField('chagerepass');
                    }
                    callback();
                }
            };
            var validatechrePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.form.chagepass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('管理员密码不能为空'));
                } else {
                    if(this.form.pass.length<4||this.form.pass.length>8){
                        callback(new Error("密码长度应为4-8位"));
                    }
                    else if(this.form.repass !== '') {
                        this.$refs.addAdmin.validateField('repass');
                    }
                    callback();
                }
            };
            var validaterePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.form.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                search: {
                    keyword: ""
                },
                rules: {
                    name: [
                        {required: true, message: '管理员名称不能为空', trigger: 'blur'}
                    ],
                    pass: [
                        {required: true, message: '管理员密码不能为空', trigger: 'blur'},
                        {validator: validatePass, trigger: 'blur'}
                    ],
                    repass: [
                        {required: true, message: '请再次输入密码', trigger: 'blur'},
                        {validator: validaterePass, trigger: 'blur'}
                    ],
                    chagename: [
                        {required: true, message: '管理员名称不能为空', trigger: 'blur'}
                    ],
                    oldpass: [
                        {required: true, message: '原密码不能为空', trigger: 'blur'}
                    ],
                    chagepass: [
                        {required: true, message: '管理员密码不能为空', trigger: 'blur'},
                        {validator: validatechPass, trigger: 'blur'}
                    ],
                    chagerepass: [
                        {required: true, message: '请再次输入密码', trigger: 'blur'},
                        {validator: validatechrePass, trigger: 'blur'}
                    ]
                },
                dialogFormVisible: false,
                chagedialogFormVisible: false,
                form: {
                    name: '',
                    pass: '',
                    repass: '',
                    chagename:'',
                    oldpass:'',
                    chagepass:'',
                    chagerepass:''
                },

                formLabelWidth: '100px',
            }
        },
        mounted(){
            this.adminList();
        }
    }
</script>

<style scoped>

</style>
