import axios from 'axios'
const state={
    code:'',
    token:'',
    userid:'',
    userdata:{
        username:'登录/注册',
        phone:'登录后享受更多特权',
        money:0,
        gold:0,
        red_packet:0
    },
}
const mutations={
    getinfo(state,data){
        console.log(data);
        state.userdata={
            username:data.user,
            phone:data.user,
            money:data.money,
            gold:data.gold,
            red_packet:data.red_packet
        }
        console.log(state.userdata);
    },
    login(state,data){
        state.token=localStorage.token=data.msg.token;
        state.userid=localStorage.userid=data.msg.userid;
    },
    getcode(state,data){
        state.code = data.msg
    }
}
const actions={
    getinfo({commit},obj){
        axios.get("/getinfo",{
            params:{
                authorization:obj.token
            }
        }).then(data=>{
            if(data.ok==1){
                commit("getinfo",data.msg)
            }
            else{
                state.token=localStorage.token="";
                state.userid=localStorage.userid="";
                obj.tologin()
            }
        }).catch(err=>{
            
        })


    },
    getcheck({commit},phone){
        axios.get("/getcode",{
            params:{
                phone
            }
        }).then(data=>{
            commit('getcode',data)
        }).catch(err=>{
            console.log(err);
        })
    },
    login({commit},obj){
        axios.post("/userlogin",{
            phone:obj.phone,
            code:obj.code,
        }).then(data=>{
            if(data.ok==1){
                commit('login',data);
                obj.goback()
            }
            console.log(data);
        }).catch(err=>{
            console.log(err);
        })
    }
}

export default {
    state,
    mutations,
    actions
}
