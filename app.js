// 导入express模块
const express=require('express')

// 创建服务器的实例
const app = express()

// 导入cors模块，解决跨域问题
const cors = require('cors')
// 设置cors全局中间件
app.use(cors())
// 配置express解析表单数据
app.use(express.urlencoded({extended : false}))
// 导入解析token模块
const expressJwt =require('express-jwt')
const config =require('./config')

// 导入路由并配置
const userRouter = require('./router/user.js')
app.use('/api',userRouter)
// 配置token中间件
app.use(expressJwt({secret: config.jwtSecretKey}).unless({path:[ '/^\/api\//' ]}))
// 导入并处理用户信息路由
const userinfo = require('./router/userinfo')
app.use('/my',userinfo)

// 错误级别的中间件
app.use((err,req,res,next)=>{
    if (err.name === 'UnauthorizedError') {return res.send('身份认证失败');}
    res.send(err.message)
    next()
})
// 调用启用服务器，设置服务器端口号
app.listen(3007,()=>{
    console.log('Running your web server')
})