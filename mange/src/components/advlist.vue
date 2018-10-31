<template>
    <div>
        <el-form :inline="true" class="toobar" >
            <el-form-item>
                <el-button type="primary" icon="el-icon-edit" @click="dialogFormVisible=true">添加</el-button>
            </el-form-item>
        </el-form>
        <el-table
            :data="advlist.advlist"
            style="width: 100%">
            <el-table-column
                label="名称"
                width="180">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.name }}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="类型"
                width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.type }}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="标题"
                width="180">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.title }}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="副标题"
                width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.stitle }}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="连接文字"
                width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.text }}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="图片"
                width="180">
                <template slot-scope="scope">
                    <img :src="scope.row.img|chageurl" alt="" width="100px">
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">

                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>


        <el-dialog title="添加广告" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="广告名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="广告类型" :label-width="formLabelWidth">
                    <el-input v-model="form.type" autocomplete="off"></el-input>

                </el-form-item>
                <el-form-item label="链接文字" :label-width="formLabelWidth">
                    <el-input v-model="form.text" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="广告标题" :label-width="formLabelWidth">
                    <el-input v-model="form.title" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="广告副标题" :label-width="formLabelWidth">
                    <el-input v-model="form.stitle" autocomplete="off"></el-input>
                </el-form-item>
                    <el-form-item label="广告图片">
                        <el-upload
                            :auto-upload="false"
                            class="upload-demo"
                            action=""
                            ref="shopupload"
                            list-type="picture">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                    </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="enter">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {mapActions,mapState} from 'vuex';
    export default {
        name: "advlist",
        data(){
            return{
                formLabelWidth:'120px',
                dialogFormVisible:false,
                form:{
                    name:'',
                    type:'',
                    title:'',
                    stitle:'',
                    text:""
                }
            }
        },
        computed:mapState(['advlist']),
        methods:{
            handleDelete(index,row){
                this.$store.dispatch("deladv",row._id)
            },
            enter(){
                this.dialogFormVisible = false;
                var formdata=new FormData();
                formdata.set('name',this.form.name)
                formdata.set('type',this.form.type)
                formdata.set('title',this.form.title)
                formdata.set('stitle',this.form.stitle)
                formdata.set('text',this.form.text)
                formdata.set('img',document.querySelector('.el-upload__input').files[0])
                this.$store.dispatch('addadv',formdata)
            }
        },
        mounted(){
            this.$store.dispatch('getadvs',1)
        }

    }
</script>

<style scoped>

</style>
