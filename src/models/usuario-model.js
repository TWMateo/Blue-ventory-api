const { DataTypes }  = require('sequelize')
const sequelize = require('../Config/dbModel')

const usuario = sequelize.define('tbl_usuario',
{
    usuario_id:{
        type:DataTypes.STRING(10),
        primaryKey:true,
        allowNull:true
    },
    nombre_usuario:{
        type:DataTypes.STRING(70),
        allowNull:true
    },
    apellido_usuario:{
        type:DataTypes.STRING(70),
        allowNull:true
    },
    contrasena_usuario:{
        type:DataTypes.STRING(250),
        allowNull:true
    },
    rol_id:{
        type:DataTypes.STRING(5),
        allowNull:true,
        references:{
            model:'tbl_rol',
            key:'rol_id'
        }
    }
},
{
    timestamps:false,
    freezeTableName:true
}
)