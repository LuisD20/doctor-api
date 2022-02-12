const { formatDate } = require('./../@doctor-api/helpers/date');
const path = require('path');
const winston = require('winston');

// define the custom settings for each transport (file, console)
const options = 
{
  file: 
  {
    level: 'error', // error, warn, info, http, verbose, debug, silly
    filename: `${path.resolve('./logs')}/log-${formatDate(new Date())}.log`,
    format: winston.format.json(),
    //handleExceptions: true,
    maxsize: 5 * 1024 * 1024, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console:
  {
    level: 'debug',
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    ),
  },
}

// instantiate a new Winston Logger with the settings defined above
const winstonLogger = winston.createLogger
({
  transports: 
  [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console),
  ],
  exitOnError: false,
});

// create a stream object with a 'write' function that will be used by `morgan`
const winstonStream = 
{
  write: (message) => 
  {
    winstonLogger.info(message)
  },
}

module.exports = { winstonStream, winstonLogger }