const { DataTypes } = require('sequelize');
const sequelize = require('../Config/dbModel');

const marca = sequelize.define(
    'tbl_marca',
    {
        marca_id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement: true
        },
        nombre_marca:{
            type: DataTypes.STRING(15)
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    }
)

module.exports = marca