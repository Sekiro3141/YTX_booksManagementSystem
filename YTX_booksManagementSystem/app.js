const Koa = require("koa");
const Router = require("koa-router");
const manager = require("./routes/manager.js");
const borrower = require("./routes/borrower.js");
const library = require("./routes/library.js");
const render = require('koa-art-template');
const static = require('koa-static');
const path = require("path");
const session = require('koa-session');
// const bodyParser = require('koa-bodyparser');
const koaBody = require('koa-body');
const cors = require('koa-cors')

var app = new Koa();
var router = new Router();
app.use(cors())
// app.use(bodyParser()); //配置bodyParser中间件
app.use(koaBody({
  multipart:true, // 支持文件上传
  // encoding:'gzip',
  formidable:{
    uploadDir:path.join(__dirname,'public/uploads/'), // 设置文件上传目录
    keepExtensions: true,    // 保持文件的后缀
    maxFieldsSize:2 * 1024 * 1024, // 文件上传大小
    onFileBegin:(name,file) => { // 文件上传前的设置
      // console.log(`name: ${name}`);
      // console.log(file);
    },
  }
}));

//session保存在服务端上
app.keys = ['some secret hurr']; //cookie签名
const CONFIG = {
    key: 'koa:sess', //默认
    maxAge: 86400000, //cookie过期时间  86400000
    autoCommit: true,
    overwrite: true, //默认
    httpOnly: true, //true表示cookie只有服务端才可以获取
    signed: true, //默认签名
    rolling: true, //每次请求时强行设置cookie过期时间(用户在过期时间内没有任何操作直接过期)
    renew: false, //每次快过期时设置cookie过期时间(用户在过期时间内没有任何操作直接过期)
    sameSite: null,
};
app.use(session(CONFIG, app));

//配置静态文件路由
app.use(static("./public/"));

//配置koa-art-template模板引擎
render(app, {
  root: path.join(__dirname, 'views'), //视图位置
  extname: '.html', //后缀名
  debug: process.env.NODE_ENV !== 'production' //是否开启调试
});

// 配置层级路由，第二个参数为启动路由
router.use("/admin/manager", manager.routes());
router.use("/admin/borrow", borrower.routes());
router.use("/admin/library", library.routes());

//启动路由
app.use(router.routes()).use(router.allowedMethods());
app.listen(3000);//,"192.168.1.101"