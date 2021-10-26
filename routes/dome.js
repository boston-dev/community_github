const express = require('express');
const router = express.Router();
const controller = require('../mongod/controller.js');
const config= require('../mongod/config.js');
const { SitemapStream, streamToPromise } = require('sitemap')
const { createGzip } = require('zlib')
const { Readable } = require('stream')

let sitemap
/* GET home page. */
router.get('/', async (req, res, next) => {
    let page=1,arr=req.path.match(/\/page\/[0-9]+/gi);
    if(arr){
        page=arr[0].replace('/page/','')
    }
    let options = {
        limit:28,
        populate: 'cat',
        page,
        sort: { time: -1 }
    };
    let {result}= await controller.init('newsModel','paginate',{},options)
    let linkArr=[]
    for(let i =1;i<=result.totalPages;i++){
        if(i == result.page){
            linkArr.push(i)
        }else{
            linkArr.push(`/page/${i}`)
        }
    }
    Object.assign(result,{linkArr})
    res.render('index', { title: 'Express',docs:result.docs,page:result});
});

router.get('/page/:page', async (req, res, next) => {

    let page=req.params.page || 1

    let options = {
        limit:28,
        populate: 'cat',
        page,
        sort: { time: -1 }
    };
    let {result}= await controller.init('newsModel','paginate',{},options)
    let linkArr=[]
    for(let i =1;i<=result.totalPages;i++){
        if(i == result.page){
            linkArr.push(i)
        }else{
            linkArr.push(`/page/${i}`)
        }
    }
    Object.assign(result,{linkArr})
    res.render('index', { title: 'Express',docs:result.docs,page:result});
});
router.get('/list/:_id/:page', async (req, res, next) => {

    let page=req.params.page || 1,cat=req.params._id;res.locals.catId=cat;

    let options = {
        limit:28,
        populate: 'cat',
        page,
        sort: { time: -1 }
    };
    let {result}= await controller.init('newsModel','paginate',{
        cat
    },options)
    let linkArr=[]
    for(let i =1;i<=result.totalPages;i++){
        if(i == result.page){
            linkArr.push(i)
        }else{
            linkArr.push(`/list/${cat}/page/${i}`)
        }
    }
    Object.assign(result,{linkArr})
    let docs=result.docs
    if(docs.length){
        res.locals.meta={
           
        }
    }

    res.render('index', { docs,page:result});
});
router.get('/detail/:_id/*', async (req, res, next) => {
    let {result}= await controller.init('newsModel','findOne',{_id:req.params._id},{populate:'cat'})
    let data= await controller.init('newsModel','paginate',{
        cat:result.cat._id,
        _id:{$ne:req.params._id}
    },{
        limit:6,
        page:1,
        populate: 'cat',
        sort: { time: -1 }
    })
    res.locals.catId=result.cat._id;
    res.locals.meta={
     
    }
    res.render('d', { docs:result,relate:data.result.docs});
});

module.exports = router;
