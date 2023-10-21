
const {User} = require('../models/User');




const login = async (req, res) => {
    console.log("Login User invoked")
    const { username, password } = req.body;
    User.login(username,password,(err,data)=>{
      if (err) {
        console.error('Error while logging in', err);
        res.status(500).json({ error: 'User registration failed' });
      } else {
        if(data.message==="UnAuthenticated request"){
          res.status(401).json({"message":"UnAuthenticated request"})
        }else{
          res.status(200).json({...data});
        }
      }
    })
   
}


module.exports = {
  login
};
