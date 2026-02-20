import React, { createContext, useReducer } from 'react';

// Create the context
export const SkillsContext = createContext();

// Initial state
const initialState = {
  theme: 'light',
  favorites: [],
  portfolio: {
    name: 'Alex Developer',
    title: 'Full Stack Developer',
    bio: 'Passionate about building amazing web applications',
    experience: [
      { id: 1, company: 'Tech Corp', position: 'Senior Developer', year: '2022-2024' },
      { id: 2, company: 'StartUp Inc', position: 'Junior Developer', year: '2020-2022' },
      { id: 3, company: 'Design Studio', position: 'Intern', year: '2019-2020' }
    ],
    skills: [
      { id: 1, name: 'React', category: 'Frontend', level: 'Advanced' },
      { id: 2, name: 'Node.js', category: 'Backend', level: 'Advanced' },
      { id: 3, name: 'JavaScript', category: 'Frontend', level: 'Expert' },
      { id: 4, name: 'MongoDB', category: 'Database', level: 'Intermediate' },
      { id: 5, name: 'CSS/Bootstrap', category: 'Frontend', level: 'Advanced' },
      { id: 6, name: 'Express', category: 'Backend', level: 'Advanced' }
    ]
  }
};

// Reducer function
export const skillsReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_THEME':
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light'
      };
    
    case 'ADD_FAVORITE':
      if (!state.favorites.find(fav => fav.id === action.payload.id)) {
        return {
          ...state,
          favorites: [...state.favorites, action.payload]
        };
      }
      return state;
    
    case 'REMOVE_FAVORITE':
      return {
        ...state,
        favorites: state.favorites.filter(fav => fav.id !== action.payload)
      };
    
    case 'CLEAR_FAVORITES':
      return {
        ...state,
        favorites: []
      };
    
    case 'UPDATE_PROFILE':
      return {
        ...state,
        portfolio: { ...state.portfolio, ...action.payload }
      };
    
    default:
      return state;
  }
};

// Context Provider Component
export const SkillsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(skillsReducer, initialState);

  return (
    <SkillsContext.Provider value={{ state, dispatch }}>
      {children}
    </SkillsContext.Provider>
  );
};
