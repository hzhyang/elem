<template>
    <el-dialog :title="title" :visible="ishow" @update:visible="cancle"style="width: 1000px; margin:0 auto;" >
        <el-form :model="addshop" status-icon style="width: 100%" :rules="shopaddrules" ref="addshop">
            <el-form-item label="店铺类型:" prop="shopname" :label-width="formLabelWidth">
                <el-select @change=change v-model="shopType" placeholder="请选择">
                    <el-option
                        v-for="item in options"
                        :key="item._id"
                        :label="item.shopType"
                        :value="[item.shopType,item._id]">
                    </el-option>
                </el-select>
            </el-form-item>
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
    import {mapState} from 'vuex';
    export default {
        name: "addshop",
        props:['ishow','row'],
        data(){
            return{
                title:'添加店铺',
                options:[],
                shopType:[],
                id:"",
                shoptypename:'',
                shopTypeid:'',
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
                    shopTypeid:''
                }
            }
        },
        methods:{
            change(){
              console.log(this.shopType);
              var id=this.shopType[1];
              var typename=this.shopType[0];
              console.log(id,typename);
              if(this.row._id){
                  this.shopTypeid=id;
                  this.shoptypename=typename;
              }

            },
            cancle(){
                this.$emit('update:ishow',false);
                this.$refs.addshop.resetFields();
                this.$refs.shopupload.clearFiles();
                this.addshop.isSale=false
            },
            enter(){
                this.$refs.addshop.validate((valid) => {
                    if(valid){
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
                        if(this.row._id){
                            var formdata= new FormData();
                            formdata.set("id",this.id);
                            formdata.set('page',this.$store.state.shops.shopsPage);
                            formdata.set("shopTypeId",this.shopTypeid);
                            formdata.set('shopTypeName',this.shoptypename);
                            formdata.set('shopName',this.addshop.shopname);
                            formdata.set('starLevel',this.addshop.shoplevel);
                            formdata.set('sendPrice',this.addshop.sendprice);
                            formdata.set('isSale',this.addshop.isSale);
                            formdata.set("shopImg",document.querySelector('.el-upload__input').files[0]);
                            var obj = {
                                success,
                                error,
                                formdata
                            };
                            this.$store.dispatch('updateshop',obj)
                        }
                        else{
                            var formdata= new FormData();
                            formdata.set("shopTypeId",this.shopType[1]);
                            formdata.set('shopTypeName',this.shopType[0]);
                            formdata.set('shopName',this.addshop.shopname);
                            formdata.set('starLevel',this.addshop.shoplevel);
                            formdata.set('sendPrice',this.addshop.sendprice);
                            formdata.set('isSale',this.addshop.isSale);
                            formdata.set("shopImg",document.querySelector('.el-upload__input').files[0]);

                            var obj = {
                                success,
                                error,
                                formdata
                            };
                            //调用axios
                            this.$store.dispatch('addshop',obj)
                        }

                    }
                    else {
                        return false;
                    }
                })
            }
        },
        computed:mapState(['shoptype','shops']),
        mounted(){
            var fn=()=>{
                this.options=this.shops.shopTypeList
            };
            this.$store.dispatch('getshoptypes',fn);
        },
        watch:{
            row(){
                if(this.row._id){ //存才即修改
                    this.title="修改店铺";
                    this.id=this.row._id;
                    this.shopType=this.shoptypename=this.row.shopTypeName;
                    this.shopTypeid=this.row.shopTypeId;
                    this.addshop.shopname=this.row.shopName;
                    this.addshop.shoplevel=this.row.starLevel/1;
                    this.addshop.sendprice=this.row.sendPrice/1;
                    this.addshop.isSale=eval(this.row.isSale);
                }
                else{
                    this.title="添加店铺";
                    this.id='';
                    this.shopType=this.shoptypename="";
                    this.shopTypeid="";
                    this.addshop.shopname="";
                    this.addshop.shoplevel="";
                    this.addshop.sendprice="";
                    this.addshop.isSale="";
                }
            }
        }

    }
</script>

<style scoped>
    .el-input{
        width: 350px;
    }
</style>
