const express = require('express');
var cors = require('cors');
const { dbConenection } = require('../database/config');
class Server {


    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths={
            auth:'/api/auth',
            categorias:'/api/categorias',
            usuarios: '/api/usuarios'
            
        }
       
        //batabase
        this.conectarDB();

        //MIDDLEWARE
        this.middleware();


        //RUTAS DE MI APLICACION


        this.routes();
    }

    async conectarDB() {
        await dbConenection();

    }

    middleware() {
        this.app.use(cors());
        //parseo y lectura 
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    routes() {

        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.usuarios, require('../routes/usuarios'));
        this.app.use(this.paths.categorias, require('../routes/categorias'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('servidor corriendo en: ', this.port);
        });

    }

}

module.exports = Server;