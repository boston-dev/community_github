const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
//定义模型 确定数据库里表结构
const newsSchema = new mongoose.Schema({
    title:String,//标题
    cont:String,//内容
    pic:{type:String,default:''},//封面
    head:{type:String,default:''},
    id:{type:Number,default:0},//封面
    hidden:{type:Number,default:0},// 0 显示 1 隐藏
    user:{type:mongoose.Schema.Types.ObjectId,ref:'users'},//作者
    site:{type:String,default:''},
    catalog:{type:mongoose.Schema.Types.ObjectId,ref:'catalogs'},//章节
    cat:{type:mongoose.Schema.Types.ObjectId,ref:'cats'},//所属分类
    book:{type:mongoose.Schema.Types.ObjectId,ref:'books'},//所属分类
    data:{type:String,default:''},
    time:{type:Number,default:Date.now},
    comment:{type:Array,default:[]},
    views:{type:Number,default:0},
    poa: [{type:mongoose.Schema.Types.ObjectId,ref:'naifeiPoa'}]
});
newsSchema.index({ title: -1 });
newsSchema.index({ hidden: -1 });
newsSchema.index({ user: -1 });
newsSchema.index({ data: 1 });
newsSchema.index({ cont: 1 });
newsSchema.plugin(mongoosePaginate);
//再定义model inosmi.ru
const newsModel = mongoose.model('news',newsSchema);

module.exports = newsModel;

