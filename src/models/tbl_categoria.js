'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbl_categoria extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.tbl_producto, {
        foreignKey: 'categoria_id',
        as: 'tbl_producto'
      })
    }
  }
  tbl_categoria.init({
    categoria_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    nombre_categoria: {
      type: DataTypes.STRING(30)
    }
  }, {
    sequelize,
    timestamps:false,
    freezeTableName:true,
    modelName: 'tbl_categoria',
  });
  return tbl_categoria;
};