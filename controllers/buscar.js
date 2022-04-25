const { response } = require('express');
const { ObjectId } = require('mongoose').Types;
const { Usuario, Categoria, Producto } = require('../models');
const categoria = require('../models/categoria');

const coleccionesPemitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
];

const buscarUsuario = async (termino = '', res = response) => {
    esMongoID = ObjectId.isValid(termino);

    if (esMongoID) {
        const usuario = await Usuario.findById(termino);
        return res.json({
            results:(usuario)?[usuario]:[]
        })
    }
    const regexp= new RegExp (termino, 'i')
    const usuarios =await Usuario.find({
        $or:[{nombre: regexp},{correo: regexp}],
        $and :[{estado:true}]
     });
    res.json({
        results: usuarios
    })

}
const buscarCategorias = async (termino = '', res = response) => {
    esMongoID = ObjectId.isValid(termino);

    if (esMongoID) {
        const categoria = await Categoria.findById(termino);
        return res.json({
            results:(categoria)?[categoria]:[]
        })
    }
    const regexp= new RegExp (termino, 'i')
    const categoria =await Categoria.find({nombre: regexp,estado:true});
    res.json({
        results: categoria
    })

}
const buscarProductos = async (termino = '', res = response) => {
    esMongoID = ObjectId.isValid(termino);

    if (esMongoID) {
        const producto = await Producto.findById(termino).populate('categoria', 'nombre');
        return res.json({
            results:(producto)?[producto]:[]
        })
    }
    const regexp= new RegExp (termino, 'i')
    const productos =await Producto.find({nombre: regexp,estado:true})
                           .populate('categoria', 'nombre');
    res.json({
        results: productos
    })

}
const buscar = async (req, res) => {
    const { coleccion, termino } = req.params;
    if (!coleccionesPemitidas.includes(coleccion)) {
        return res.status(400).json({
            msg: `las colecciones permitidas : ${coleccionesPemitidas}`
        })
    }
        switch (coleccion) {
            case 'usuarios':
                buscarUsuario(termino, res);
                break;
            case 'categorias':
                buscarCategorias(termino, res)
                break;
            case 'productos':
                buscarProductos(termino, res)
                break;
            default:
                res.status({
                    msg: 'se olvido hacer la busqueda'
                })
        }
    }


module.exports = {
    buscar
}