const mysql = require('mysql2');
require('dotenv').config();


var mysqlConnection = mysql.createConnection(
    {
        host:'mysql_server',
        port:'3306',
        user:'root',
        password: "123456root",
        database:'mysql_server'
    }
   
)   

// Connect to the database.
mysqlConnection.connect((err) => {
    if (err) {
        console.error('Error connecting to  database: ' + err);
        return

    }
    console.log(process.env.MYSQL_USERNAME)
    console.log(process.env.JWT_SECRET_KEY)

    console.log('Connected to `NodeDB` database as id ' + mysqlConnection.threadId);
});

module.exports = mysqlConnection 
