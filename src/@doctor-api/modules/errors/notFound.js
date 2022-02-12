const BaseResponse = require('./BaseResponse');

class NotFound extends BaseResponse
{
  constructor(message)
  {
    super(message, 404)
    Object.setPrototypeOf(this, NotFound.prototype)
  }
}

module.exports = NotFound;