const { DataTypes } = require('sequelize')
const sequelize = require('../Config/dbModel')

const compra = sequelize.define('tbl_compra',{
    compra_id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:true,
        primaryKey:true
    },
    fecha_compra:{
        type:DataTypes.DATE,
        allowNull:true
    },
    total_compra:{
        type:DataTypes.DECIMAL(5,2)
    },
    usuario_id:{
        type:DataTypes.STRING(10),
        allowNull:true,
        references:{
            model:'tbl_usuario',
            key:'usuario_id'
        }
    }
},
{
    timestamps:false,
    freezeTableName: true
})

module.exports = compra