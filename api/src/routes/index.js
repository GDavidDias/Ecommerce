const {Router} = require('express');
const listProducts = require('../controllers/listProducts');
const searchProducts = require('../controllers/searchProducts');
const preferenceMp = require('../controllers/preferenceMp');
const register = require('../controllers/register');
const userProducts = require('../controllers/userProducts');
// const searchUser = require('../controllers/searchUser');
const login = require('../controllers/login');
const editProfile = require('../controllers/editProfile');
const newProduct = require('../controllers/newProduct');

//----Middlewares
const validateUser = require('../middlewares/validateUser');

//Importar todos los routers



const router = Router();

//configurar los routers
router.get('/products',listProducts);
router.get('/search',searchProducts);

//usuarios
router.post('/register',register);
router.post('/login',login);
router.put('/editProfile/:id', validateUser, editProfile);

//productos de usuarios
router.post('/userProducts/:id',validateUser,userProducts);
router.post('/newProduct/:id',newProduct);



//?AGREGO POR MERCADOPAGO
router.post('/create_preference',preferenceMp);

module.exports = router;