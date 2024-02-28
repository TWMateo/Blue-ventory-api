'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbl_det_compra extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.tbl_compra, {
        foreignKey: 'compra_id',
        as: 'tbl_compra'
      })
      this.belongsTo(models.tbl_producto, {
        foreignKey: 'producto_id',
        as: 'tbl_producto'
      })
    }
  }
  tbl_det_compra.init({
    det_compra_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true,
      autoIncrement: true
    },
    precio_unit_det_compra: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true
    },
    cantidad_det_compra: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    total_det_compra: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true
    },
    compra_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'tbl_compra',
        key: 'compra_id'
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
    modelName: 'tbl_det_compra',
  });
  return tbl_det_compra;
};