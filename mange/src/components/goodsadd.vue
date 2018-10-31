<template>
    <el-dialog title="添加商品" :visible="goodsvisible" @update:visible="cancle" style="width: 1000px; margin:0 auto;">
        <el-form :model="addgoods" status-icon style="width: 100%" :rules="goodsaddrules" ref="addgoods">
            <el-form-item label="商品名称" prop="goods" :label-width="formLabelWidth">
                <el-input type="text" v-model="addgoods.goods"></el-input>
            </el-form-item>
            <el-form-item label="商品类别" prop="goodstype" :label-width="formLabelWidth">
                <el-input type="text" v-model="addgoods.goodstype"></el-input>
            </el-form-item>
            <el-form-item label="店铺名称" prop="shopname" :label-width="formLabelWidth">
                <el-input type="text" v-model="addgoods.shopname"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="price" :label-width="formLabelWidth">
                <el-input type="text" v-model.number="addgoods.price"></el-input>
            </el-form-item>
            <el-form-item label="商品库存" prop="stock" :label-width="formLabelWidth">
                <el-input type="text" v-model.number="addgoods.stock"></el-input>
            </el-form-item>
            <el-form-item label="销售数量" prop="salenum" :label-width="formLabelWidth">
                <el-input type="text" v-model.number="addgoods.salenum"></el-input>
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
</template>

<script>
    import {mapActions} from 'vuex'

    export default {
        name: "goodsadd",
        props: ['goodsvisible', 'row'],
        data() {
            return {
                formLabelWidth: "90px",
                goodsaddrules: {
                    goods: [{required: true, message: "名称不能为空", trigger: 'blur'}],
                    goodstype: [{required: true, message: "类型不能为空", trigger: 'blur'}],
                    shopname: [{required: true, message: "店铺名不能为空", trigger: 'blur'}],
                    price: [
                        {required: true, message: '价格不能为空' ,trigger: 'blur'},
                        {type: 'number', message: '价格必须为数字值' }
                    ],
                    stock: [
                        {required: true, message: '库存不能为空' ,trigger: 'blur'},
                        {type: 'number', message: '库存必须为数字值' }
                    ],
                    salenum: [
                        {required: true, message: '销量不能为空', trigger:'blur'},
                        {type: 'number', message: '库存必须为数字值'}
                    ]
                },
                addgoods: {
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
        methods: {
            ...{
                cancle() {
                    this.$emit('update:goodsvisible', false);
                    this.$refs.addgoods.resetFields();
                    this.$refs.shopupload.clearFiles();
                },
                enter() {
                    this.$refs.addgoods.validate((valid) =>{
                        if(valid){
                            var formdata=new FormData();
                            formdata.set('goodsName',this.addgoods.goods);
                            formdata.set('goodsType',this.addgoods.goodstype);
                            formdata.set('goodsTypeId',this.addgoods.goodstypeid);
                            formdata.set('shopName',this.addgoods.shopname);
                            formdata.set('shopId',this.addgoods.shopid);
                            formdata.set('price',this.addgoods.price);
                            formdata.set('stock',this.addgoods.stock);
                            formdata.set('salenum',this.addgoods.salenum);
                            formdata.set('goodsImg',document.querySelector('.el-upload__input').files[0])
                        }
                        var success = (msg) => {
                            this.$message({
                                message: msg,
                                type: 'success'
                            });
                            this.$emit('update:goodsvisible', false);
                            this.$refs.addgoods.resetFields();
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
                        this.addgood(obj)
                    })
                }
            }
            ,
            ...mapActions(['addgood'])
        },
        watch: {
            row() {
                if (this.row) {
                    this.addgoods.shopid = this.row.shopid;
                    this.addgoods.shopname = this.row.shopname;
                    this.addgoods.goodstypeid = this.row._id;
                    this.addgoods.goodstype = this.row.goodstype;

                }
            }
        },
        mounted() {

        }
    }
</script>

<style scoped>

</style>
