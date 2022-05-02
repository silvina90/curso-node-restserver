const  validarCampos  = require('../middlwares/validar-campos');
const validarJWT = require('../middlwares/validar-jwt');
const validaRoles = require('../middlwares/validar-roles');
const validarArchivo = require('../middlwares/validar-archivos')

module.exports={
    ...validarCampos,
    ...validarJWT,
    ...validaRoles,
    ...validarArchivo
}