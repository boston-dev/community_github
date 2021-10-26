const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const fileUpload = require('express-fileupload');
/*登录依赖*/
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const mongoUrl='mongodb://localhost:27017/community-git'
const middle = require('./middle/index');
const controller = require('./mongod/controller');
const config = require('./mongod/config.json');
const indexRouter = require('./routes/index');
const allRouter = require('./routes/all');
const usersRouter = require('./routes/users');
const articlesRouter = require('./routes/articles');
const catsRouter = require('./routes/cats');
const adminRouter = require('./routes/admin');
const commentsRouter = require('./routes/comments');
const cors = require('cors')
const app = express();
app.disable('view cache');
const cryptoJs = require('crypto-js')
app.set('views', path.join(__dirname, 'views'));

// 设置模板引擎
app.set('view engine', 'html');
//设置一下对于html格式的文件，渲染的时候委托ejs的渲染方面来进行渲染
app.engine('html', require('ejs').renderFile);

//netstat -aon | findstr "3006"
//taskkill /pid 23148 /F
mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true  }).then(res => console.log('链接 community 成功'))

const  sessionMiddleware= session({
  secret: 'banggood-community',
  resave: false,
  saveUninitialized: true,
  //指定保存的位置
  store: new MongoStore({mongooseConnection: mongoose.connection})
})
app.use(sessionMiddleware);
app.use(logger('dev'));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());
app.use( async (req,res,next) => {
  if(!req.cookies.secret){
    res.cookie('secret', config.secret, { path: '/' , httpOnly: false});
  }
  //cryptoJs
  if(req.body.secretData){
    let bytes  = cryptoJs.AES.decrypt(req.body.secretData, config.secret);
    let decryptedData = JSON.parse(bytes.toString(cryptoJs.enc.Utf8));
    req.body=decryptedData
    console.log(req.url)
  }
  Object.assign(res.locals,{globalMiddle:middle,globalController:controller,globalConfig:config})

  next();
})
app.use('/api/index', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/cats',middle.checkAdmin, catsRouter);
app.use('/api/articles',middle.checkLogin, articlesRouter);
app.use('/api/comments',middle.checkLogin, commentsRouter);
app.use('/admin', adminRouter);
app.use('*', allRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.redirect('/')
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
