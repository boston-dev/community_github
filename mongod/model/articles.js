const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
//定义模型 确定数据库里表结构
const articlesSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true,
    },//标题
    cont:{
        type:String,
        required: true,
    },//内容
    pic:{type:String,default:''},//封面
    hidden:{type:Number,default:0},// 0 显示 1 隐藏
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
            message: '文章类型必须明确 type 1 文章,type 2帖子,type 3 文档'
        }
    },//类型 1文章 2 帖子
    user:{
        type:mongoose.Schema.Types.ObjectId,ref:'users',
    },//作者
    cat:{
        type:mongoose.Schema.Types.ObjectId,ref:'cats',
        required: true,
    },//所属分类
    date:{type:Number,default:Date.now},
});
articlesSchema.index({ title: -1 });
articlesSchema.index({ hidden: -1 });
articlesSchema.index({ user: -1 });
articlesSchema.index({ cat: -1 });
articlesSchema.index({ date: -1 });
articlesSchema.plugin(mongoosePaginate);
//再定义model
const articlesModel = mongoose.model('articles',articlesSchema);

module.exports = articlesModel;

