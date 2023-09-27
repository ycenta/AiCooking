import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Button from './components/Button'
import SearchBar from './components/SearchBar'
import Receip from './components/Receip'
import ReceipList from './components/ReceipList'


function App() {
  const [count, setCount] = useState(0)
  const [receips, setReceips] = useState([])
  const ingredientsRandom = [{text: "testingredient1"}, {text: "testingredient2"}, {text: "testingredient3"}]

  return (
    <>
      <div className="mainTitle">
        <h1>Ai Cooking</h1>
      </div>
    <SearchBar/> 
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