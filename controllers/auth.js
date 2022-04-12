const { response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');
const { json } = require('express/lib/response');
const usuario = require('../models/usuario');


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
        const token = await generarJWT(usuario.id);
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
const googleSingIn = async (req, res = response) => {
    const { id_token } = req.body;

    try {
        const { correo, nombre, img } = await googleVerify(id_token);

        let usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            //creo usuario
            const data = {
                nombre,
                correo,
                password: ':p',
                img,
                google: true
            }
            usuario = new Usuario(data)
            await usuario.save();
        }
        //si el usurio en DB 
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'hable con el administrador, usuario bloqueado'
            })
        }
        const token = await generarJWT(usuario.id);
        res.json({
            usuario,
            token
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'Token de Google no valido'
        })
    }





}
module.exports = {
    login,
    googleSingIn
}