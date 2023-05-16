const mysql = require('mysql2')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '04ryadh123',
  database: 'nada'
})

connection.connect((err)=>{
    if (err) throw err
    console.log("connected")
})
module.exports={connection}