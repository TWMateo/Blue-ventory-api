const express = require('express');
const { db } = require('../Config/cnn');
const router = express.Router();

//Variables que llaman a metodos por desestructuración
//de los distintos controles
const{ getMarca, postMarca, putMarcaById } = require('../Controllers/controlador-marca')
const { getCategoria, postCategoria, putCategoriaById } = require('../Controllers/controlador-categoria')
const { getProducto, postProducto, putProducto } = require('../Controllers/controlador-producto');
const { postCompra, getCompra } = require('../Controllers/controlador-compra');
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

module.exports = router;
