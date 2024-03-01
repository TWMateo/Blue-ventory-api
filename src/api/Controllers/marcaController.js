const { crearErrorJson } = require('../../utils/error-handler')
const marcaService = require('../../services/marcaService')

const getMarca = async (req, res) => {
    try {
        const response = await marcaService.findAll();
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

const postMarca = async (req, res) => {
    let { nombre_marca } = req.body;
    if (!nombre_marca || nombre_marca.length == 0) {
        return res.status(404).json(crearErrorJson('E001', 'nombre_marca'));
    }
    try {
        const response = await marcaService.create(req.body);
        return res.status(201).json({
            code: 0,
            message: 'Ok marca creada con exito'
        })
    } catch (error) {
        return res.status(404).json(crearErrorJson('E009'))
    }
}

const putMarcaById = async (req, res) => {
    let marca_id = req.query.marca_id;
    let nombre_marca = req.query.nombre_marca;
    if (!marca_id || marca_id.length == 0) {
        return res.json(crearErrorJson('E001', 'marca_id '));
    }
    const marca = await marcaService.findById(marca_id)
    //console.log(marca)
    if (marca) {
        if (!nombre_marca || nombre_marca.length == 0) {
            return res.json(crearErrorJson('E001', 'nombre_marca'))
        }
        try {
            marca.nombre_marca = nombre_marca
            await marca.save()
            return res.json({
                code: 0,
                message: `El nombre de marca con id ${marca_id} actualizada con exito a ${nombre_marca}.`
            })
        } catch (error) {
            console.log(error)
            return res.status(404).json(crearErrorJson('E009'))
        }
    } else {
        return res.status(404).json(crearErrorJson('E002', 'marca_id'))
    }
}

module.exports = {
    getMarca,
    postMarca,
    putMarcaById
}