<template>
   <div>
       <el-form :inline="true" class="toobar" style="width: 98%;padding-right:0px">
           <el-form-item>
               <el-input type="text" v-model="$store.state.goods.keyword" @keyup.native="search"></el-input>
           </el-form-item>

           <el-form-item>
               <el-button type="primary" icon="el-icon-edit" @click="addgoods">添加</el-button>
           </el-form-item>
       </el-form>
       <el-table
           :data="goods.goodslist"
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
               label="商品名称"
               width="130">
               <template slot-scope="scope">
                   <i class="el-icon-time"></i>
                   <span style="margin-left: 10px">{{ scope.row.goodsName }}</span>
               </template>
           </el-table-column>
           <el-table-column
               label="商品图片"
               width="100">
               <template slot-scope="scope">
                   <img width="100px" height="100px" :src="scope.row.goodsImg | chageurl" alt="">
               </template>
           </el-table-column>
           <el-table-column
               label="商品分类"
               width="100">
               <template slot-scope="scope">
                   <i class="el-icon-time"></i>
                   <span style="margin-left: 10px">{{ scope.row.goodsType }}</span>
               </template>
           </el-table-column>

           <el-table-column
               label="价格"
               width="100">
               <template slot-scope="scope">
                   <i class="el-icon-time"></i>
                   <span style="margin-left: 10px">{{ scope.row.price |money }}</span>
               </template>
           </el-table-column>

           <el-table-column
               label="销量"
               width="100">
               <template slot-scope="scope">
                   <i class="el-icon-time"></i>
                   <span style="margin-left: 10px">{{ scope.row.salenum }}</span>
               </template>
           </el-table-column>

           <el-table-column
               label="店家名称"
               width="120">
               <template slot-scope="scope">
                   <i class="el-icon-time"></i>
                   <span style="margin-left: 10px">{{ scope.row.shopName }}</span>
               </template>
           </el-table-column>

           <el-table-column
               label="库存"
               width="100">
               <template slot-scope="scope">
                   <i class="el-icon-time"></i>
                   <span style="margin-left: 10px">{{ scope.row.stock }}</span>
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

               </template>
           </el-table-column>
       </el-table>
       <el-pagination
           background
           style="margin-right: 100px"
           :current-page="$store.state.goods.page"
           :page-size="$store.state.goods.pageNum"
           :total="$store.state.goods.count"
           @current-change="chagepage"
           layout="prev, pager, next"
       >
       </el-pagination>
       <addgoods :goodsaddvisibi.sync="goodsaddvisibi" :row="row"></addgoods>
   </div>
</template>

<script>
    import addgoods from '@/components/addgoods'
    import {mapState,mapActions} from 'vuex'
    export default {
        name: "goodslist",
        data(){
            return{
                goodsaddvisibi:false,
                row:''
            }
        },
        components:{
            addgoods
        },
        computed:mapState(['goods']),
        methods:{
            ...{
                chagepage(v){
                    if(this.$store.state.goods.keyword){
                        this.searchgoods(v);
                    }
                    else{
                        this.getgoodslist(v);
                    }
                },
                handleAdd(){},
                handleDelete(index,row){
                    var obj={
                        page:this.goods.page,
                        _id:row._id
                    }
                    this.delgoods(obj)
                },
                handleEdit(index,row){
                    this.row=row;
                    this.goodsaddvisibi=true
                },
                search(){
                    this.searchgoods()
                },
                addgoods(){
                    this.goodsaddvisibi=true;
                    this.row=""
                }
            },
            ...mapActions(['getgoodslist','delgoods','searchgoods'])
        },
        mounted(){
            this.getgoodslist();
        }
    }
</script>

<style scoped>

</style>
