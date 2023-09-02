const {Router} = require('express');
const listProducts = require('../controllers/listProducts');
const searchProducts = require('../controllers/searchProducts');
//Importar todos los routers


const router = Router();

//configurar los routers
router.get('/products',listProducts);
router.get('/search/',searchProducts);

module.exports = router;