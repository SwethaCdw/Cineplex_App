import React from 'react';
import { Navigate } from 'react-router-dom';
import { getItemFromLocalStorage } from '../../utils/local-storage-utils';

const isAuthenticated = () => {
  return getItemFromLocalStorage('loggedIn') === 'true'; 
};

// ProtectedRoute component
const ProtectedRoute = ({ element: Element }) => {
  return isAuthenticated() ? (
    <Element />
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;