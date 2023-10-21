const mysql = require('mysql2');
require('dotenv').config();
var mysqlConnection = mysql.createConnection(
    {
        host:'localhost',
        port:'3306',
        user:'root',
        password: process.env.DB_PASSWORD,
        database:'NodeDB'
    }
)

// Connect to the database.
mysqlConnection.connect((err) => {
    if (err) {
        console.error('Error connecting to  database: ' + err.stack);
        return;
    }
    console.log('Connected to `NodeDB` database as id ' + mysqlConnection.threadId);
});


module.exports = mysqlConnection 
