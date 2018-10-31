<template>
    <div>
        <el-dialog :title="title" :visible="Visibi" @update:visible="chagecancel" style="width: 1000px; margin:0 auto;">
            <el-form :model="form" status-icon style="width: 90%" :rules="rules" ref="shopType">
                <el-form-item label="商铺类别名称：" prop="typename" :label-width="formLabelWidth">
                    <el-input autoComplete="off" v-model="form.typename"></el-input>
                </el-form-item>
                <el-form-item label="商铺类别图片：">
                    <el-upload
                        :auto-upload="false"
                        class="upload-demo"
                        action=""
                        ref="upload"
                        list-type="picture">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                    <img :src="row.typeImg | chageurl" alt="" width="100px">
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
    import {mapState,mapActions} from 'vuex'

    export default {
        name: "searchbar",
        props: ['Visibi','row'],
        data() {
            return {
                formLabelWidth: "200",
                title: "添加商铺类型",
                rules: {
                    typename: [{required: true, message: "名称不能为空", trigger: 'blur'}]
                },
                form: {
                    typename: "",

                }
            }
        },
        computed: mapState(['shoptype']),
        methods: {
            ...{
                chagecancel() {
                    this.$emit("update:Visibi", false);
                    this.$refs.shopType.resetFields();
                    this.$refs.upload.clearFiles();
                },
                chagesubmit() {
                    this.$refs.shopType.validate((valid) => {
                        if (valid) {
                            var formdata = new FormData();

                            formdata.set('shopTypeName', this.form.typename);
                            formdata.set('shopTypePic', document.querySelector('.el-upload__input').files[0]);
                            var success = (msg) => {
                                this.$message({
                                    message: msg,
                                    type: 'success'
                                });
                                this.$emit("update:Visibi", false);

                                this.$refs.shopType.resetFields();

                                this.$refs.upload.clearFiles();

                            };
                            var error = (msg) => {
                                this.$message.error(msg);
                            };

                            if(this.row._id){
                                formdata.set('id',this.row._id);
                                var obj = {
                                    success,
                                    error,
                                    formdata
                                };
                                this.shopTypechage(obj);
                            }
                            else{
                                var obj = {
                                    success,
                                    error,
                                    formdata
                                };
                                //调取axios
                                this.shopTypeadd(obj);
                            }

                        }
                        else {
                            return false;
                        }
                    })
                }
            },
            ...mapActions(['shopTypeadd','searchtype','shopTypechage'])
        },
        watch:{
            row(){
                this.title=this.row._id?'修改商铺类型':'添加商铺类型';
                this.form.typename=this.row.shopType || ""
            },

        }
    }

</script>

<style scoped>

</style>
