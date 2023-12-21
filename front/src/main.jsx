import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { OpenAiProvider } from './contexts/api/OpenAiContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <OpenAiProvider>
    <App />
  </OpenAiProvider>
  </React.StrictMode>
)
