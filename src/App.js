import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFound from './pages/NotFound/NotFound';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import AllMovies from './pages/AllMovies/AllMovies';
import NowShowing from './pages/NowShowing/NowShowing';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/all-movies" element={<AllMovies />} />
        <Route path="/now-showing" element={<NowShowing />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;