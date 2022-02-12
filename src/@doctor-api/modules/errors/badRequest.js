const BaseResponse = require('./BaseResponse');

class BadRequest extends BaseResponse 
{
  constructor(message) 
  {
    super(message, 400)
    Object.setPrototypeOf(this, BadRequest.prototype)
  }
}

module.exports = BadRequest;