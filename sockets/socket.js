//Este es mi servidor - Socket server
const { io } = require('../index');

const Band = require('../models/band');
const Bands = require('../models/bands');


const bands = new Bands;

bands.addBand(new Band( 'Moderatto' ));
bands.addBand(new Band( 'Belinda' ));
bands.addBand(new Band( 'Aerosmith' ));
bands.addBand(new Band( 'ACDC' ));


//Mensajes de Sockets
io.on('connection', client => {
    console.log("Cliente conectado");

    client.emit( 'active-bands', bands.getBands() );
    

    client.on('disconnect', () => {
        console.log("Cliente desconectado");
    });

    client.on('mensaje', (payload)=>{
        console.log('Mensaje', payload);

        io.emit( 'mensaje', { admin: 'nuevo mensaje' } );
    });

    client.on ('vote-band',(payload)=>{
        bands.voteBand ( payload.id );
        
        io.emit('active-bands',bands.getBands());
    });

    client.on ('add-band',(payload)=>{
        const newBand = new Band( payload.name);
        bands.addBand ( newBand );
        
        io.emit('active-bands',bands.getBands());
    });

    client.on ('delete-band',(payload)=>{

        bands.deleteBand ( payload.id );

        client.broadcast.emit('active-bands',bands.getBands());
    });


    // client.on('emitir-mensaje',( payload )=> {

    //     //emite a todos
    //    // io.emit('nuevo-mensaje', payload ); 
       
    //    //emite a todos menos al que envío
    //    client.broadcast.emit('nuevo-mensaje', payload ); 
    // });



});