import { useState, useEffect } from 'react';

const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    // Get the initial theme from localStorage or default to 'light'
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    // Update the document's class and save the theme to localStorage
    document.documentElement.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return { theme, toggleTheme };
};

export default useTheme;