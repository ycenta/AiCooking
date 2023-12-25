import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize('postgres://' + process.env.DB_USER + ':' + process.env.DB_PASSWORD + '@localhost:5470/' + process.env.DB);

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }