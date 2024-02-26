const { DataTypes } = require('sequelize')
const sequelize = require('../Config/dbModel')

const cliente = sequelize.define('tbl_cliente',
    {
        cliente_id: {
            type: DataTypes.STRING(10),
            primaryKey: true,
            allowNull: true
        },
        contrasena_cliente: {
            type: DataTypes.STRING(250),
            allowNull: true
        },
        nombre_cliente: {
            type: DataTypes.STRING(70),
            allowNull: true
        },
        apellido_cliente: {
            type: DataTypes.STRING(70),
            allowNull: true
        },
        correo_cliente: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        direccion_cliente: {
            type: DataTypes.STRING(200),
            allowNull: true
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    })

module.exports = cliente