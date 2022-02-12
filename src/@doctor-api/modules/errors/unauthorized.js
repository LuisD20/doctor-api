const BaseResponse = require('./BaseResponse');

class Unauthorized extends BaseResponse 
{
  constructor(message) 
  {
    super(message, 401)
    Object.setPrototypeOf(this, Unauthorized.prototype)
  }
}

module.exports = Unauthorized;
