'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbl_usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.tbl_rol,{
        foreignKey:'rol_id',
        as:'tbl_rol'
      })
      this.hasMany(models.tbl_venta,{
        foreignKey:'usuario_id',
        as:'tbl_venta'
      })
      this.hasMany(models.tbl_compra,{
        foreignKey:'usuario_id',
        as:'tbl_compra'
      })
    }
  }
  tbl_usuario.init({
    usuario_id: {
      type: DataTypes.STRING(10),
      primaryKey: true,
      allowNull: true
    },
    nombre_usuario: {
      type: DataTypes.STRING(70),
      allowNull: true
    },
    apellido_usuario: {
      type: DataTypes.STRING(70),
      allowNull: true
    },
    contrasena_usuario: {
      type: DataTypes.STRING(250),
      allowNull: true
    }
  }, {
    sequelize,
    timestamps:false,
    freezeTableName:true,
    modelName: 'tbl_usuario',
  });
  return tbl_usuario;
};