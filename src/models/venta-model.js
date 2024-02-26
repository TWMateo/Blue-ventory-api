const { DataTypes } = require('sequelize')
const sequelize = require('../Config/dbModel')

const venta = sequelize.define('tbl_venta',
    {
        venta_id: {
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement: true
        },
        fecha_venta: {
            type: DataTypes.DATE,
            allowNull: true
        },
        total_venta: {
            type: DataTypes.DECIMAL(4, 2),
            allowNull: true
        },
        usuario_id:{
            type: DataTypes.STRING(10),
            allowNull:true,
            references:{
                model:'tbl_usuario',
                key:'usuario_id'
            }
        },
        cliente_id:{
            type: DataTypes.STRING(10),
            allowNull:true,
            references:{
                model:'tbl_cliente',
                key:'cliente_id'
            }
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    })

module.exports = venta