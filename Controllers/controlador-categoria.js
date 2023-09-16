const express = require('express');
const { db } = require('../Config/cnn');

const getCategoria = async (req, res) => {
    try {
        const response = await db.any('SELECT * FROM tbl_categoria');
        return res.json({
            code:0,
            message:'Ok',
            response:response
        })
    } catch (error) {
     return res.json({
        code:'E009',
        message:'Solicitud no procesable - Error en   la base datos'
     })   
    }
}

const postCategoria = async (req, res)=>{
    let {nombre_categoria} = req.body;
    if(!nombre_categoria || nombre_categoria.length ==0){
        return res.json({
            code:'E001',
            message:'Error de validación de entrada - El campo nombre_categoria es obligatorio para realizar su solicitud.'
        })
    }
    try {
        const response = await db.none('INSERT INTO tbl_categoria(nombre_categoria) VALUES ($1)',[nombre_categoria]);
        return res.json({
            code:0,
            message:`Categoría con nombre ${nombre_categoria} creada con exito.`
        })
    } catch (error) {
        return res.json({
            code:'E009',
            message:'Solicitud no procesable - Error en la base de datos.'
        })
    }
}

const putCategoriaById = async (req, res) => {
    const id = req.query.id;
    const nombre_categoria = req.query.nombre_categoria;
    if(!id || id.length == 0){
        return res.json({
            code:'E001',
            message:'Error de validación de entrada - El campo id debe ser obligatorio en su solicitud.'
        })
    }
    if(!nombre_categoria || nombre_categoria.length == 0){
        return res.json({
            code:'E001',
            message:'Error de validación de entrada - El campo nombre_categoría debe ser obligatorio en su solicitud.'
        })
    }
    try {
        const response = await db.none('UPDATE tbl_categoria SET nombre_categoria=$2 WHERE categoria_id=$1',[id,nombre_categoria]);
        res.json({
            code:0,
            message:`Nombre de categoría de ropa con id ${id} actualizada con exito a ${nombre_categoria}.`
        })
    } catch (error) {
        res.json({
            code:'E009',
            message:'Solicitud no procesable - Error en la base de datos.'
        })
    }
}

module.exports = {
    getCategoria,
    postCategoria,
    putCategoriaById
}