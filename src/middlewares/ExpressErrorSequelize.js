const { get } = require('lodash');
const { BaseError, EmptyResultError, ValidationError } = require('sequelize');

const { logErrServer } = require('./../@doctor-api/helpers/formatter');
const { LOG_SERVER } = require('./../config/baseURL');

function msg(message) 
{
  return `Sequelize Error: ${message}`
}

async function ExpressErrorSequelize(err, req, res, next) 
{
  if (err instanceof BaseError) 
  {
    if (err instanceof EmptyResultError) 
    {
      return res.status(404).json({
        code: 404,
        message: msg('Data not found'),
      })
    }

    if (err instanceof ValidationError) 
    {
      const errors = get(err, 'errors', [])
      const errorMessage = get(errors, '0.message', null)

      console.log(logErrServer('Sequelize Error:', errorMessage))

      const dataError = 
      {
        code: 400,
        message: errorMessage
          ? `Validation error: ${errorMessage}`
          : err.message,
        errors: errors.reduce<any>((acc, curVal) => {
          acc[curVal.path] = curVal.message
          return acc
        }, {}),
      }

      console.log(LOG_SERVER, dataError.message, dataError.errors)

      return res.status(400).json(dataError)
    }

    return res.status(500).json({
      code: 500,
      message: msg(err.message),
    })
  }

  next(err)
}

module.exports = ExpressErrorSequelize;