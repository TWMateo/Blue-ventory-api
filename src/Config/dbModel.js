const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('Prueba', 'postgres', '0505', {
    host: 'localhost',
    dialect: 'postgres'
});

module.exports = sequelize;