const { db } = require('../Config/cnn');

const validarFormatoFecha = (fecha) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(fecha);
}

const validarExistenciaBD = async (nombreTabla, nombreCampo, valorCampo) => {
    let listaIdProducto = await db.any(`SELECT ${nombreCampo} FROM ${nombreTabla} WHERE ${nombreCampo}=$1`, [valorCampo]);
    if (listaIdProducto.length > 0) {
        return true;
    }
    return false;
}

const validarStockProductoBD = async (idProducto, cantidad) => {
    if (typeof (cantidad) === 'number') {
        const stockBD = await db.any(`SELECT stock_disponible FROM tbl_producto WHERE producto_id=$1`,[idProducto]);
        if(!stockBD){
            return false;
        }
        if(stockBD[0]['stock_disponible']>0 && cantidad<=stockBD[0]['stock_disponible']){
            return true;
        }
    }
    return false;
}

module.exports = {
    validarFormatoFecha,
    validarExistenciaBD,
    validarStockProductoBD
}