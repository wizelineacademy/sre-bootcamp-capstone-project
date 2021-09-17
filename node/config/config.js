const dotenv = require("dotenv");

dotenv.config();

exports.DATABASE = {
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  name: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
};

exports.JWT = {
  secret: process.env.JWT_KEY
};

exports.APP = {
  port: process.env.APP_PORT
};
