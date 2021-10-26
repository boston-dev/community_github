const catsModel = require('./model/cats');
const newsModel = require('./model/news');
const usersModel = require('./model/users');
const articlesModel = require('./model/articles');
const commentsModel = require('./model/comments');
const modelList={catsModel,newsModel,usersModel,articlesModel,commentsModel}
const config= require('./config');
const {responeTpl} = config;
const ways=['find','findOne','paginate','create','updateOne','remove','aggregate']
const errorsMsg=(errors={}) =>{
    let msg=''
    for(let k in errors){
        if(errors[k].properties && errors[k].properties.message){
            if(!msg){
                msg=errors[k].properties.message
            }else{
                msg+=','+errors[k].properties.message
            }
        }
    }
    if(msg){
        return {msg}
    }
    return {}
}
const comCotroller = {

    async init(modelName='',way='',query={},option={}){
        const initModel=this.getModel(modelName);
        if(initModel.code === 400){
            return responeTpl
        }

        if(!ways.includes(way)){
            return {
                ...responeTpl,
                code:400,
                msg:'不存在方法'
            }
        }
        let data={ ...responeTpl,}
        if(way === 'aggregate'){
            data = await this.aggregate(initModel,query,option)
        }
        if(way === 'find'){
            data = await this.find(initModel,query,option)
        }
        if(way === 'paginate'){
            data = await this.paginate(initModel,query,option)
        }
        if(way === 'findOne'){
            data = await this.findOne(initModel,query,option)
        }
        if(way === 'create'){
            data = await this.create(initModel,query,option)
        }
        if(way === 'updateOne'){
            data = await this.updateOne(initModel,query,option)
        }
        if(way === 'remove'){
            data = await this.remove(initModel,query,option)
        }
        return  data
    },
    async remove(model,query,option){
        return new Promise((resolve, reject) => {
            model.remove(query,(e,d) =>{
                if(e){
                    return resolve({
                        ...responeTpl,
                        code:400,
                        msg:'删除失败'
                    })
                }
                resolve({
                    ...responeTpl,
                    result:d,
                    msg:'删除成功'
                })
            })
        })
    },
    async create(model,query,option){
        return new Promise((resolve, reject) => {
             model.create(query,(e,d) =>{
                 if(e){
                     console.log(e)
                     return resolve({
                         ...responeTpl,
                         code:400,
                         msg:'创建失败',
                         ...errorsMsg(e.errors)
                     })
                 }
                 resolve({
                     ...responeTpl,
                     result:d,
                     msg:'创建成功'
                 })
             })
       })
     },
    async findOne(model,query,option){
       return new Promise((resolve, reject) => {
           model.findOne(query)
                .populate('user',{email:1})
                .populate('cat',{title:1,parentId:1})
                .exec(function (e, d) {
                    if(e){
                        return resolve({
                            ...responeTpl,
                            code:400,
                        })
                    }
                    if(!d){
                        return resolve({
                            ...responeTpl,
                            code:400,
                            msg:'没有此条数据'
                        })
                    }
                    resolve({
                        ...responeTpl,
                        result:d
                    })
                });
      })
    },
    async updateOne(model,query,option){
        return new Promise((resolve, reject) => {
            model.updateOne(query,option,(e,d) =>{
                if(e){
                    console.log(e)
                    return resolve({
                        ...responeTpl,
                        code:400,
                    })
                }
                resolve({
                    ...responeTpl,
                    result:d
                })
            })
        })
    },
    async paginate(model,query,option){
        let data =await model.paginate(query,option)
        return {
            ...responeTpl,
            result:data
        }
    },
    getModel(modelName){
        if(modelList[modelName]){
            return modelList[modelName]
        }
        return {
            ...responeTpl,
            code:400,
            msg:'不存在数据'
        }
    },
    async find(model,query,option){
        return new Promise((resolve, reject) => {
            console.log(option)
            model.find(query).populate(option.populate ? option.populate: '')
            .sort(option.sort || {date:1})
            .exec(function(e,d){
                if(e){
                    return resolve({
                        ...responeTpl,
                        code:400,
                    })
                }
                resolve({
                    ...responeTpl,
                    result:d
                })
            })
        })
    },
    async aggregate(model,query,option){
        return new Promise((resolve, reject) => {
            model.aggregate(query).exec(function(e,d){
                if(e){
                    return resolve({
                        ...responeTpl,
                        code:400,
                    })
                }
                resolve({
                    ...responeTpl,
                    result:d
                })
            })
        })
    },
}
module.exports = comCotroller;
