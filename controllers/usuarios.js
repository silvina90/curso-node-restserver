const { request, response } = require('express');
const bcrypts = require('bcryptjs');
const Usuario = require('../models/usuario');





const usuariosGet = async (req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };
    const [total, usuarios] = await Promise.all([
        usuario.countDocuments(query),
        usuario.find(query)
            .skip(desde)
            .limit(limite)
    ]);

    res.json({
        total,
        usuarios
    })
}
const usuariosPost = async (req, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });


    //encriptar la contraseña
    const salt = bcrypts.genSaltSync();
    usuario.password = bcrypts.hashSync(password, salt);
    //guardar db
    await usuario.save();

    res.json({
        usuario
    })
}
const usuariosPut = async (req, res = response) => {
    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    if (password) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({ usuario })
}

const usuariosDelete = async (req, res = response) => {
    const { id } = req.params
    const usuarioD = await Usuario.findByIdAndUpdate(id, { estado: false });
    const usuarioAutenticado = req.usuario;
    res.json({
        usuarioD

    })
}



module.exports = {
    usuariosGet,
    usuariosDelete,
    usuariosPost,
    usuariosPut
}