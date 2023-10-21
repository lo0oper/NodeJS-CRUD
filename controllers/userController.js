
const User = require('../models/User');
const UserModel = require('../models/User');

// Register a new user
const registerUser = (req, res) => {
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
    }

    const newUser = new UserModel({
        username :req.body.username,
        email : req.body.email,
        created_at : new Date(),
        updated_at : new Date()
    });


  UserModel.create(newUser, (err, data) => {
    if (err) {
      console.error('Error registering user:', err);
      res.status(500).json({ error: 'User registration failed' });
    } else {
      res.status(201).json({ message: 'User registered successfully',...data});
    }
  });
};


const getAllUsers = async (req,res) => {
    const title = req.query.title;
    UserModel.getAll((err,data)=> {
        if (err) {
            console.error('Error fetching all users:',err);
            res.status(500).json({error:"Internal server error"});
        } else {
            res.status(200).json({data})
        }
    })
    
};

const getUserById = async (req, res) => {
    const id = req.params.id;
    UserModel.getById(id,(err,data)=> {
        if (err) {
            console.error('Error fetching all users:',err);
            res.status(500).json({error:"Internal server error"});
        } else {
            res.status(200).json({data})
        }
    })
};

const updateUser = async (req, res) => {
    const id = req.params.id
    const body = req.body
    UserModel.getById(id,(err,userData)=> {
        if (err) {
            console.error('Error while finding user in DB:',err);
            res.status(500).json({error:"Internal server error"});
        } else {
            UserModel.update(id,userData,body,(err,updatedUserData)=>{
                if(err){
                    console.error(`Error while Updating user:${id}`,err);
                    res.status(500).json({error:"Internal server error"});
                }else{
                    res.status(200).json({updatedUserData})   }
            })
            
        }
    })

};

const deleteUser = async (req, res) => {
    const id = req.params.id;
    UserModel.getById(id,(err,userData)=> {
        if (err) {
            console.error('Error fetching user:',id,err);
            res.status(500).json({error:"Internal server error"});
        } else {
            UserModel.delete(id,userData,(err,data)=>{
                if (err) {
                    console.error('Error while Deleting user in DB:',err);
                    res.status(500).json({error:"Internal server error"});
                } else {
                    res.status(203).json({data})
                }
            })
        }
    })
    
  // Implement logic to delete a user
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  registerUser
};
