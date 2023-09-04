const server = require('./src/app.js');
const {conn} = require('./src/db.js');
const{
    PORT
} = process.env;

//Sincroniza todos los modelos
conn.sync({force:true}).then(()=>{
    server.listen(PORT, ()=>{
        console.log(`Listen at port ${PORT}`);
    });
});