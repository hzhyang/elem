<template>
    <div>
        <el-dialog title="添加商品" :visible="goodsaddvisibi" @update:visible="cancle"
                   style="width: 1000px; margin:0 auto;">
            <el-form :model="goodsadd" status-icon style="width: 100%" :rules="goodsaddrules" ref="goodsadd">
                <el-form-item label="商品名称" prop="goods" :label-width="formLabelWidth">
                    <el-input type="text" v-model="goodsadd.goods"></el-input>
                </el-form-item>
                <el-form-item label="店铺和分类" :label-width="formLabelWidth" prop="select">
                    <el-select @change="selectshop" v-model="goodsadd.selectshop" placeholder="请选择店铺"
                               style="width: 150px">
                        <el-option
                            v-for="item in goods.selectshopname"
                            :key="item._id"
                            :label="item.shopName"
                            :value="item._id+'&'+item.shopName">
                        </el-option>
                    </el-select>
                    <el-select @change="selectgoodstype" v-model="goodsadd.selecttype" placeholder="请选择分类"
                               style="width: 150px">
                        <el-option
                            v-for="item in goods.selectgoodstype"
                            :key="item._id"
                            :label="item.goodstype"
                            :value="item._id+'&'+item.goodstype">
                        </el-option>
                    </el-select>
                </el-form-item>


                <el-form-item label="商品价格" prop="price" :label-width="formLabelWidth">
                    <el-input type="text" v-model.number="goodsadd.price"></el-input>
                </el-form-item>
                <el-form-item label="商品库存" prop="stock" :label-width="formLabelWidth">
                    <el-input type="text" v-model.number="goodsadd.stock"></el-input>
                </el-form-item>
                <el-form-item label="销售数量" prop="salenum" :label-width="formLabelWidth">
                    <el-input type="text" v-model.number="goodsadd.salenum"></el-input>
                </el-form-item>
                <el-form-item label="商品图片">
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
    </div>

</template>

<script>
    import {mapState, mapActions} from 'vuex'

    export default {
        name: "addgoods",
        props: ['goodsaddvisibi','row'],
        data() {
            return {

                formLabelWidth: "100px",
                goodsaddrules: {

                    // select: [{required: true, message: "名称不能为空", trigger: 'blur'}],
                    goods: [{required: true, message: "名称不能为空", trigger: 'blur'}],
                    // goodstype: [{required: true, message: "类型不能为空", trigger: 'blur'}],
                    // shopname: [{required: true, message: "店铺名不能为空", trigger: 'blur'}],
                    price: [
                        {required: true, message: '价格不能为空', trigger: 'blur'},
                        {type: 'number', message: '价格必须为数字值'}
                    ],
                    stock: [
                        {required: true, message: '库存不能为空', trigger: 'blur'},
                        {type: 'number', message: '库存必须为数字值'}
                    ],
                    salenum: [
                        {required: true, message: '销量不能为空', trigger: 'blur'},
                        {type: 'number', message: '库存必须为数字值'}
                    ]
                },
                goodsadd: {
                    selectshop: '',
                    selecttype: '',

                    goods: "",
                    price: '',
                    stock: '',
                    salenum: '',

                    shopname: '',
                    shopid: '',
                    goodstypeid: '',
                    goodstype: ''
                }
            }
        },
        computed: mapState(['goods']),
        methods: {
            ...{
                selectgoodstype() {
                    var arr = this.goodsadd.selecttype.split("&");
                    this.goodsadd.goodstype=arr[1];
                    this.goodsadd.goodstypeid=arr[0];

                },
                selectshop() {
                    var arr = this.goodsadd.selectshop.split("&");
                    this.goodsadd.shopname = arr[1];
                    this.goodsadd.shopid = arr[0];
                    this.getgoodstypes(this.goodsadd.shopid);
                },
                getshopnames() {
                    this.getshopnames();
                },
                cancle() {
                    this.$emit('update:goodsaddvisibi', false);
                    this.$refs.goodsadd.resetFields();
                    this.$refs.shopupload.clearFiles();
                },
                enter() {
                    this.$refs.goodsadd.validate(valid=>{
                        if(valid){
                            var success = (msg) => {
                                this.$message({
                                    message: msg,
                                    type: 'success'
                                });
                                this.$emit('update:goodsaddvisibi',false);
                                this.$refs.goodsadd.resetFields();
                                this.$refs.shopupload.clearFiles();
                            };
                            var error = (msg) => {
                                this.$message.error(msg);
                            };
                            if(this.row._id){
                                var formdata=new FormData();
                                console.log();
                                formdata.set("id",this.row._id);
                                formdata.set('goodsName',this.goodsadd.goods);
                                formdata.set('goodsType',this.goodsadd.goodstype);
                                formdata.set('goodsTypeId',this.goodsadd.goodstypeid);
                                formdata.set('shopName',this.goodsadd.shopname);
                                formdata.set('shopId',this.goodsadd.shopid);
                                formdata.set('price',this.goodsadd.price);
                                formdata.set('stock',this.goodsadd.stock);
                                formdata.set('salenum',this.goodsadd.salenum);
                                formdata.set('goodsImg',document.querySelector('.el-upload__input').files[0])
                                var obj = {
                                    success,
                                    error,
                                    formdata
                                };
                                this.updategoods(obj)
                            }
                            else{
                                var formdata=new FormData();
                                console.log();
                                formdata.set('goodsName',this.goodsadd.goods);
                                formdata.set('goodsType',this.goodsadd.goodstype);
                                formdata.set('goodsTypeId',this.goodsadd.goodstypeid);
                                formdata.set('shopName',this.goodsadd.shopname);
                                formdata.set('shopId',this.goodsadd.shopid);
                                formdata.set('price',this.goodsadd.price);
                                formdata.set('stock',this.goodsadd.stock);
                                formdata.set('salenum',this.goodsadd.salenum);
                                formdata.set('goodsImg',document.querySelector('.el-upload__input').files[0])
                                var obj = {
                                    success,
                                    error,
                                    formdata
                                };
                                this.addgood(obj)
                            }

                        }
                    })
                }
            },
            ...mapActions(['getshopnames', 'getgoodstypes','addgood','updategoods'])
        },
        mounted() {
            this.getshopnames()
        },
        watch:{
            row(){
                if(this.row._id){
                    console.log(this.row);
                    this.goodsadd.goods=this.row.goodsName;
                    this.goodsadd.price=this.row.price/1;
                    this.goodsadd.stock=this.row.stock/1;
                    this.goodsadd.salenum=this.row.salenum/1;
                    this.goodsadd.shopname=this.goodsadd.selectshop=this.row.shopName;
                    this.goodsadd.shopid=this.row.shopId;
                    this.goodsadd.goodstype=this.goodsadd.selecttype=this.row.goodsType;
                    this.goodsadd.goodstypeid=this.row.goodsTypeId

                }
                else{
                    this.goodsadd.goods="";
                    this.goodsadd.price="";
                    this.goodsadd.stock="";
                    this.goodsadd.salenum="";
                    this.goodsadd.shopname=this.goodsadd.selectshop="";
                    this.goodsadd.shopid="";
                    this.goodsadd.goodstype=this.goodsadd.selecttype="";
                    this.goodsadd.goodstypeid=""
                }
            }
        }
    }
</script>

<style scoped>

</style>
