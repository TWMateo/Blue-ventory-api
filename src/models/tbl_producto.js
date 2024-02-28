'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbl_producto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.tbl_marca, {
        foreignKey: 'marca_id',
        as: 'tbl_marca'
      })
      this.belongsTo(models.tbl_categoria, {
        foreignKey: 'categoria_id',
        as: 'tbl_categoria'
      })
      this.belongsTo(models.tbl_talla, {
        foreignKey: 'talla_id',
        as: 'tbl_talla'
      })
      this.hasMany(models.tbl_det_venta, {
        foreignKey: 'producto_id',
        as: 'tbl_det_venta'
      })
      this.hasMany(models.tbl_det_compra, {
        foreignKey: 'producto_id',
        as: 'tbl_det_compra'
      })
    }
  }
  tbl_producto.init({
    producto_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    descripcion_producto: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    precio_venta_producto: {
      type: DataTypes.DECIMAL(4, 2),
      allowNull: true
    },
    path_img_producto: {
      type: DataTypes.STRING(300),
      allowNull: true
    }
  },
    {
      sequelize,
      modelName: 'tbl_producto',
    });
  return tbl_producto;
};