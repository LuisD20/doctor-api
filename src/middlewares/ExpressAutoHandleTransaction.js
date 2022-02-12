const { logErrServer } = require('./../@doctor-api/helpers/formatter');
const { LOG_SERVER } = require('./../config/baseURL');

async function ExpressAutoHandleTransaction(req, res, next)
{
  res.once('finish', () => 
  {
    const { _transaction } = req
    for (let i = 1; i <= Object.keys(_transaction).length; i += 1)
    {
      const txn = _transaction[i];

      if (!txn?.finished)
      {
        const endpoint = req.originalUrl

        const errType = 'Sequelize Error:'
        const message = `endpoint ${endpoint} potentianlly can lead to bug`

        console.log(logErrServer(errType, message))
        console.log(`${LOG_SERVER} AUTO COMMIT!!!`)

        txn.commit()
      }
    }
  })

  next()
}

module.exports = ExpressAutoHandleTransaction;