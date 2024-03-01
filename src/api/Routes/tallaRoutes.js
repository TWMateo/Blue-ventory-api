const express = require('express')
const router = express.Router()
var cors = require('cors')

router.use(cors())

const { getTalla, posttalla, puttallaById} = require('../Controllers/tallaController')

router.get('/api/talla',getTalla);
router.post('/api/talla', posttalla)
router.put('/api/talla', puttallaById)

module.exports = router
