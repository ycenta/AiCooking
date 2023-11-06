// Librairie nécessaire pour pouvoir utiliser l'API OpenAI depuis Node ou un navigateur
import OpenAI from "openai";
import { Router } from 'express'; // Utilisez l'import destructuré pour extraire Router
import dotenv from 'dotenv';

const router = Router();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

router.get('/', (req, res) => {
  res.send('open api');
});

router.post('/accompagnement', async (req, res) => {
    //Route pour proposer des accompagnements intelligents aux recettes comme du vin,des desserts ou des fromages

  console.log(req.body);

  const recette = req.body.destination;

  try {
      const completions = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
              {
                  role: "system",
                  content: "Tu es chef de cuisine, ton role est de me proposer un accompagnement intelligent aux recettes que je te fournis, comme du vin, des desserts ou des fromages"
              },
              {
                  role: "user",
                  content: recette
              }
          ]
      });

      res.send(completions.choices);
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }

});


router.post('/get-courses', async (req, res) => {

    //route pour génerer des courses selon les recettes qu'on fourni

  console.log(req.body);
  const recette = req.body.recette;

  try {
      const completions = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
              {
                  role: "system",
                  content: "Bonjour, tu es expert en nourriture, lorsque je vais te donner une recette de cuisine, tu devra me génerer une liste de course intélligente"
              },
              {
                  role: "user",
                  content: recette
              }
          ]
      });

      res.send(completions.choices);
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }

});


router.post('/get-similar-recettes', async (req, res) => {
    //route pour génerer des recettes similaires à celle fournie

    console.log(req.body);
    const recette = req.body.recette;

    try{
        const completions = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content:"Bonjour, tu es export en nourriture, tu vas devoir me donner au moins une recette similaire (en format json) à celle que je t'ai fournie"
                },
                {
                    role: "user",
                    content: recette
                }
            ]
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }

});



export default router;
