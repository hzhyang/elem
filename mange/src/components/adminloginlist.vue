<template>
    <div class="listbox">
        <template>
            <el-table
                class="center"
                border
                v-loading="$store.state.isloading"
                element-loading-text="穿梭时空程序加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                :data="$store.state.admin.adminLoginLogList"
                style="width: 100%">
                <el-table-column
                    type="index"
                    width="50">
                </el-table-column>
                <el-table-column
                    label="ID"
                    width="250">
                    <template slot-scope="scope">
                        <i class="el-icon-star-on"></i>
                        <span style="margin-left: 10px">{{ scope.row._id }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="管理员名称"
                    width="180">
                    <template slot-scope="scope">
                        <el-popover trigger="hover" placement="top">
                            <p>名称: {{ scope.row.adminName }}</p>
                            <p>管理员id: {{ scope.row.admin_id }}</p>
                            <div slot="reference" class="name-wrapper">
                                <el-tag size="medium">{{ scope.row.adminName }}</el-tag>
                            </div>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column label="登录时间">
                    <template slot-scope="scope">
                        <i class="el-icon-time"></i>
                        <span style="margin-left: 10px">{{ scope.row.lastLoginTime | formatTime }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>
        <el-pagination
            background
            :current-page="admin.adminLoginLogPage"
            :page-size="admin.adminLoginLogPageNum"
            :total="admin.adminLoginLogCount"
            @current-change="getAdminLoginLog"
            layout="prev, pager, next"
            >
        </el-pagination>
    </div>
</template>

<script>
    import {mapActions,mapState} from 'vuex'

    export default {
        name: "adminloginlist",
        methods: {
            ...{
                handleDelete(index, row) {
                    this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                        }).then(() => {
                            var obj={
                                id:row._id,
                            };
                            obj.page=this.admin.adminLoginLogPage;
                            this.delAdminLog(obj);
                            this.getAdminLoginLog(this.admin.adminLoginLogPage);
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });

                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消删除'
                            });
                        });


                }
            },
            ...mapActions(['getAdminLoginLog','delAdminLog']) //调用相应的页数的日志
        },
        computed:{
            ...mapState(['admin']),         //获得admin的state里的值
            ...{},
        },
        mounted() {
            this.getAdminLoginLog();
        }
    }
</script>

<style scoped>
    .listbox {
        width: 1100px;
    }
</style>
