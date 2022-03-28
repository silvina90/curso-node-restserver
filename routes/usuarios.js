const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet, 
        usuariosPut, 
        usuariosPost, 
        usuariosDelete } = require('../controllers/usuarios');
const { esRolValido, emailExiste, existeUsuarioPorID } = require('../helpers/db-validators');
const { validarCampos } = require('../middlwares/validar-campos');
const Role = require('../models/role');


const router = Router();


router.get('/', usuariosGet);
router.put('/:id',[
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom( existeUsuarioPorID ),
        check('rol').custom( esRolValido ), 
        validarCampos
    ],usuariosPut );


router.post('/',[
        check('nombre', 'el nombre es obligatorio').not().isEmpty(),
        check('password', 'el password es obligatorio(mayor a 6)').isLength({min:6}),
        check('correo', 'el correo no es valido').isEmail(),
        check('correo').custom(emailExiste),
    //    check('rol', 'el rol no es valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        check('rol').custom(esRolValido),
        validarCampos
], usuariosPost);




router.delete('/:id', [
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom( existeUsuarioPorID ),
        validarCampos,
        usuariosDelete]);








module.exports = router;