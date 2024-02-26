const { DataTypes } = require('sequelize')
const sequelize = require('../Config/dbModel')

const detalleVenta = sequelize.define('tbl_det_venta',
    {
        det_venta_id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        cantidad_det_venta:{
            type:DataTypes.INTEGER,
            allowNull:true
        },
        precio_unit_det_venta:{
            type:DataTypes.DECIMAL(4,2),
            allowNull:true
        },
        total_det_venta:{
            type:DataTypes.DECIMAL(4,2),
            allowNull:true
        },
        venta_id:{
            type:DataTypes.INTEGER,
            allowNull:true,
            references:{
                model: 'tbl_venta',
                key:'venta_id'
            }
        },
        producto_id:{
            type:DataTypes.INTEGER,
            allowNull:true,
            references:{
                model:'tbl_producto',
                key:'producto_id'
            }
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    })

module.exports = detalleVenta