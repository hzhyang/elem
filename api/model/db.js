const mongo = require("mongodb");
const help=require("./help");
var mongoclient = mongo.MongoClient;
function _connect(cb) {
    mongoclient.connect("mongodb://127.0.0.1:27017",{ useNewUrlParser: true },function (err,client) {
        if(err)
            console.log("连接失败");
        else{
            var db = client.db("elem");
            cb(db)
        }
    })
};

//插入数据
module.exports.insertOne = function (collect,contentobj,cb) {
    //思路 拿到值 写进去 返回
    _connect(function (mydb) {
        mydb.collection(collect).insertOne(contentobj,cb)
    })

};

// 获取总条数
module.exports.count = function (collect,obj,cb,) {
    var where={};
    if(obj){
        where=obj
    }
    _connect(function (mydb) {
        var sum =mydb.collection(collect).countDocuments(where).then(cb);

    })
};

//查找数据
module.exports.find = function (collect,obj,cb) {
    _connect(function (mydb) {
        obj.where=(obj.where)?obj.where:{};
        obj.sort=(obj.sort)?obj.sort:{};
        obj.limit=(obj.limit)?obj.limit:0;
        obj.skip=(obj.skip)?obj.skip:0;
        mydb.collection(collect).find(obj.where).sort(obj.sort).limit(obj.limit).skip(obj.skip).toArray(cb);
    })
};
//查找一条数据
module.exports.findOneByid = function (collect,id,cb) {
    _connect(function (mydb) {
        mydb.collection(collect).findOne({
            _id :mongo.ObjectId(id)
        },cb);
    })
};
//查找一条数据
module.exports.findOne = function (collect,obj,cb) {
    _connect(function (mydb) {
        obj.where=(obj.where)?obj.where:{};
        mydb.collection(collect).findOne(obj.where,cb);
    })
};
//删除
module.exports.deleteOne = function (collect,id,cb) {
    _connect(function (mydb) {
        mydb.collection(collect).deleteOne({
            _id :mongo.ObjectId(id)
        },cb)
    })
};
//修改
module.exports.updateOne=function (collect,id,updateobj,cb) {
    _connect(function (mydb) {
        mydb.collection(collect).updateOne({
            _id:mongo.ObjectId(id)

        },{$set:updateobj},cb);
    })
};


