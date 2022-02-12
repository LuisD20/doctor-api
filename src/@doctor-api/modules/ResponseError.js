const BadRequest = require( './errors/badRequest');
const BaseResponse = require( './errors/baseResponse');
const Forbidden = require( './errors/forbidden');
const InternalServer = require( './errors/internalServer');
const NotFound = require( './errors/notFound');
const Unauthorized = require( './errors/unauthorized');

const ResponseError = 
{
  BadRequest,
  BaseResponse,
  Forbidden,
  InternalServer,
  NotFound,
  Unauthorized,
}

module.exports = ResponseError;