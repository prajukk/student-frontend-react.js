// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      if (localStorage.token) {
        try {
          const config = {
            headers: {
              'x-auth-token': localStorage.token
            }
          };
          
          const res = await axios.get('/api/auth/user', config);
          setUser(res.data);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Load user error:', error);
          localStorage.removeItem('token');
          setUser(null);
          setIsAuthenticated(false);
        }
      }
      
      setLoading(false);
    };
    
    loadUser();
  }, []);

  const login = async (email, password) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/auth/login', { email, password }, config);
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error('Login error details:', error.response ? error.response.data : error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;