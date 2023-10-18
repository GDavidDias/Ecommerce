const jwt = require('jsonwebtoken');
const {JWT_SECRET} = process.env;

const validateUser = async (req, res, next) => {
    console.log('ENTRA A validateUser')
    try{
        const token = req.headers['authorization']
        jwt.verify(token, JWT_SECRET, (err,user)=>{
            if(err){
                return res.status(403).json({msg:'No Autorizado, inicie sesion'})
            }else{
                console.log('ingreso correcto con token');
                //res.status(200).json({msg:'exito'})
                next();
            }
        })        
    }catch(error){
        return res.status(500).json({msg:'Error en Validacion de Usuario'})
    }
};

module.exports = validateUser;