
const {User} = require('../models/User');
const {UndefinedError} = require('../errors/undefinedError');
const {hashPassword} = require('../middlewares/passwordMiddlewares')

// Register a new user
const registerUser = async (req, res) => {
    console.log("Register User invoked")
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
    }
    const hashedPassword = await hashPassword(req.body.password);
    console.log({hashedPassword})
    const newUser = new User({
        username :req.body.username,
        email : req.body.email,
        password: hashedPassword,
        created_at : new Date(),
        updated_at : new Date()
    });


  User.createUser(newUser, (err, data) => {
    if (err) {
      console.error('Error registering user:', err);
      res.status(500).json({ error: 'User registration failed' });
    } else {
      res.status(201).json({ message: 'User registered successfully',...data});
    }
  });
};


const getAllUsers = async (req,res) => {
    console.log("Get all User invoked")
    const title = req.query.title;
    User.getAll((err,data)=> {
        if (err) {
            console.error('Error fetching all users:',err);
            res.status(500).json({error:"Internal server error"});
        } else {
            res.status(200).json({data})
        }
    })
    
};

const getUserById = async (req, res) => {
    console.log("User by Id invoked")
    const id = req.params.id;
    User.getById(id,(err,data)=> {
        if (err) {
            console.error('Error fetching all users:',err);
            res.status(500).json({error:"Internal server error"});
        } else {
            res.status(200).json({data})
        }
    })
};

const updateUser = async (req, res) => {
    console.log("Update User invoked")
    const id = req.params.id
    let body = req.body
    if(body.password){
        body.password = await hashPassword(body.password);
    }
    try{
        User.update(id,body,(err,updatedUserData)=>{
            if(err){
                if (err instanceof UndefinedError) {
                    return res.status(400).json({ error: 'Password and Email must be present' });
                }
                console.error(`Error while Updating user:${id}`,err);
                res.status(500).json({error:"Internal server error"});
            }else{
                res.status(200).json({updatedUserData})   }
        })
    }catch(e){
        res.status(500).json({error:"Some Internal server error occured."});
    }
    

};

const patchUser = async (req,res) =>{
    console.log("Patch User invoked")
    id = req.params.id;
    body = req.body;
    if(body.password){
        body.password = await hashPassword(plainPassword);
    }
    try{
        User.patch(id,body,(err,data)=>{
            if(err){
                console.error('Error occured while updating the user:',id,err)
                res.status(500).json({error:"Internal server error"});
            }else{
                res.status(200).json({data});
            }
        });
    }catch(e){
        res.status(500).json({error:"Some Internal server error occured."});
    }
    
}

const deleteUser = async (req, res) => {
    console.log("Delete User invoked")
    const id = req.params.id;
    try {
        User.getById(id, (err, userData) => {
            if (err) {
              console.error('An error occurred:', err);
              return res.status(500).json({ error: 'Internal server error' });
            }
        
            if (!userData) {
              console.log('No user with the given id.');
              return res.status(204).json({ message: 'User did not exist.' });
            }
        
            User.delete(id,userData, (err) => {
              if (err) {
                console.error('An error occurred:', err);
                return res.status(500).json({ error: 'Internal server error' });
              }
        
              res.status(204).json({ data: userData, message: 'User deleted successfully' });
            });
          });
    }catch (err) {
        console.error('An error occurred:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  patchUser,
  registerUser
};
