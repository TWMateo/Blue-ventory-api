const { DataTypes } = require('sequelize')
const sequelize = require('../Config/dbModel')

const rol = sequelize.define('tbl_rol',
{
    rol_id:{
        type:DataTypes.STRING(5),
        primaryKey:true,
        allowNull:true
    },
    nombre_rol:{
        type:DataTypes.STRING(50),
        allowNull:true
    },
    descipcion_rol:{
        type:DataTypes.STRING(200),
        allowNull:true
    },
    salario_rol:{
        type:DataTypes.DECIMAL(5,2)
    }
},
{
    timestamps:false,
    freezeTableName: true
})