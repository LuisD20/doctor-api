const dotEnv = require('dotenv');
dotEnv.config({ path: './.env' });

module.exports = 
{
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT,
  operatorsAliases: process.env.DB_OPERATOR_ALIAS,
  timezone: process.env.DB_TIMEZONE,
}
