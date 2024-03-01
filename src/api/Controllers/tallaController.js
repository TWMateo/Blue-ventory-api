const tallaService = require('../../services/tallaService')
const { crearErrorJson } = require('../../utils/error-handler')

const getTalla = async (req, res) => {
    try {
        const response = await tallaService.findAll();
        if (response.length > 0) {
            return res.json({
                code: 0,
                message: 'Ok',
                response: response
            });
        }
        return res.status(404).json(crearErrorJson('E007'))
    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}

const posttalla = async (req, res) => {
    let { nombre_talla } = req.body;
    if (!nombre_talla || nombre_talla.length == 0) {
        return res.status(404).json(crearErrorJson('E001', 'nombre_talla'));
    }
    try {
        const response = await tallaService.create(req.body);
        return res.status(201).json({
            code: 0,
            message: 'Ok talla creada con exito'
        })
    } catch (error) {
        return res.status(404).json(crearErrorJson('E009'))
    }
}

const puttallaById = async (req, res) => {
    let talla_id = req.query.talla_id;
    let nombre_talla = req.query.nombre_talla;
    if (!talla_id || talla_id.length == 0) {
        return res.json(crearErrorJson('E001', 'talla_id '));
    }
    const talla = await tallaService.findById(talla_id)
    if (talla) {
        if (!nombre_talla || nombre_talla.length == 0) {
            return res.json(crearErrorJson('E001', 'nombre_talla'))
        }
        try {
            talla.nombre_talla = nombre_talla
            await talla.save()
            return res.json({
                code: 0,
                message: `El nombre de talla con id ${talla_id} actualizada con exito a ${nombre_talla}.`
            })
        } catch (error) {
            console.log(error)
            return res.status(404).json(crearErrorJson('E009'))
        }
    } else {
        return res.status(404).json(crearErrorJson('E002', 'talla_id'))
    }
}

module.exports = {
    getTalla,
    posttalla,
    puttallaById
}