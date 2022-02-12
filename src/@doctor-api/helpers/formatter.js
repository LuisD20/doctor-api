
const { LOG_SERVER } = require('./../../config/baseURL');
const chalk = require('chalk');

/**
 *
 * @param type
 * @param message
 * @returns
 */

function logServer(type, message) 
{
    const logErr = `${LOG_SERVER} ${chalk.blue(type)} ${message}`
    return logErr
}
  
/**
 *
 * @param type
 * @param message
 * @returns
 */

function logErrServer(type, message) 
{
    const logErr = `${LOG_SERVER} ${chalk.red(type)} ${message}`
    return logErr
}

module.exports =
{
    logServer,
    logErrServer,
}