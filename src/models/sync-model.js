const sequelize = require('../Config/dbModel')
const categoria = require('./categoria-model')
const talla = require('./talla-model')
const marca = require('./marca-model')
const producto = require('./producto-model')
const rol = require('./rol-model')
const usuario = require('./usuario-model')
const cliente = require('./cliente_model')
const venta = require('./venta-model')
const detalleVenta = require('./detalle-venta-model')
const compra = require('./compra-model')
const detalleCompra = require('./detalle-compra-model')


try {
    sequelize.sync({ force: false })
    console.log('Base de datos sincronizada')
} catch (error) {
    console.log('Error al sincronizar la BDD')
}
