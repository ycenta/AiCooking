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

router.post('/sendmessage', async (req, res) => {

  console.log(req.body);

  const message = req.body.destination;

  try {
      const completions = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
              {
                  role: "system",
                  content: "Tu es chef patissier"
              },
              {
                  role: "user",
                  content: message
              }
          ]
      });

      res.send(completions.choices);
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }

});




router.post('/moreinformation', async (req, res) => {

  console.log(req.body);
  const message = req.body.moredestination;

  try {
      const completions = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
              {
                  role: "system",
                  content: "Bonjour, quand je vais te donner un pays, tu vas devoir me donner plus d'information sur celui-ci, comme le climat, la population, la monnaie"
              },
              {
                  role: "user",
                  content: message
              }
          ]
      });

      res.send(completions.choices);
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }

});



export default router;
