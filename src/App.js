import './App.css';
import Home from './pages/Home/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFound from './pages/NotFound/NotFound';
import AllMovies from './pages/AllMovies/AllMovies';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/all-movies" element={<AllMovies />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
    </Router> 
  );
}

export default App;
