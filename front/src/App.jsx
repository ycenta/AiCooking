import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Welcome from './pages/Welcome.jsx';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import Recipe from './pages/Recipe.jsx';
import { AuthProvider } from './contexts/api/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/recipes/:id" element={<Recipe />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;