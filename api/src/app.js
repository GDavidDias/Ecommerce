const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const{ TOKEN_MP } = process.env;
const cors = require('cors'); //?AGREGO POR MERCADOPAGO
const mercadopago = require('mercadopago'); //?AGREGO POR MERCADOPAGO

require('./db.js');

const server = express();

server.name='API';

//!Configuramos los middlewares - los filtros de las request
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use(express.json()); //?AGREGO POR MERCADOPAGO
server.use(cors()); //?AGREGO POR MERCADOPAGO
server.use((req,res,next)=>{
    //res.header('Access-Control-Allow-Origin', 'http://localhost:3001'); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Origin', 'https://ecommerce-orpin-tau.vercel.app'); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

server.use('/', routes);

//?AGREGO POR MERCADOPAGO
mercadopago.configure({
  access_token:TOKEN_MP
});

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
  });

module.exports = server;