'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tbl_usuario', {
      usuario_id: {
        type: Sequelize.STRING(10),
        primaryKey: true,
        allowNull: true
      },
      nombre_usuario: {
        type: Sequelize.STRING(70),
        allowNull: true
      },
      apellido_usuario: {
        type: Sequelize.STRING(70),
        allowNull: true
      },
      contrasena_usuario: {
        type: Sequelize.STRING(250),
        allowNull: true
      },
      rol_id: {
        type: Sequelize.STRING(5),
        allowNull: true,
        references: {
          model: 'tbl_rol',
          key: 'rol_id'
        }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tbl_usuario');
  }
};