const express = require('express');
const { db } = require('../../Config/db');

const getMarca = async (req, res) => {
    try {
        const response = await db.any('SELECT * FROM tbl_marca');
        return res.json({
            code: 0,
            message: 'Ok',
            response: response
        });
    } catch (error) {
        return res.json({ message: error.message })
    }
}

const postMarca = async (req, res) => {
    let { nombre_marca } = req.body;
    if (!nombre_marca || nombre_marca.length == 0) {
        return res.json({
            code: 'E001',
            message: 'Error de validación de entrada - El campo nombre_marca debe ser obligatorio en su peticion'
        });
    }
    try {
        const response = await db.none('INSERT INTO tbl_marca(nombre_marca) VALUES($1)', [nombre_marca]);
        return res.json({
            code: 0,
            message: 'Ok marca creada con exito'
        })
    } catch (error) {
        return res.json({
            code:'E009',
            message:'Solicitud no procesable - Error de base de datos'
        })
    }
}

const putMarcaById = async (req,res)=>{
    let marca_id = req.query.id;
    let nombre_marca = req.query.nombre_marca;
    if(!marca_id || marca_id.length==0){
        return res.json({
            code:'E001',
            message:'Error de validación de entrada - El campo marca_id es obligatorio para hacer la petición.'
        });
    }
    if(!nombre_marca || nombre_marca.length==0){
        return res.json({
            code:'E001',
            message:'Error de validación de entrada - El campo nombre_marca es obligatorio para hacer la petición.'
        })
    }
    try {
        const response = await db.none('UPDATE tbl_marca SET nombre_marca=$2 WHERE marca_id=$1',[marca_id, nombre_marca])
        return res.json({
            code:0,
            message:`El nombre de marca con id ${marca_id} actualizada con exito a ${nombre_marca}.` 
        })   
    } catch (error) {
        return res.json({
            code:'E009',
            message:'Solicitud no procesable - Error en la base de datos.'
        })
    }
}

module.exports = {
    getMarca,
    postMarca,
    putMarcaById
}