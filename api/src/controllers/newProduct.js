const {Products, User} = require('../db.js');

const newProduct = async function(req,res){
    const {id} = req.params;
    const {title,image,description,price,stock,available} = req.body;

    console.log('que tiene id: ', id)
    console.log('que tiene title: ', title)
    console.log('que tiene image: ', image)
    console.log('que tiene description: ', description)
    console.log('que tiene price: ', price)
    console.log('que tiene stock: ', stock)
    console.log('que tiene available: ', available)
    try{
        const newProductData = {title,image,description,price,stock,available};
        const newProduct = await Products.create(newProductData);

        const user = await User.findByPk(id);
        if(!user){
            return res.status(404).json({error:'Usuario no encontrado'});
        }
        await newProduct.setUser(user);

        return res.status(201).json({msg: 'producto creado exitosamente', newProduct})

    }catch(error){
        return res.status(401).send("Error en newProduct: ", error.message);
    }

};

module.exports = newProduct;