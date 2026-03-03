import React, { createContext, useState } from 'react';
export const SkillsContext = createContext();

export const SkillsProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const state = { theme };
  const dispatch = (action) => {
    if (action.type === 'TOGGLE_THEME') {
      toggleTheme();
    }
  };

  return (
    <SkillsContext.Provider value={{ state, dispatch }}>
      {children}
    </SkillsContext.Provider>
  );
};
