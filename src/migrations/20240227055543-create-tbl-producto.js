'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tbl_producto', {
      producto_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      descripcion_producto: {
        type: Sequelize.STRING(200),
        allowNull: true
      },
      precio_venta_producto: {
        type: Sequelize.DECIMAL(4, 2),
        allowNull: true
      },
      path_img_producto: {
        type: Sequelize.STRING(300),
        allowNull: true
      },
      marca_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'tbl_marca',
          key: 'marca_id'
        }
      },
      categoria_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'tbl_categoria',
          key: 'categoria_id'
        }
      },
      talla_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'tbl_talla',
          key: 'talla_id'
        }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tbl_producto');
  }
};