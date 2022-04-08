const  validarCampos  = require('../middlwares/validar-campos');
const validarJWT = require('../middlwares/validar-jwt');
const validaRoles = require('../middlwares/validar-roles');

module.exports={
    ...validarCampos,
    ...validarJWT,
    ...validaRoles
}