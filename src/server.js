const chalk = require('chalk');

const db = require('./models/_instance');
const { DB_DATABASE, DB_DIALECT } = require('./config/env');
const { logServer, logErrServer } = require('./@doctor-api/helpers/formatter');
const App = require('./app');

const Server = new App();

db.sequelize.authenticate()
  .then(() => 
  {
    const dbDialect = chalk.cyan(DB_DIALECT);
    const dbName = chalk.cyan(DB_DATABASE);

    const msgType = `Sequelize`
    const message = `Connection ${dbDialect}: ${dbName} has been established successfully.`;

    console.log(logServer(msgType, message))
  })
  .catch((err) => {
    const dbDialect = chalk.cyan(DB_DIALECT);
    const dbName = chalk.cyan(DB_DATABASE);

    const errType = `Sequelize Error:`;
    const message = `Unable to connect to the database ${dbDialect}: ${dbName}`;

    console.log(logErrServer(errType, message), err)
  });

Server.run();
