import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Welcome from './routes/Welcome.jsx';
import Register from './routes/Register.jsx';

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