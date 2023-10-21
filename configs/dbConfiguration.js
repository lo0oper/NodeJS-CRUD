const mysql = require('mysql2');
require('dotenv').config();



async function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

var mysqlConnection = mysql.createConnection(
    {
        host:'mysql_server',
        port:'3306',
        user:'root',
        password: process.env.DB_PASSWORD,
        database:'mysql_server'
    }
   
)   

// Connect to the database.
mysqlConnection.connect((err) => {
    if (err) {
        console.error('Error connecting to  database: ' + err);
        return

    }
    console.log('Connected to `NodeDB` database as id ' + mysqlConnection.threadId);
});

module.exports = mysqlConnection 
