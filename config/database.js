const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('b93brvdtiwbghrgrdpj6', 'u3c6rm4ef9ifewft', 'mkEZMNQmbf9W6jjpIk3b', {
  host: 'b93brvdtiwbghrgrdpj6-mysql.services.clever-cloud.com',
  dialect: 'mysql'
});

module.exports = sequelize;
