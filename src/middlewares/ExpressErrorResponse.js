const ResponseError = require('./../@doctor-api/modules/ResponseError');
const _ = require('lodash');

function generateErrorResponseError(e, code)
{
  return _.isObject(e.message) ? e.message : { code, message: e.message }
}

async function ExpressErrorResponse(err, req, res, next)
{
  if (err instanceof ResponseError.BaseResponse)
  {
    return res
      .status(err.statusCode)
      .json(generateErrorResponseError(err, err.statusCode))
  }
  next(err)
}

module.exports = ExpressErrorResponse;