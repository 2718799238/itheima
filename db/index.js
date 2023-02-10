// 导入mysql模块
const mysql = require('mysql')

// 配置数据库
const db=mysql.createPool({
    host :'localhost',
    port:'3306',
    user:'root',
    password:'123456',
    database:'users'
})


// 调试是否链接成功
// db.query('select 1',(err,results)=>{
//     if (err){
//         return console.log(err.message);
//     }
//     console.log(results);
// })



// 向外暴露数据库
module.exports=db