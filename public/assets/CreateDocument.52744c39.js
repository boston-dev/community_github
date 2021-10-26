var e=Object.defineProperty,t=Object.defineProperties,a=Object.getOwnPropertyDescriptors,r=Object.getOwnPropertySymbols,s=Object.prototype.hasOwnProperty,l=Object.prototype.propertyIsEnumerable,o=(t,a,r)=>a in t?e(t,a,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[a]=r,i=(e,t)=>{for(var a in t||(t={}))s.call(t,a)&&o(e,a,t[a]);if(r)for(var a of r(t))l.call(t,a)&&o(e,a,t[a]);return e};import{m as c,f as n,r as d,n as u,p as h,o as m,g as p,h as g,w as f,F as y,i as b,t as F,j as w}from"./vendor.fd304484.js";const _={name:"createDocument",computed:i({},c("appShell",["baseInfo"])),data(){return this.resform=()=>({cat:"",title:"",cont:"",pic:"",type:3}),{cateList:[],valid:!0,loading:!1,artList:[],createForm:this.resform(),rules:{cat:[{required:!0,message:"请选择模块",trigger:"change"}],title:[{required:!0,message:"请输入文档标题",trigger:"blur"}],cont:[{required:!0,message:"请输入主题内容",trigger:"change"}]}}},async created(){if(!this.baseInfo._id)return this.$router.push({name:"login",query:{redirect:location.pathname+location.search}}),!1;this.loading=!0,await this.getCate(),this.loading=!1},methods:(v=i({},n("topic",["fetchTopicCate","fetchArticlesList","createArticle","createCate"])),C={async getCate(){this.loading=!0;let e=await this.$request.post("/index/cats",{query:{type:2,user:this.baseInfo._id}}).then((e=>e.data)).catch((e=>e));200===e.code&&(this.cateList=e.result)},async createCate(e){return await this.$request.post("/articles/createCate",e).then((e=>e.data)).catch((e=>e))},open(){this.$prompt("请输入书本名称","提示",{confirmButtonText:"确定",cancelButtonText:"取消"}).then((async({value:e})=>{if(!e)return!1;200==(await this.createCate({title:e,type:2})).code&&(this.loading=!0,await this.getCate(),this.loading=!1)})).catch((()=>{}))},handleUploadImage(e,t,a){console.log(a);let r=new FormData;r.append("file",a[0]),this.$request.post("/users/upload",r).then((e=>{if(200==!e.data.code)return this.$message(e.data.msg),!1;t({url:e.data.result.src})}))},async edt(e){this.loading=!0;let t=await this.$request.post("/index/detail",{query:{_id:e._id}}).then((e=>e.data)).catch((e=>e));200===t.code&&(t.result.cat="string"==typeof t.result.cat?t.result.cat:t.result.cat._id,this.createForm=t.result),this.loading=!1},async change(e){if(!this.createForm.cat&&!e)return!1;this.loading=!0;let t=await this.$request.post("/index//bookArt",{query:{cat:this.createForm.cat||e},options:{sort:{date:-1}}}).then((e=>e.data)).catch((e=>e));200===t.code&&(this.artList=t.result),this.loading=!1},submitForm(e){this.$refs[e].validate((async e=>{if(e){this.loading=!0;let e=this.createForm.cat;await this.createArticle(this.createForm).then((e=>{200==e.code&&(this.$message.success(e.msg),this.createForm=this.resform())})),await this.change(e),this.loading=!1}}))}},t(v,a(C))),mounted(){console.log("mounted",this.$refs.myEditor)}};var v,C;const q={class:"document-wrapper",style:{"max-width":"inherit"}},x=g("div",{class:"card-header"},[g("span",null,"发布文档")],-1),$={class:"text-base font-bold"},O=w("添加书籍"),V=w("发布");_.render=function(e,t,a,r,s,l){const o=d("el-col"),i=d("el-option"),c=d("el-select"),n=d("el-button"),w=d("el-form-item"),_=d("el-input"),v=d("v-md-editor"),C=d("el-form"),j=d("el-row"),k=d("el-card"),I=u("loading");return h((m(),p("div",q,[g(k,{class:"box-card"},{header:f((()=>[x])),default:f((()=>[g(j,{gutter:20},{default:f((()=>[g(o,{span:6},{default:f((()=>[(m(!0),p(y,null,b(s.artList,((e,t)=>(m(),p("div",{class:"item-wrap flex flex-col pa-4",key:e._id+t},[g("div",{class:"content",style:{padding:"4px 0"},onClick:t=>l.edt(e)},[g("strong",$,F(e.title),1)],8,["onClick"])])))),128))])),_:1}),g(o,{span:18},{default:f((()=>[g(C,{model:s.createForm,rules:s.rules,ref:"createForm","label-width":"100px",class:"demo-createForm"},{default:f((()=>[g(w,{label:"选择书名（分类）",prop:"cat"},{default:f((()=>[g(c,{class:"mr-2",onChange:l.change,modelValue:s.createForm.cat,"onUpdate:modelValue":t[1]||(t[1]=e=>s.createForm.cat=e),placeholder:"请选择模块"},{default:f((()=>[(m(!0),p(y,null,b(s.cateList,((e,t)=>(m(),p(i,{key:t,label:e.title,value:e._id},null,8,["label","value"])))),128))])),_:1},8,["onChange","modelValue"]),g(n,{type:"success",onClick:l.open},{default:f((()=>[O])),_:1},8,["onClick"])])),_:1}),g(w,{label:"文档标题",prop:"title",rules:[{required:!0,message:"必填"}]},{default:f((()=>[g(_,{modelValue:s.createForm.title,"onUpdate:modelValue":t[2]||(t[2]=e=>s.createForm.title=e)},null,8,["modelValue"])])),_:1}),g(w,{prop:"cont",rules:[{required:!0,message:"必填"}]},{default:f((()=>[g(v,{"disabled-menus":[],class:"my-4",onUploadImage:l.handleUploadImage,modelValue:s.createForm.cont,"onUpdate:modelValue":t[3]||(t[3]=e=>s.createForm.cont=e),height:"400px"},null,8,["onUploadImage","modelValue"])])),_:1}),g(n,{type:"primary",onClick:t[4]||(t[4]=e=>l.submitForm("createForm"))},{default:f((()=>[V])),_:1})])),_:1},8,["model","rules"])])),_:1})])),_:1})])),_:1})],512)),[[I,s.loading]])};export default _;
