<template>
    <div>
        <el-form :inline="true" class="toobar" style="width: 98%;padding-right:0px">
            <el-form-item>
                <el-input type="text" v-model="$store.state.goodstype.keyword" @keyup.native="search"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" icon="el-icon-edit" @click="addgoodstype">添加</el-button>
            </el-form-item>
        </el-form>

        <el-table
            :data="$store.state.goodstype.goodstypelist"
            v-loading="$store.state.isloading"
            element-loading-text="穿梭时空程序加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
            style="width: 100%">
            <el-table-column
                label="id"
                width="250">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row._id }}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="商品类型"
                width="100">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.goodstype }}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="商铺类型图片"
                width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">
                        <img style="width: 80px" :src=" scope.row.goodstypeImg |chageurl  " alt=""></span>
                </template>
            </el-table-column>
            <el-table-column
                label="商铺名字"
                width="150">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.shopname }}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="商铺id"
                width="250">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.shopid }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">编辑
                    </el-button>
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除
                    </el-button>
                    <el-button
                        size="mini"
                        type="primary"
                        @click="handleAdd(scope.$index, scope.row)">添加商品
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            background
            style="margin-right: 100px"
            :current-page="goodstype.page"
            :page-size="goodstype.pageNum"
            :total="goodstype.count"
            @current-change="changepage"
            layout="prev, pager, next"
        >
        </el-pagination>
        <selectgoodstyle :ishow.sync="ishow" :row.sync="row"></selectgoodstyle>
        <goodsadd :goodsvisible.sync="goodsvisible" :row="rows"></goodsadd>
    </div>
</template>

<script>
    import selectgoodstyle from '@/components/selectgoodstyle'
    import goodsadd from "@/components/goodsadd"
    import {mapState,mapActions}  from 'vuex'
    export default {
        name: "goodstype",
        data() {
            return{
                ishow:false,
                goodsvisible:false,
                row:'',
                rows:''
            }
        },
        computed:mapState(['goodstype']),
        components:{
            selectgoodstyle,
            goodsadd
        },
        methods: {
            ...{
                handleAdd(index,row){
                    this.goodsvisible=true;
                    this.rows=row
                },
                handleEdit(index,row){
                    this.ishow=true;
                    this.row=row
                },
                search() {
                    this.searchgoodstype();
                },
                addgoodstype() {
                    this.ishow=true;
                },
                changepage(v){
                   if(this.$store.state.goodstype.keyword){
                       this.searchgoodstype(v)
                   }
                   else{
                       this.getgoodstype(v)
                   }
                },
                handleDelete(index,row){
                    var obj={
                        page:this.goodstype.page,
                        _id:row._id
                    }
                    this.delgoodstype(obj);
                }
            },
            ...mapActions(['getgoodstype','delgoodstype','searchgoodstype'])
        },
        mounted(){
            this.getgoodstype()

        }
    }
</script>

<style scoped>

</style>
