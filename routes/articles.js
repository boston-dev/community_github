const express = require('express');
const router = express.Router();
const middle = require('../middle/index');
const controller = require('../mongod/controller');
const config= require('../mongod/config');
const mongoose = require('mongoose');
const {responeTpl} = config;
/* 获取当前用户数据 文章或帖子 */
router.post('/',  async (req, res, next) => {
  //{query,options,page } 传过来的数据 query查询条件 options 分页排序等配置
  // let options = {
  //   limit:48,
  //   page: req.body.page || 1,
  //   sort: { date: -1 },
  // };
  // let query  = {type:1,2};
  const {globalMiddle,globalController,globalConfig}=res.locals
  let {query,options}=req.body
  if(!globalMiddle.dataType(query,'Object')){
    return {
      ...globalConfig.responeTpl,
      code:400,
      msg:'缺少筛选条件'
    }
  }
  let result= await globalController
      .init(
          'articlesModel',
          'paginate',
          Object.assign(query,{user:req.session.user._id}),
          globalMiddle.dataType(options,'Object') ? options : {} ,
      )
  res.send(result);
});
router.post('/remove',  async (req, res, next) => {
  const {globalMiddle,globalController,globalConfig}=res.locals
  if(!mongoose.Types.ObjectId.isValid(req.body._id)){
    return res.send({
      ...responeTpl,
      msg:'_id 错误',
      code:400,
    });
  }

  let query={_id:req.body._id,user:req.session.user._id}
  if(req.session.user.admin === 1){
    delete query.user
  }
  let result= await globalController.init('articlesModel','remove',query)
  res.send(result);
});
/*创建分类*/
router.post('/create',  async (req, res, next) => {
  const {globalMiddle,globalController,globalConfig}=res.locals
  let {title,cont,pic,cat,_id,type}=req.body,
   params=middle.xss({title,cont,pic,cat,_id,type},['cont']),

   result={},
   user={user:req.session.user._id},
   updateData={};
  for(let key in params){
    if(!globalMiddle.dataType(params[key],'Undefined') && key !== '_id'){
      updateData[key]=params[key]
    }
  }
  if(mongoose.Types.ObjectId.isValid(params._id)){
    let updateQuery={_id:params._id,...user}

    if(user.admin === 1){
      delete updateQuery.user
    }
    console.log(updateQuery,updateData)
    if(Object.keys(updateData).length){
      result= await globalController.init('articlesModel','updateOne',updateQuery,updateData)
    }
   return  res.send({
      ...globalConfig.responeTpl,
      ...result
    })
  }
  if(!mongoose.Types.ObjectId.isValid(updateData.cat) || !updateData.title || !updateData.cont || !updateData.type){
    return res.send({
      ...responeTpl,
      msg:'分类、标题、内容、类型必填',
      code:400,
    });
  }
  if(+req.session.user.admin !== 1){
    let today= await globalController.init('articlesModel','paginate',
        {
          user:req.session.user._id,
          date:{$gte:new Date(new Date().toDateString()).getTime()}
        },
        {
          limit:60,
          page:1,
          sort:{
            date: -1
          }
        },
    )
    if(today.result.totalPages > 1){
      return res.send({
        ...today,
        msg:'今天发表的内容已达到上限',
        code:400,
      });
    }
  }
  result= await globalController.init('articlesModel','create',Object.assign(updateData,user))
  res.send(result);
});
router.post('/createCate',  async (req, res, next) => {
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
