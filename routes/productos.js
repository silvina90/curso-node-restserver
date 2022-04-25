const { Router } = require('express');
const { check } = require('express-validator');
const { crearProducto, obtenerProductos, obtenerProducto, actualizarProducto, eliminarProducto } = require('../controllers/productos');
const { existeProductoPorID, existeCategoriaPorID } = require('../helpers/db-validators');
const { validarJWT, validarCampos, esAdminRole } = require('../middlwares');

const router = Router();


router.get('/', obtenerProductos);


router.get('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeProductoPorID)],
    obtenerProducto);

router.post('/',[
    validarJWT,
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('categoria','No es un id de Mongo').isMongoId(),
    check('categoria').custom(existeCategoriaPorID),
    validarCampos
], crearProducto);

router.put('/:id',[ 
    validarJWT,
    //check('categoria','No es un id de Mongo').isMongoId(),
    check('id').custom( existeProductoPorID),
    validarCampos], 
    actualizarProducto);

router.delete('/:id',[ 
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeProductoPorID),
    validarCampos],
     eliminarProducto);

module.exports=router;