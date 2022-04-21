const role = require("../models/role");
const {usuario, categoria} = require("../models");

const esRolValido = async (rol = '') => {
    const existeRol = await role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`el rol ${rol} no esta registrado en la BD`)
    }
}

const emailExiste = async (correo = '') => {
    const existeEmail = await usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`el email ${correo} existe`)
    }
}

const existeUsuarioPorID = async (id = '') => {
    const existeUsuario = await usuario.findById(id)
    if (!existeUsuario) {
        throw new Error(`el ID ${id} no existe`)
    }

}
const existeCategoriaPorID = async (id = '') => {
    const existeCategoria= await categoria.findById(id)
    if (!existeCategoria) {
        throw new Error(`el ID ${id} no existe`)
    }

}



module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorID,
    existeCategoriaPorID
}