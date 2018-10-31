<template>
    <el-dialog title="添加店铺" :visible="goodsvisible" @update:visible="cancle"style="width: 1000px; margin:0 auto;" >
        <el-form :model="addgoods" status-icon style="width: 100%" :rules="goodsaddrules" ref="addgoodstype">
            <el-form-item label="商品类型" prop="goodstype" :label-width="formLabelWidth">
                <el-input type="text" v-model="addgoods.goodstype"></el-input>
            </el-form-item>
            <el-form-item label="商铺图片">
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
            <el-button @click="cancle">取 消</el-button>
            <el-button type="primary" @click="enter">确 定</el-button>
        </div>
    </el-dialog>

</template>

<script>
    import {mapActions} from 'vuex'
    export default {
        name: "addgoodstype",
        props:['goodsvisible',"row"],
        data(){
            return{
                formLabelWidth:"90px",
                goodsaddrules:{
                    goodstype:[{required: true, message: "名称不能为空", trigger: 'blur'}],
                },
                addgoods:{
                    goodstype:"",

                }
            }
        },
        methods:{
            ...{
                cancle(){
                    this.$emit('update:goodsvisible',false);
                    this.$refs.addgoodstype.resetFields();
                    this.$refs.shopupload.clearFiles();
                },
                enter(){
                    this.$refs.addgoodstype.validate((valid) =>{
                        if(valid){
                            var formdata=new FormData();
                            formdata.set('shopName',this.row.shopName);
                            formdata.set('shopid',this.row._id);
                            formdata.set('goodstype',this.addgoods.goodstype);
                            formdata.set('goodstypeImg',document.querySelector('.el-upload__input').files[0])
                        }
                        var success = (msg) => {
                            this.$message({
                                message: msg,
                                type: 'success'
                            });
                            this.$emit('update:goodsvisible',false);
                            this.$refs.addgoodstype.resetFields();
                            this.$refs.shopupload.clearFiles();
                        };
                        var error = (msg) => {
                            this.$message.error(msg);
                        };
                        var obj = {
                            success,
                            error,
                            formdata
                        };
                        this.addgoodstype(obj);
                    });

                }
            } ,
            ...mapActions(['addgoodstype'])

        },
        mounted(){

        }
    }
</script>

<style scoped>

</style>
