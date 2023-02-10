// 导入数据库
const db =require('../db/index')
// 加密模块
const bcryptjs =require('bcryptjs')


// 获取用户信息处理函数
const get_userinfo = (req,res)=>{
    const sql = 'select userid,username,email,user_pic from ev_user where userid=?'
    db.query(sql,req.user.userid,(err,results)=>{
        if (err){
            return res.send({status:1,msg:err.message})
        }
        res.send(results)
    }) 
}
// 更新用户密码和邮箱
const update_userinfo =(req,res)=>{
    const userinfo=req.body
    const sql = 'update ev_user set email= ? where userid=?'
    db.query(sql,[userinfo.email,req.user.userid],(err,results)=>{
        if (err) {
            return res.send({status:1,msg:err.message})
        }
        if (results.affectedRows !==1){{
            return res.send({status:1,msg:'更新失败'})
        }}
        console.log(results);
        res.send(userinfo.email)
        // res.send('修改成功')
    })
}
// 更新用户密码函数
    const re_userPassword =(req,res)=>{
        const oldPassword = req.body.oldpassword
        const newPassword = bcryptjs.hashSync(req.body.newpassword,5)
        const sql1 ='select password from ev_user where userid=?'
        db.query(sql1,req.user.userid,(err,results)=>{
            if(err) return res.send({status:1,msg:err.message})
            if(results.length!=1) return res.send({status:1,msg:'修改失败1'})
            if(!bcryptjs.compareSync(oldPassword, results[0].password)) return res.send('旧密码不正确')
            const sql2='update  ev_user set password=? where userid=?'
             db.query(sql2,[newPassword,req.user.userid],(err,results)=>{
                 if(err) return res.send({status:1,msg:err.message})
                 if(results.affectedRows!=1) return res.send({status:1,msg:'修改失败'})
                 res.send('修改成功')
             })

        })
        
    }

// 向外暴露
module.exports={
    get_userinfo,
    update_userinfo,
    re_userPassword
}