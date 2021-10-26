var e=Object.defineProperty,t=Object.defineProperties,a=Object.getOwnPropertyDescriptors,o=Object.getOwnPropertySymbols,s=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable,i=(t,a,o)=>a in t?e(t,a,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[a]=o,c=(e,t)=>{for(var a in t||(t={}))s.call(t,a)&&i(e,a,t[a]);if(o)for(var a of o(t))n.call(t,a)&&i(e,a,t[a]);return e},r=(e,o)=>t(e,a(o));import{c as l,a as m,D as d,b as p,C as u,P as h,d as _,e as g,m as f,f as E,r as T,o as C,g as w,w as I,h as y,F as O,i as D,j as b,t as S,K as A,V as v,v as P,k as F,l as L,I as x}from"./vendor.fd304484.js";const R="production";var j=c({env:R,mock:!1,namespace:"manager"},{baseApi:"/api",mockApi:"https://www.fastmock.site/mock/c1c302e8baed9894c48c17e4738c092e/api"});let H;const N={},k=function(e,t){if(!t)return e();if(void 0===H){const e=document.createElement("link").relList;H=e&&e.supports&&e.supports("modulepreload")?"modulepreload":"preload"}return Promise.all(t.map((e=>{if(e in N)return;N[e]=!0;const t=e.endsWith(".css"),a=t?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${e}"]${a}`))return;const o=document.createElement("link");return o.rel=t?"stylesheet":H,t||(o.as="script",o.crossOrigin=""),o.href=e,document.head.appendChild(o),t?new Promise(((e,t)=>{o.addEventListener("load",e),o.addEventListener("error",t)})):void 0}))).then((()=>e()))},$=()=>k((()=>import("./Category.f8a0fade.js")),["/assets/Category.f8a0fade.js","/assets/Category.206f6bd0.css","/assets/vendor.fd304484.js"]),B=()=>k((()=>import("./TopicDetail.fd356478.js")),["/assets/TopicDetail.fd356478.js","/assets/TopicDetail.80e7877a.css","/assets/vendor.fd304484.js","/assets/ReplyList.137c45a2.js","/assets/ReplyList.8175edf4.css","/assets/index.e7d4a062.js"]),M=[{name:"home",path:"/",meta:{title:"首页"},component:()=>k((()=>import("./News.4fac3fee.js")),["/assets/News.4fac3fee.js","/assets/Forum.ddd22b7b.css","/assets/vendor.fd304484.js","/assets/TopicItem.d08e4fac.js","/assets/TopicItem.4ff92ad6.css","/assets/index.e7d4a062.js"])},{name:"login",path:"/login",meta:{title:"登录"},component:()=>k((()=>import("./Login.074a9379.js")),["/assets/Login.074a9379.js","/assets/Login.f6ffe23a.css","/assets/vendor.fd304484.js"])},{path:"/topic",name:"topic",component:()=>k((()=>import("./Forum.2698fbe7.js")),["/assets/Forum.2698fbe7.js","/assets/Forum.ddd22b7b.css","/assets/vendor.fd304484.js","/assets/TopicItem.d08e4fac.js","/assets/TopicItem.4ff92ad6.css","/assets/index.e7d4a062.js"])},{path:"/topic/create",name:"createTopic",component:()=>k((()=>import("./CreateTopic.76dee1d2.js")),["/assets/CreateTopic.76dee1d2.js","/assets/CreateTopic.a3ec01a3.css","/assets/vendor.fd304484.js"])},{path:"/topic/category",name:"topicCate",component:$,meta:{title:"论坛"}},{path:"/topic/:id",name:"topicDetail",component:B},{path:"/art/:id",name:"artDetail",component:()=>k((()=>import("./artDetail.30d946ba.js")),["/assets/artDetail.30d946ba.js","/assets/TopicDetail.80e7877a.css","/assets/vendor.fd304484.js","/assets/ReplyList.137c45a2.js","/assets/ReplyList.8175edf4.css","/assets/index.e7d4a062.js"])},{path:"/documents",name:"documents",component:()=>k((()=>import("./Documents.97977a7b.js")),["/assets/Documents.97977a7b.js","/assets/Documents.66f4d8fd.css","/assets/vendor.fd304484.js"])},{path:"/documents/create",name:"createDocument",component:()=>k((()=>import("./CreateDocument.52744c39.js")),["/assets/CreateDocument.52744c39.js","/assets/CreateDocument.fd5c8ba5.css","/assets/vendor.fd304484.js"]),meta:{requiresAuth:!0}},{path:"/documents/:id",name:"documentsDetail",component:B},{path:"/documents/category",name:"documentsCate",component:$,meta:{title:"文档"}}],V=l({history:m(),routes:M});var q={setItem(e,t){let a=this.getStroage();a[e]=t,window.localStorage.setItem(j.namespace,JSON.stringify(a))},getItem(e){return this.getStroage()[e]},getStroage:()=>JSON.parse(window.localStorage.getItem(j.namespace)||"{}"),clearItem(e){let t=this.getStroage();delete t[e],window.localStorage.setItem(j.namespace,JSON.stringify(t))},clearAll(){window.localStorage.clear()}};const J=["/users/upload"],U=[200,301],z=d.create({baseURL:j.baseApi,timeout:2e4});function Y(e){e.method=e.method||"get","get"===e.method.toLowerCase()&&(e.params=e.data);let t=j.mock;return void 0!==e.mock&&(t=e.mock),"prod"===j.env?z.defaults.baseURL=j.baseApi:z.defaults.baseURL=t?j.mockApi:j.baseApi,z(e)}z.interceptors.request.use((e=>{if(e.data&&!J.includes(e.url)){let t=p.exports.AES.encrypt(JSON.stringify(e.data),u.get("secret")).toString();e.data={},e.data.secretData=t}return e})),z.interceptors.response.use((async e=>{const{code:t,msg:a}=e.data;return 301===t?(window.loginStatus=0,await h.confirm(a,"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((()=>{console.log(V),V.push({name:"login",query:{redirect:location.pathname+location.search}})}))):U.includes(e.data.code)||_.error(a||"网络请求异常，请稍后重试"),e})),["get","post","put","delete","patch"].forEach((e=>{Y[e]=(t,a,o)=>Y(c({url:t,data:a,method:e},o))}));const K="FETCH_TOPIC_COMMENTS_ENTER_REPLAY";var W=g({modules:{appShell:{namespaced:!0,state:{baseInfo:{email:"",is_login:void 0}},mutations:{FETCH_BASE_INFO(e,t){e.baseInfo=Object.assign({},e.baseInfo,t),e.baseInfo.email.length>0?e.baseInfo.is_login=!0:e.baseInfo.is_login=!1}},actions:{async fetchBaseInfo({commit:e}){let t=await Y.post("/users/").then((e=>e.data)).catch((e=>e));return 200===t.code?e("FETCH_BASE_INFO",t.result):e("FETCH_BASE_INFO",{email:""}),Promise.resolve(t)}}},topic:{namespaced:!0,state:{homeData:{topic:{docs:[]},user:[]},cateList:[],topicData:null,topicDetailData:{},topicCommentsData:{}},mutations:{FETCH_HOME_DATA(e,t){console.log(t),Object.assign(e.homeData,t)},FETCH_TOPIC_DATA(e,t){e.topicData=t},FETCH_TOPIC_DETAIL(e,t){e.topicDetailData=t},FETCH_TOPIC_CATE(e,t){e.cateList=t},FETCH_TOPIC_COMMENTS(e,t){e.topicCommentsData=t},FETCH_TOPIC_COMMENTS_ENTER_REPLAY(e,t){e.topicCommentsData.docs.forEach((e=>{e.enterReply=!1,e.reply.forEach((e=>{e.enterReply=!1,e._id==t._id&&(e.enterReply=t.enterReply)})),e._id==t._id&&(e.enterReply=t.enterReply)}))}},actions:{async fetchTopicCate({commit:e},t){let a=await Y.post("/index/cats",t).then((e=>e.data));return 200===a.code&&e("FETCH_TOPIC_CATE",a.result),a},async fetchArticlesList({commit:e},t){let a=await Y.post("/index/articles",t).then((e=>e.data));return 200===a.code&&e("FETCH_TOPIC_DATA",a.result),a},createArticle:async({commit:e},t)=>await Y.post("/articles/create",t).then((e=>e.data)),async getTopicsDetail({commit:e},t){let a=await Y.post("/index/detail",t).then((e=>e.data));return 200===a.code&&e("FETCH_TOPIC_DETAIL",a.result),a},createComments:async({commit:e},t)=>await Y.post("/comments/create",t).then((e=>e.data)),async fetchComments({commit:e},t){let a=await Y.post("/index/comments",t).then((e=>e.data));return 200===a.code&&e("FETCH_TOPIC_COMMENTS",a.result),a},createCate:async({commit:e},t)=>await Y.post("/cats/create",t).then((e=>e.data)),deleteCate:async({commit:e},t)=>await Y.post("/cats/remove",t).then((e=>e.data)),async fetchHomeData({commit:e},t){let a=await Y.post("/index",t).then((e=>e.data));return 200===a.code&&e("FETCH_HOME_DATA",a.result),a}}},news:{namespaced:!0,state:{cateList:[],topicData:{}},mutations:{FETCH_TOPIC_CRALR(e,t){if(e.cateList.length||(e.cateList=t.nav),!t.docs.length)return e.topicData[`${t.slug}`].finish=!0,!1;e.topicData[`${t.slug}`]&&e.topicData[`${t.slug}`].docs?(e.topicData[`${t.slug}`].docs=[...e.topicData[`${t.slug}`].docs,...t.docs],delete t.docs,Object.assign(e.topicData[`${t.slug}`],t)):e.topicData[`${t.slug}`]=t}},actions:{async fetchTopicCate({commit:e},t={query:"channel",slug:"frontend"}){let a=await Y.get("/index/segmtn-list/articles",t).then((e=>e.data));return e("FETCH_TOPIC_CRALR",Object.assign(a.result,{slug:t.slug})),a}}}},strict:!1,plugins:[]});const G={register:e=>Y.post("/users/signIn/",e).then((e=>(200===e.data.code&&(window.loginStatus=1,W.commit("appShell/FETCH_BASE_INFO",e.data.result)),e.data))),login:e=>Y.post("/users/join/",e).then((e=>(200===e.data.code&&(window.loginStatus=1,W.commit("appShell/FETCH_BASE_INFO",e.data.result)),e.data))),logout:()=>Y.get("/users/logout/").then((e=>(200===e.data.code&&(window.loginStatus=0),e.data))),async loggedIn(){let e=!1;return void 0!==window.loginStatus?e=1==window.loginStatus:await Y.post("/users/").then((t=>{t&&200===t.data.code?(W.commit("appShell/FETCH_BASE_INFO",t.data.result),e=t.data.result.email.length>0):e=!1})),new Promise(((t,a)=>{t(e)}))},numberStr:e=>/^[0-9]*$/gi.test(e+="")};const Q={name:"app",computed:r(c({},f("appShell",["baseInfo"])),{activeName(){let e="home";return this.$route.path.includes("topic")&&(e="topic"),this.$route.path.includes("documents")&&(e="documents"),(this.$route.path.includes("news")||G.numberStr(this.$route.path.replace(/^.+\//gi,"")))&&(e="news"),e}}),data:()=>({activeIndex:"home",links:[{text:"首页",routerName:"home"},{text:"论坛",routerName:"topic"},{text:"文档",routerName:"documents"}]}),methods:r(c({},E("appShell",["fetchBaseInfo"])),{handleSelect(e){e&&e!=this.$route.name&&this.$router.push({name:e})},async logoutBtn(){await G.logout().then((e=>{200===e.code&&(this.$message.success(e.msg),setTimeout((()=>{this.$router.replace({name:"home"}),this.fetchBaseInfo()}),1e3))}))}}),created(){this.fetchBaseInfo()}},X={class:"container mx-auto px-5"},Z={class:"flex"},ee=y("img",{src:"/assets/logo.0af0bbf2.png",class:"logo",alt:""},null,-1),te={class:"w-full flex justify-between items-center"},ae={key:0,class:"flex user-info"},oe={class:"mr-4 user-email"},se=b("退出"),ne=b("登录"),ie=y("div",{class:"flex justify-center bg-gray-700"},[y("div",{class:"px-3"},"关于我们"),y("div",{class:"px-3"},"联系我们")],-1);Q.render=function(e,t,a,o,s,n){const i=T("router-link"),c=T("el-menu-item"),r=T("el-menu"),l=T("el-button"),m=T("el-header"),d=T("router-view"),p=T("el-main"),u=T("el-footer"),h=T("el-container");return C(),w(h,null,{default:I((()=>[y(m,{class:"shadow"},{default:I((()=>[y("div",X,[y("div",Z,[y(i,{to:{name:"home"},class:"mr-2"},{default:I((()=>[ee])),_:1}),y("div",te,[y(r,{"default-active":n.activeName,class:"el-menu-demo",mode:"horizontal",onSelect:n.handleSelect},{default:I((()=>[(C(!0),w(O,null,D(s.links,((e,t)=>(C(),w(c,{index:e.routerName,key:t},{default:I((()=>[b(S(e.text),1)])),_:2},1032,["index"])))),128))])),_:1},8,["default-active","onSelect"]),e.baseInfo.is_login?(C(),w("div",ae,[y("div",oe,S(e.baseInfo.email),1),y(l,{onClick:n.logoutBtn},{default:I((()=>[se])),_:1},8,["onClick"])])):(C(),w(l,{key:1,type:"primary",plain:"",onClick:t[1]||(t[1]=t=>e.$router.push({name:"login"}))},{default:I((()=>[ne])),_:1}))])])])])),_:1}),y(p,{class:"bg-gray-50"},{default:I((()=>[(C(),w(A,null,[y(d,{class:"container mx-auto"})],1024))])),_:1}),y(u,null,{default:I((()=>[ie])),_:1})])),_:1})};v.use(P);const ce=F(Q);ce.use(v),ce.use(L),ce.config.globalProperties.$request=Y,ce.config.globalProperties.$storage=q,ce.use(V).use(W).use(x,{size:"middle"}).mount("#app");export{K as F,G as a};
