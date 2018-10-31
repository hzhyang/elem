const db = require("./db");
const help = require("./help");
const md5 = require("md5");
const mongo = require("mongodb");
const {upPic} = require("./upPic");
const fs = require("fs");
const jwt = require("jwt-simple");
const sign = "iloveyou";
let random = function () {
    var code = "";
    for (var i = 0; i < 6; i++) {
        code += Math.round(Math.random() * 9);
    }
    return code;
};
module.exports.adminlogin = function (req, res) {
    const salt = "hzynb";//盐料
    var passwd = req.body.adminPass;
    passwd = md5(passwd + salt);
    // console.log(passwd);
    var obj = {
        where: {
            adminName: req.body.adminName,
            adminPass: passwd
        }
    };
    db.findOne("admin", obj, function (err, adminreslut) {
        if (err) {
            help.respon(res)
        }
        else {
            if (adminreslut) {
                db.insertOne("adminLoginLog", { //写入登录记录
                    admin_id: adminreslut._id,
                    adminName: adminreslut.adminName,
                    lastLoginTime: Date.now()
                }, function (err, results) {
                    if (err) {
                        help.result(res);
                    }
                    else {
                        help.respon(res, 1, {
                            admin_id: adminreslut._id,
                            adminName: adminreslut.adminName
                        });

                    }
                })
            }
            else {
                help.respon(res, -1, "用户或密码不正确")
            }
        }
    })
};//登录验证
module.exports.adminLogList = function (req, res) {
    help.getpagedata(req, res, "adminLoginLog", 8)
};//获得日志
module.exports.delAdminLog = function (req, res) {
    var id = req.body.id;
    var page = req.body.page;
    db.deleteOne("adminLoginLog", id, function (err, results) {
        if (err) {
            help.respon(res);
        }
        else {
            help.respon(res, 1, {msg: "删除成功", page})
        }
    })
}; //删除日志
module.exports.addAdmin = function (req, res) {
    db.find("admin", {where: {adminName: req.body.adminName}}, function (err, results) {
        if (results.length > 0) {
            help.respon(res, -1, "用户名已存在")
        }
        else {
            const salt = "hzynb";//盐料
            var passwd = req.body.adminPass;
            console.log(passwd, 1);
            passwd = md5(passwd + salt);
            db.insertOne('admin', {adminName: req.body.adminName, adminPass: passwd}, function (err, results) {
                help.respon(res, 1, "添加成功");
            })
        }
    })
}; //添加数据
module.exports.adminList = function (req, res) {
    help.getpagedata(req, res, "admin", 5) //获取并分页
};
module.exports.admindel = function (req, res) {
    help.deldata(req, res, "admin") //删除 通过id
};
module.exports.adminsearch = function (req, res) { //搜索search
    var pageNum = 5;
    var page = req.query.page / 1;
    var obj = {};
    if (req.query.keyword) {
        var keyword = "/" + req.query.keyword + "/";
        obj = {adminName: eval(keyword)}
    }
    db.count("admin", obj, function (count) {
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
        db.find("admin", search, function (err, results) {
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
module.exports.updateAdmin = function (req, res) {    //修改管理员
    //查询id 更新
    db.findOneByid("admin", req.body.id, function (err, results) {
        if (results) {
            if (req.body.data) {
                const salt = "hzynb";//盐料
                var passwd = req.body.data.adminOldPass;
                passwd = md5(passwd + salt);
                db.findOne("admin", {
                    where: {
                        _id: mongo.ObjectId(req.body.id),
                        adminPass: passwd
                    }
                }, function (err, results) {
                    console.log(results);
                    if (results) {
                        var passwd = req.body.data.adminPass;
                        passwd = md5(passwd + salt);
                        var obj = {
                            adminName: req.body.data.adminName,
                            adminPass: passwd
                        };

                        db.updateOne("admin", req.body.id, obj, function (err, results) {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                help.respon(res, 2, {msg: "更新成功", page: req.body.page})
                            }

                        })
                    }
                    else {
                        help.respon(res, -1, "原密码不正确")
                    }
                });

            }
            else {
                help.respon(res, 1, results);
            }

        }
        else {
            help.respon(res, -1, '信息不存在')
        }
    })
};

//店铺&&店铺类型的接口

module.exports.shopTypeadd = function (req, res) { //商铺类型添加
    upPic(req, 'shopTypePic', function (obj) {
        if (obj.ok == 1) {
            help.respon(res, -1, "请上传图片")
        }
        else if (obj.ok == 3) {
            db.findOne("shopType", {where: {shopType: obj.params.shopTypeName}}, function (err, results) {
                if (results) {
                    fs.unlink("./uppic/" + obj.newPicName, function (err) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            help.respon(res, -1, "类型已存在")
                        }
                    });

                }
                else {
                    db.insertOne("shopType", {
                        shopType: obj.params.shopTypeName,
                        typeImg: obj.newPicName,
                        addTime: Date.now(),
                    }, function (err, results) {
                        help.respon(res, 1, "添加成功")
                    })
                }
            })
        }
        else {
            help.respon(res, -1, obj.msg)
        }
    })
};
module.exports.getshopType = function (req, res) { //获取商铺类型
    help.getpagedata(req, res, "shopType", 5)
};
module.exports.delshopType = function (req, res) {
    help.deldata(req, res, "shopType");
}; //删除
module.exports.searchshopType = function (req, res) {
    help.searchdata(req, res, "shopType", 'shopType', 5)
}; //搜索
module.exports.shopTypechage = function (req, res) {
    upPic(req, 'shopTypePic', function (obj) {
        if (obj.ok == 1) {
            var chagename = obj.params.shopTypeName;
            var id = obj.params.id;
            db.updateOne("shopType", id, {shopType: chagename}, function (err, results) {
                help.respon(res, 1, "更新成功")
            })
        }
        else if (obj.ok == 3) {
            db.findOneByid('shopType', obj.params.id, function (err, results) {
                fs.unlink("./uppic/" + results.typeImg, function (err) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        db.updateOne('shopType', obj.params.id, {
                            shopType: obj.params.shopTypeName,
                            typeImg: obj.newPicName,
                            addTime: Date.now()
                        }, function (err, results) {
                            help.respon(res, 1, "更新成功")
                        })
                    }
                })

            })
        }
        else {
            help.respon(res, -1, obj.msg)
        }
    })
}; //修改
module.exports.addshop = function (req, res) {        //添加店铺
    upPic(req, "shopImg", function (obj) {
        if (obj.ok == 1) {
            help.respon(res, -1, '请上传图片')
        }
        else if (obj.ok == 3) {
            db.findOne("shops", {where: {shopName: obj.params.shopName}}, function (err, results) {
                if (results) {
                    fs.unlink("./uppic/" + obj.newPicName, function (err) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            help.respon(res, -1, "店铺名称已存在")
                        }
                    });

                }
                else {
                    db.insertOne("shops", {
                        shopTypeId: obj.params.shopTypeId,
                        shopTypeName: obj.params.shopTypeName,
                        shopName: obj.params.shopName,
                        starLevel: obj.params.starLevel,
                        sendPrice: obj.params.sendPrice,
                        isSale: obj.params.isSale,
                        shopImg: obj.newPicName,
                        saleNum: 0,
                        addTime: Date.now(),
                    }, function (err, results) {
                        help.respon(res, 1, "添加成功")
                    })
                }
            })
        }
        else {
            help.respon(res, -1, obj.msg)
        }
    })
};
module.exports.getshops = function (req, res) {
    help.getpagedata(req, res, 'shops', 5) //获取并分页
};
module.exports.delshops = function (req, res) { //删除
    help.deldata(req, res, "shops")
};
module.exports.getshoptypes = function (req, res) { //获取所有店铺类型
    db.find('shopType', {}, function (err, Typelist) {
        help.respon(res, 1, Typelist)
    })
};
module.exports.searchshops = function (req, res) {
    help.searchdata(req, res, 'shops', "shopName", 5)
};
module.exports.updateshops = function (req, res) {

    help.updata(req, res, 'shopImg', 'shops', "shopImg")
};
module.exports.addgoodstype = function (req, res) {
    upPic(req, "goodstypeImg", function (obj) {
        // console.log(obj);
        if (obj.ok == 1) {
            help.respon(res, -1, '请上传图片')
        }
        else if (obj.ok == 3) {
            db.findOne("goodstype", {
                where: {
                    goodstype: obj.params.goodstype,
                    shopid: obj.params.shopid
                }
            }, function (err, results) {
                console.log(results);
                if (results) {
                    fs.unlink("./uppic/" + obj.newPicName, function (err) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            help.respon(res, -1, "类型已存在")
                        }
                    });

                }
                else {
                    // console.log(obj.params.goodstype);
                    db.insertOne("goodstype", {
                        goodstype: obj.params.goodstype,
                        goodstypeImg: obj.newPicName,
                        shopid: obj.params.shopid,
                        shopname: obj.params.shopName
                    }, function (err, results) {
                        help.respon(res, 1, "添加成功")
                    })
                }
            })
        }
        else {
            help.respon(res, -1, obj.msg)
        }
    })
};
//商品和类别接口
module.exports.getgoodstype = function (req, res) {
    help.getpagedata(req, res, "goodstype", 5)
};
module.exports.delgoodstype = function (req, res) {
    help.deldata(req, res, 'goodstype');
};
module.exports.getshopsname = function (req, res) {
    db.find('shops', {}, function (err, Typelist) {
        help.respon(res, 1, Typelist)
    })
};
module.exports.searchgoodstype = function (req, res) {
    help.searchdata(req, res, 'goodstype', "goodstype", 5)
};
module.exports.updategoodstype = function (req, res) {
    help.updata1(req, res, 'goodstypeImg', 'goodstype', 'goodstypeImg')
};
module.exports.addgoods = function (req, res) {
    upPic(req, "goodsImg", function (obj) {
        if (obj.ok == 1) {
            help.respon(res, -1, '请上传图片')
        }
        else if (obj.ok == 3) {
            db.findOne("goods", {
                where: {
                    goodsName: obj.params.goodsName,
                    goodsTypeId: obj.params.goodsTypeId,
                    shopId: obj.params.shopId
                }
            }, function (err, results) {
                console.log(results);
                if (results) {
                    fs.unlink("./uppic/" + obj.newPicName, function (err) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            help.respon(res, -1, "商品已存在")
                        }
                    });

                }
                else {
                    // console.log(obj.params.goodstype);
                    db.insertOne("goods", {
                        goodsName: obj.params.goodsName,
                        goodsType: obj.params.goodsType,
                        goodsTypeId: obj.params.goodsTypeId,
                        shopName: obj.params.shopName,
                        shopId: obj.params.shopId,
                        price: obj.params.price,
                        stock: obj.params.stock,
                        salenum: obj.params.salenum,
                        goodsImg: obj.newPicName,
                    }, function (err, results) {
                        help.respon(res, 1, "添加成功")
                    })
                }
            })
        }
        else {
            help.respon(res, -1, obj.msg)
        }
    })
};
module.exports.getgoodslist = function (req, res) {
    help.getpagedata(req, res, 'goods', 5)
}
module.exports.delgoods = function (req, res) {
    help.deldata(req, res, 'goods');
};
module.exports.searchgoods = function (req, res) {
    help.searchdata(req, res, 'goods', "goodsName", 5)
};
module.exports.getshopnames = function (req, res) {
    db.find("shops", {}, function (err, data) {
        help.respon(res, 1, data)
    })
};
module.exports.getgoodstypes = function (req, res) {
    db.find("goodstype", {
        where: {
            shopid: req.query.shopid
        }
    }, function (err, data) {
        help.respon(res, 1, data)
    })
}
module.exports.updategoods = function (req, res) {
    help.updata2(req, res, 'goodsImg', 'goods', "goodsImg")
}
//前端接口
module.exports.getShopTypeList = function (req, res) {
    help.getpagedata(req, res, "shopType", 10)
};
module.exports.addadv = function (req, res) {
    upPic(req, "img", function (obj) {
        // console.log(obj);
        if (obj.ok == 1) {
            help.respon(res, -1, '请上传图片')
        }
        else if (obj.ok == 3) {

            // console.log(obj.params.goodstype);
            db.insertOne("advs", {
                name: obj.params.name,
                type: obj.params.type,
                stitle: obj.params.stitle,
                title: obj.params.title,
                text: obj.params.text,
                img: obj.newPicName
            }, function (err, results) {
                help.respon(res, 1, "添加成功")
            })
        }


        else {
            help.respon(res, -1, obj.msg)
        }
    })
}
module.exports.getadvs = function (req, res) {
    help.getpagedata(req, res, 'advs', 10)
}
module.exports.deladv = function (req, res) {
    help.deldata(req, res, 'advs')
}
module.exports.getadv = function (req, res) {
    db.find('advs', {
        where: {type: req.query.type},
        limit: req.query.num / 1
    }, function (err, results) {
        console.log(results);
        help.respon(res, 1, {type: req.query.type, results})
    })
}
module.exports.getcode = function (req, res) {
    db.find('checkcode', {
        where: {
            phoneid: req.query.phone
        }
    }, function (err, data) {
        if (data.length > 0) {
            var flag = false;
            var index = '';
            for (var i = 0; i < data.length; i++) {
                if (data[i].life > Date.now()) {
                    flag = true;
                    index = i;
                    break;
                }
            }
            if (!flag) {
                var code = random();
                db.insertOne('checkcode', {
                    phoneid: req.query.phone,
                    checkcode: code,
                    life: Date.now() + 3000 * 1000
                }, function (err, data) {
                    help.respon(res, 1, code)
                })
            }
            else {
                help.respon(res, 1, data[index].checkcode)
            }
        }
        else {
            var code = random();
            db.insertOne('checkcode', {
                phoneid: req.query.phone,
                checkcode: code,
                life: Date.now() + 300 * 1000
            }, function (err, data) {
                help.respon(res, 1, code)
            })
        }
    })
};
module.exports.userlogin = function (req, res) {
    var userdata='';
    db.find('checkcode', {
        where: {phoneid: req.body.phone, checkcode: req.body.code}
    }, function (err, results) {
        if (results.length > 0) {
            if (results[0].life > Date.now()) {
                db.findOne("userlist", {where: {user: req.body.phone}}, function (err, results) {
                    if (!results) {
                        db.insertOne('userlist', {
                            user: req.body.phone,
                            money:1000,
                            gold:100,
                            red_packet:10,
                        }, function (err, data) {
                            db.findOne('userlist', {where: {user: req.body.phone}}, function (err, data) {
                                userdata = data;
                                var userid=userdata._id;
                                var token = jwt.encode({
                                    userid,
                                    phoneid: req.body.phone,
                                    life: Date.now() + 30 * 60 * 1000,
                                }, sign);
                                help.respon(res,1,{userid,token})
                            })
                        })
                    }
                    else{
                        userdata=results
                        var userid=userdata._id;
                        console.log(userid);
                        var token = jwt.encode({
                            userid,
                            phoneid: req.body.phone,
                            life: Date.now() + 30 * 60 * 1000,
                        }, sign);
                        help.respon(res,1,{userid,token})
                    }
                });

            }
            else {
                help.respon(res, -1, '验证码过期')
            }
        }
        else{
            help.respon(res,-1,'手机号或验证码错误')
        }
    })
}
module.exports.getinfo=function(req,res){
    var token=req.query.authorization;
    var data=jwt.decode(token,sign);
    console.log(data);
    if(data.life>Date.now()){
        db.findOneByid('userlist',data.userid,function(err,results){
            help.respon(res,1,results)
        })
    }
    else{
        help.respon(res,-1,'token过期')
    }
}