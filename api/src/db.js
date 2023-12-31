require('dotenv').config();
const {Sequelize, Op} = require('sequelize');
const fs = require('fs');
const path = require('path');
const{
    DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,{
    logging: false,
    native: false,
});

const basename = path.basename(__filename);

//!AGREGA A LOS MODELOS SEQUELIZE Y LOS INSTANCIA

const modelDefiners=[];

//Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });
// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
console.log(sequelize.models);
//const { Recipe , Diet } = sequelize.models;
const {Products} = sequelize.models;
const {User} = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
//Recipe.belongsToMany(Diet,{through: "recipe_diet"});
//Diet.belongsToMany(Recipe,{through: "recipe_diet"});
User.hasMany(Products, {as:'products'});
Products.belongsTo(User,{foreignKey: 'userId'});

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
  Op, //?AGREGO PARA OPERADORES EN SEQUELIZE
};
