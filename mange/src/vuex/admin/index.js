import Axios from 'axios';

const actions = {
    updateAdmin({commit,dispatch},obj){ //修改管理员
        Axios.post("/updateAdmin",{
            id:obj.id,
            page:obj.page,
            data:obj.data
        }).then((data)=>{
            if(data.ok==1){
                commit("update",data);
                obj.update();
            }
            if(data.ok==2){
                alert(data.msg.msg)
                dispatch("adminList",data.msg.page)
            }
            if(data.ok==-1){
                alert(data.msg)
            }
        }).catch((err)=>{
            console.log(err);
        })
    },
    adminsearch({commit},obj){ //搜索admin
        console.log(obj.keyword);
        Axios.get('/adminsearch',{
            params:{keyword:obj.keyword,page:obj.page}
        }).then((data)=>{
            commit('getAdminList',data);
        }).catch((err)=>{
            console.log(err);
        })
    },
    admindel({dispatch},obj){  //删除admin
        Axios.post('/admindel',{
            page:obj.page,
            _id:obj.id
        }).then((data)=>{
            dispatch('adminList',data.page)
        }).catch((err)=>{

        })
    },
    adminList({commit},page=1){ //获取admin
      Axios.get("/adminList",{
          params:{page}
      }).then((data)=>{
          commit('getAdminList',data);
      }).catch((err)=>{
          console.log(err);
      })
    },
    addAdmin({commit,dispatch},obj) { //添加admin
        Axios.post("/addAdmin",{
            adminName:obj.adminName,
            adminPass:obj.adminPass
        }).then((data)=>{
            dispatch('adminList')
        }).catch((err)=>{
            console.log(err);
        })
    },
    delAdminLog({state}, obj) { //删除adminlogin日志
        Axios.post("/delAdminLog", "id=" + obj.id + "&page=" + obj.page, {
            headers: {"content-type": "application/x-www-form-urlencoded"}
        }).then((data) => {
            if (data.ok == 1) {
                state.adminLoginLogPage = data.msg.page / 1;
            }
            else {
                alert(data.msg)
            }

        }).catch((err) => {
            console.log(err);
        })
    },
    adminlogin({commit}, obj) {    //登录请求
        Axios.post("/adminLogin", {
            adminName: obj.adminName,
            adminPass: obj.adminPass,
        }).then((data) => {
            commit('logined', data);
            obj.success();
        }).catch(function (err) {
            console.log(err);
            obj.error()
        });
    },
    getAdminLoginLog({commit}, page = 1) {  //获取日志并分页
        Axios.get("/adminLogList", {
            params: {
                page
            }
        }).then((data) => {
            commit('getAdminLogs', data)
        }).catch((err) => {
            console.log(err);
        })
    }
};
const state = {
    adminLoginLogList: [],//获得的log数据
    adminLoginLogCount: 0,
    adminLoginLogPage: 1,
    adminLoginLogPageNum: 0,

    adminList: [],//获得的adminlist数据
    adminListCount: 0,
    adminListPage: 1,
    adminListPageNum: 0,
    adminloginid: localStorage.adminlogin_id,
    adminloginname: localStorage.adminlogin_name,

    updatename:"",
    updatepass:"",
    updateid:"",
};
const mutations = {
    update(state,data){
        state.updatename = data.msg.adminName;
        state.updatepass = data.msg.adminPass;
        state.updateid = data.msg._id
    },
    getAdminList(state,data){//获得admin数据
        state.adminList = data.data;
        state.adminListCount = data.count;
        state.adminListPage = data.page;
        state.adminListPageNum = data.pageNum;
    },
    getAdminLogs(state, data) {//获得admin log 日志数据
        state.adminLoginLogList = data.data;
        state.adminLoginLogCount = data.count;
        state.adminLoginLogPage = data.page;
        state.adminLoginLogPageNum = data.pageNum;
    },
    logined(state, data) {  //登录后
        console.log(data);
        state.adminloginid = localStorage.adminlogin_id = data.msg.admin_id;   //更改localstorage 和 state的值
        state.adminloginname = localStorage.adminlogin_name = data.msg.adminName; //更改localstorage 和 state的值
    },
    logout(state, obj) { //退出
        state.adminloginid = ""; //清空 state
        state.adminloginname = ""; //清空 state
        localStorage.removeItem('adminlogin_id'); //清除localstorage
        localStorage.removeItem('adminlogin_name'); //清除localstorage
        obj.bus();
    }
};
export default {
    actions,
    state,
    mutations
}
