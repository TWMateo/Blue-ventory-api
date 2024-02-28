'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tbl_rol', {
      rol_id: {
        type: Sequelize.STRING(5),
        primaryKey: true,
        allowNull: true
      },
      nombre_rol: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      descripcion_rol: {
        type: Sequelize.STRING(200),
        allowNull: true
      },
      salario_rol: {
        type: Sequelize.DECIMAL(5, 2)
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tbl_rol');
  }
};