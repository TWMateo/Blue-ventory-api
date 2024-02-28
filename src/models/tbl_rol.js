'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbl_rol extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.tbl_usuario, {
        foreignKey: 'rol_id',
        as: 'tbl_usuario'
      })
    }
  }
  tbl_rol.init({
    rol_id: {
      type: DataTypes.STRING(5),
      primaryKey: true,
      allowNull: true
    },
    nombre_rol: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    descripcion_rol: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    salario_rol: {
      type: DataTypes.DECIMAL(5, 2)
    }
  }, {
    sequelize,
    freezeTableName: true,
    timestamps: false,
    modelName: 'tbl_rol',
  });
  return tbl_rol;
};