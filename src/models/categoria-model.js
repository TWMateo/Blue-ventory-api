const { DataTypes } = require('sequelize');
const sequelize = require('../Config/dbModel');

const categoria = sequelize.define(
    'tbl_categoria',
    {
        categoria_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        descripcion_categoria: {
            type: DataTypes.STRING(30),
            allownull: true
        }
    },
    {
        timestamps:false,
        freezeTableName: true
    });

module.exports = categoria;