const {User} = require('../db.js');
const bcrypt = require('bcryptjs');

const verificaUserName = async(nombreUsuario) =>{
    const user = await User.findOne({
        where:{
            username:nombreUsuario
        }
    });
    return  user !== null
};

const register = async function(req,res){
    const {username,name,password} = req.body;

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password,saltRounds);
  
    let userObj={username,name,password:passwordHash};

    try{
        //!Si el username ya existe, no se puede actualizar
        //!SI ES NULL no se repite
        const existe= await verificaUserName(username);
        console.log('que trae existe: ', existe)
        if(existe){
            return res.status(400).json({error:'El Usuario ya existe, ingrese otro'});
        };

        const newUser = await User.create(userObj);

        return res.status(200).json(newUser);
    }catch(error){
        res.status(401).send("Error en datos register: ", error.message)
    }
};

module.exports = register;
