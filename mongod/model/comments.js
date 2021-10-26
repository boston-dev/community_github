const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
//定义模型 确定数据库里表结构
const commentsSchema = new mongoose.Schema({
    cont:{
        type:String,
        required: true,
        validate: {
            validator: function(v) {
                if(v.length >=1 &&  v.length <=100){
                    return true
                }
                return false
            },
            message: '评论必须为1 - 100 个字符 '
        }
    },//内容
    article:{
        type:mongoose.Schema.Types.ObjectId,ref:'articles',
        required: true,
    },// 文章 id
    date:{type:Number,default:Date.now},
    user:{
        type:mongoose.Schema.Types.ObjectId,ref:'users',
        required: true,
    },//作者
    hidden:{type:Number,default:0},// 0 显示 1 隐藏
    //文章回复相关评论
    reply:[{type:mongoose.Schema.Types.ObjectId,ref:'comments'}],
    //replyWho 不存在则为评论，存在则为回复
    replyWho:{
        type:mongoose.Schema.Types.ObjectId,ref:'users',
    },
});

commentsSchema.index({ date: -1 });
commentsSchema.index({ replyWho: -1 });
commentsSchema.index({ user: -1 });
commentsSchema.index({ article: -1 });
commentsSchema.plugin(mongoosePaginate);
//再定义model
const booksModel = mongoose.model('comments',commentsSchema);

module.exports = booksModel;
