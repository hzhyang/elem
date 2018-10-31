import axios from 'axios'
const state={
    shopslist:[],
    shopsPage:1,
    shopsPageNum:1,
    shopsCount:1,
    shopTypeList:[],
    keyword:''
};
const mutations={
    getshopsList(state,data){
        state.shopslist = data.data;
        state.shopsPage=data.page;
        state.shopsPageNum=data.pageNum;
        state.shopsCount=data.count;
    },
    getShopTypeList(state,data){
        state.shopTypeList=data.msg
    }
};
const actions={
    addgoodstype({dispatch},obj){
        console.log(obj);
        axios.post("/addgoodstype",obj.formdata).then(data=>{
            if(data.ok==1) {
                obj.success('恭喜添加成功');
                dispatch ('getgoodstype')
            }
            else{
                obj.error(data.msg)
            }
        }).catch(err=>{
            console.log(err);
        })
    },
    updateshop({dispatch},obj){
        axios.post('/updateshops',obj.formdata).then(data=>{
            if(data.ok==1){
                obj.success('恭喜修改成功');
                var page =data.msg.page;
                dispatch('getshops',page)
            }
            else{
                obj.error(data.msg)
            }
        }).catch(err=>{
            console.log(err);
            obj.error('错了哦，修改错误啦')
        })
    },
    searchshops({commit,state},page=1){
        axios.get("/searchshops",{
            params:{
                keyword:state.keyword,
                page
            }
        }).then(data=>{
            commit('getshopsList',data);
        }).catch(err=>{
            console.log(err);
        })
    },
    getshoptypes({commit},cb){
      axios.get("/getshoptypes",{}).then((data)=>{
          commit('getShopTypeList',data);
          cb();
      }).catch((err)=>{
          console.log(err);
      })
    },
    getshops({commit},page=1){
        axios.get("/getshops", {
            params: {page}
        }).then(data => {
            commit('getshopsList', data);
        }).catch(err => {
            console.log(err);
        })
    },
    delshops({dispatch},obj){
        axios.post("/delshops",{
            _id:obj.id,
            page:obj.page
        }).then(data=>{
            if(data.ok==1){
                console.log(data);
                dispatch('getshops',data.page)
            }
        }).catch(err=>{
            console.log(err);
        })
    }
};












export default {
    state,
    actions,
    mutations
}
