
const { format } = require('date-fns');
const { id } = require('date-fns/locale');

const TZ_ID = { locale: id };

/**
 *
 * @param date
 * @returns {string}
 */

const formatDate = (date) => 
{
  return format(new Date(date), 'dd-MM-yyyy', TZ_ID);
}

/**
 *
 * @param date
 * @returns {string}
 */

const formatDateTime = (date) => 
{
  return format(new Date(date), 'dd-MM-yyyy HH:mm:ss', TZ_ID);
}

module.exports = { formatDate, formatDateTime };