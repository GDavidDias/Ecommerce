const axios = require('axios');
require('dotenv').config();

const {Products} = require('../db.js');
const {Op} = require('sequelize')


const searchProducts = async function(req,res){
    console.log('ingresa a searchProducts');
    const {title} = req.query;
    console.log('que tiene title: ', title);
    try{
        const findProducts = await Products.findAll({
            where:{
                title:{
                    [Op.like]: `%${title}%`,
                }
            }
        });
        // console.log('que tiene findProducts: ',findProducts)

        return res.status(200).send(findProducts);

    }catch(error){
        return res.status(404).send("Error en searchProducts "+error.message);
    }
};

module.exports = searchProducts;