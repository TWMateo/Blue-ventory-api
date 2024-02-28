'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tbl_cliente', {
      cliente_id: {
        type: Sequelize.STRING(10),
        primaryKey: true,
        allowNull: true
      },
      contrasena_cliente: {
        type: Sequelize.STRING(250),
        allowNull: true
      },
      nombre_cliente: {
        type: Sequelize.STRING(70),
        allowNull: true
      },
      apellido_cliente: {
        type: Sequelize.STRING(70),
        allowNull: true
      },
      correo_cliente: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      direccion_cliente: {
        type: Sequelize.STRING(200),
        allowNull: true
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tbl_cliente');
  }
};