const db = require('../models/index')
const Categoría = db.tbl_categoria

const findAll = async()=>{
    return await Categoría.findAll()
}

const create = async (datosCategoria)=>{
    return await Categoría.create(datosCategoria)
}

const findById = async (categoriaId)=>{
    return await Categoría.findByPk(categoriaId)
}

module.exports = {
    findAll,
    create,
    findById
}