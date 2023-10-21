
const {Table} = require("../models/Table")

const createTable = (req,res)=>{
    console.log("Create Table invoked")
    const tableName = req.body.tableName
    Table.createTable(tableName,(err,data)=>{
        if (err) {
          console.error('Error while creating table', err);
          res.status(500).json({ error:tableName+ " table creation failed " + err });
        } else {
            res.status(200).json({...data});
          
        }
      })

}

module.exports = {
    createTable
  };
  