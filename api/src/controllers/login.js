require('dotenv').config();
const {JWT_SECRET} = process.env;
const {User} = require('../db.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const login = async function(req,res){
    const{username,password} = req.body;
    console.log('que tiene body: ', req.body)
    console.log('que tiene username: ', username)
    console.log('que tiene password: ', password)

    if(!username || !password){
        return res.status(204).json({error:"sin datos username or password"})
    }
    try{
        const getUser = await User.findOne({
                where:{
                    username: username,
                }
            })
        if(!getUser){
            console.log('no hay usuario');
            return res.status(401).json({error:"Usuario o Contraseña Invalida"})
        }

        //?SI EXISTE USUARIO
        console.log('que trae getUser.password: ', getUser.password);
        
        const pass = await bcrypt.compare(password, getUser.password)
        console.log('que traer compare password: ', pass);
        if(!pass){
            console.log('mal la password')
            return res.status(401).json({error:"Usuario o Contraseña Invalida"})
        }

        //?SI EXISTE USUARIO Y PASSWORD CORRECTA, GENERA TOKEN
        const userForToken = {
            id: getUser.id,
            username: getUser.username,
        }

        const token = jwt.sign(userForToken, JWT_SECRET);

        res.status(200).json({
            name: getUser.name,
            username: getUser.username,
            id:getUser.id,
            token
        });

    }catch(error){
        res.status(401).send('error en login: '+ error.message);
    };

};

module.exports = login;