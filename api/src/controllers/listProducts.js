const axios = require('axios');
require('dotenv').config();

const {Products} = require('../db.js');


const listProducts = async function(req,res){
    console.log('ingresa a listProducts');
    try{
        let resp;
        resp = await require('../data/data.json');
        console.log("que trae resp :",resp.products);

        let cantidadRegistros = await Products.count();
        let allProducts;

        if(cantidadRegistros===0){
            allProducts = await Products.bulkCreate(resp.products);
        }else{
            allProducts = await Products.findAll();
        }

        return res.status(200).send(allProducts);

    }catch(error){
        return res.status(404).send("Error en listProducts ",error.message);
    }
};

module.exports = listProducts;