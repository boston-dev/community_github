const express = require('express');
const router = express.Router();
const middle = require('../middle/index');
const controller = require('../mongod/controller');
const config= require('../mongod/config');
const path = require('path')
const fs = require('fs')
const {responeTpl,uploadFix,secret} = config;
const short = require('short-uuid');
/*  获取用户信息 ,middle.checkLogin */
router.post('/', function(req, res, next) {
  if(req.session.user){
   return  res.send({
      ...responeTpl,
     secret,
      result:req.session.user
    });
  }
  res.send({
    ...responeTpl,
    code:4003,
    secret,
    result:{
      msg:'未登录'
    }
  });
});
/* 注册 */
router.post('/signIn',middle.checkNotLogin,async (req,res) => {
  const {email,password}=req.body
  let userData=middle.xss({email,password})
  if(!(userData.email && userData.password)){
    return res.send({
      ...responeTpl,
      code:400,
      msg:'用户名或密码必填'
    })
   }
  userData.password = middle.md5(userData.password);
  let user= await controller.init('usersModel','findOne',{email:userData.email})
  if(user.result && user.result._id){
   return res.send({
     ...responeTpl,
     code:400,
     msg:'邮箱已被注册'
   })
  }
  let userCreate= await controller.init('usersModel','create',userData)
  if(userCreate.code === 200){
    req.session.user=userCreate.result
    console.log(req.session.user)
  }
  res.send(userCreate)
});
/* 登录 */
router.post('/join',middle.checkNotLogin,async (req,res) =>{
  const {email,password}=req.body
  let userData=middle.xss({email,password})
  userData.password = middle.md5(userData.password);
  let user= await controller.init('usersModel','findOne',userData)
  if(user.result && user.result._id){
    req.session.user=user.result
   return res.send({
     ...responeTpl,
     code:200,
     result:user.result
   })
  }
  res.send({
    ...responeTpl,
    code:400,
    msg:'用户不存在'
  })
});
//退出登录
router.get('/logout',async (req,res) =>{
  req.session.user  = null;
  res.send({
    ...responeTpl,
    code:200,
    msg:'退出成功'
  })
});
//管理员
router.get('/admin',middle.checkLogin,async (req,res) =>{
  let result= await controller.init('usersModel','updateOne',{_id:req.session.user._id},{admin:1})
  req.session.user  = null;
  res.send(Object.assign(result,{
    msg:'开通成功，重新登录拥有权限'
  }))
});
/*上传*/
router.post('/upload',middle.checkLogin, function(req, res, next) {
  let sampleFile;
  let type;
  let date=middle.getCurrDate()
  let uploadPath =path.join(__dirname,`../public/upload/${date}/`) ;
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath);
  }
  if (!req.files || Object.keys(req.files).length === 0) {
    return  res.send({
      ...responeTpl,
      code:400,
      msg:'未选择文件',
    })
  }

  sampleFile = req.files.file;
  type=sampleFile.name.match(/\.[a-z]+$/gi)

  if(!type || !uploadFix.includes(type+'')){
   return  res.send({
      ...responeTpl,
      code:400,
      msg:'该格式不允许上传',
      uploadFix,
      type,
      bool:uploadFix.includes(type)
    })
  }
  let uploadName=short.generate()+type[0]
  sampleFile.mv(uploadPath+uploadName, function(err) {
    if (err){
      res.send({
        ...responeTpl,
        code:400,
        msg:'上传失败'
      })
    }
    //console.log(process.env.NODE_ENV,process.env.PORT)
    let host=`http://localhost:${process.env.PORT}`
    if(process.env.NODE_ENV === 'production'){
      host=``
    }
    res.send({
      ...responeTpl,
      msg:'上传成功',
      result:{
        src:`${host}/upload/${date}/${uploadName}`,
        en:process.env.NODE_ENV
      }
    })
  });
});
module.exports = router;
