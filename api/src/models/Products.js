const {DataTypes} = require('sequelize');

module.exports = (sequelize) =>{
    //?DEFINIMOS EL MODELO
    sequelize.define('products',{
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
            allowNull:false,
        },
        description:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        price:{
            type:DataTypes.DECIMAL,
            allowNull:false,
        },
        stock:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        available:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
        }
    })
};