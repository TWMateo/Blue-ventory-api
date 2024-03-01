const express = require('express');
const { db } = require('../../Config/db');
const { crearErrorJson } = require('../../utils/error-handler')
const categoriaService = require('../../services/categoriaService')

const getCategoria = async (req, res) => {
    try {
        const response = await categoriaService.findAll();
        if (response.length > 0) {
            return res.status(200).json({
                code: 0,
                message: 'Ok',
                response: response
            })
        }
        return res.status(404).json(crearErrorJson('E007'))
    } catch (error) {
        return res.status(400).json(crearErrorJson('E009'))
    }
}

const postCategoria = async (req, res) => {
    let { nombre_categoria } = req.body;
    if (!nombre_categoria || nombre_categoria.length == 0) {
        return res.status(404).json(crearErrorJson('E001', 'nombre_categoria'))
    }
    try {
        const response = await categoriaService.create(req.body)
        return res.status(201).json({
            code: 0,
            message: `Categoría con nombre ${nombre_categoria} creada con exito.`
        })
    } catch (error) {
        return res.status(400).json(crearErrorJson('E009'))
    }
}

const putCategoriaById = async (req, res) => {
    const id = req.query.categoria_id;
    const nombre_categoria = req.query.nombre_categoria;
    console.log(id)
    if (!id || id.length == 0) {
        return res.status(404).json(crearErrorJson('E001','categoria_id'))
    }
    const categoria = await categoriaService.findById(id)
    if (categoria) {
        if (!nombre_categoria || nombre_categoria.length == 0) {
            return res.status(404).json(crearErrorJson('E001','nombre_categoria'))
        }
        try {
            categoria.nombre_categoria = nombre_categoria
            await categoria.save()
            res.json({
                code: 0,
                message: `Nombre de categoría de ropa con id ${id} actualizada con exito a ${nombre_categoria}.`
            })
        } catch (error) {
            res.json(crearErrorJson('E009'))
        }
    } else {
        return res.status(404).json(crearErrorJson('E002', 'categoria_id'))
    }
}

module.exports = {
    getCategoria,
    postCategoria,
    putCategoriaById
}