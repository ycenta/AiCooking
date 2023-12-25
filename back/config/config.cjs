require('dotenv').config(); // Import dotenv package to read .env file

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
    host: 'localhost',
    port: 5470,
    dialect: 'postgres'
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
    host: 'localhost',
    port: 5470,
    dialect: 'postgres'
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
    host: 'localhost',
    port: 5470,
    dialect: 'postgres'
  }
};