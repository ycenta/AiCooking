import { createContext, useState, useEffect } from 'react';
import axios from '../../axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(token));

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email, password) => {
    const response = await axios.post('/user/login', { email, password });
    localStorage.setItem('token', response.data.token);
    setToken(response.data.token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};