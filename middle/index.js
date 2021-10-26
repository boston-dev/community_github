const controller = require('../mongod/controller');
const config = require('../mongod/config');
const crypto = require('crypto');
const xss = require("xss");
const {responeTpl}=config
const middle = {
    async initData (req,res,next) {
        res.locals.meta={
         
        }
        next();
    },
    async checkAdmin (req,res,next){
        if(req.session.user && req.session.user.admin === 1){
            next();
        }else{
            res.send({
                ...responeTpl,
                code:400,
                msg:'没有权限'
            })
        }
    },
    async checkLogin (req,res,next){
        if(req.session.user){
            const {globalMiddle,globalController,globalConfig}=res.locals
            let result= await globalController.init('usersModel','findOne',{
                _id:req.session.user._id
            })
            if(result.code !== 200){
                return res.send(result);
            }
            //result.result.hidden=1
            if(+result.result.hidden === 1){
                return  res.send({
                    ...globalConfig.responeTpl,
                    code:400,
                    msg:'该账户已经被拉黑'
                });
            }
            next();
        }else{
            res.send({
                ...responeTpl,
                code:301,
                msg:'请先登录'
            })
        }
    },
    checkNotLogin (req,res,next){
        //要求下面的路由必须未登录后才能访问
        if(req.session.user){
            res.send({
                ...responeTpl,
                code:400,
                msg:'已经登录'
            })
        }else{
            next();
        }
    },
    replaceNull (str='',d='lr'){
        if(typeof str !== "string"){
            return  str
        }
        if(d =='lr' ){
            //去除两头空格:
          return   str.replace(/\s+/g,"")
        }
        if(d =='l' ){
            //去除左空格
            return str.replace(/^\s+|\s+$/g,"");
        }
        if(d =='l' ){
            //去除右空格
            return str.str.replace( /^\s/, '');
        }
        if(d =='all' ){
            //去除所有空格
            return str.replace(/(\s$)/g, "");
        }
    },
    xss (obj={},list=[]){
        for(let k in obj){
            if(list.includes(k)){
                obj[k]= xss(obj[k])
            }else{
                obj[k]= xss(this.replaceNull(obj[k]))
            }
            
        }
        return obj
    },
    md5 (str){
        return  crypto.createHash('md5')
            .update(str).digest('hex');//hex十六进制
    },
    dataType(d,type){
       //type=String Number Boolean Undefined Null Object Function Array Date RegExp
       console.log(Object.prototype.toString.call(d) , `[object ${type}]`)
        return  Object.prototype.toString.call(d) === `[object ${type}]`
    },
    getCurrDate() {
        let date = new Date();
        let sep = "-";
        let year = date.getFullYear(); //获取完整的年份(4位)
        let month = date.getMonth() + 1; //获取当前月份(0-11,0代表1月)
        let day = date.getDate(); //获取当前日
        if (month <= 9) {
            month = "0" + month;
        }
        if (day <= 9) {
            day = "0" + day;
        }
        let currentdate = year + sep + month + sep + day;
        return currentdate;
    },
}
module.exports=middle
