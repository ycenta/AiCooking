// Librairie nécessaire pour pouvoir utiliser l'API OpenAI depuis Node ou un navigateur
import OpenAI from "openai";
import { Router } from 'express'; 
import dotenv from 'dotenv';
import Recipe from '../../models/recipe.js';

dotenv.config();

const router = Router();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

router.get('/', (req, res) => {
  res.send('open api');
});

router.post('/accompagnement', async (req, res) => {
  //Route pour proposer des accompagnements intelligents aux recettes comme du vin,des desserts ou des fromages
  const recette = req.body.recette;

  try {
      const completions = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
              {
                  role: "user",
                  content: "Propose moi au minimum un accompagnement tel que des vins, des fromages ou des desserts pour cette recette : "+recette+" ta réponse doit être au format [\"nom1\", \"nom2\", ...] et uniquement composé de ce tableau, pas de politesse ou de phrases inutile, seulement les noms de recettes, si tu n'a pas d'idée répond avec un tableau vide, ne pose pas de question en retour"
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
                  role: "user",
                  content: "Génère moi une liste de course pour cette recette : "+recette+" ta réponse doit être au format [\"quantity ingredient1\",\"quantity ingredient2\",...] et uniquement composé de ce tableau, pas de politesse ou de phrases inutile, seulement les noms de recettes, si tu n'a pas d'idée répond avec un tableau vide, ne pose pas de question en retour"
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
                    role: "user",
                    content: "Donne moi au moins un nom de recette sililaires à "+recette+" ta réponse doit être au format [\"nom1\", \"nom2\", ...] et uniquement composé de ce tableau, pas de politesse ou de phrases inutile, seulement les noms de recettes, si tu n'a pas d'idée répond avec un tableau vide, ne pose pas de question en retour"
                }
            ]
        });

        res.send(completions.choices);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }

});

router.post('/assistant', async (req, res) => {
    //assistant virtuel qui répond au question qu'on lui pose

    console.log(req.body);
    const message = req.body.message;

    try{
        const completions = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content:"Bonjour, tu es chef étoilé au guide michelin ayant une 15aines d’années d’expérience dans le métier avec plusieurs concours culinaires gagnés à l’internationnal"
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

router.post('/generate-recipe', async (req, res) => {
    const recette = req.body.recette;

    try{
        const completions = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "user",
                    content: "Génère moi une recette qui correspond à cette description : "+recette+" ta réponse doit être au format {\"title\":\"Nom\",\"description\":\"texte\",\"ingredients\":{\"ingredients1\":\"quantity\", \"ingredients2\":\"quantity\"},\"steps\":[\"step1\",\"step2\"]} et uniquement composé de ce tableau, pas de politesse ou de phrases inutile, si tu n'a pas d'idée répond avec un tableau vide, ne pose pas de question en retour"
                }
            ]
        });

        if ( !completions.choices[0].message.content ) {
            res.status(404).send('Try again later');
        } else {
            try {
                const generatedRecipe = completions.choices[0].message.content;

                const parsedRecipe = JSON.parse(generatedRecipe);

                if ( !generatedRecipe ) {
                    res.status(404).send('Try again later');
                } else if ( !parsedRecipe.title || !parsedRecipe.description || !parsedRecipe.ingredients || !parsedRecipe.steps ) {
                    res.status(404).send('Try again later');
                } else {

                    const savedRecipe = await Recipe.create({
                        title: parsedRecipe.title,
                        description: parsedRecipe.description,
                        ingredients: JSON.stringify(parsedRecipe.ingredients),
                        steps: JSON.stringify(parsedRecipe.steps)
                    });

                    res.send(savedRecipe);
                }
            } catch (error) {
                res.status(404).send('Try again later');
            }
        }

        
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }

});

function isJSONString(str) {
    try {
        JSON.parse(str);
        return true;
    } catch (e) {
        return false;
    }
}
        



export default router;
