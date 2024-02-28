'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbl_compra extends Model {
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
      this.hasMany(models.tbl_det_compra, {
        foreignKey: 'compra_id',
        as: 'tbl_det_compra'
      })
    }
  }
  tbl_compra.init({
    compra_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: true,
      primaryKey: true
    },
    fecha_compra: {
      type: DataTypes.DATE,
      allowNull: true
    },
    total_compra: {
      type: DataTypes.DECIMAL(5, 2)
    },
    usuario_id: {
      type: DataTypes.STRING(10),
      allowNull: true,
      references: {
        model: 'tbl_usuario',
        key: 'usuario_id'
      }
    }
  }, {
    sequelize,
    modelName: 'tbl_compra',
  });
  return tbl_compra;
};