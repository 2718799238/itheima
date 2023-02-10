// 导入数据库模块
const db =require('../db/index')
// 加密模块
const bcryptjs =require('bcryptjs')
// token包
const jwt =require('jsonwebtoken')
// 用户注册处理函数
const regUser = (req,res)=>{
    // 表单数据验证设计
    
    // 检验账号是否为空
     const userinfo= req.body

    // if (!userinfo.username || !userinfo.password){
    //     return res.send({status:1,msg :'账号或密码不能为空'})
    // }


    // 检验用户名是否已经注册
    const sqlSTr='select * from ev_user where username = ? '
    db.query(sqlSTr,userinfo.username,(err,results)=>{
        if (err){
            return res.send({status :1 ,msg:err.message})
        }
        if (results.length>0){
            return res.send({stuatus:1,msg:'用户名已经注册'})
        }
    })
  
    // 对用户密码进行加密
     
     userinfo.password = bcryptjs.hashSync(userinfo.password,5)
     console.log(userinfo)
    // 插入新用户数据
    const sql = 'insert into ev_user set ? '
    db.query(sql,{username :userinfo.username,password : userinfo.password,email : userinfo.emial},(err,results)=>{
        if (err){
            return res.send({err: sql.xr,msg : err.message})
        }
        // 判断影响行数是否为1
        if (results.affectedRows != 1){
            return res.send({err:sql,msg: '注册用户失败，请稍后再试'})
        }
        // 注册用户成功
        res.send({status :1,msg :'注册成功'})
    })
}

// 用户登陆处理模块
const login = (req,res)=>{
    const userinfo =req.body
    
    const sql = 'select * from ev_user where username =?'
    db.query(sql,userinfo.username,(err,results)=>{
        if (err){
            return res.send({status:1,msg:err.message})
        }
        if (results.length!==1){
            return res.send({status:1,msg:'登陆失败'})
        }
        if (!bcryptjs.compareSync(userinfo.password, results[0].password)){
            return res.send('密码错误')
        }
       
        const user = {...results[0],password:'',user_pic :''}
        // 导入配置的秘钥
        const config = require('../config')
        console.log(config.jwtSecretKey);
        const tokenStr = jwt.sign(user,config.jwtSecretKey,{expiresIn:config.expiresIn})
        res.send({
            status:1,
            meg:"登陆成功",
            token:'Bearer '+tokenStr
        })
    })
}


// 向外暴露处理函数
module.exports ={
    regUser,
    login
}