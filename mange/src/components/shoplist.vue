<template>
    <div>
        <el-form :inline="true" class="toobar" style="width: 98%;padding-right:0px">
            <el-form-item>
                <el-input type="text" v-model="$store.state.shops.keyword" @keyup.native="search"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" icon="el-icon-edit" @click="addshop">添加</el-button>
            </el-form-item>
        </el-form>

        <el-table
            :data="shops.shopslist"
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
                label="商铺名称"
                width="100">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.shopName }}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="商铺类型图片"
                width="150">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">
                        <img style="width: 80px" :src=" scope.row.shopImg |chageurl  " alt=""></span>
                </template>
            </el-table-column>
            <el-table-column
                label="商铺类型"
                width="100">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.shopTypeName }}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="商铺星级"
                width="100">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.starLevel }}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="起送价格"
                width="100">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.sendPrice }}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="是否减免"
                width="100">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.isSale | issale }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    <el-button
                        size="mini"
                        type="primary"
                        @click="handleAdd(scope.$index, scope.row)">添加商品类别</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            background
            style="margin-right: 100px"
            :current-page="shops.shopsPage"
            :page-size="shops.shopsPageNum"
            :total="shops.shopsCount"
            @current-change="chagepage "
            layout="prev, pager, next"
        >
        </el-pagination>
        <selectshopadd :ishow.sync=ishow :row="row"></selectshopadd>
        <addgoodstype :goodsvisible.sync="addgoodstype" :row="goodstype"></addgoodstype>
    </div>
</template>

<script>
    import selectshopadd from '@/components/selectshopadd';
    import addgoodstype from '@/components/addgoodstype';
    import {mapState,mapActions} from 'vuex'
    export default {
        name: "shoplist",
        data(){
            return{
                addgoodstype:false,
                ishow:false,
                row:'',
                goodstype:''
            }
        },
        methods:{
            ...{
                handleAdd(index,row){
                    this.addgoodstype=true;
                    this.goodstype=row
                },
                handleEdit(index,row){
                    this.ishow=true;
                    this.row=row;
                },
                search(){
                    this.searchshops();
                },
                addshop(){
                    this.ishow=true; //显示添加界面
                    // this.typeoptions=this.shoptype.shopTypelist
                    this.row=""
                },
                chagepage(page){
                    if(this.$store.state.shops.keyword){
                        this.searchshops(page);
                    }
                    else{
                        this.getshops(page);
                    }
                },
                handleDelete(index,row){
                    var obj={
                        id:row._id,
                        page:this.shops.shopsPage
                    };
                    this.delshops(obj);
                }
            },
            ...mapActions(['getshops','delshops','getshoptypes','searchshops'])

        },
        components:{
            selectshopadd,
            addgoodstype
        },
        computed:mapState(['shops']),
        mounted(){
            this.getshops();
        }
    }
</script>

<style scoped>

</style>
