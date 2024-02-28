'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbl_venta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.tbl_usuario, {
        foreignKey: 'usuario_id',
        as: 'tbl_usuario'
      })
      this.belongsTo(models.tbl_cliente, {
        foreignKey: 'cliente_id',
        as: 'tbl_cliente'
      })
      this.hasMany(models.tbl_det_venta, {
        foreignKey: 'venta_id',
        as: 'tbl_det_venta'
      })
    }
  }
  tbl_venta.init({
    venta_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    fecha_venta: {
      type: DataTypes.DATE,
      allowNull: true
    },
    total_venta: {
      type: DataTypes.DECIMAL(4, 2),
      allowNull: true
    },
    usuario_id: {
      type: DataTypes.STRING(10),
      allowNull: true,
      references: {
        model: 'tbl_usuario',
        key: 'usuario_id'
      }
    },
    cliente_id: {
      type: DataTypes.STRING(10),
      allowNull: true,
      references: {
        model: 'tbl_cliente',
        key: 'cliente_id'
      }
    }
  }, {
    sequelize,
    modelName: 'tbl_venta',
  });
  return tbl_venta;
};