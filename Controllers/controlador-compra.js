const { db } = require('../Config/cnn');
const { validarFormatoFecha, validarExistenciaBD} = require('../utils/helpers');
const { crearErrorJson } = require('../middlewares/error-handler');

const postCompra = async (req, res) => {
    const { fecha_compra, total_compra, detalles_compra } = req.body;
    let compra_response;
    let det_producto_id;
    let msgError = [];

    if (!fecha_compra) {
        msgError.push(crearErrorJson('E001', 'fecha_compra'));
    }
    if (!validarFormatoFecha(fecha_compra)) {
        msgError.push(crearErrorJson('E014', 'fecha_compra', fecha_compra));
    }
    if (!total_compra) {
        msgError.push(crearErrorJson('E001', 'total_compra'));
    }
    if (typeof (total_compra) !== 'number') {
        msgError.push(crearErrorJson('E014', 'total_compra', `"${total_compra}"`))
    }
    if (!detalles_compra || detalles_compra.length === 0) {
        msgError.push(crearErrorJson('E001', 'detalles_compra'));
    } else {
        for(const dc of detalles_compra){
            if (!await validarExistenciaBD('tbl_producto', 'producto_id', dc['producto_id'])) {
                msgError.push(crearErrorJson('E002', 'producto_id', dc['producto_id']));
            }
            if(!(typeof(dc['compra_id']) === 'number')){
                msgError.push(crearErrorJson('E014','compra_id',`"${dc['compra_id']}"`));
            }
            if(!(typeof(dc['precio_unit_det_compra']) === 'number')){
                msgError.push(crearErrorJson('E014','precio_unit_det_compra',`"${dc['precio_unit_det_compra']}"`));
            }
            if(!(typeof(dc['cantidad_det_compra'])=='number')){
                msgError.push(crearErrorJson('E014','cantidad_det_compra',`"${dc['cantidad_det_compra']}"`));
            }
        }
    }

    if (msgError.length > 1) {
        return res.json(msgError);
    }
    if (msgError[0]) {
        return res.json(msgError);
    }

    try {
        compra_response = await db.any(`INSERT INTO tbl_compra(fecha_compra,total_compra) VALUES($1,$2) RETURNING compra_id`,[fecha_compra,total_compra]);  
    } catch (error) {
        return res.json(crearErrorJson('E009'));
    }

    try {
        for(const dc of detalles_compra) {
            let total_det_compra = dc['precio_unit_det_compra']*dc['cantidad_det_compra'];
            const response = await db.none(`INSERT INTO tbl_det_compra(producto_id,compra_id,precio_unit_det_compra,cantidad_det_compra,total_det_compra) VALUES($1,$2,$3,$4,$5)`,[dc['producto_id'], compra_response[0]['compra_id'], dc['precio_unit_det_compra'], dc['cantidad_det_compra'], total_det_compra]);
        }
        return res.json({
            code: 0,
            message: `¡Compra #${compra_response[0]['compra_id']} registrada con exito!`
        })
    } catch (error) {
        console.log(error)
        return res.json(crearErrorJson('E009'));
    }
}

const getCompra = async (req, res) =>{
    try {
        const data = await db.any('SELECT * FROM tbl_compra;');
        const dataDetalles = await db.any('SELECT * from tbl_det_compra;');
        console.log(dataDetalles);
        // for()
        return res.json({
            code:0,
            data:data
        });
    } catch (error) {
        const errorJson = crearErrorJson('E009');
        return res.json(errorJson);
    }

}

module.exports = {
    postCompra,
    getCompra
}