'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tbl_det_venta', {
      det_venta_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      cantidad_det_venta: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      precio_unit_det_venta: {
        type: Sequelize.DECIMAL(4, 2),
        allowNull: true
      },
      total_det_venta: {
        type: Sequelize.DECIMAL(4, 2),
        allowNull: true
      },
      venta_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'tbl_venta',
          key: 'venta_id'
        }
      },
      producto_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'tbl_producto',
          key: 'producto_id'
        }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tbl_det_venta');
  }
};