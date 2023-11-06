// Librairie nécessaire pour pouvoir utiliser l'API OpenAI depuis Node ou un navigateur
import OpenAI from "openai";
import { Router } from 'express'; // Utilisez l'import destructuré pour extraire Router

const router = Router();
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY
// });

const openai = new OpenAI({
  apiKey: "test"
});


router.get('/', (req, res) => {
  res.send('open api');
});

router.post('/sendmessage', async (req, res) => {


  console.log(req.body);

  const message = req.body.destination;

  try {
      // L'objet qui contient la réponse de l'API OpenAI
      const completions = await openai.chat.completions.create({
          // Le modèle d'intelligence artificielle à utiliser
          model: "gpt-3.5-turbo",
          // L'ensemble de la discussion entre vous et l'API (donc le contexte)
          messages: [
              {
                  // Le rôle, il peut être un des suivants
                  // user : c'est vous qui posez une question
                  // assistant : c'est l'API qui vous répondras
                  // system : c'est la personnalité ainsi que les
                  // détails qui permettant de cadrer la réponse du modèle
                  role: "system",
                  // Le contenu est la valeur pour le rôles
                  // cela peut être une question, une réponse de l'API ou un contexte
                  content: "Tu es chef patissier"
              },
              {
                  role: "user",
                  content: message
              }
          ]
      });

      // L'objet contient un certain nombre de propriétés
      // donc "choices" qui nous intéresse et contient la
      // réponse de l'API à notre question
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
      // L'objet qui contient la réponse de l'API OpenAI
      const completions = await openai.chat.completions.create({
          // Le modèle d'intelligence artificielle à utiliser
          model: "gpt-3.5-turbo",
          // L'ensemble de la discussion entre vous et l'API (donc le contexte)
          messages: [
              {
                  // Le rôle, il peut être un des suivants
                  // user : c'est vous qui posez une question
                  // assistant : c'est l'API qui vous répondras
                  // system : c'est la personnalité ainsi que les
                  // détails qui permettant de cadrer la réponse du modèle
                  role: "system",
                  // Le contenu est la valeur pour le rôles
                  // cela peut être une question, une réponse de l'API ou un contexte
                  content: "Bonjour, quand je vais te donner un pays, tu vas devoir me donner plus d'information sur celui-ci, comme le climat, la population, la monnaie"
              },
              {
                  role: "user",
                  content: message
              }
          ]
      });

      // L'objet contient un certain nombre de propriétés
      // donc "choices" qui nous intéresse et contient la
      // réponse de l'API à notre question
      res.send(completions.choices);
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }

});



export default router;
