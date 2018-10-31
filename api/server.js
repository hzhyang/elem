const express =require("express");
const app = express();
const bodyparser = require("body-parser");
const router = require("./model/router");

app.use(bodyparser.json());
app.use(express.static("./uppic"));
app.use(bodyparser.urlencoded({
    extended:false
}));
app.all("*",function(req,res,next){
   res.header("Access-Control-Allow-Origin","*");
   res.header("Access-Control-Allow-Methods","PUT,GET,POST,OPTIONS,DELETE");
   res.header("Access-Control-Allow-Headers","content-type");
   next();
});
app.post("/adminlogin",router.adminlogin);
app.get("/adminLogList",router.adminLogList);
app.post("/delAdminLog",router.delAdminLog);
app.post("/addAdmin",router.addAdmin);
app.get("/adminList",router.adminList);
app.post("/admindel",router.admindel);
app.get("/adminsearch",router.adminsearch);
app.post("/updateAdmin",router.updateAdmin);
//店铺类型接口
app.post("/shopTypeAdd",router.shopTypeadd);
app.get("/getshopType",router.getshopType);
app.post("/delshopType",router.delshopType);
app.get("/searchshopType",router.searchshopType);
app.post("/shopTypechage",router.shopTypechage);
app.post("/addshop",router.addshop);
//店铺接口
app.get("/getshops",router.getshops);
app.post("/delshops",router.delshops);
app.get("/getshoptypes",router.getshoptypes);
app.get("/searchshops",router.searchshops);
app.post("/updateshops",router.updateshops);
app.post("/addgoodstype",router.addgoodstype);
//商品
app.get("/getgoodstype",router.getgoodstype);
app.post("/delgoodstype",router.delgoodstype);
app.get("/getshopsname",router.getshopsname);
app.get("/searchgoodstype",router.searchgoodstype);
app.post("/updategoodstype",router.updategoodstype);
app.post("/addgoods",router.addgoods);
app.get("/getgoodslist",router.getgoodslist);
app.post("/delgoods",router.delgoods);
app.get("/searchgoods",router.searchgoods);
app.get("/getshopnames",router.getshopnames);
app.get("/getgoodstypes",router.getgoodstypes);
app.post("/updategoods",router.updategoods);
//前端接口
app.get("/getShopTypeList",router.getShopTypeList);
app.post("/addadv",router.addadv);
app.get("/getadvs",router.getadvs);
app.post("/deladv",router.deladv);
app.get("/getadv",router.getadv)

app.get("/getcode",router.getcode);
app.post('/userlogin',router.userlogin);
app.get("/getinfo",router.getinfo)
app.listen(80,function(){
    console.log("success");
});