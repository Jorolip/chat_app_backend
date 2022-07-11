//Este es mi servidor - Socket server
const { io } = require('../index');

//Mensajes de Sockets
io.on('connection', client => {
    //cuando conecta
    console.log("Cliente conectado");

    //cuando desconecta
    client.on('disconnect', () => {
        console.log("Cliente desconectado");
    });

    client.on('mensaje', (payload)=>{
        console.log('Mensaje', payload);

        io.emit( 'mensaje', { admin: 'nuevo mensaje' } );
    });
    
    io.emit( 'mensaje', { admin: 'nuevo mensaje' } );


   


    // client.on('emitir-mensaje',( payload )=> {

    //     //emite a todos
    //    // io.emit('nuevo-mensaje', payload ); 
       
    //    //emite a todos menos al que envío
    //    client.broadcast.emit('nuevo-mensaje', payload ); 
    // });



});