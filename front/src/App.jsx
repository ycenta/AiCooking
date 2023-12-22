import { useState, useContext, useEffect } from 'react'
import './App.css'
import Button from './components/Button'
import SearchBar from './components/SearchBar'
import Receip from './components/Receip'
import ReceipList from './components/ReceipList'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { OpenAiContext } from  './contexts/api/OpenAiContext';
import ChatWindow from './components/ChatWindow';
import Chat from './assets/Chat.jsx';


function App() {
  const [receips, setReceips] = useState([])
  const ingredientsRandom = [{text: "testingredient1"}, {text: "testingredient2"}, {text: "testingredient3"}]
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [recipeContent, setRecipeContent] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { postCourses, openAiResponse } = useContext(OpenAiContext);
  const top100Films = [
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

  return (
    <>
      <div className="mainTitle">
        <h1>Ai Cooking</h1>
      </div>
    <SearchBar/> 
    <Autocomplete
        id="free-solo-demo"
        freeSolo
        options={top100Films.map((option) => option.title)}
        renderInput={(params) => <TextField {...params} label="freeSolo" />}
      />

      <ChatWindow open={isChatOpen} onClose={() => setIsChatOpen(false)} />

      <div className="card">
        <button onClick={() => setReceips((receips) => [...receips, {name: "crepes au chocolat", calories: 100, ingredients: ingredientsRandom}])}>  Add receip</button>
      </div>

      <ReceipList receips={receips} onGenerateList={handleGenerateList} />


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

export default App