const {Router} = require('express');
const listProducts = require('../controllers/listProducts');
//Importar todos los routers


const router = Router();

//configurar los routers
router.get('/products',listProducts);

module.exports = router;