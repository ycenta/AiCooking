import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { OpenAiProvider } from './contexts/api/OpenAiContext';
import { RecipesProvider } from './contexts/api/RecipesContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <OpenAiProvider>
    <RecipesProvider>
      <App />
    </RecipesProvider>
  </OpenAiProvider>
  </React.StrictMode>
)
