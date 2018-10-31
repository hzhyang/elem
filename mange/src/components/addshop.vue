<template>
    <el-dialog title="添加店铺" :visible="ishow" @update:visible="cancle"style="width: 1000px; margin:0 auto;" >
        <el-form :model="addshop" status-icon style="width: 100%" :rules="shopaddrules" ref="addshop">
            <el-form-item label="店铺名称:" prop="shopname" :label-width="formLabelWidth">
                <el-input type="text" v-model="addshop.shopname"></el-input>
            </el-form-item>
            <el-form-item label="星级:" prop="shoplevel" :label-width="formLabelWidth">
                <el-input type="text"v-model.number="addshop.shoplevel"></el-input>
            </el-form-item>
            <el-form-item label="起送价格:" prop='sendprice' :label-width="formLabelWidth">
                <el-input type="text" v-model.number="addshop.sendprice"></el-input>
            </el-form-item>
            <el-form-item label="是否免减:" :label-width="formLabelWidth">
                <el-checkbox v-model="addshop.isSale"></el-checkbox>
            </el-form-item>
            <el-form-item label="商铺图片：">
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
    export default {
        name: "addshop",
        props:['ishow','shopType','row'],
        data(){
          return{
              formLabelWidth:"90px",
              shopaddrules:{
                  shopname:[{required: true, message: "名称不能为空", trigger: 'blur'}],
                  shoplevel:[
                      {required: true, message: "星级不能为空", trigger: 'blur'},
                      { type: 'number', message: '星级必须为数字值'}
                  ],
                  sendprice:[
                      {required: true, message: "起送价不能为空", trigger: 'blur'},
                      { type: 'number', message: '价格必须为数字值'}
                  ],
              },
              addshop:{
                  shopname:"",
                  shoplevel:"",
                  sendprice:"",
                  isSale:false,
              }
          }
        },
        methods:{
            cancle(){
                this.$emit('update:ishow',false);
                this.$refs.addshop.resetFields();
                this.$refs.shopupload.clearFiles();
                this.addshop.isSale=false
            },
            enter(){
                this.$refs.addshop.validate((valid) => {
                    if(valid){
                        var formdata= new FormData();
                        formdata.set("shopTypeId",this.shopType.id);
                        formdata.set('shopTypeName',this.shopType.Name);
                        formdata.set('shopName',this.addshop.shopname);
                        formdata.set('starLevel',this.addshop.shoplevel);
                        formdata.set('sendPrice',this.addshop.sendprice);
                        formdata.set('isSale',this.addshop.isSale);
                        formdata.set("shopImg",document.querySelector('.el-upload__input').files[0]);

                        var success = (msg) => {
                            this.$message({
                                message: msg,
                                type: 'success'
                            });
                            this.$emit('update:ishow',false);
                            this.$refs.addshop.resetFields();

                            this.$refs.shopupload.clearFiles();
                            this.addshop.isSale=false
                        };
                        var error = (msg) => {
                            this.$message.error(msg);
                        };
                        var obj = {
                            success,
                            error,
                            formdata
                        };
                        //调用axios
                        this.$store.dispatch('addshop',obj)
                    }
                    else {
                        return false;
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .el-input{
        width: 350px;
    }
</style>
