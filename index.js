const express = require('express');
const path = require ('path');
require ('dotenv').config();

//app de express
const app = express();

// Lectura y parseo del body
app.use ( express.json() );


//DB config
require ('./database/config').dbConnection();

//Node server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require ('./sockets/socket');



//path publico
const publicPath = path.resolve( __dirname, 'public' );
app.use ( express.static ( publicPath ) );


//Mis Rutas
app.use( '/api/login', require('./routes/auth') );
app.use( '/api/usuarios', require('./routes/usuarios') );
app.use( '/api/mensajes', require('./routes/mensajes') );



server.listen ( process.env.PORT, (err)=>{
    if (err) throw new new Error (err);
    console.log('Servidor corriendo en puerto Ahora con nodemon', process.env.PORT );
});