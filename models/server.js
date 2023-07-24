const express = require('express');


class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
        this.authorsPath = '/api/authors';
        this.contactsPath = '/api/contacts';
    
     

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    middlewares() {
       
        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio Público
        this.app.use( express.static('public') );

        //URL encoder
        this.app.use(express.urlencoded( { extended:false } ) )
    }

    routes() {
        
        this.app.use( this.authorsPath, require('../routes/authors.routes'));
        this.app.use( this.contactsPath, require('../routes/contacts.routes'));

    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }
}

module.exports = Server;
