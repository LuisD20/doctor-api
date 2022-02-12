const path = require('path');
const Sequelize = require('sequelize');

const optConfig = require(path.resolve(`${__dirname}/../config/config`))

const sequelize = new Sequelize.Sequelize(
  optConfig.database,
  optConfig.username,
  optConfig.password,
  {
    ...optConfig,
    logging: false
  }
)

const db = {
  sequelize,
  Sequelize,
}

module.exports = db;