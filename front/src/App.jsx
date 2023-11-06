import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Button from './components/Button'
import SearchBar from './components/SearchBar'
import Receip from './components/Receip'
import ReceipList from './components/ReceipList'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


function App() {
  const [count, setCount] = useState(0)
  const [receips, setReceips] = useState([])
  const ingredientsRandom = [{text: "testingredient1"}, {text: "testingredient2"}, {text: "testingredient3"}]

  const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
  ];


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

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button onClick={() => setReceips((receips) => [...receips, {name: "test", calories: 100, ingredients: ingredientsRandom}])}>  Add receip</button>
      </div>

      <ReceipList receips={receips}/>

    </>
  )
}

export default App