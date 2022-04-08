const { response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');


const login = async (req, res = response) => {
    const { correo, password } = req.body;
    try {
        //verificar si emal existe
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario/Password no son correctos'
            })
        }
        //si usuario esta activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario/Password no son correctos - Estado fALSE'
            })
        }

        //verificar la contraseña
        const validPass = bcryptjs.compareSync(password, usuario.password);
        if (!validPass) {
            return res.status(400).json({
                msg: 'Usuario/Password no son correctos - Estado pass'
            })
        }
        //generar JWT
        const token=await generarJWT(usuario.id);
        res.json({
            usuario,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }

}

module.exports = { login }