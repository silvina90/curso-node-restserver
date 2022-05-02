const role = require("../models/role");
const {Usuario, Categoria, Producto} = require("../models");

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
    const existeUsuario = await Usuario.findById(id)
    if (!existeUsuario) {
        throw new Error(`el ID ${id} no existe`)
    }

}
const existeCategoriaPorID = async (id = '') => {
    const existeCategoria= await Categoria.findById(id)
    if (!existeCategoria) {
        throw new Error(`el ID ${id} no existe`)
    }

}
const existeProductoPorID = async (id = '') => {
    const existeProducto= await Producto.findById(id)
    if (!existeProducto) {
        throw new Error(`el ID ${id} no existe`)
    }

}

/**
 * Validar Colecciones permitidas
 */
const coleccionesPermitidas=(coleccion='', colecciones=[])=>{

    const incluida=colecciones.includes(coleccion);
    if (!incluida) {
        throw new Error (`La coleccion ${coleccion}no es permitida, ${colecciones}`);
    }
    return true
}





module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorID,
    existeCategoriaPorID,
    existeProductoPorID,
    coleccionesPermitidas
}