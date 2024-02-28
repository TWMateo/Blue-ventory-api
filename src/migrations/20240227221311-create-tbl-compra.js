'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tbl_compra', {
      compra_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: true,
        primaryKey: true
      },
      fecha_compra: {
        type: Sequelize.DATE,
        allowNull: true
      },
      total_compra: {
        type: Sequelize.DECIMAL(5, 2)
      },
      usuario_id: {
        type: Sequelize.STRING(10),
        allowNull: true,
        references: {
          model: 'tbl_usuario',
          key: 'usuario_id'
        }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tbl_compra');
  }
};