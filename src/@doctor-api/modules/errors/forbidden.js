const BaseResponse = require('./BaseResponse');

class Forbidden extends BaseResponse 
{
  constructor(message) 
  {
    super(message, 403)
    Object.setPrototypeOf(this, Forbidden.prototype)
  }
}

module.exports = Forbidden;