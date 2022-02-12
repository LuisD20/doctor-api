const rateLimit = require('express-rate-limit');

const ExpressRateLimit = rateLimit
(
  {
    max: 200,
    windowMs: 30 * 1000,
    message: 'To many request from this IP, plase try again in a 30 seg'
  }
);

module.exports = ExpressRateLimit;