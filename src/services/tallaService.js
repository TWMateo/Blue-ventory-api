const db = require('../models/index')
const Talla = db.tbl_talla

const findAll = async ()=>{
    return await Talla.findAll()
}

const findById = async (talla_id)=>{
    return await Talla.findByPk(talla_id)
}

const create = async (datos)=>{
    return await Talla.create(datos)
}

module.exports = {
    findAll,
    findById,
    create
}