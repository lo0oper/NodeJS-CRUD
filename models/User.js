const dbConnection = require("../configs/dbConfiguration");
const  {UndefinedError} = require('../errors/undefinedError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const User = function(user){
    this.username = user.username;
    this.email = user.email;
    this.password = user.password;
    this.created_at = user.created_at;
    this.updated_at = user.updated_at;
}

User.createUser = (newUser, result) => {
    // Check if a user with the same email or username already exists
    dbConnection.query('SELECT * FROM users WHERE email = ? OR username = ?', [newUser.email, newUser.username], (err, existingUsers) => {
      if (err) {
        console.log({ error: 'An error occurred while checking for existing users' });
        result(err, null);
        return;
      }
  
      if (existingUsers && existingUsers.length > 0) {
        // User with the same email or username already exists
        const existingUser = existingUsers[0];
        result(null, { message: 'User already exists', user: existingUser });
      } else {
        // No matching user found, proceed with creating the new user
        dbConnection.query('INSERT INTO users SET ?', newUser, (err, res) => {
          if (err) {
            console.log({ error: 'An error occurred while creating the user' });
            result(err, null);
            return;
          }
  
          console.log("created user: ", { id: res.insertId, email: newUser.email, username: newUser.username, created_at: newUser.created_at, updated_at: newUser.updated_at });
          result(null, { id: res.insertId, email: newUser.email, username: newUser.username, created_at: newUser.created_at, updated_at: newUser.updated_at });
        });
      }
    });
  };
  

User.getAll = (res) => {
    dbConnection.query('SELECT * FROM users', (err, userData) => {
    if (err) {
      console.error({ error: 'An error occurred' });
      res(err,null);
    }
    res(null,{...userData})
    return;
  });
};

User.getById = (userId, res) => {
    console.log("SEARCHIBG FOR ",userId)
  dbConnection.query('SELECT * FROM users WHERE user_id = ?', [userId], (err, results) => {
    if (err) {
        console.error('An error occurred:',{err})
        res(err,null);
    }
    console.log({results})
    if (results.length === 0) {
        res(null,{message:"User not found"})
        return 
    }
    res(null,results[0])
    return;
  });
};

User.update = (id,userData,res) => {
  const user_id = id

  if(userData.password==undefined || userData.email==undefined){
    const err = new UndefinedError('Password is missing');
    console.error({ errorMessage: 'Password is undefined:'});
    res(err, null);
    return 
  }
  const updatedUser = new User({
    username:userData.username,
    email:userData.email,
    password: userData.password,
    updated_at: new Date(),
    created_at: userData.created_at
  })
  dbConnection.query('UPDATE users SET ? WHERE user_id = ?', [updatedUser, user_id], (err, results) => {
    if (err) {
        console.error({errorMessage: 'An error occurred while updating user:',user_id,err});
        res(err,null) 
    }
    res(null,{ message: 'User updated successfully',id:userData.user_id,...updatedUser})
    return
  });
};

User.patch = (id,userData,res) => {
    try{
        const user_id = id
        dbConnection.query('UPDATE users SET ?  WHERE user_id = ?', [userData, user_id], (err, results) => {
            if (err) {
                console.error({errorMessage: 'An error occurred while updating user:',user_id,err});
                res(err,null) 
            }
            res(null,{ message: 'User updated successfully',...userData})  
        });
    }catch (e) {
        console.error({ errorMessage: 'An error occurred:', e });
        res(e, null); // Return the error and exit the function
        
    }
    return 
  };

User.delete = (id,userData,res) => {
  const user_id = id;
  dbConnection.query('DELETE FROM users WHERE user_id = ?', [id], (err, results) => {
    if (err) {
        console.error('An error occurred while deleting the user:',err)
        res(err,null)
    }
    res(null,{ message: 'User deleted successfully',...userData});
    return 
  });
};


User.login = (username,password,res) =>{
    dbConnection.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err) {
            console.error({errorMessage: 'Internal error occured while logging in ',err});
            res(err,null);
        } else if (results.length === 0) {
            console.log('No user exists with given details');
            res(new Error("No user found with given details"),null);
        } else {
            const user = results[0];
            // Compare the hashed password
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    console.error({errorMessage: 'An error occurred comparing passswords ',err});
                    res(new Error("Internal server Error"),null);
                } else if (isMatch) {
                    console.log("User found, generating token for it")
                    // Generate a JWT
                    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
                    res(null,{token:token,...user})
                } else {
                    console.log('UnAuthenticated user');
                    res(null,{"message":"UnAuthenticated request",...user})
                }
            });
            return 
        }
    });
}

module.exports = {User};
