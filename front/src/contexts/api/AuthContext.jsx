import { createContext, useState } from 'react';
import axios from '../../axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  const login = async (email, password) => {
    const response = await axios.post('/user/login', 
    { 
        email, 
        password
    });
    setToken(response.data.token);
  };

  const logout = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};