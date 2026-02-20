# Code Examples - Experiment 4 Implementation

## 1. Global Context with useContext

### File: `src/context/SkillsContext.jsx`

```javascript
import React, { createContext, useReducer } from 'react';

export const SkillsContext = createContext();

const initialState = {
  theme: 'light',
  favorites: [],
  portfolio: {
    name: 'Alex Developer',
    title: 'Full Stack Developer',
    experience: [...],
    skills: [...]
  }
};

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

export const SkillsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(skillsReducer, initialState);

  return (
    <SkillsContext.Provider value={{ state, dispatch }}>
      {children}
    </SkillsContext.Provider>
  );
};
```

---

## 2. Using useContext in Components

### File: `src/components/favoritesWidget.jsx`

```javascript
import React, { useContext } from 'react';
import { SkillsContext } from '../context/SkillsContext';

function FavoritesWidget() {
  const { state, dispatch } = useContext(SkillsContext);

  if (state.favorites.length === 0) {
    return null;
  }

  return (
    <div className="favorites-widget">
      <h6>❤️ Favorites ({state.favorites.length})</h6>
      {state.favorites.map(item => (
        <div key={item.id} className="favorite-item">
          <span>{item.name}</span>
          <button
            onClick={() => dispatch({ 
              type: 'REMOVE_FAVORITE', 
              payload: item.id 
            })}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}

export default FavoritesWidget;
```

---

## 3. useReducer with Multiple Actions

### File: `src/context/SkillsContext.jsx` (Reducer function)

```javascript
// Reducer with 5 different action types
export const skillsReducer = (state, action) => {
  switch (action.type) {
    // Action 1: Toggle theme
    case 'TOGGLE_THEME':
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light'
      };
    
    // Action 2: Add to favorites (with duplicate prevention)
    case 'ADD_FAVORITE':
      if (!state.favorites.find(fav => fav.id === action.payload.id)) {
        return {
          ...state,
          favorites: [...state.favorites, action.payload]
        };
      }
      return state;
    
    // Action 3: Remove from favorites
    case 'REMOVE_FAVORITE':
      return {
        ...state,
        favorites: state.favorites.filter(fav => fav.id !== action.payload)
      };
    
    // Action 4: Clear all favorites
    case 'CLEAR_FAVORITES':
      return {
        ...state,
        favorites: []
      };
    
    // Action 5: Update profile info
    case 'UPDATE_PROFILE':
      return {
        ...state,
        portfolio: { ...state.portfolio, ...action.payload }
      };
    
    default:
      return state;
  }
};
```

**Usage Example:**
```javascript
// Dispatch actions from any component
const { dispatch } = useContext(SkillsContext);

// Toggle theme
dispatch({ type: 'TOGGLE_THEME' });

// Add favorite
dispatch({ type: 'ADD_FAVORITE', payload: skillObject });

// Remove favorite
dispatch({ type: 'REMOVE_FAVORITE', payload: skillId });

// Clear all
dispatch({ type: 'CLEAR_FAVORITES' });

// Update profile
dispatch({ 
  type: 'UPDATE_PROFILE', 
  payload: { name: 'New Name' } 
});
```

---

## 4. useMemo for Performance Optimization

### File: `src/pages/Portfolio.jsx`

```javascript
import { useMemo } from 'react';

function Portfolio() {
  const { state } = useContext(SkillsContext);
  const portfolio = state.portfolio;

  // useMemo 1: Calculate skill statistics
  const skillStats = useMemo(() => {
    const stats = {
      totalSkills: portfolio.skills.length,
      byCategory: {},
      byLevel: {}
    };

    portfolio.skills.forEach(skill => {
      stats.byCategory[skill.category] = 
        (stats.byCategory[skill.category] || 0) + 1;
      stats.byLevel[skill.level] = 
        (stats.byLevel[skill.level] || 0) + 1;
    });

    return stats;
  }, [portfolio.skills]); // Only recalculate when skills change

  // useMemo 2: Filter favorite skills
  const favoriteSkills = useMemo(() => {
    return state.favorites.filter(fav => fav.category);
  }, [state.favorites]); // Only recalculate when favorites change

  // useMemo 3: Count total experience
  const totalExperience = useMemo(() => {
    return portfolio.experience.length;
  }, [portfolio.experience]); // Only recalculate when experience changes

  // Usage in JSX
  return (
    <div>
      <div className="stat-card">
        <div className="stat-number">{skillStats.totalSkills}</div>
        <div className="stat-label">Total Skills</div>
      </div>
      
      <div className="stat-card">
        <div className="stat-number">{Object.keys(skillStats.byCategory).length}</div>
        <div className="stat-label">Categories</div>
      </div>
      
      <div className="stat-card">
        <div className="stat-number">{totalExperience}</div>
        <div className="stat-label">Experience</div>
      </div>
      
      <div className="stat-card">
        <div className="stat-number">{favoriteSkills.length}</div>
        <div className="stat-label">Favorites</div>
      </div>
    </div>
  );
}
```

