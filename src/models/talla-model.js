const { DataTypes } = require('sequelize');
const sequelize = require('../Config/dbModel')

const talla = sequelize.define('tbl_talla',
    {
        talla_id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        nombre_talla:{
            type:DataTypes.STRING(10)
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    })

module.exports = talla