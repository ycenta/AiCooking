import { useState, useContext, useEffect } from 'react'
import '../App.css'
import Button from '../components/Button.jsx'
import SearchBar from '../components/SearchBar.jsx'
import Receip from '../components/Receip.jsx'
import ReceipList from '../components/ReceipList.jsx'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { OpenAiContext } from  '../contexts/api/OpenAiContext.jsx';
import { RecipesContext } from  '../contexts/api/RecipesContext.jsx';
import ChatWindow from '../components/ChatWindow.jsx';
import Chat from '../assets/Chat.jsx';
import styles from '../styles/Welcome.module.scss';
import Header from '../components/Header';

function Welcome() {
  const [receips, setReceips] = useState([])
  const ingredientsRandom = [{text: "testingredient1"}, {text: "testingredient2"}, {text: "testingredient3"}]
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [recipeContent, setRecipeContent] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { postCourses, postQuestion, openAiResponse, isChatBotIsLoading, chatBotResponse, postGenerateRecipe, tryAgainLater, generatedRecipe } = useContext(OpenAiContext);
  const { get, getByName, recipe, recipes, isRecipeLoading, isRecipesLoading, recipeNotFound } = useContext(RecipesContext);
  const [search, setSearch] = useState("");
  const recetteReco = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
  ];

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const handleGenerateList = async (recipeName) => {
    console.log("Generating list for recipe:", recipeName);
    setRecipeContent(recipeName);
    const payload = {
      "recette": recipeName
    };
    await postCourses(payload); // Wait for the API call to finish
    handleOpen();
  };

  const handleSearchRecipes = () => {
    console.log("Searching recipes for:", search);
    getByName(search);
    setSearch("");
  };

  const handleGenerateRecipe = async () => {
    const tmp = recipeNotFound;
    const response = await postGenerateRecipe({
      "recette": recipeNotFound
    });
    if ( response ) {
      location.replace('/recipes/'+response);
    }
  }

  useEffect(() => {
    // get();
  }
  , []);


  return (
    <>
      <Header />
      <div className="mainTitle">
        <h1>Ai Cooking</h1>
      </div>
      <Autocomplete
        id="free-solo-demo"
        sx={{ width: '50%', margin: 'auto' }}
        options={recetteReco.map((option) => option.title)}
        value={search}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Rechercher une recette"
            onChange={(e) => setSearch(e.target.value)}
          />
        )}
      />

        <ChatWindow open={isChatOpen} onClose={() => setIsChatOpen(false)} />

      {tryAgainLater && (
        <div className="errorGenerate">We had a problem with the generation of your recipe, please try again later</div>
      )}
      <div className="card">
        <button onClick={handleSearchRecipes}>  Search Recipes </button>
        { recipeNotFound && (
          <div className="recipeNotExists">
            <div className='errorGenerate'>Your recipe '{ recipeNotFound }' doesn't exists in our base you can click on the button below to generate it</div>
            <button onClick={handleGenerateRecipe}>Generate recipe</button>
          </div>
        )}
      </div>

      <ReceipList receips={recipes} onGenerateList={handleGenerateList} />


      <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <pre>{openAiResponse?.message?.content || 'No content available'}</pre>
            {recipeContent}
          </Typography>

          <a className="twitter-share-button"
          href="https://twitter.com/intent/tweet?text=Hello%20world">
        Tweet</a>
        </Box>
      </Modal>


      <button className="chat-bubble" onClick={() => setIsChatOpen(true)}><Chat/>
      </button>

    </>
  )
}

export default Welcome