const {User} = require('../db.js');
const bcrypt = require('bcrypt')

const searchUser = async function(req,res){
    const {username,password} = req.body;
  
    const saltRounds = 10;
    let passwordHash = await bcrypt.hash(password,saltRounds);
    console.log('que tiene username: ', username);
    console.log('que tiene password: ', passwordHash);

    try{
        const getUser = await User.findOne({
            where:{
                username: username,
                password: passwordHash,
            }
        });

        console.log('que trae getUser: ', getUser);

        if (getUser) {
            return res.status(200).json(getUser);
        }else{
            return res.status(401).json('usuario no encontrado');
        }

    }catch(error){
        res.status(401).send("Error en datos createUser: ", error.message)
    }
};

module.exports = searchUser;