<template>
    <div>
        <el-form :inline="true" class="toobar" style="width: 98%;padding-right:0px">
            <el-form-item>
                <el-input type="text" v-model="$store.state.shoptype.keyword" @keyup.native="searchtype(1)"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" icon="el-icon-edit" @click="addtype">添加</el-button>
            </el-form-item>
        </el-form>
        <searchbar  :Visibi.sync="visibi" :row="row"></searchbar>
        <el-table
            :data="shoptype.shopTypelist"
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
                label="商铺类型"
                width="180">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.shopType }}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="商铺类型图片"
                width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">
                        <img style="width: 80px" :src=" scope.row.typeImg |chageurl  " alt=""></span>
                </template>
            </el-table-column>
            <el-table-column
                label="商铺类型添加时间"
                width="250">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.addTime | formatTime }}</span>
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
                        @click="handleAdd(scope.$index, scope.row)">添加店铺</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            background
            style="margin-right: 100px"
            :current-page="shoptype.shopTypePage"
            :page-size="shoptype.shopTypePageNum"
            :total="shoptype.shopTypeCount"
            @current-change="chagepage "
            layout="prev, pager, next"
        >
        </el-pagination>
        <addshop :ishow.sync="ishow" :shopType="shopType"></addshop>
    </div>
</template>

<script>
    import searchbar from '@/components/searchbar';
    import addshop from '@/components/addshop'
    import {mapActions,mapState} from "vuex"
    export default {
       name: "shoptype",
       components:{
           searchbar,
           addshop
       },
       data(){
         return {
             visibi:false,
             row:'',
             ishow:false,
             shopType:{}

         }
       },
       computed:mapState(['shoptype']),
       methods:{
           ...{
               handleAdd(index,row){
                    this.ishow=true;
                    this.shopType.id=row._id;
                    this.shopType.Name=row.shopType;
               },
               handleEdit(index,row){
                   this.visibi=true;
                    this.row=row;
               },
               handleDelete(index,row){
                    var obj={
                        id:row._id,
                        page:this.shoptype.shopTypePage
                    }
                    this.delshopType(obj);
                },
                chagepage(page){
                    if(this.shoptype.keyword){
                        this.searchtype(page);
                    }
                    else{
                        this.getshopType({page});
                    }
                },
               addtype(){
                    this.visibi=true;
                    this.row={}
               },
            },
            ...mapActions(['getshopType','delshopType','searchtype'])
        },
        mounted(){
            this.getshopType({page:1});
        }
    }
</script>

<style scoped>

</style>
