// 导入定义验证规则的包
const joi = require('joi')

// 定义用户用户名和密码规则
const username =joi.string().alphanum().min(1).max(10).required()
const password =joi.string().pattern(/^[\w]{6,12}$/).required()
const newpassword =joi.string().pattern(/^[\w]{6,12}$/).required()
const oldpassword =joi.string().pattern(/^[\w]{6,12}$/).required()

// 定义用户更新验证规则
const email = joi.string().email().required()
// 调试规则是否正确
// const schema = {
//     username,
//     password
// }
// function run()
// {
//     try {
//         joi.valid({username:'aaaa',password:'4684646464964648496464646464'},schema)
//         console.log('合法');
//     }catch(err){
//         console.log(err);
//     }
// }
// run()
// 定义验证注册与登陆的数据规则对象
// 向外暴露对象
exports.reg_login_schema = {
    body : {
        username,
        password,
    }
    
}
exports.update_userinfo= {
    body : {
        email,
    }
}
exports.re_password ={
    body: {
        oldpassword,
        newpassword,
    }
}