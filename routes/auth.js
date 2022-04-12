const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSingIn } = require('../controllers/auth');
const { validarCampos } = require('../middlwares/validar-campos');

const router = Router();


router.post('/login',[
    check('correo', 'el correo es obligatorio').isEmail(),
    check('password', 'el password es obligatorio').not().isEmpty(),
    validarCampos], login);

    router.post('/google',[
        check('id_token', 'id_token es necesaro').not().isEmpty(),
        validarCampos], googleSingIn);
    

module.exports=router;