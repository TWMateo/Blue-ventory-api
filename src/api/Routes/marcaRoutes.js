const express = require('express')
const router = express.Router()

const cors = require('cors')

router.use(cors())

const { getMarca, putMarcaById, postMarca} = require('../Controllers/marcaController')
const { route } = require('./tallaRoutes')

router.get('/api/marca',getMarca)
router.post('/api/marca',postMarca)
router.put('/api/marca',putMarcaById)

module.exports = router