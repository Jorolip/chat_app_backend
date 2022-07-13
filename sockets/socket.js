//Este es mi servidor - Socket server
const { comprobarJWT } = require('../helpers/jwt');
const { io } = require('../index');
const { usuarioConectado, usuarioDesconectado, grabarMensaje } = require ('../controllers/socket')

//Mensajes de Sockets
io.on('connection', (client) => {
    //cuando conecta
    console.log("Cliente conectado");

    const [valido, uid] = comprobarJWT( client.handshake.headers['x-token']);

    //verificar autenticacion
    if (!valido){return client.disconnect();}

    // cliente Autenticado
    usuarioConectado (uid);

    // Ingresa al usuario a una sala en especifico


    //sala global es la actual, client.id, 
    client.join(uid);

    //Escuchar del cliente
    client.on('mensaje-personal',async (payload)=>{

        //Grabar Mensaje
        await grabarMensaje(payload);

        
        io.to(payload.para).emit('mensaje-personal',payload);
    });



    //cuando desconecta
    client.on('disconnect', () => {
        usuarioDesconectado(uid);
        console.log("Cliente desconectado");
    });

    // client.on('mensaje', (payload)=>{
    //     console.log('Mensaje', payload);

    //     io.emit( 'mensaje', { admin: 'nuevo mensaje' } );
    // });
    
    // io.emit( 'mensaje', { admin: 'nuevo mensaje' } );


   


    // client.on('emitir-mensaje',( payload )=> {

    //     //emite a todos
    //    // io.emit('nuevo-mensaje', payload ); 
       
    //    //emite a todos menos al que envío
    //    client.broadcast.emit('nuevo-mensaje', payload ); 
    // });



});