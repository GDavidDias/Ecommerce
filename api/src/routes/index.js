const {Router} = require('express');
const listProducts = require('../controllers/listProducts');
const searchProducts = require('../controllers/searchProducts');
const preferenceMp = require('../controllers/preferenceMp');
const register = require('../controllers/register');
// const searchUser = require('../controllers/searchUser');
const login = require('../controllers/login');
const editProfile = require('../controllers/editProfile');
//Importar todos los routers


const router = Router();

//configurar los routers
router.get('/products',listProducts);
router.get('/search',searchProducts);

//usuarios
router.post('/register',register);
router.post('/login',login);
router.put('/editProfile/:id', editProfile);


//?AGREGO POR MERCADOPAGO
router.post('/create_preference',preferenceMp);

module.exports = router;