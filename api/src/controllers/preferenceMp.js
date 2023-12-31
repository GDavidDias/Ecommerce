const axios = require('axios');
require('dotenv').config();

const {Products} = require('../db.js');
const mercadopago = require('mercadopago');


const preferenceMp = async function(req,res){
    console.log('ingresa a preferenceMp');
    try{
        let preference = {
            items:[
                {
                    title:req.body.title,
                    unit_price: Number(req.body.price),
                    quantity: Number(req.body.quantity),
                }
            ],
            back_urls:{
                "success": "http://localhost:5173",
                "failure": "http://localhost:5173",
                "pending": ""                
            },
            auto_return: "approved",
        };

        mercadopago.preferences.create(preference)
            .then(function(response) {
                res.json({
                    id:response.body.id
                });
            }).catch(function(error){
                console.log(error);
            });

        // return res.status(200).send('preferenceMp');

    }catch(error){
        return res.status(404).send("Error en preferenceMp ",error.message);
    }
};

module.exports = preferenceMp;