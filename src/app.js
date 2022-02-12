const Express = require('express');
const Helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const Cors = require('cors');
const path = require('path');
const http = require('http');
const chalk = require('chalk');
const compression = require('compression');
const Logger = require('morgan');

const { APP_NAME, APP_PORT, NODE_ENV } = require('./config/env');
const { winstonStream, winstonLogger } = require('./config/logger');
const ExpressRateLimit = require('./middlewares/ExpressRateLimit');
const ExpressErrorSequelize = require('./middlewares/ExpressErrorSequelize');
const ExpressErrorResponse = require('./middlewares/ExpressErrorResponse');
const ExpressAutoHandleTransaction = require('./middlewares/ExpressAutoHandleTransaction');
const ResponseError = require('./@doctor-api/modules/ResponseError');
const allowedOrigins = require('./@doctor-api/constants/ConstAllowedOrigin');
const GlobalErrorHandler = require('./@doctor-api/modules/GlobalErrorHandler');
const { logServer } = require('./@doctor-api/helpers/formatter');

const usersRouter = require('./routes/usersRouter');

const optCors = 
{
  origin: allowedOrigins,
}

class App 
{
  application;
  port;

  constructor() 
  {
    this.port = APP_PORT;
    this.application = Express();
    this.plugins();

    this.routes();
  }

  plugins() 
  {
    this.application.use(Helmet());
    this.application.use(Cors(optCors));
    this.application.use(Logger('combined', { stream: winstonStream }));
    this.application.use(Express.urlencoded({ extended: true }));
    this.application.use(Express.json({ limit: '200mb', type: 'application/json' }));
    this.application.use(compression());
    this.application.use(hpp());
    this.application.use(xss());
    this.application.use(process.env.VERSION, ExpressRateLimit);
    this.application.use(Express.static(path.resolve(`${__dirname}/../public`)));
  }

  routes()
  {
    this.application.use(`/${process.env.VERSION}/users`, usersRouter);

    // Catch error 404 endpoint not found
    this.application.use('*', function (req, res)
    {
      throw new ResponseError.NotFound(
        `Sorry, HTTP resource you are looking for was not found.`
      )
    });
  }

  run() 
  {
    // rollback transaction sequelize
    this.application.use(async function handleRollbackTransaction(err, req, res, next)
    {
      try 
      {
        await req.rollbackTransactions();
      } 
      catch (err) {}
      next(err);
    });
    
    this.application.use(GlobalErrorHandler);
    this.application.use(ExpressErrorSequelize);
    this.application.use(ExpressErrorResponse);
    this.application.use(ExpressAutoHandleTransaction);

    this.application.use(function (err, req, res) 
    {
      // Set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development ' ? err : {};
      // Add this line to include winston logging
      winstonLogger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

      // Render the error page
      res.status(err.status || 500);
      res.render('error');
    });

    // setup port
    this.application.set('port', this.port);
    const server = http.createServer(this.application);

    const onError = (error) => 
    {
      console.log(error);
      if (error.syscall !== 'listen') 
      {
        throw error
      }

      const bind =
        typeof this.port === 'string'
          ? `Pipe ${this.port}`
          : `Port ${this.port}`

      // handle specific listen errors with friendly messages
      switch (error.code)
      {
        case 'EACCES':
          console.error(`${bind} requires elevated privileges`)
          process.exit(1);
          break;
        case 'EADDRINUSE':
          console.error(`${bind} is already in use`)
          process.exit(1);
          break;
        default:
          throw error
      }
    }

    const onListening = () => 
    {
      const addr = server.address();
      const bind = typeof addr === 'string' ? `${addr}` : `${addr?.port}`;

      const host = chalk.cyan(`http://localhost:${bind}`);

      const msgType = `${APP_NAME}`;
      const message = `Server listening on ${host} & ENV: ${chalk.blue(NODE_ENV)}`;

      console.log(logServer(msgType, message))
    }

    // Run listener
    server.listen(this.port);
    server.on('error', onError);
    server.on('listening', onListening);
  }

}

module.exports = App;
