export default {
    formatTime(time){
        var time = new Date(time);
        var year = time.getFullYear();
        var month = time.getMonth();
        var day = time.getDate();
        var hour = time.getHours();
        var minus = time.getMinutes();
        var secod = time.getSeconds();
        return year+"年"+month.toString().padStart(2,"0")+"月"+
            day.toString().padStart(2,"0")+"日"+" "+
            hour.toString().padStart(2,"0")+":"+
            minus.toString().padStart(2,"0")+":"+
            secod.toString().padStart(2,"0");

    },
    chageurl(v){
        if(!v){
            return v
        }
        else{
            return "http://10.9.153.188/"+v
        }

    },
    issale(v){
        if(v=="true"){
            return "是"
        }
        else{
            return "否"
        }
    },
    money(v){
        return "¥"+v
    }
}
