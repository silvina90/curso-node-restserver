const express = require('express');
var cors = require('cors');
class Server {


    constructor() {
        this.app = express();
        this.port=process.env.PORT;
        this.usuariosPath='/api/usuarios'

        //MIDDLEWARE
        this.middleware();


        //RUTAS DE MI APLICACION


        this.routes();
    }


    middleware(){
        this.app.use(cors());
        //parseo y lectura 
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    routes() {

        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }
    
    listen(){
        this.app.listen(this.port, ()=>{
            console.log('servidor corriendo en: ', this.port);
        });
        
    }

}

module.exports = Server;