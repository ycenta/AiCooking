import { Sequelize, DataTypes, Model } from 'sequelize';
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize("postgres://" +
    process.env.DB_USER +
    ":" +
    process.env.DB_PASSWORD +
    "@localhost:5470/" +
    process.env.DB, {
  dialect: 'postgres',
});

class User extends Model {
  static associate(models) {
    // define association here
  }
}

User.init({
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING // Added password field
}, {
  sequelize,
  modelName: 'User',
});

export default User;