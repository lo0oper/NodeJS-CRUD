const dbConnection = require("../configs/dbConfiguration");

const Table = function(table){

}

Table.createTable = (tableName,res)=>{
    const createTableQuery =`CREATE TABLE \`buyers\` (
        user_id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        admin BOOLEAN DEFAULT FALSE
      );
      `;
    dbConnection.query(createTableQuery,[tableName],(err,result)=>{
        if(err){
            console.error("Error while creating table: ",tableName,err)
            res(err,null)
        }else{
            res(null,{message:"table "+tableName+" created successfully",...result})
        }
        return
    })
}

module.exports={
    Table
}