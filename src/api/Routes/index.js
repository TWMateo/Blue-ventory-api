const express = require('express');
const router = express.Router();
var cors = require('cors');
router.use(cors());

//Variables que llaman a metodos por desestructuración
//de los distintos controles
const { getProducto, postProducto, putProducto, getProductByDescription } = require('../Controllers/productoController');
const { postCompra, getCompra } = require('../Controllers/compraController');
const { postVenta,getVenta } = require('../Controllers/ventaController');

//RUTAS
//Producto
router.get('/api/producto',getProducto);
router.post('/api/producto/nuevo', postProducto);
router.post('/api/productos-por-descripcion',getProductByDescription)
router.put('/api/producto/actualizar', putProducto)
//Compra
router.get('/api/compra', getCompra);
router.post('/api/compra/nuevo',postCompra);
//Venta
router.get('/api/venta',getVenta);
router.post('/api/venta/nuevo', postVenta);

module.exports = router;
