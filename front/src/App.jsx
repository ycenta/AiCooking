import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Welcome from './pages/Welcome.jsx';
import Register from './pages/Register.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;