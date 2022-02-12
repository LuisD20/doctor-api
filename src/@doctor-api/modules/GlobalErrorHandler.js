const AppError = require('./AppError');

const handleCasterrorDB = err =>
{
  const Message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(Message, 400);
}

const handleDuplicateFieldsDB = err =>
{
  const Value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const Message = `Duplicate field value: ${Value}. Please use another value!`;
  return new AppError(Message, 400);
}

const handleValidationerrorDB = err => 
{
  const errors = Object.values(err.errors).map(el => el.message);
  const Message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(Message, 400);
};

const handleJWTerror = () => 
{
    return new AppError('Invalid token please log in', 401);
}

const handleJWTExpires = () =>
{
    new AppError('Your token has expired please login again.', 401);
}

const senderrorDev = (err, res) =>
{
    res
    .status(err.statusCode)
    .json
    (
        {
            status: err.status,
            message: err.message,
            error: err,
            stack: err.stack,
        }
    );
}

const senderrorProd = (err, res) =>
{
    if(err.isOperational)
    {
        res
        .status(err.statusCode)
        .json
        (
            {
                status:err.status,
                message: err.message
            }
        );
    }
    else
    {
        res
        .status(500)
        .json
        (
            {
                status: 'error',
                message: 'Someting went very wrong!'
            }
        );
    }
}

module.exports = (err, req, res, next) =>
{
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if(process.env.NODE_ENV === 'development')
    {
        senderrorDev(err, res);
    }
    else if (process.env.NODE_ENV === 'production')
    {
        let errorProd = err;

        if(errorProd.name === 'Casterror')
        {
            errorProd = handleCasterrorDB(errorProd);
        }
        if(errorProd.name === 'SequelizeUniqueConstrainterror')
        {
            errorProd = handleDuplicateFieldsDB(errorProd);
        }
        if(errorProd.name === 'Validationerror')
        {
            errorProd = handleValidationerrorDB(errorProd);
        }
        if(errorProd.name === 'JsonWebTokenerror')
        {
            errorProd = handleJWTerror();
        }
        if(error.name === 'TokenExpirederror')
        {
            errorProd = handleJWTExpires();
        }
        senderrorProd(errorProd, res);
    }
}