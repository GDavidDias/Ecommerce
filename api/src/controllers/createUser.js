const {User} = require('../db.js');
const bcrypt = require('bcrypt');

const createUser = async function(req,res){
    const {username,name,password} = req.body;

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password,saltRounds);
  
    let userObj={username,name,password:passwordHash};

    try{
        const newUser = await User.create(userObj);

        return res.status(200).json(newUser);
    }catch(error){
        res.status(401).send("Error en datos createUser: ", error.message)
    }
};

module.exports = createUser;
