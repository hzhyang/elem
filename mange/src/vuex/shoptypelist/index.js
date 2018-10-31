import axios from 'axios'

const state = {
    keyword: "",
    shopTypelist: [],
    shopTypePage: 1,
    shopTypePageNum: 1,
    shopTypeCount: 1

};
const mutations = {
    getshopTypeList(state, data) {
        console.log(data.data);
        state.shopTypelist = data.data;
        state.shopTypePage=data.page;
        state.shopTypePageNum=data.pageNum;
        state.shopTypeCount=data.count;

    }
};
const actions = {
    addshop({},obj){
        axios.post('/addshop',obj.formdata).then(data=>{
            if(data.ok==1){
                obj.success('恭喜添加成功');
            }
            else{
                obj.error(data.msg)
            }
        }).catch(err=>{
            console.log(err);
            obj.error('错了哦，添加错误啦')
        })
    },
    searchtype({commit,state},page=1){
        axios.get("/searchshopType",{
            params:{
                keyword:state.keyword,
                page
            }
        }).then(data=>{
            commit('getshopTypeList',data);
        }).catch(err=>{
            console.log(err);
        })
    },
    delshopType({dispatch},obj){
        axios.post("/delshopType",{
            _id:obj.id,
            page:obj.page
        }).then(data=>{
            dispatch('getshopType',data);
        }).catch(err=>{
            console.log(err);
        })
    },
    shopTypeadd({dispatch}, obj){
        axios.post("/shopTypeAdd", obj.formdata).then((data) => {
            if (data.ok == 1) {
                obj.success('恭喜添加成功');
                dispatch('getshopType',{})
            }
        }).catch((err) => {
            console.log(err);
            obj.error('错了哦，添加错误啦')
        })
    },
    shopTypechage({dispatch},obj){
        axios.post("/shopTypechage",obj.formdata).then(data=>{
            dispatch('getshopType',{});
            obj.success('恭喜修改成功')
        }).catch(err=>{
            console.log(err);
            obj.error("错了，修改错误")
        })
    },
    getshopType({commit}, obj) {
        var page=obj.page||1;
        var keyword=obj.keyword||"";
        axios.get("/getshopType", {
            params: {page,keyword}
        }).then(data => {
            commit('getshopTypeList', data);
        }).catch(err => {
            console.log(err);
        })
    }
};
export default {
    state,
    actions,
    mutations
}
