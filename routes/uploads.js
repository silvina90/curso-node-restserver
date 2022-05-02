const { Router } = require('express');
const { check } = require('express-validator');
const { cargarArchivo, actualizarImagen, mostrarImagen, actualizarImagenCloudinary } = require('../controllers/uploads.js');
const { coleccionesPermitidas } = require('../helpers/db-validators.js');

const { validarCampos, validarArchivoSubir } = require('../middlwares');

const router = Router();

router.post('/',validarArchivoSubir, cargarArchivo)
router.put('/:coleccion/:id',[
    validarArchivoSubir,
    check('id', 'el ID debe ser de mongo').isMongoId(),
    check('coleccion').custom(c =>coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], actualizarImagenCloudinary);
//], actualizarImagen);


router.get('/:coleccion/:id',[
    
    check('id', 'el ID debe ser de mongo').isMongoId(),
    check('coleccion').custom(c =>coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], mostrarImagen)


module.exports = router;