const express = require('express');
const router = express.Router();
const middle = require('../middle/index');
const controller = require('../mongod/controller');
const config= require('../mongod/config');
const mongoose = require('mongoose');
const {responeTpl} = config;
/*  获取所有分类 */
router.get('/',  async (req, res, next) => {
  let result= await controller.init('catsModel','find',{},{populate:'parentId'})
  res.send(result);
});
router.post('/remove',  async (req, res, next) => {
  if(!mongoose.Types.ObjectId.isValid(req.body._id)){
    return res.send({
      ...responeTpl,
      msg:'_id 错误'
    });
  }
  let result= await controller.init('catsModel','remove',{_id:req.body._id})
  res.send(result);
});
/*创建分类*/
router.post('/create',  async (req, res, next) => {
  let {title,parentId,_id,type}=req.body;user=req.session.user;
  if(!title || !type){
    return res.send({
      ...responeTpl,
      msg:'title 必填 或 type 类型必填'
    });
  }
  let params=middle.xss({title,type}),result={};
  params.user=user._id
  if(mongoose.Types.ObjectId.isValid(parentId)){
    params.parentId=parentId
  }
  if(mongoose.Types.ObjectId.isValid(_id)){
    result= await controller.init('catsModel','updateOne',{_id},params)
  }else{
    result= await controller.init('catsModel','create',params)
  }

  res.send(result);
});
module.exports = router;
