const { Router } = require('express');
const { check } = require('express-validator');
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias');
const { existeCategoriaPorID } = require('../helpers/db-validators');
const { validarJWT, validarCampos, esAdminRole } = require('../middlwares');



const router = Router();

//obtener  todas las categorias - publico
router.get('/', obtenerCategorias);


//obtener una categoria por id- publico
router.get('/:id',[
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom(existeCategoriaPorID)],
        obtenerCategoria
);


//crear una categoria, - privado
router.post('/', [validarJWT,
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    validarCampos],
    crearCategoria);

//actualizar - privado - cualquiera con token valido
router.put('/:id',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('id').custom( existeCategoriaPorID),
    validarCampos
],actualizarCategoria );
 

//delete - privado - Admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeCategoriaPorID),
    validarCampos
], borrarCategoria)



module.exports = router;