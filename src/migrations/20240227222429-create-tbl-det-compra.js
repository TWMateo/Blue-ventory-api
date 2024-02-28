'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tbl_det_compra', {
      det_compra_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        primaryKey: true,
        autoIncrement: true
      },
      precio_unit_det_compra: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: true
      },
      cantidad_det_compra: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      total_det_compra: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: true
      },
      compra_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'tbl_compra',
          key: 'compra_id'
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
    await queryInterface.dropTable('tbl_det_compra');
  }
};