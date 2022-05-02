const express = require('express');
var cors = require('cors');
const { dbConenection } = require('../database/config');
const fileUpload=require('express-fileupload');

class Server {


    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths={
            auth:'/api/auth',
            buscar:'/api/buscar',
            categorias:'/api/categorias',
            productos:'/api/productos',
            usuarios: '/api/usuarios',
            uploads: '/api/uploads'
            
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
       
        //fileupload - Carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath:true
        }));
    }

    routes() {

        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.buscar, require('../routes/buscar'));
        this.app.use(this.paths.usuarios, require('../routes/usuarios'));
        this.app.use(this.paths.productos, require('../routes/productos'));
        this.app.use(this.paths.categorias, require('../routes/categorias'));
        this.app.use(this.paths.uploads, require('../routes/uploads'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('servidor corriendo en: ', this.port);
        });

    }

}

module.exports = Server;