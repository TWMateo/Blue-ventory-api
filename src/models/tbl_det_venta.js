'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbl_det_venta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.tbl_venta, {
        foreignKey: 'venta_id',
        as: 'tbl_venta'
      })
      this.belongsTo(models.tbl_producto, {
        foreignKey: 'producto_id',
        as: 'tbl_producto'
      })
    }
  }
  tbl_det_venta.init({
    det_venta_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    cantidad_det_venta: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    precio_unit_det_venta: {
      type: DataTypes.DECIMAL(4, 2),
      allowNull: true
    },
    total_det_venta: {
      type: DataTypes.DECIMAL(4, 2),
      allowNull: true
    },
    venta_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'tbl_venta',
        key: 'venta_id'
      }
    },
    producto_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'tbl_producto',
        key: 'producto_id'
      }
    }
  }, {
    sequelize,
    modelName: 'tbl_det_venta',
  });
  return tbl_det_venta;
};