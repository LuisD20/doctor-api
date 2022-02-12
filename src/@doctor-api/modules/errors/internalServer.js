const BaseResponse = require('./BaseResponse');

class InternalServer extends BaseResponse 
{
  constructor(message) 
  {
    super(message, 500)
    Object.setPrototypeOf(this, InternalServer.prototype)
  }
}

module.exports = InternalServer;