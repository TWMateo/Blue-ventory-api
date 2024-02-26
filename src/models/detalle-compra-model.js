const { DataTypes } = require('sequelize')
const sequelize = require('../Config/dbModel')

const detalleCompra = sequelize.define('tbl_det_compra',
{
    det_compra_id:{
        type:DataTypes.INTEGER,
        allowNull:true,
        primaryKey:true,
        autoIncrement:true
    },
    precio_unit_det_compra:{
        type:DataTypes.DECIMAL(5,2),
        allowNull:true
    },
    cantidad_det_compra:{
        type:DataTypes.INTEGER,
        allowNull:true
    },
    total_det_compra:{
        type:DataTypes.DECIMAL(5,2),
        allowNull:true
    },
    compra_id:{
        type:DataTypes.INTEGER,
        allowNull:true,
        references:{
            model:'tbl_compra',
            key:'compra_id'
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
    timestamps:false,
    freezeTableName:true
})