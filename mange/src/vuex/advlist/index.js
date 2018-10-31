import axios from 'axios'

const state = {
    advlist: []
};
const actions = {
    deladv({dispatch},id){
        axios.post("/deladv",{
            _id:id
        }).then(data=>{
            dispatch('getadvs')
        }).catch(err=>{
            console.log(err);
        })
    },
    addadv({commit,dispatch}, obj) {
        axios.post("/addadv", obj).then(data => {
            dispatch('getadvs')
        }).catch(err => {
            console.log(err);
        })


    },
    getadvs({state},page=1){
        axios.get("/getadvs",{
            page
        }).then(data=>{
            state.advlist=data.data
        }).catch(err=>{
            console.log(err);
        })
    }
}
    const mutations = {};
export default {
    state,
    actions,
    mutations
}
