import axios from 'axios'

const state = {
    keyword: '',
    goodslist: [],
    count: 1,
    page: 1,
    pageNum: 1,
    selectshopname: [],
    selectgoodstype: [],
};
const actions = {
    updategoods({dispatch},obj) {
        axios.post("/updategoods",obj.formdata).then(data=>{
            console.log(data);
            if(data.ok==1){
                obj.success("更新成功")
                dispatch('getgoodslist')
            }
            else{
                obj.error(data.msg)
            }
        }).catch(err=>{
            console.log(err);
        })
    },
    getgoodstypes({commit}, shopid) {
        axios.get("/getgoodstypes", {
            params: {
                shopid
            }
        }).then(data => {
            console.log(data);
            commit('segoodstype', data.msg)
        }).catch(err => {
            console.log(err);
        })
    },
    getshopnames({commit}) {
        axios.get("/getshopnames").then(data => {
            if (data.ok == 1) {
                commit('seshopname', data.msg)
            }
        }).catch(err => {

        })
    },
    searchgoods({state, commit}, page = 1) {
        axios.get("/searchgoods", {
            params: {
                keyword: state.keyword,
                page
            }
        }).then(data => {
            commit('getgoodslist', data);
        }).catch(err => {
            console.log(err);
        })
    },
    delgoods({dispatch}, obj) {
        axios.post("/delgoods", obj).then(data => {
            dispatch("getgoodslist", data.page)
        }).catch(err => {
            console.log(err);
        })
    },
    addgood({dispatch}, obj) {
        axios.post("/addgoods", obj.formdata).then(data => {
            if (data.ok == 1) {
                obj.success('添加成功');
                dispatch('getgoodstype')
            }
            else {
                obj.error(data.msg)
            }

        }).catch(err => {
            console.log(err);
        })
    },
    getgoodslist({commit}, page = 1) {
        axios.get("/getgoodslist", {
            params: {
                page
            }
        }).then(data => {
            commit('getgoodslist', data)
        }).catch(err => {
            console.log(err);
        })
    }

};
const mutations = {
    getgoodslist(state, data) {
        state.goodslist = data.data;
        state.pageNum = data.pageNum;
        state.page = data.page;
        state.count = data.count
    },
    seshopname(state, data) {
        state.selectshopname = data;
    },
    segoodstype(state, data) {
        state.selectgoodstype = data;
    }
};
export default {
    state,
    actions,
    mutations
}
