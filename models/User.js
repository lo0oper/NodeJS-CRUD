const dbConnection = require("../configs/dbConfiguration");


const User = function(user){
    this.username = user.username;
    this.email = user.email;
    this.created_at = user.created_at;
    this.updated_at = user.updated_at;
}


User.create = (newUser, result) => {
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
  const user_id = userId
  dbConnection.query('SELECT * FROM users WHERE user_id = ?', [user_id], (err, results) => {
    if (err) {
        console.error('An error occurred:',{err})
        res(err,null);
    }
    if (results.length === 0) {
        res(null,{message:"User not found"})
      
    }
    res(null,results[0])
    return;
  });
};



User.update = (id,userData,body,res) => {
  const user_id = id
  const updatedUser = new User({
    username:body.username,
    email:body.email,
    updated_at: new Date(),
    created_at: userData.created_at,
    password:userData.password,
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

module.exports = User;
