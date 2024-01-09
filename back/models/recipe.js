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

class Recipe extends Model {
  static associate(models) {
  }
}

Recipe.init({
  title: DataTypes.STRING,
  description: DataTypes.TEXT,
  ingredients: DataTypes.TEXT,
  steps: DataTypes.TEXT
}, {
  sequelize,
  modelName: 'Recipe',
});

export default Recipe;