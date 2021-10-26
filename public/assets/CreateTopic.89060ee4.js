var e=Object.defineProperty,t=Object.defineProperties,a=Object.getOwnPropertyDescriptors,r=Object.getOwnPropertySymbols,l=Object.prototype.hasOwnProperty,o=Object.prototype.propertyIsEnumerable,s=(t,a,r)=>a in t?e(t,a,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[a]=r,c=(e,t)=>{for(var a in t||(t={}))l.call(t,a)&&s(e,a,t[a]);if(r)for(var a of r(t))o.call(t,a)&&s(e,a,t[a]);return e};import{m as i,f as d,r as m,o as u,g as n,h as p,w as f,F as h,i as b,j as g}from"./vendor.0935d5ab.js";const F={name:"createTopic",components:{},computed:c(c({},i("appShell",["baseInfo"])),i("topic",["cateList"])),data:()=>({valid:!0,createForm:{cat:"",title:"",cont:"",pic:"",type:2},rules:{cat:[{required:!0,message:"请选择模块",trigger:"change"}],title:[{required:!0,message:"请输入主题标题",trigger:"blur"}],cont:[{required:!0,message:"请输入主题内容",trigger:"change"}]}}),created(){this.fetchTopicCate()},methods:(v=c({},d("topic",["fetchTopicCate","fetchArticlesList","createArticle"])),y={handleUploadImage(e,t,a){console.log(a);let r=new FormData;r.append("file",a[0]),this.$request.post("/users/upload",r).then((e=>{if(200==!e.data.code)return this.$message(e.data.msg),!1;t({url:e.data.result.src})}))},submitForm(e){this.$refs[e].validate((e=>{e&&this.createArticle(this.createForm).then((e=>{200==e.code&&(this.$message.success(e.msg),setTimeout((()=>{this.$router.replace({name:"topicDetail",params:{id:e.result._id}})}),1500))}))}))}},t(v,a(y)))};var v,y;const _={class:"create-topic-wrapper"},O=p("div",{class:"card-header"},[p("span",null,"发布主题")],-1),V=g("发布");F.render=function(e,t,a,r,l,o){const s=m("el-option"),c=m("el-select"),i=m("el-form-item"),d=m("el-input"),g=m("v-md-editor"),F=m("el-button"),v=m("el-form"),y=m("el-card");return u(),n("div",_,[p(y,{class:"box-card"},{header:f((()=>[O])),default:f((()=>[p(v,{model:l.createForm,rules:l.rules,ref:"createForm","label-width":"100px",class:"demo-createForm"},{default:f((()=>[p(i,{label:"选择板块",prop:"cat"},{default:f((()=>[p(c,{modelValue:l.createForm.cat,"onUpdate:modelValue":t[1]||(t[1]=e=>l.createForm.cat=e),placeholder:"请选择模块"},{default:f((()=>[(u(!0),n(h,null,b(e.cateList,((e,t)=>(u(),n(s,{key:t,label:e.title,value:e._id},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])])),_:1}),p(i,{label:"主题标题",prop:"title"},{default:f((()=>[p(d,{modelValue:l.createForm.title,"onUpdate:modelValue":t[2]||(t[2]=e=>l.createForm.title=e)},null,8,["modelValue"])])),_:1}),p(i,{label:"",prop:"cont"},{default:f((()=>[p(g,{"disabled-menus":[],class:"my-4",onUploadImage:o.handleUploadImage,modelValue:l.createForm.cont,"onUpdate:modelValue":t[3]||(t[3]=e=>l.createForm.cont=e),height:"400px"},null,8,["onUploadImage","modelValue"])])),_:1}),p(i,null,{default:f((()=>[p(F,{type:"primary",onClick:t[4]||(t[4]=e=>o.submitForm("createForm"))},{default:f((()=>[V])),_:1})])),_:1})])),_:1},8,["model","rules"])])),_:1})])};export default F;
