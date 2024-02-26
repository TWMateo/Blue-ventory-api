const { DataTypes } = require('sequelize');
const sequelize = require('../Config/dbModel');

const producto = sequelize.define('tbl_producto',
    {
        producto_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        descripcion_producto: {
            type: DataTypes.STRING(200),
            allowNull: true
        },
        precio_venta_producto: {
            type: DataTypes.DECIMAL(4, 2),
            allowNull: true
        },
        path_img_producto: {
            type: DataTypes.STRING(300),
            allowNull: true
        },
        marca_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'tbl_marca',
                key: 'marca_id'
            }
        },
        categoria_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'tbl_categoria',
                key: 'categoria_id'
            }
        },
        talla_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'tbl_talla',
                key: 'talla_id'
            }
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    })

module.exports = producto