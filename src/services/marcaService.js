const db = require('../models/index')
const Marca = db.tbl_marca

const findAll = async()=>{
    return await Marca.findAll()
}

const findById = async(marca_id)=>{
    return await Marca.findByPk(marca_id)
}

const create = async(datos)=>{
    return await Marca.create(datos)
}

module.exports = {
    findAll,
    findById,
    create
}