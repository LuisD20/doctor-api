const dotenv = require('dotenv');
dotenv.config()

// node env
const NODE_ENV = process.env.NODE_ENV ?? 'development'

// app
const APP_NAME = process.env.APP_NAME ?? 'doctor-api';
const APP_PORT = Number(process.env.APP_PORT) ?? 3000;
const VERSION = process.env.VERSION ?? 'v1';

// rate limit request
const RATE_LIMIT = Number(process.env.RATE_LIMIT) ?? 100

// jwt access
const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN ?? '1d'
const JWT_COOKIE_EXPIRES_IN = process.env.JWT_COOKIE_EXPIRES_IN ?? '1d'

// url sandbox
const URL_CLIENT_DEVELOPMENT = process.env.URL_CLIENT_SANDBOX ?? 'https://sandbox.example.com'
const URL_SERVER_DEVELOPMENT = process.env.URL_SERVER_SANDBOX ?? 'https://api-sandbox.example.com'

// url production
const URL_CLIENT_PRODUCTION = process.env.URL_CLIENT_PRODUCTION ?? 'https://example.com'
const URL_SERVER_PRODUCTION = process.env.URL_SERVER_PRODUCTION ?? 'https://api.example.com'

// database
const DB_DIALECT = process.env.DB_DIALECT ?? 'mysql'
const DB_HOST = process.env.DB_HOST ?? '127.0.0.1'
const DB_PORT = Number(process.env.DB_PORT) ?? 3306
const DB_DATABASE = process.env.DB_DATABASE ?? 'example'
const DB_USERNAME = process.env.DB_USERNAME ?? 'root'
const DB_PASSWORD = process.env.DB_PASSWORD ?? undefined
const DB_OPERATOR_ALIAS = process.env.DB_OPERATOR_ALIAS ?? undefined
const DB_TIMEZONE = process.env.DB_TIMEZONE ?? '+07:00' // for mysql = +07:00, for postgres = Asia/Jakarta

// redis
const REDIS_HOST = process.env.REDIS_HOST ?? '127.0.0.1'
const REDIS_PORT = Number(process.env.REDIS_PORT) ?? 6379
const REDIS_PASSWORD = process.env.REDIS_PASSWORD ?? undefined

module.exports = 
{
    NODE_ENV,
    APP_NAME,
    APP_PORT,
    VERSION,
    RATE_LIMIT,
    JWT_SECRET,
    JWT_EXPIRES_IN,
    JWT_COOKIE_EXPIRES_IN,
    URL_CLIENT_DEVELOPMENT,
    URL_SERVER_DEVELOPMENT,
    URL_CLIENT_PRODUCTION,
    URL_SERVER_PRODUCTION,
    DB_DIALECT,
    DB_HOST,
    DB_PORT,
    DB_DATABASE,
    DB_USERNAME,
    DB_PASSWORD,
    DB_OPERATOR_ALIAS,
    DB_TIMEZONE,
    REDIS_HOST,
    REDIS_PORT,
    REDIS_PASSWORD
}