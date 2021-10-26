const Crawler = require("crawler");
const fs=require("fs");
const nav=require("./gateway.json");
//https://segmentfault.com/channel/frontend
// &offset=1618994471000&size=90000&mode=scrollLoad
const path = require('path');
const host='https://gateway.segmentfault.com'
const webHost='https://segmentfault.com'
const pup = new Crawler({
    maxConnections : 30000,
    retries:2,
    retryTimeout:600,
    // This will be called for each crawled page
    callback : function (error, res, done) {
        if(error){
            console.log(error);
        }else{
            let $ = res.$
            console.log($('title').text())
        }
        done();
    }
});
const segmen={
    async list (uri=host){
        let list={docs:[],meta:{},nav,size:30,offset:null},_this=this;
        console.log(uri.indexOf('.com') > -1 ? uri : host+uri,'list')
        return  new Promise((resolve, reject) => {
            pup.queue([{
                uri:uri.indexOf('.com') > -1 ? uri : host+uri,
                jQuery:false,
                callback: function (error, res, done) {
                    if(error){
                        console.log(error);
                    }else{
                       // let $ = res.$
                        /*$('#leftNav a').each(function(){
                           list.nav.push({
                               title:$(this).text(),
                               query:$(this).attr('data-rb-event-key')
                           })
                        }) 
                        $('html').html().match(/window\.g_initialProps.+\}\}\}\;/gi) 
                        if($('html').html().match(/window\.g_initialProps.+\}\}\}\;/gi)){
                           let window={}
                           eval($('html').html().match(/window\.g_initialProps.+\}\}\}\;/gi)[0])
                          // fs.writeFileSync('write.json',JSON.stringify(window.g_initialProps));
                            list.nav=window.g_initialProps.blogs.channels.rows
                            list.docs=window.g_initialProps.blogs.articles.rows
                            list.offset=window.g_initialProps.blogs.articles.offset
                        }*/
                        let result=JSON.parse(res.body.toString())
                        list.docs=result.rows
                        delete result.rows
                        Object.assign(list,result)
                    }
                    done();
                    resolve(list)
                }
            }]);
        })
    },
    async muchImg(linkArr){
        let pic=[]
        var c = new Crawler({
            encoding:null,
            timeout:4000,
            jQuery:false,// set false to suppress warning message.
            callback:function(err, res, done){
                if(err){
                    console.error(err.stack,123);
                }else{
                    let upload= path.join(__dirname,`../public/upload/`) ;
                    fs.createWriteStream(`${upload}/${res.options.filename}`).write(res.body);
                    let host=''
                    if(process.env.NODE_ENV === 'development'){
                        host=`http://localhost:${process.env.PORT}`
                    }
                    pic.push({
                        uri:res.options.uri,
                        img:`${host}/upload/${res.options.filename}`
                    })
                }
                done();
            }
        });
        c.queue(linkArr);
        return new Promise((resolve, reject) => {
            c.on('drain', () => {
                resolve(pic)
            });
        })
    },
    async detail (uri=webHost){
        let list={docs:{},meta:{},nav},_this=this;
        console.log(uri.indexOf('.com') > -1 ? uri : webHost+uri,'list')
        return  new Promise((resolve, reject) => {
            pup.queue([{
                uri:uri.indexOf('.com') > -1 ? uri : webHost+uri,
                jQuery:{
                    name: 'cheerio',
                    options: {
                        decodeEntities: false,
                    }
                },
                callback: async (error, res, done) => {
                    if(error){
                        console.log(error);
                    }else{
                       let $ = res.$,linkArr=[],pic=[];
                        $('script').remove()

                        $('.card-body > .article-content img').each(function () {
                            linkArr.push({
                                uri:$(this).attr('data-src').indexOf('.com') > -1 ? $(this).attr('data-src') : webHost+$(this).attr('data-src'),
                                filename:$(this).attr('data-src').replace(/^.+\/|\?[^\.]+/gi,'')+'.jpg'
                            })
                        })
                        // if(linkArr.length){
                        //     pic=  await _this.muchImg(linkArr)
                        // }
                       
                        $('.card-body > .article-content img').each(function () {
                            pic.forEach(v =>{
                                if(v.uri.replace(webHost,'') == $(this).attr('data-src')){
                                    $(this).attr({
                                        'data-src':v.img,
                                        src:v.img,
                                    })
                                }
                            })
                        })
                       let $userDome=$('[href^="/u/"]') 
                       Object.assign(list,{
                           cont:`<article class="article fmt article-content">${$('.card-body > .article-content').html()}</article>`,
                           title:$('[href="'+uri+'"]').text(),
                           date:$userDome.closest('div').find('time').text(),
                           user:{
                            name:$userDome.find('strong').text(),
                           },
                       })
                    }
                    done();
                    resolve(list)
                }
            }]);
        })
    },
}
//&offset=1618994471000&size=90000&mode=scrollLoad
//segmen.list('/articles?query=channel&slug=frontend')
//segmen.detail('/a/1190000040050182')
module.exports = segmen;