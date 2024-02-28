const { db } = require('../../Config/db');
const { crearErrorJson } = require('../../utils/error-handler');
const { validarFormatoFecha, validarExistenciaBD, validarStockProductoBD } = require('../../utils/helpers')

const postVenta = async (req, res) => {
    const { fecha_venta, total_venta, detalles_venta } = req.body;
    let msgError = [];

    if (!fecha_venta) {
        msgError.push(crearErrorJson('E001', 'fecha_venta'));
    }
    if (!validarFormatoFecha(fecha_venta)) {
        msgError.push(crearErrorJson('E014', 'fecha_venta', fecha_venta));
    }
    if (!total_venta) {
        msgError.push(crearErrorJson('E001', 'total_venta'));
    }
    if (typeof (total_venta) !== 'number') {
        msgError.push(crearErrorJson('E014', 'total_venta', `"${total_venta}"`))
    }
    if (!detalles_venta || detalles_venta.length === 0) {
        msgError.push(crearErrorJson('E001', 'detalles_venta'));
    } else {
        let repetidos;
        let listaRepetidos = [];
        for (const dc of detalles_venta) {
            if (!await validarExistenciaBD('tbl_producto', 'producto_id', dc['producto_id'])) {
                msgError.push(crearErrorJson('E002', 'producto_id', dc['producto_id']));
            }
            repetidos = detalles_venta.filter(det => det.producto_id === dc['producto_id']);
            if (repetidos.length > 1 && !listaRepetidos.some(lr => lr === dc['producto_id'])) {
                listaRepetidos.push(dc['producto_id']);
                msgError.push(crearErrorJson('E006', 'producto_id', dc['producto_id']));
            }
            let validacionStock = await validarStockProductoBD(dc['producto_id'], dc['cantidad_det_venta']);
            if (!validacionStock && !listaRepetidos.some(lr => lr === dc['producto_id'])) {
                msgError.push(crearErrorJson('E004', 'stock_disponible', dc['cantidad_det_venta'],dc['producto_id']));
            }
            if (!(typeof (dc['venta_id']) === 'number')) {
                msgError.push(crearErrorJson('E014', 'venta_id', `"${dc['venta_id']}"`));
            }
            if (!(typeof (dc['precio_unit_det_venta']) === 'number')) {
                msgError.push(crearErrorJson('E014', 'precio_unit_det_venta', `"${dc['precio_unit_det_venta']}"`));
            }
            if (!(typeof (dc['cantidad_det_venta']) == 'number')) {
                msgError.push(crearErrorJson('E014', 'cantidad_det_venta', `"${dc['cantidad_det_venta']}"`));
            }
            if (!(typeof (dc['total_det_venta']) == 'number')) {
                msgError.push(crearErrorJson('E014', 'total_det_venta', `"${dc['total_det_venta']}"`));
            }
        }
    }

    if (msgError.length > 1) {
        return res.json(msgError);
    }
    if (msgError[0]) {
        return res.json(msgError);
    }
    let venta_id;
    try {
        venta_id = await db.any(`INSERT INTO tbl_venta(fecha_venta,total_venta) VALUES($1,$2) RETURNING venta_id`, [fecha_venta, total_venta]);
    } catch (error) {
        return res.json(crearErrorJson('E009','venta_id'));
    }

    try {
        for (const det of detalles_venta) {
            const response = await db.none(`INSERT INTO tbl_det_venta(producto_id,venta_id,precio_unit_det_venta,cantidad_det_venta,total_det_venta) VALUES($1,$2,$3,$4,$5)`, [det.producto_id, venta_id[0]['venta_id'], det.precio_unit_det_venta, det.cantidad_det_venta, det.total_det_venta]);
            const stockProd = await db.any(`SELECT stock_disponible FROM tbl_producto;`)
            const nuevoStock=stockProd[0]['stock_disponible']-det.cantidad_det_venta;
            const updtStock = await db.none(`UPDATE tbl_producto SET stock_disponible=$2 WHERE producto_id=$1`,[det.producto_id,nuevoStock]);
        }
        return res.json({
            code: 0,
            message: `¡Venta #${venta_id[0]['venta_id']} registrada con éxito!`
        })
    } catch (error) {
        console.log(error)
        return res.json(crearErrorJson('E009','tbl_det_venta'));
    }
}

const getVenta = async(req, res) =>{
    try {
        const data = await db.any('SELECT * FROM tbl_venta;');
        const dataDetalles = await db.any('SELECT * from tbl_det_venta;');
        let response = [];
        for (const dat of data) {
            const cabecera = dat;
            const detalles = dataDetalles.filter(detBuscado => detBuscado.venta_id === dat.venta_id).map(detFiltrado => {
                const { venta_id, ...campos } = detFiltrado;
                return campos;
            });
            response.push({ ...cabecera, detalles: detalles });
        }
        return res.json({
            code: 0,
            data: response
        });
    } catch (error) {
        const errorJson = crearErrorJson('E009');
        return res.json(errorJson);
    }

}

module.exports = {
    postVenta,
    getVenta
}