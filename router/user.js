// 导入express,建立router模块
const express = require('express')
const router = express.Router()

// 导入api处理函数
const handler =require('../router_handle/user.js')

// 导入表单数据中间件
const expressJoi = require('@escook/express-joi')

// 导入表单验证规则对象
const {reg_login_schema} =require('../schema/user')
//用户注册 
router.post('/reguser',expressJoi(reg_login_schema),handler.regUser)

// 用户登陆
router.post('/login',expressJoi(reg_login_schema),handler.login)
// 向外暴露router模块成员
module.exports = router