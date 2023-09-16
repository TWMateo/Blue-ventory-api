const { db } = require('../Config/cnn');
const { crearErrorJson } = require('../middlewares/error-handler')

const getProducto = async (req, res) => {
    try {
        let response = await db.any('SELECT * FROM vw_productos');
        return res.json({
            code: 0,
            message: 'Ok',
            response: response
        });
    } catch (error) {
        const msgError = crearErrorJson('E009')
        return res.json({
            code: 'E009',
            message: 'Solicitud no procesable - Error en la base de datos'
        });
    }
}

const postProducto = async (req, res) => {
    const { descripcion_producto, precio_venta, stock_disponible, talla_producto, marca_id, categoria_id } = req.body;
    const marcaId = await db.any('SELECT marca_id FROM tbl_marca');
    const categoriaId = await db.any('SELECT categoria_id from tbl_categoria');
    let msgError;
    if (!descripcion_producto || descripcion_producto.length == 0) {
        msgError = crearErrorJson('E001', 'descripcion_producto');
        return res.json(msgError)
    };
    if (!precio_venta) {
        msgError = crearErrorJson('E001', 'precio_venta');
        return res.json(msgError);
    };
    if (!stock_disponible) {
        msgError = crearErrorJson('E001', 'stock_disponible');
        return res.json(msgError);
    };
    if (!talla_producto || talla_producto.length == 0) {
        msgError = crearErrorJson('E001', 'talla_producto');
        return res.json(msgError);
    };
    if (!marca_id && marcaId[marca_id]) {
        msgError = crearErrorJson('E001', 'marca_id');
        return res.json(msgError);
    };
    if (!marcaId.some(marca => marca.marca_id === marca_id)) {
        msgError = crearErrorJson('E002', 'marca_id', marca_id);
        return res.json(msgError);
    }
    if (!categoria_id && categoriaId[categoria_id]) {
        msgError = crearErrorJson('E001', 'categoria_id');
        return res.json(msgError);
    };
    if (!categoriaId.some(categoria => categoria.categoria_id === categoria_id)) {
        msgError = crearErrorJson('E002', 'categoria_id', categoria_id);
        return res.json(msgError)
    }

    try {
        const response = await db.any(`INSERT INTO tbl_producto (descripcion_producto,precio_venta,stock_disponible,talla_producto,marca_id,categoria_id) VALUES($1,$2,$3,$4,$5,$6) RETURNING producto_id;`, [descripcion_producto, precio_venta, stock_disponible, talla_producto, marca_id, categoria_id]);
        return res.json({
            code: 0,
            message: `Producto con descripción '${descripcion_producto}' registrado con exito.`,
            data:response[0]
        })
    } catch (error) {
        msgError = crearErrorJson('E009');
        return res.json(msgError);
    }
}

const putProducto = async (req, res) => {
    const { producto_id, producto_cambios } = req.body;
    const productoID = await db.any(`SELECT * from tbl_producto WHERE producto_id=${producto_id}`);
    const marcaId = await db.any('SELECT marca_id FROM tbl_marca');
    const categoriaId = await db.any('SELECT categoria_id from tbl_categoria');
    let msgError;
    let peticionSQL = 'UPDATE tbl_producto SET ';
    let cambios = Object.entries(producto_cambios);
    let camposFaltantes = []

    if (!productoID || productoID.length == 0) {
        msgError = crearErrorJson('E002', 'producto_id', producto_id);
        return res.json(msgError);
    }
    if (!cambios && cambios.length > 0) {
        msgError = crearErrorJson('E001', 'producto_cambios');
        return res.json(msgError);
    }
    for (const obj of cambios) {
        if (!obj[1]) {
            let rerror
            rerror = crearErrorJson('E001', obj[0]);
            camposFaltantes.push(rerror);
        } else {
            if (obj[0] === 'categoria_id' && !categoriaId.some(categoria => categoria.categoria_id === obj[1])) {
                let rerror;
                rerror = crearErrorJson('E002', 'categoria_id', obj[1]);
                camposFaltantes.push(rerror);
            }
            if (obj[0] === 'marca_id' && !marcaId.some(marca => marca.marca_id === obj[1])) {
                let rerror;
                rerror = crearErrorJson('E002', 'marca_id', obj[1]);
                camposFaltantes.push(rerror);
            }
            if (obj[0] === 'descripcion_producto') {
                peticionSQL += `${obj[0]} = '${obj[1]}',`
            } else {
                peticionSQL += obj[0] + '=' + obj[1] + ',';
            }
        }
    };

    if (camposFaltantes.length > 1) {
        return res.json({
            code: 'E013',
            message: 'Multiples errores',
            errors: camposFaltantes
        });
    } else {
        if (camposFaltantes.length === 1) {
            return res.json(camposFaltantes[0]);
        }
    }
    try {
        peticionSQL = peticionSQL.slice(0, peticionSQL.length - 1);
        peticionSQL += ` WHERE producto_id=${producto_id};`;
        const response = await db.none(peticionSQL);

        return res.json({
            code: 0,
            message: 'Producto con producto_id ' + producto_id + ' actualizado con éxito.'
        })
    } catch (error) {
        msgError = crearErrorJson('E009');
        return res.json(msgError);
    }
}

module.exports = {
    getProducto,
    postProducto,
    putProducto
}