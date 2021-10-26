const express = require('express');
const router = express.Router();
const controller = require('../mongod/controller');
const config= require('../mongod/config');
const mongoose = require('mongoose');
let sitemap

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
   let result= await globalController.init('commentsModel','remove',query)
   res.send(result);
});
/* GET home page. */
router.post('/create', async (req, res, next) => {
   const {globalMiddle,globalController,globalConfig}=res.locals
   let {cont,article,replyWho,_id,comments_id}=req.body
   let result={},updateData={cont,article,replyWho,_id,comments_id},user=req.session.user;
   if(cont){
      Object.assign(updateData,globalMiddle.xss({cont}))
   }
   if(!cont && !article ){
      return res.send({
         ...globalConfig.responeTpl,
         msg:'缺少必要参数',
         code:400,
      });
   }
   if(!mongoose.Types.ObjectId.isValid(article)){
      return res.send({
         ...globalConfig.responeTpl,
         msg:'article 类型错误',
         code:400,
      });
   }
   if(!updateData.replyWho){
      delete updateData.replyWho
   }
   if(!globalMiddle.dataType(replyWho,'Undefined') && !mongoose.Types.ObjectId.isValid(replyWho)){
      return res.send({
         ...globalConfig.responeTpl,
         msg:'replyWho 类型错误',
         code:400,
      });
   }
   if(+user.admin !== 1){
      let today= await globalController.init('commentsModel','paginate',
          {
             user:user._id,
             date:{$gte:new Date(new Date().toDateString()).getTime()}
          },
          {
             limit:10,
             page:1,
             sort:{
                date: -1
             }
          },
      )
      if(today.result.totalPages > 1){
         return res.send({
            ...today,
            msg:'今天评论数评论已达到上限',
            code:400,
         });
      }
   }

  updateData.user=user._id
   result= await globalController.init('commentsModel','create',updateData)
   if(result.code !== 200){
      return res.send(result);
   }
   if(updateData.replyWho){
      console.log({article:updateData.article,_id:updateData.comments_id},result.result._id)
      if(!mongoose.Types.ObjectId.isValid(updateData.comments_id)){
         globalController.init('commentsModel','remove',{_id:result.result._id},{$push:{reply:result.result._id}})
         return {
            ...globalConfig.responeTpl,
            msg:'缺少 comments_id 顶级评论 id',
            code:400,
         }
      }
      //  //{$push:{reply:result.result._id}},
      result= await globalController.init(
         'commentsModel',
         'updateOne',
         {article:updateData.article,_id:updateData.comments_id},
         {
            '$push': {reply:result.result._id}
         }
         )
      //    '$push': {
      //       reply:{ $each:[result.result._id],$position: 0}
      //   }
   }
   res.send(result);
});


module.exports = router;
