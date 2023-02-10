// 导入express模块
const express= require('express')
// 挂载路由
const router =express.Router()

// 导入验证模块
const expressJoi = require('@escook/express-joi')
const schema= require('../schema/user')


// 导入用户信息处理模块
const userInfo_handler = require('../router_handle/userinfo')

// 用户信息获取
router.get('/userinfo',userInfo_handler.get_userinfo)
// 更新用户信息
router.post('/updateuserinfo',expressJoi(schema.update_userinfo),userInfo_handler.update_userinfo)
// 更新用户密码
router.post('/repassword',expressJoi(schema.re_password),userInfo_handler.re_userPassword)


module.exports=router