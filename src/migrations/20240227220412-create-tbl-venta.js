'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tbl_venta', {
      venta_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      fecha_venta: {
        type: Sequelize.DATE,
        allowNull: true
      },
      total_venta: {
        type: Sequelize.DECIMAL(4, 2),
        allowNull: true
      },
      usuario_id: {
        type: Sequelize.STRING(10),
        allowNull: true,
        references: {
          model: 'tbl_usuario',
          key: 'usuario_id'
        }
      },
      cliente_id: {
        type: Sequelize.STRING(10),
        allowNull: true,
        references: {
          model: 'tbl_cliente',
          key: 'cliente_id'
        }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tbl_venta');
  }
};