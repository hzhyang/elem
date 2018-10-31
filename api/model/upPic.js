const formidable = require("formidable");
const fs = require("fs");
/*
* {
*   ok:-1,网络连接错误，1，请选择您要上传的图片  2、请上传正确的图片格式：.jpeg,.gif,.png,.jpg 3、成功
* }*/
module.exports.upPic = function (req, fileName, cb) {
    /*封装
    * 1、需要依赖吗？*/
    var form = new formidable.IncomingForm();
    var upload="./uppic/";
    form.encoding = "utf-8";
    form.uploadDir = upload;
    form.keepExtensions = true;
    form.parse(req, function (err, params, file) {
        // console.log(111,file);
        if (err) {// 报错
            fs.unlink(file[fileName].path, function (err) {
                cb({
                    ok: -1,
                    msg: "网络连接错误"
                })
            })
        }
        else if(!file[fileName]){
            cb({
                ok: 1,
                msg: "请选择您要上传的图片",
                params
            })
        }
        else if (file[fileName].size > 0) {// 上传了图片
            //扩展名
            var keepName = file[fileName].name.substr(file[fileName].name.lastIndexOf("."));
            var keepArr = [".jpeg", ".gif", ".png", ".jpg"];
            //上传的文件是否符合要求
            if (keepArr.includes(keepName)) {
                var newPicName = new Date().getTime() + keepName;

                fs.rename(file[fileName].path, upload + newPicName, function (err) {
                    if (err) {
                        fs.unlink(file[fileName].path, function (err) {
                            cb({
                                ok: -1,
                                msg: "网络连接错误"
                            })
                        })
                    }else {
                        // params.newPicName=;
                        cb({
                            ok: 3,
                            msg: "成功",
                            params,
                            newPicName
                        })
                    }
                })

            } else {
                fs.unlink(file[fileName].path, function (err) {
                    cb({
                        ok: 2,
                        msg: "请上传正确的图片格式：.jpeg,.gif,.png,.jpg"
                    })
                })
            }
        } else {//未上传图片
            fs.unlink(file[fileName].path, function (err) {
                cb({
                    ok: 1,
                    msg: "请选择您要上传的图片",
                    params
                })
            })
        }
    })

}