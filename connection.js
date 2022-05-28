const mysql = require('mysql');
const con = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'password',
    database :'studentinfo' 
});

module.exports = con;