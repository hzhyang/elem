import axios from 'axios'
const state = {
    shoptypelist1:[],
    shoptypelist2:[],
    advlistsmall:[],
    advlistbig:[],

    shopslist:[],
    pageSum:0,
};
let mutations={
    getshops(state,data){
        state.shopslist=state.shopslist.concat(data.data)  ;
        state.pageSum=data.pageSum;
    },
    getadvs(state,data){
        if(data.type=='small'){
            state.advlistsmall=data.results
        }
        else{
            state.advlistbig=data.results
        }
    },
    getshopType(state,data){
        if(data.page==1){
            state.shoptypelist1=data.data;
        }
        else{
            state.shoptypelist2=data.data;
        }
    }
};
let actions={
    getshops({commit},{istrue,page=1}){
        axios.get("/getshops",{
            params:{page}
        }).then(data=>{
            commit("getshops",data)
            istrue();
        }).catch(err=>{
            console.log(err);
        })
    },

    getadv({commit},obj){
      axios.get("/getadv",{
          params:{
              num:obj.num,
              type:obj.type,
          }
      }).then(data=>{
          commit("getadvs",data.msg)
      }).catch(err=>{
          console.log(err);
      }) 
    },
    getshopTypeList({commit},page=1){
        axios.get("/getShopTypeList",{
            params:{
                page
            }
        }).then(data=>{
            commit("getshopType",data)
        }).catch(err=>{
            console.log(err);
        })
    }
};

export default {
    state,
    mutations,
    actions
}
