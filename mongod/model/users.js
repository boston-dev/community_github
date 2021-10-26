const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
//定义模型 确定数据库里表结构
const usersSchema = new mongoose.Schema({
    email:{type:String,default:''},
    password:{type:String,default:''},
    token:{type:String,default:''},
    admin:{type:Number,default:0}, //0 普通用户 1 管理员
    hidden:{type:Number,default:0},// 0 显示 1 已经拉黑
});
usersSchema.index({ email: -1 });

usersSchema.plugin(mongoosePaginate);
//再定义model inosmi.ru
const usersModel = mongoose.model('users',usersSchema);

module.exports = usersModel;

