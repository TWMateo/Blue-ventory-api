const express = require('express')
const router = express.Router()

const cors = require('cors')

router.use(cors())

const { getCategoria, postCategoria, putCategoriaById } = require('../Controllers/categoriaController')

router.get('/api/categoria', getCategoria)
router.post('/api/categoria',postCategoria)
router.put('/api/categoria', putCategoriaById)

module.exports = router