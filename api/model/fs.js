const fs = require("fs");
const help= require("./help");
module.exports.fsdel= function(res,path,cb){
    fs.unlink(path,function(err){
        if(err){
            console.log("删除失败");
            help.respon(res);
        }
        else{
            console.log("删除成功");
            cb;
        }
    })
}