'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbl_talla extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.tbl_producto, {
        foreignKey: 'talla_id',
        as: 'tbl_producto'
      })
    }
  }
  tbl_talla.init({
    nombre_talla: DataTypes.STRING(10)
  }, {
    sequelize,
    modelName: 'tbl_talla',
  });
  return tbl_talla;
};