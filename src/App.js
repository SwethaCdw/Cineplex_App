import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { getUsername } from './utils/login-utils';
import { ROUTES } from './constants/route-constants';
import { LOADING } from './constants/common-constants';

// Lazy load components
const LazyHome = React.lazy(() => import('./pages/Home/Home'));
const LazyLogin = React.lazy(() => import('./pages/Login/Login'));
const LazyAllMovies = React.lazy(() => import('./pages/AllMovies/AllMovies'));
const LazyNowShowing = React.lazy(() => import('./pages/NowShowing/NowShowing'));
const LazyNotFound = React.lazy(() => import('./pages/NotFound/NotFound'));

// Suspense wrapper for lazy loading
const SuspenseWrapper = ({ children }) => (
  <React.Suspense fallback={LOADING}>
    {children}
  </React.Suspense>
);

function App() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const username = getUsername();
    setUsername(username);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path={ROUTES.HOME} element={<SuspenseWrapper><LazyHome /></SuspenseWrapper>} />
        <Route path={ROUTES.LOGIN} element={<SuspenseWrapper>{username?.length ? <Navigate to={ROUTES.HOME} /> : <LazyLogin />}</SuspenseWrapper>} />
        <Route path={ROUTES.ALL_MOVIES} element={<SuspenseWrapper><LazyAllMovies /></SuspenseWrapper>} />
        <Route element={<ProtectedRoute username={username} />} >
          <Route path={ROUTES.NOW_SHOWING} element={<SuspenseWrapper><LazyNowShowing /></SuspenseWrapper>} />
        </Route>
        <Route path={ROUTES.NOT_FOUND} element={<SuspenseWrapper><LazyNotFound /></SuspenseWrapper>} />
      </Routes>
    </Router>
  );
}

export default App;
