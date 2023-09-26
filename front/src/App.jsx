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
        <Button style={{backgroundColor: "red", color:"white"}} onClick={() => console.log('test')}/>
      </div>

      <ReceipList/>
    <Receip title="test" calories="test" />

    </>
  )
}

export default App