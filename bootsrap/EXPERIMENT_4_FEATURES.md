# Bootstrap App - Experiment 4 Features

## Overview
This project has been enhanced with advanced React features including React Router, Context API, Reducers, and Performance optimization hooks.

## ✅ Features Implemented

### 1. **React Router** ✓
- Maintained from previous experiments
- 9 total pages (Home, About, Frontend, Backend, UI/UX Design, Data Science, Web Development, Full Stack, Portfolio)
- Smooth navigation between pages

### 2. **useContext** ✓
**Location:** `/src/context/SkillsContext.jsx`

Implements a global context provider with:
- **Theme Management**: Light/Dark mode toggle
- **Favorites System**: Add/remove/clear favorite skills
- **Portfolio Data**: Global profile, experience, and skills data

**Usage in Components:**
- `Portfolio.jsx` - Main portfolio page with theme and favorites
- `favoritesWidget.jsx` - Display favorites in navbar
- `themeToggle.jsx` - Theme toggle button component
- `navbar.jsx` - Navigation with favorites widget

### 3. **useReducer** ✓
**Location:** `/src/context/SkillsContext.jsx`

The `skillsReducer` function manages state with 5 actions:
1. **TOGGLE_THEME** - Switch between light/dark mode
2. **ADD_FAVORITE** - Add skill to favorites (prevents duplicates)
3. **REMOVE_FAVORITE** - Remove individual favorite
4. **CLEAR_FAVORITES** - Clear all favorites at once
5. **UPDATE_PROFILE** - Update portfolio profile information

### 4. **useMemo** ✓
**Location:** `/src/pages/Portfolio.jsx`

Optimized computations include:
```javascript
// 1. Skill Statistics Calculation
const skillStats = useMemo(() => {
  // Calculates total skills, category breakdown, level distribution
}, [portfolio.skills]);

// 2. Favorite Skills Filtering
const favoriteSkills = useMemo(() => {
  // Filters favorites to only include skills
}, [state.favorites]);

// 3. Total Experience Calculation
const totalExperience = useMemo(() => {
  // Counts total experience entries
}, [portfolio.experience]);
```

### 5. **New Portfolio Page** (Experiment 4) ✓
**Location:** `/src/pages/Portfolio.jsx`

A comprehensive portfolio dashboard featuring:

#### Sections:
1. **Hero Section** - Profile introduction with theme toggle
2. **Portfolio Analytics** - 4 key metrics:
   - Total Skills Count
   - Categories Breakdown
   - Experience Roles
   - Favorite Skills Count
3. **Skills by Category** - Visual breakdown of Frontend, Backend, Database skills
4. **Skills Showcase** - Interactive skill cards with favorite toggles
5. **Favorite Skills Display** - Highlighted favorites with quick remove
6. **Professional Experience** - Timeline view of work experience

#### Features:
- ❤️ **Favorites System**: Add/remove skills as favorites (stored in context)
- 🌙 **Dark/Light Theme**: Toggle theme globally
- 📊 **Real-time Analytics**: Stats update as favorites change
- 🎨 **Modern Design**: Gradient backgrounds, smooth animations
- 📱 **Fully Responsive**: Works on mobile and desktop
- ⚡ **Optimized Performance**: Uses useMemo for expensive calculations

## Project Structure

```
src/
├── context/
│   └── SkillsContext.jsx          # Global context & reducer
├── pages/
│   ├── Portfolio.jsx              # New portfolio page (Exp 4)
│   ├── Portfolio.css              # Portfolio styling
│   ├── Home.jsx
│   ├── About.jsx
│   ├── Frontend.jsx
│   ├── Backend.jsx
│   ├── UIUXDesign.jsx
│   ├── DataScience.jsx
│   ├── WebDevelopment.jsx
│   └── FullStack.jsx
├── components/
│   ├── navbar.jsx                 # Updated with Portfolio link & favorites
│   ├── dropdown.jsx               # Updated with Portfolio link
│   ├── favoritesWidget.jsx        # New - displays favorites
│   ├── favoritesWidget.css        # Favorites widget styling
│   ├── themeToggle.jsx            # New - theme toggle button
│   ├── hero.jsx
│   ├── cards.jsx
│   └── cards.css
├── App.jsx                        # Updated with SkillsProvider & Portfolio route
├── App.css
├── custom.css                     # Enhanced custom styles
├── index.css
└── main.jsx
```

## How to Use

### 1. **Navigate to Portfolio**
Click "Portfolio" in navbar or use the dropdown menu to access the new portfolio page.

### 2. **Add/Remove Favorites**
- Click the heart icon (❤️ / 🤍) on any skill card
- Favorites appear in navbar and are highlighted
- Clear all favorites with "Clear All Favorites" button

### 3. **Toggle Theme**
- Use button in Portfolio hero section
- Or use theme toggle button if added to navbar
- Theme preference persists through context

### 4. **View Analytics**
- Portfolio page displays real-time analytics
- Stats update as you add/remove favorites
- All statistics are memoized for performance

## Key Dependencies

```json
{
  "bootstrap": "^5.3.8",
  "react": "^19.2.0",
  "react-bootstrap": "^2.10.10",
  "react-dom": "^19.2.0",
  "react-router-dom": "^7.13.0"
}
```

## Design Highlights

✅ **Consistent Design** - Maintains gradient backgrounds and modern aesthetics from Experiment 3
✅ **Clean Layout** - Proper spacing with consistent typography
✅ **Color Scheme** - Purple/blue gradients with accent colors
✅ **Responsive Design** - Mobile-first approach with media queries
✅ **Interactive Elements** - Smooth transitions and hover effects
✅ **Accessibility** - Semantic HTML and readable typography

## Performance Optimizations

1. **useMemo**: Prevents unnecessary recalculations of:
   - Skill statistics
   - Filtered favorites
   - Experience count

2. **Context**: Centralized state management reduces prop drilling
3. **Component Memoization**: Reducer prevents unnecessary re-renders
4. **CSS Optimization**: Efficient gradients and transitions

## Future Enhancements

- Persist theme preference to localStorage
- Add animations on favorites toggle
- Filter skills by category/level
- Search functionality for skills
- Export portfolio as PDF
- Add project showcase section

---

**Version:** 1.0.0 (Experiment 4)
**Last Updated:** February 2026
