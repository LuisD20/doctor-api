/**
 *  Send response to the client
 * 
 *  @param {Data} data Send to the client
 *  @param {StatusCode} status Code of the status
 *  @param {Res} res
 */

module.exports = (data, statusCode, res) =>
{
    res
    .status(statusCode)
    .json
     (
        {
            status: 'success',
            data
        }
    );
}