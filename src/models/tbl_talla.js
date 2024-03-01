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
    talla_id:{
      allowNull:false,
      autoIncrement:true,
      primaryKey:true,
      type:DataTypes.INTEGER
    },
    nombre_talla: DataTypes.STRING(10)
  }, {
    sequelize,
    freezeTableName:true,
    timestamps:false,
    modelName: 'tbl_talla',
  });
  return tbl_talla;
};