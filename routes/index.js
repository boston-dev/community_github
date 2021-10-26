const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const segmen = require('../mongod/segmentfault');
router.post('/',  async (req, res, next) => {
   const {globalMiddle,globalController,globalConfig}=res.locals
   let {topic,user}=req.body,queryArr=[globalController.init('articlesModel','paginate',topic.query,topic.options)]
   if(user){
      queryArr.push(globalController.init('articlesModel','aggregate',user.query))
   }
   let result=await Promise.all(queryArr)
   let ajaxData={
      ...globalConfig.responeTpl,
      result:{
         topic:{},
      }
   }
   if(user){
      ajaxData.result.user=[]
   }
   for (const [k, v] of result.entries()) {
      if(v.code == 200 && k== 0 ){
       ajaxData.result.topic=v.result
      }else if(v.code == 200 && k== 1 && user){
         let userArr=[]
         v.result.forEach(item =>{
            userArr.push(item._id)
         }) 
        let userResult= await globalController.init('usersModel','find',{_id:{$in:userArr}})
        if(userResult.code == 200){
         ajaxData.result.user=userResult.result
        }
      }
   }
   res.send(ajaxData)
});
router.post('/catGroup',  async (req, res, next) => {
   const {globalMiddle,globalController,globalConfig}=res.locals
   let user=req.session.user,docsArr=[];
   if(!(req.body.catType && req.body.artType)){
      return res.send({
         ...globalConfig.responeTpl,
         code:400,
         msg:'catType artType 参数必须存在'
      })
   }
  let cat= await globalController.init('catsModel','find',{
      type: req.body.catType 
   })
   let $match= { 
      $and: [
        { cat:{$in: cat.result.map(v => v._id)} },
        { type:req.body.artType }
    ]
   };
   // if(!user){
   //    $match.$and.push({ $limit : 5 })
   // }else{
   //    $match.$and.push({ user : user._id })
   // }
   console.log( $match.$and)
   let  ajaxData=await globalController.init('articlesModel','aggregate',[
      { 
         $match
      },
      { $sort : { date : -1 } },
      {
         $group: {
            _id:'$cat',
            docs:{$push: {_id:"$_id",title:'$title'}}
         }
      },
      {
         $project: {
            docs: {$slice: ["$docs", 0, req.body.pageSize||9 ]}
         }
      }
   ])
   if(ajaxData.code === 200){
      let catArr=JSON.parse(JSON.stringify(cat.result))
      docsArr=JSON.parse(JSON.stringify(ajaxData.result))
      catArr.forEach(v =>{
         docsArr.forEach(item =>{
            if(v._id == item._id){
               item.cat=v
            }
         })
      })
   }

   res.send({
      ...globalConfig.responeTpl,
      result:docsArr
   })
});
router.post('/cats',  async (req, res, next) => {
   const {globalMiddle,globalController,globalConfig}=res.locals
   let {query,options}=req.body
   let result= await globalController.init('catsModel','find',query,options || {populate:'parentId'})
   res.send(result);
});
router.post('/bookArt',  async (req, res, next) => {
   const {globalMiddle,globalController,globalConfig}=res.locals
   let {query,options}=req.body
   let result= await globalController.init('articlesModel','find',query,options)
   res.send(result);
});
router.post('/articles',  async (req, res, next) => {
   const {globalMiddle,globalController,globalConfig}=res.locals
   let {query,options}=req.body
   if(!globalMiddle.dataType(query,'Object')){
      return res.send({
         ...globalConfig.responeTpl,
         code:400,
         msg:'缺少筛选条件'
      })
   }
   if(!globalMiddle.dataType(query.cat,'Undefined') && !mongoose.Types.ObjectId.isValid(query.cat)){
     delete query.cat
   }
   if(!globalMiddle.dataType(query.user,'Undefined') && !mongoose.Types.ObjectId.isValid(query.user)){
      delete query.user
   }
   if(!Object.keys(query).length){
      return res.send({
         ...globalConfig.responeTpl,
         code:400,
         msg:'缺少筛选条件'
      })
   }
   console.log(query)
   let result= await globalController
       .init(
           'articlesModel',
           'paginate',
           query,
           globalMiddle.dataType(options,'Object') ? options : {} ,
       )
   res.send(result);
});
router.post('/detail',  async (req, res, next) => {
   const {globalMiddle,globalController,globalConfig}=res.locals
   let {query,options}=req.body
   if(!globalMiddle.dataType(query,'Object')){
      return res.send({
         ...globalConfig.responeTpl,
         code:400,
         msg:'缺少筛选条件'
      })
   }
   if(!mongoose.Types.ObjectId.isValid(query._id)){
      let data= await segmen.detail(`/a/${query._id}`)
     return  res.send({
         ...globalConfig.responeTpl,
         result:data
      })
   }

   let result= await globalController
       .init(
           'articlesModel',
           'findOne',
           query
       )
   res.send(result);
});
router.post('/comments',  async (req, res, next) => {
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
           'commentsModel',
           'paginate',
           query,
           globalMiddle.dataType(options,'Object') ? options : {} ,
       )
   result=JSON.parse(JSON.stringify(result))
   let user=[]
   result.result.docs.forEach((v,k) =>{
      v.reply.forEach(item =>{
         user.push(item.user)
         user.push(item.replyWho)
      })
   })
  let allUser= await globalController.init('usersModel','find',{
      _id:{$in:user}
   })
   allUser=JSON.parse(JSON.stringify(allUser))
   result.result.docs.forEach((v,k) =>{
      if(v.reply.length){
         v.reply.forEach(list =>{
            allUser.result.forEach(item =>{
               if(list.user == item._id+''){
                  list.user=item
               }
               if(list.replyWho == item._id+''){
                  list.replyWho=item
               }
            })
         })
         
      }
   })
   res.send(result);
});
router.get('/segmtn-detail/:id',  async (req, res, next) => {
  let data= await segmen.detail(`/a/${req.params.id}`)
   res.send(data)
});
router.get('/segmtn-list/*',  async (req, res, next) => {
   let data= await segmen.list(req.url.replace('/segmtn-list',''))
   const {globalMiddle,globalController,globalConfig}=res.locals
   res.send({
      ...globalConfig.responeTpl,
      result:data
   })
});
module.exports = router;
