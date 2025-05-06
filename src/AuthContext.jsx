import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');

  const login = (name) => {
    setIsAuthenticated(true);
    setUsername(name);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUsername('');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, username }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
