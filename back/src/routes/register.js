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

import { Op } from "sequelize";

router.post('/', (req, res) => {
    // Logique d'enregistrement ici
});