**Why useMemo?**
- `skillStats`: Complex object calculation is expensive
- `favoriteSkills`: Filtering array on every render is wasteful
- `totalExperience`: Even simple calculations benefit from memoization

---

## 5. Combining All Hooks - Complete Example

### File: `src/pages/Portfolio.jsx` (Simplified)

```javascript
import React, { useContext, useMemo } from 'react';
import { SkillsContext } from '../context/SkillsContext';

function Portfolio() {
  // 1. useContext: Access global state and dispatch
  const { state, dispatch } = useContext(SkillsContext);
  const portfolio = state.portfolio;

  // 2. useMemo: Optimize expensive calculations
  const skillStats = useMemo(() => {
    const stats = {
      totalSkills: portfolio.skills.length,
      byCategory: {},
      byLevel: {}
    };

    portfolio.skills.forEach(skill => {
      stats.byCategory[skill.category] = 
        (stats.byCategory[skill.category] || 0) + 1;
    });

    return stats;
  }, [portfolio.skills]);

  // 3. useMemo: Filter favorites
  const favoriteSkills = useMemo(() => {
    return state.favorites.filter(fav => fav.category);
  }, [state.favorites]);

  // 4. useReducer (via context): Handle state updates
  const toggleFavorite = (skill) => {
    const isFavorited = favoriteSkills.some(fav => fav.id === skill.id);
    if (isFavorited) {
      dispatch({ type: 'REMOVE_FAVORITE', payload: skill.id });
    } else {
      dispatch({ type: 'ADD_FAVORITE', payload: skill });
    }
  };

  const toggleTheme = () => {
    dispatch({ type: 'TOGGLE_THEME' });
  };

  return (
    <div className={`portfolio ${state.theme}`}>
      {/* Hero Section with Theme Toggle */}
      <section className="hero">
        <h1>Portfolio Dashboard</h1>
        <button onClick={toggleTheme}>
          {state.theme === 'light' ? '🌙' : '☀️'}
        </button>
      </section>

      {/* Analytics using useMemo */}
      <section className="analytics">
        <div className="stat">
          <span className="number">{skillStats.totalSkills}</span>
          <span className="label">Total Skills</span>
        </div>
        <div className="stat">
          <span className="number">{favoriteSkills.length}</span>
          <span className="label">Favorites</span>
        </div>
      </section>

      {/* Skills Grid with Favorite Toggle */}
      <section className="skills">
        {portfolio.skills.map(skill => (
          <div key={skill.id} className="skill-card">
            <h5>{skill.name}</h5>
            <button onClick={() => toggleFavorite(skill)}>
              {favoriteSkills.some(fav => fav.id === skill.id) 
                ? '❤️' 
                : '🤍'}
            </button>
          </div>
        ))}
      </section>

      {/* Favorites Display */}
      <section className="favorites">
        <h3>Your Favorite Skills</h3>
        {favoriteSkills.map(skill => (
          <span key={skill.id} className="badge">
            {skill.name}
            <button onClick={() => 
              dispatch({ type: 'REMOVE_FAVORITE', payload: skill.id })
            }>
              ✕
            </button>
          </span>
        ))}
        {favoriteSkills.length > 0 && (
          <button onClick={() => 
            dispatch({ type: 'CLEAR_FAVORITES' })
          }>
            Clear All
          </button>
        )}
      </section>
    </div>
  );
}

export default Portfolio;
```

---

## 6. App.jsx - Wrapping with Provider

### File: `src/App.jsx`

```javascript
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SkillsProvider } from './context/SkillsContext';
import Portfolio from "./pages/Portfolio";
import Home from "./pages/Home";
import About from "./pages/About";
import 'bootstrap/dist/css/bootstrap.min.css';
import './custom.css';

function App() {
  return (
    // Wrap entire app with context provider
    <SkillsProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/portfolio" element={<Portfolio />} />
          {/* Other routes... */}
        </Routes>
      </Router>
    </SkillsProvider>
  );
}

export default App;
```

---

## 7. React Router Navigation

### File: `src/components/navbar.jsx`

```javascript
import { Link } from 'react-router-dom';
import FavoritesWidget from './favoritesWidget';

function BasicNavbar() {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/portfolio">Portfolio</Link>
      
      {/* Component using Context */}
      <FavoritesWidget />
    </nav>
  );
}

export default BasicNavbar;
```

---

## Summary of Hooks Used

| Hook | File | Purpose |
|------|------|---------|
| **useContext** | Multiple components | Access global state (theme, favorites) |
| **useReducer** | SkillsContext.jsx | Manage 5 state-changing actions |
| **useMemo** | Portfolio.jsx | Optimize calculations (stats, filtering) |
| **React Router** | App.jsx, navbar.jsx | Navigate between 9 pages |

**Total Implementation:**
- ✅ 1 Context with Reducer
- ✅ 5 Reducer Actions
- ✅ 3+ useMemo instances
- ✅ 9 pages with routing
- ✅ 1 new Portfolio page
- ✅ 4+ components using context
