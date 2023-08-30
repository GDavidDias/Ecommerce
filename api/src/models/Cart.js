const {DataTypes} = require('sequelize');

module.exports = (sequelize) =>{
    //?DEFINIMOS EL MODELO
    sequelize.define('cart',{
        id:{
            type:DataTypes.UUID,
            allowNull:false,
            primaryKey:true,
            defaultValue:DataTypes.UUIDV4
        },
        title:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        image:{
            type:DataTypes.STRING,
            defaultValue:'https://cdn-icons-png.flaticon.com/512/1493/1493693.png'
        },
        description:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        price:{
            type:DataTypes.DECIMAL,
            allowNull:false,
        },
        count:{
            type:DataTypes.INTEGER,
            allowNull:false,
        }
    })
};