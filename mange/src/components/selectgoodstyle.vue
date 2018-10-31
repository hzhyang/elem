<template>
    <el-dialog :title="title" :visible="ishow" @update:visible="cancle" style="width: 1000px; margin:0 auto;">
        <el-form :model="addgoods" status-icon style="width: 100%" :rules="goodsaddrules" ref="addgoodstype">
            <el-form-item label="店铺类型:" prop="shopname" :label-width="formLabelWidth">
                <el-select @change=change v-model="shopType" placeholder="请选择">
                    <el-option
                        v-for="item in options"
                        :key="item._id"
                        :label="item.shopName"
                        :value="[item.shopName,item._id]">
                    </el-option>
                </el-select>
            </el-form-item>
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
            <img :src="imgsrc|chageurl " :style="{width: '100px'}"alt="">
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
        name: "selectgoodstyle",
        props: ['ishow','row'],
        data() {
            return {
                shopid:'',
                shopname:'',
                id:'',
                imgsrc:'',
                options:[],
                shopType:'',
                title: '添加商品类别',
                formLabelWidth:"90px",
                goodsaddrules:{
                    goodstype:[{required: true, message: "名称不能为空", trigger: 'blur'}],
                },
                addgoods:{
                    goodstype:"",

                }
            }
        },
        methods: {
            ...{
                change(){
                    var id=this.shopType[1];
                    var typename=this.shopType[0];
                    if(this.row._id){
                        this.shopid=id;
                        this.shopname=typename;
                    }

                },
                cancle(){
                    this.$emit('update:row','')
                    this.$emit('update:ishow',false);
                    this.$refs.addgoodstype.resetFields();
                    this.$refs.shopupload.clearFiles();

                },
                enter(){
                    this.$refs.addgoodstype.validate((valid) => {
                        if(valid){
                            var success = (msg) => {
                                this.$message({
                                    message: msg,
                                    type: 'success'
                                });
                                this.$emit('update:ishow',false);
                                this.$refs.addgoodstype.resetFields();

                                this.$refs.shopupload.clearFiles();
                            };
                            var error = (msg) => {
                                this.$message.error(msg);
                            };
                            if(this.row._id){
                                console.log(this.shopid);
                                console.log(this.shopname);
                                var formdata= new FormData();
                                formdata.set("id",this.id);
                                formdata.set('page',this.$store.state.goodstype.Page);
                                formdata.set("shopid",this.shopid);
                                formdata.set('shopName',this.shopname);
                                formdata.set('goodstype',this.addgoods.goodstype);
                                formdata.set("goodstypeImg",document.querySelector('.el-upload__input').files[0]);
                                var obj = {
                                    success,
                                    error,
                                    formdata
                                };
                                this.$store.dispatch('updategoodstyle',obj)
                            }
                            else{
                                var formdata= new FormData();
                                formdata.set("shopid",this.shopType[1]);
                                formdata.set('shopName',this.shopType[0]);
                                formdata.set('goodstype',this.addgoods.goodstype);
                                formdata.set("goodstypeImg",document.querySelector('.el-upload__input').files[0]);
                                var obj = {
                                    success,
                                    error,
                                    formdata
                                };
                                //调用axios
                                this.$store.dispatch('addgoodstype',obj)
                            }

                        }
                        else {
                            return false;
                        }
                    })
                },

            },
            ...mapActions(['getshops'])
        },
        mounted(){
            var fn=()=>{
                this.options=this.$store.state.goodstype.shopslist;
            };
            this.$store.dispatch('getshops',fn);
        },
        watch:{
            row(){
                if(this.row._id){ //存才即修改
                    this.title="修改商品类别";
                    this.id=this.row._id;
                    this.shopid=this.row.shopid;
                    this.shopType=this.shopname=this.row.shopname;
                    this.imgsrc =this.row.goodstypeImg;
                    this.addgoods.goodstype=this.row.goodstype;
                }
                else{
                    this.title="添加商品类别";
                    this.id="";
                    this.shopid="";
                    this.shopType="";
                    this.imgsrc ="";
                    this.addgoods.goodstype="";
                }
            }
        }
    }
</script>

<style scoped>

</style>
