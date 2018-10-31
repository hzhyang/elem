import axios from 'axios';


const state = {
    shopslist:[],
    keyword: '',
    goodstypelist: [],
    page: 1,
    pageNum: 1,
    count: 1
};
const mutations = {
    chage(state,data){
        state.goodstypelist=data.data;
        state.page=data.page;
        state.pageNum=data.pageNum;
        state.count=data.count
    },
    getshops(state,data){
        state.shopslist=data.msg
    }
};

const actions = {
    updategoodstyle({dispatch},obj){
        axios.post('/updategoodstype',obj.formdata).then(data=>{
            if(data.ok==1){
                obj.success('恭喜修改成功');
                var page =data.msg.page;
                dispatch('getgoodstype',page)
            }
            else{
                obj.error(data.msg)
            }
        }).catch(err=>{
            console.log(err);
            obj.error('错了哦，修改错误啦')
        })
    },
    searchgoodstype({state,commit},page=1){
        axios.get("/searchgoodstype",{
            params:{
                keyword:state.keyword,
                page
            }
        }).then(data=>{
            commit('chage',data);
        }).catch(err=>{
            console.log(err);
        })
    },
    getshops({commit},cb){
        axios.get("/getshopsname",{}).then((data)=>{
            commit('getshops',data);
            eval(cb());
        }).catch((err)=>{
            console.log(err);
        })
    },
    delgoodstype({dispatch},obj){
        axios.post('/delgoodstype',obj).then(data=>{
            dispatch('getgoodstype',data.page)
        }).catch(err=>{
            console.log(err);
        })
    },
    getgoodstype({commit}, page = 1) {
        axios.get("/getgoodstype", {
            params: {
                page
            }
        }).then(data => {
            commit('chage',data)
        }).catch(err => {
            console.log(err);
        })

    },

};
export default {
    actions,
    state,
    mutations
}
