const chalk = require('chalk');
const {
    APP_PORT,
    NODE_ENV,
    URL_CLIENT_PRODUCTION,
    URL_CLIENT_DEVELOPMENT,
    URL_SERVER_PRODUCTION,
    URL_SERVER_DEVELOPMENT,
} = require('./env');

const URL_CLIENT = 
{
    development: 'http://localhost:3000',
    sandbox: URL_CLIENT_DEVELOPMENT,
    production: URL_CLIENT_PRODUCTION,
}
  
const URL_SERVER = 
{
    development: `http://localhost:${APP_PORT ?? 8000}`,
    sandbox: URL_SERVER_DEVELOPMENT,
    production: URL_SERVER_PRODUCTION,
}
  
const LOG_SERVER = chalk.green('[server]')
  
// @ts-expect-error
const BASE_URL_CLIENT = URL_CLIENT[NODE_ENV]
  
// @ts-expect-error
const BASE_URL_SERVER = URL_SERVER[NODE_ENV]

module.exports = 
{
    BASE_URL_CLIENT,
    BASE_URL_SERVER,
    LOG_SERVER
}