import { Router } from "express";
import dotenv from "dotenv";
import { Sequelize } from "sequelize";
dotenv.config();

const router = Router();
const sequelize = new Sequelize(
  "postgres://" +
    process.env.DB_USER +
    ":" +
    process.env.DB_PASSWORD +
    "@localhost:5470/" +
    process.env.DB
);


router.get("/", async (req, res) => {
  try {

    //Je set les models sequelize ici parce que ça marche ici
    const Recipe = sequelize.define("Recipe", {
      title: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
    });

    const recipes = await Recipe.findAll();
    res.json(recipes);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Une erreur est survenue lors de la récupération des recettes." });
  }
});

export default router;