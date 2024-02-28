'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:*/
    await queryInterface.addColumn('tbl_producto', 'rango_edad_producto', { type: Sequelize.STRING(20), allowNull: true });
    /**/
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:*/
    await queryInterface.removeColumn('tbl_producto', 'rango_edad_producto');
    /**/
  }
};
