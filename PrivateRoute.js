// src/components/PrivateRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

// Make sure this is exported as a functional component
const PrivateRoute = ({ children, role }) => {
  const { isAuthenticated, loading, user } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Check if user has the required role
  if (role && user.role !== role) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;