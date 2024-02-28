'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbl_cliente extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.tbl_venta, {
        foreignKey: 'cliente_id',
        as: 'tbl_venta'
      })
    }
  }
  tbl_cliente.init({
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
  }, {
    sequelize,
    modelName: 'tbl_cliente',
  });
  return tbl_cliente;
};