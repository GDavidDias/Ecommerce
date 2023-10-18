const {Products, User} = require('../db.js');

const userProducts = async function(req,res){
    console.log('ENTRA A userProducts');
    const {id} = req.params;
    console.log('que trae id: ', id)
    try{
        const allUserProducts = await Products.findAll({
            where: {userId:id},
        })
        // const allUserProducts = await User.findByPk(id,{
        //     include:Products,
        // });
        console.log('que trae allUserProducts: ', allUserProducts);

        if(allUserProducts.length !== 0){
            const filterUserProducts = allUserProducts.map((obj)=>{
                const{id,title,image,description,price,stock} = obj;
                return {id,title,image,description,price,stock}
            });
            console.log('como queda filterUserProducts: ', filterUserProducts);
            return res.status(200).send(filterUserProducts)
        }else{
            console.log('No trajo datos allUserProducts');
            return res.status(404).json({error:'Sin Productos'})
        }


    }catch(error){
        return res.status(404).json({error:"Error en userProducts", error})
    }

};

module.exports = userProducts;