const {Router} = require('express');
const listProducts = require('../controllers/listProducts');
const searchProducts = require('../controllers/searchProducts');
const preferenceMp = require('../controllers/preferenceMp');
const createUser = require('../controllers/createUser');
//Importar todos los routers


const router = Router();

//configurar los routers
router.get('/products',listProducts);
router.get('/search',searchProducts);

//usuarios
router.post('/user',createUser);

//?AGREGO POR MERCADOPAGO
router.post('/create_preference',preferenceMp);

module.exports = router;