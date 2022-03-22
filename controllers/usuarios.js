const {response} =require('express');

const usuariosGet =(req, res = response)=>{

    const {q, nombre='no name', appkey}= req.query;
    res.json({
        msg: 'get API - controlador', 
        q,
        nombre,
        appkey
    })
}
const usuariosPost =(req, res = response)=>{
    const {nombre, edad}= req.body;
    res.json({
        
        msg: 'post API - controlador',
        nombre, 
        edad
    })
}
const usuariosPut =(req, res = response)=>{
    const id= req.params.id;
    res.json({
        msg: 'put API - controlador',
        id
    })
}

const usuariosDelete =(req, res = response)=>{
    res.json({
        msg: 'delete API - controlador'
    })
}



module.exports={
    usuariosGet,
    usuariosDelete,
    usuariosPost,
    usuariosPut
}