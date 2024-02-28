const db = require('../models/index')
const Categoría = db.tbl_categoria

const getCategoria = async()=>{
    return await Categoría.findAll()
}

module.exports = {
    getCategoria
}