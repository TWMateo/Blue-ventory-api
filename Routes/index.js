const express = require('express');
const router = express.Router();
var cors = require('cors');
router.use(cors());

//Variables que llaman a metodos por desestructuración
//de los distintos controles
const{ getMarca, postMarca, putMarcaById } = require('../Controllers/controlador-marca')
const { getCategoria, postCategoria, putCategoriaById } = require('../Controllers/controlador-categoria')
const { getProducto, postProducto, putProducto } = require('../Controllers/controlador-producto');
const { postCompra, getCompra } = require('../Controllers/controlador-compra');
const { postVenta,getVenta } = require('../Controllers/controlador-venta');

//RUTAS
//Marca
router.get('/api/marca',getMarca);
router.post('/api/marca/nuevo', postMarca);
router.put('/api/marca/actualizar',putMarcaById);
//Categoría
router.get('/api/categoria',getCategoria);
router.post('/api/categoria/nuevo',postCategoria);
router.put('/api/categoria/actualizar',putCategoriaById);
//Producto
router.get('/api/producto',getProducto);
router.post('/api/producto/nuevo', postProducto);
router.put('/api/producto/actualizar', putProducto)
//Compra
router.get('/api/compra', getCompra);
router.post('/api/compra/nuevo',postCompra);
//Venta
router.get('/api/venta',getVenta);
router.post('/api/venta/nuevo', postVenta);


module.exports = router;
