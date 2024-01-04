import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Welcome from './routes/Welcome.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/welcome" element={<Welcome />} />
      </Routes>
    </Router>
  );
}

export default App;