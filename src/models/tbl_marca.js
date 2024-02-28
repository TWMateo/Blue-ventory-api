'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbl_marca extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.tbl_producto, {
        foreignKey: 'marca_id',
        as: 'tbl_producto'
      })
    }
  }
  tbl_marca.init({
    marca_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre_marca: {
      type: DataTypes.STRING(15)
    }
  }, {
    sequelize,
    modelName: 'tbl_marca',
  });
  return tbl_marca;
};