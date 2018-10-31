const db = require("./db");
const {upPic}=require("./upPic");
const fs =require("fs");
var respon=function (res, ok = -1, msg = "网络连接错误") {
    res.json({
        ok,
        msg
    });
    return ""
};
module.exports.respon = respon

module.exports.gettime = function () {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth();
    var day = now.getDate();
    var hour = now.getHours();
    var minus = now.getMinutes();
    var secod = now.getSeconds();

    return year + "年" + month.toString().padStart(2, "0") + "月" + day.toString().padStart(2, "0") + "日" + " " + hour.toString().padStart(2, "0") + ":" + minus.toString().padStart(2, "0") + ":" + secod.toString().padStart(2, "0");

};

module.exports.getpagedata = function (req, res, collect, pageNum) {
    var page = req.query.page / 1;
    var objkey = {};
    if (req.query.keyword) {
        var keyword = "/" + req.query.keyword + "/";
        objkey = {shopType: eval(keyword)}
    }
    db.count(collect, objkey, function (count) {
        var pageSum = Math.ceil(count / pageNum);
        if (pageSum < 1) {
            pageSum = 1;
        }
        if (page > pageSum) {
            page = pageSum
        }
        if (page < 1) {
            page = 1
        }
        var obj = {
            limit: pageNum,
            skip: pageNum * (page - 1),
            where: objkey
        };
        db.find(collect, obj, function (err, results) {
            if (err) {
                res.json({
                    ok: -1,
                    msg: "网络连接错误"
                })
            }
            else {
                setTimeout(function () {
                    res.json({
                        ok: 1,
                        count,
                        page,
                        pageSum,
                        pageNum,
                        data: results
                    })
                }, 1000)

            }
        })
    });

};
module.exports.deldata = function (req, res, collect) {
    var id = req.body._id;
    var page = req.body.page;
    db.deleteOne(collect, id, function (err, results) {
        if (err) {
            res.json({
                ok: -1,
                msg: "网络连接错误"
            })
        }
        else {
            setTimeout(function () {
                res.json(
                    {ok: 1, msg: "删除成功", page}
                )
            }, 1000)
        }
    })
};


module.exports.searchdata = function (req, res, collect,prop, pageNum) {
    var page = req.query.page / 1;
    var obj = {};
    if (req.query.keyword) {
        var keyword = "/" + req.query.keyword + "/";
        // obj = {[prop]: eval(keyword)}
        obj[prop]=eval(keyword)
    }
    db.count(collect, obj, function (count) {
        var pageSum = Math.ceil(count / pageNum);
        if (pageSum < 1) {
            pageSum = 1;
        }
        if (page > pageSum) {
            page = pageSum
        }
        if (page < 1) {
            page = 1
        }

        var search = {
            limit: pageNum,
            skip: pageNum * (page - 1),
            where: obj
        };
        db.find(collect, search, function (err, results) {
            if (err) {
                res.json({
                    ok: -1,
                    msg: "网络连接错误"
                })
            }
            else {
                setTimeout(function () {
                    res.json({
                        ok: 1,
                        count,
                        page,
                        pageSum,
                        pageNum,
                        data: results
                    })
                }, 1000)

            }
        })
    });
}

module.exports.updata =function(req,res,filename,collect,prop){ // update[0] 无图片更新 update[1]有图更心prop 修改时替换删除旧图片 filename上传的图片名 collect集合名
    upPic(req,filename,function(obj){
        var where=[];
        where[0]={
            shopTypeId:obj.params.shopTypeId,
            shopTypeName:obj.params.shopTypeName,
            shopName:obj.params.shopName,
            starLevel:obj.params.starLevel,
            sendPrice:obj.params.sendPrice,
            isSale:obj.params.isSale,
        };
        where[1]={
            shopTypeId:obj.params.shopTypeId,
            shopTypeName:obj.params.shopTypeName,
            shopName:obj.params.shopName,
            starLevel:obj.params.starLevel,
            sendPrice:obj.params.sendPrice,
            isSale:obj.params.isSale,
            shopImg:obj.newPicName
        }
        if(obj.ok==1){
            db.updateOne(collect,obj.params.id,where[0],function(err,results){
                respon(res,1,{msg:"更新成功",page:obj.params.page})
            })
        }
        else if(obj.ok==3){
            db.findOneByid(collect,obj.params.id,function(err,results){
                fs.unlink("./uppic/"+results[prop], function (err) {
                    if(err){
                        console.log(err);
                    }
                    else{
                        db.updateOne(collect,obj.params.id,where[1],function(err,results){
                            respon(res,1,{msg:"更新成功",page:obj.params.page})
                        })
                    }
                })

            })
        }
        else{
            respon(res,-1,obj.msg)
        }
    })
};
module.exports.updata1 =function(req,res,filename,collect,prop){ // update[0] 无图片更新 update[1]有图更心prop 修改时替换删除旧图片 filename上传的图片名 collect集合名
    upPic(req,filename,function(obj){
        var where=[];
        where[0]={
            shopid:obj.params.shopid,
            shopname:obj.params.shopName,
            goodstype:obj.params.goodstype,
        };
        where[1]={
            shopid:obj.params.shopid,
            shopname:obj.params.shopName,
            goodstype:obj.params.goodstype,
            goodstypeImg:obj.newPicName
        }
        if(obj.ok==1){
            db.updateOne(collect,obj.params.id,where[0],function(err,results){
                respon(res,1,{msg:"更新成功",page:obj.params.page})
            })
        }
        else if(obj.ok==3){
            db.findOneByid(collect,obj.params.id,function(err,results){
                fs.unlink("./uppic/"+results[prop], function (err) {
                    if(err){
                        console.log(err);
                    }
                    else{
                        db.updateOne(collect,obj.params.id,where[1],function(err,results){
                            respon(res,1,{msg:"更新成功",page:obj.params.page})
                        })
                    }
                })

            })
        }
        else{
            respon(res,-1,obj.msg)
        }
    })
};
module.exports.updata2 =function(req,res,filename,collect,prop){ // update[0] 无图片更新 update[1]有图更心prop 修改时替换删除旧图片 filename上传的图片名 collect集合名
    upPic(req,filename,function(obj){
        var where=[];
        where[0]={

            goodsName:obj.params.goodsName,
            goodsType:obj.params.goodsType,
            goodsTypeId:obj.params.goodsTypeId,
            shopName:obj.params.shopName,
            shopId:obj.params.shopId,
            price:obj.params.price,
            stock:obj.params.stock,
            salenum:obj.params.salenum,
        };
        where[1]={
            goodsName:obj.params.goodsName,
            goodsType:obj.params.goodsType,
            goodsTypeId:obj.params.goodsTypeId,
            shopName:obj.params.shopName,
            shopId:obj.params.shopId,
            price:obj.params.price,
            stock:obj.params.stock,
            salenum:obj.params.salenum,
            goodsImg:obj.newPicName,
        }
        if(obj.ok==1){
            db.updateOne(collect,obj.params.id,where[0],function(err,results){
                respon(res,1,{msg:"更新成功",page:obj.params.page})
            })
        }
        else if(obj.ok==3){
            db.findOneByid(collect,obj.params.id,function(err,results){
                fs.unlink("./uppic/"+results[prop], function (err) {
                    if(err){
                        console.log(err);
                    }
                    else{
                        db.updateOne(collect,obj.params.id,where[1],function(err,results){
                            respon(res,1,{msg:"更新成功",page:obj.params.page})
                        })
                    }
                })

            })
        }
        else{
            respon(res,-1,obj.msg)
        }
    })
};