require('dotenv').config();
const {JWT_SECRET} = process.env;
const {User} = require('../db.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const login = async function(req,res){
    const{username,password} = req.body;

    try{
        const getUser = await User.findOne({
                where:{
                    username: username,
                }
            })

        // console.log('que trae getUser: ', getUser);

        const passwordCorrect = getUser == null
            ?false
            :await bcrypt.compare(password, getUser.password)

        if(!(getUser && passwordCorrect)){
            res.status(401).json({error:'invalid user or password'})
        }

        const userForToken = {
            id: getUser.id,
            username: getUser.username,
        }

        const token = jwt.sign(userForToken, JWT_SECRET);

        res.status(200).json({
            name: getUser.name,
            username: getUser.username,
            token
        });

    }catch(error){
        res.status(401).send('error en login: ', error.message);
    };

};

module.exports = login;