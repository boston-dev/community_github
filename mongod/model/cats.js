const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
//定义模型 确定数据库里表结构
const catsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(v) {
                if(v.length >=1 &&  v.length <=100){
                    return true
                }
                return false
            },
            message: 'title 标题必须为1 - 100 个字符 '
        }
    },
    type:{
        type:Number,
        required: true,
        validate: {
            validator: function(v) {
                if([1,2,3].includes(+v)){
                    return true
                }
                return false
            },
            message: '必填，文章分类=type 1 ,文档分类=type 2,论坛=type 3'
        }
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,ref:'users',
    },//作者
    hidden:{type:Number,default:0},// 0 显示 1 隐藏
    parentId:{type:mongoose.Schema.Types.ObjectId,ref:'cats'},
    date:{type:Number,default:new Date().getTime()},

});
catsSchema.index({ title: -1 });
catsSchema.index({ hidden: -1 });
catsSchema.index({ date: -1 });
catsSchema.index({ user: -1 });
catsSchema.plugin(mongoosePaginate);
//再定义model
const catsModel = mongoose.model('cats',catsSchema);

module.exports = catsModel;

