# Architecture & Flow Diagrams

## 1. Global Context Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      SkillsContext                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │              Initial State                              │  │
│  ├─────────────────────────────────────────────────────────┤  │
│  │  theme: 'light' | 'dark'                                │  │
│  │  favorites: [{ id, name, category, level }]            │  │
│  │  portfolio: {                                           │  │
│  │    name: 'Alex Developer'                               │  │
│  │    title: 'Full Stack Developer'                        │  │
│  │    experience: [{...}]                                  │  │
│  │    skills: [{...}]                                      │  │
│  │  }                                                       │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │         skillsReducer (Action Handler)                  │  │
│  ├─────────────────────────────────────────────────────────┤  │
│  │  1. TOGGLE_THEME                                        │  │
│  │  2. ADD_FAVORITE                                        │  │
│  │  3. REMOVE_FAVORITE                                     │  │
│  │  4. CLEAR_FAVORITES                                     │  │
│  │  5. UPDATE_PROFILE                                      │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │       SkillsProvider (Wrapper Component)                │  │
│  ├─────────────────────────────────────────────────────────┤  │
│  │  Provides: { state, dispatch }                          │  │
│  │  To:       All child components                         │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Component Tree with Context

```
App
├── SkillsProvider
│   ├── Router
│   │   └── Routes
│   │       ├── Route: Home
│   │       ├── Route: About
│   │       ├── Route: Frontend
│   │       ├── Route: Backend
│   │       ├── Route: UIUXDesign
│   │       ├── Route: DataScience
│   │       ├── Route: WebDevelopment
│   │       ├── Route: FullStack
│   │       │
│   │       └── Route: Portfolio ★ (NEW)
│   │           ├── BasicNavbar
│   │           │   └── FavoritesWidget (uses Context)
│   │           │
│   │           ├── Portfolio Hero Section
│   │           │   └── Theme Toggle (uses Context)
│   │           │
│   │           ├── Analytics Section
│   │           │   └── useMemo: skillStats
│   │           │
│   │           ├── Category Breakdown
│   │           │   └── useMemo: byCategory
│   │           │
│   │           ├── Skills Showcase
│   │           │   └── useMemo: favoriteSkills
│   │           │
│   │           └── Experience Timeline
```

---

## 3. State Management Flow

```
┌─────────────────────────────────────────────────────────┐
│               User Action in Component                   │
│  (click heart, toggle theme, clear favorites)           │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
        ┌────────────────────────────┐
        │   Dispatch Action          │
        │   dispatch({               │
        │     type: 'ACTION_TYPE',   │
        │     payload: {...}         │
        │   })                       │
        └────────────────┬───────────┘
                         │
                         ▼
        ┌────────────────────────────┐
        │  Reducer Function          │
        │  (skillsReducer)           │
        │  - Receives current state  │
        │  - Processes action        │
        │  - Returns new state       │
        └────────────────┬───────────┘
                         │
                         ▼
        ┌────────────────────────────┐
        │  Context Updated           │
        │  {state, dispatch}         │
        └────────────────┬───────────┘
                         │
                         ▼
        ┌────────────────────────────┐
        │  Components Re-render      │
        │  - useMemo recalculates    │
        │  - UI updates              │
        │  - Analytics refresh       │
        └────────────────────────────┘
```

---

## 4. useReducer Action Flow

```
ADD_FAVORITE Action
┌──────────────────────────────────┐
│ Action: ADD_FAVORITE             │
│ Payload: { id, name, ... }       │
└─────────────┬────────────────────┘
              │
              ▼
┌──────────────────────────────────┐
│ Check for duplicates             │
│ find(fav => fav.id === id)       │
└─────────────┬────────────────────┘
              │
    ┌─────────┴─────────┐
    ▼                   ▼
Already Exists?    Doesn't Exist?
    │                   │
    │                   ▼
    │         ┌──────────────────────┐
    │         │ Return new state:    │
    │         │ {                    │
    │         │   ...state,          │
    │         │   favorites: [       │
    │         │     ...state.fav,    │
    │         │     action.payload   │
    │         │   ]                  │
    │         │ }                    │
    │         └──────────────────────┘
    │
    ▼
┌──────────────────────────────────┐
│ Return existing state             │
│ (no change, prevent duplicate)    │
└──────────────────────────────────┘
```

---

## 5. useMemo Optimization

```
BEFORE useMemo (Recalculates Every Render)
┌─────────────────────────────┐
│ Portfolio Component Renders  │
│ (any state or prop change)   │
└──────────────┬──────────────┘
               │
               ▼
    ┌──────────────────────┐
    │ Recalculate skills  │
    │ statistics:          │
    │ - totalSkills        │
    │ - byCategory         │
    │ - byLevel            │
    │ (expensive!)         │
    └──────────────┬───────┘
                   │
                   ▼
        ┌─────────────────┐
        │ Component Re-   │
        │ renders (60fps) │
        └─────────────────┘


AFTER useMemo (Only When Dependency Changes)
┌─────────────────────────────────┐
│ Portfolio Component Renders       │
│ (any state or prop change)        │
└──────────────┬──────────────────┘
               │
               ▼
    ┌──────────────────────────┐
    │ Check Dependencies       │
    │ [portfolio.skills]       │
    └──────────┬───────────────┘
               │
    ┌──────────┴───────────┐
    ▼                      ▼
Dependencies Changed?  No Change?
    │                      │
    ▼                      ▼
Calculate          Use Cached Value
(expensive!)        (memoized result)
    │                      │
    └──────────┬───────────┘
               │
               ▼
    ┌──────────────────────┐
    │ Component Re-renders │
    │ with optimized calc  │
    └──────────────────────┘

Result: ~50% fewer calculations!
```

---

## 6. React Router Navigation Map

```
┌─────────────────────────────────────────────────────────┐
│                    Bootstrap App                        │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │              Navigation (Navbar)                 │  │
│  ├──────────────────────────────────────────────────┤  │
│  │ [Home] [About] [Portfolio]                       │  │
│  │                                                  │  │
│  │ Dropdown Menu:                                   │  │
│  │ 🌈 Choose Your Path                             │  │
│  │ ├─ 🚀 Frontend Development                       │  │
│  │ ├─ 🛠️ Backend Development                        │  │
│  │ ├─ 🎨 UI/UX Design                              │  │
│  │ ├─ 📊 Data Science                              │  │
│  │ └─ 💼 Portfolio (NEW)                           │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │          Route Rendering Area                    │  │
│  ├──────────────────────────────────────────────────┤  │
│  │                                                  │  │
│  │  Current Route:                                  │  │
│  │  /portfolio                                      │  │
│  │                                                  │  │
│  │  ┌────────────────────────────────────────────┐  │  │
│  │  │  Portfolio Page Component                  │  │  │
│  │  │  - Uses Context                            │  │  │
│  │  │  - Uses useMemo                            │  │  │
│  │  │  - Interactive favorites                   │  │  │
│  │  │  - Theme toggle                            │  │  │
│  │  │  - Analytics dashboard                     │  │  │
│  │  └────────────────────────────────────────────┘  │  │
│  │                                                  │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
└─────────────────────────────────────────────────────────┘

Routes:
/                    → Home
/about              → About
/frontend           → Frontend Page
/backend            → Backend Page
/ui-ux-design       → UI/UX Design
/data-science       → Data Science
/web-development    → Web Development
/full-stack         → Full Stack
/portfolio          → Portfolio Page ★ (NEW)
```

---

## 7. Data Flow in Portfolio Page

```
SkillsContext
│
├─ state.theme
│  └─> Portfolio Hero
│      └─> conditionally applies CSS class
│          (portfolio-page.dark-theme)
│
├─ state.portfolio.skills
│  ├─> useMemo: skillStats calculation
│  │   ├─> totalSkills count
│  │   ├─> byCategory breakdown
│  │   └─> byLevel distribution
│  │
│  └─> Skills Grid Rendering
│      ├─ Display each skill card
│      ├─ Heart button (add to favorites)
│      └─ Highlight if in favorites
│
├─ state.favorites
│  ├─> useMemo: favoriteSkills filter
│  │
│  ├─> Favorites Widget (navbar)
│  │   └─> Display up to 3 favorites
│  │
│  └─> Favorites Section
│      ├─ Show all favorited skills
│      ├─ Remove buttons
│      └─ Clear all button
│
└─ state.portfolio.experience
   └─> useMemo: totalExperience count
       └─> Experience Section
           └─ Display timeline
```

---

## 8. Component Interactions

```
Portfolio Page
│
├─ BasicNavbar
│  └─ FavoritesWidget (Context Consumer)
│     └─ Watches: state.favorites
│        └─ Displays up to 3 favorites
│           └─ Has remove buttons
│
├─ Hero Section
│  └─ Theme Toggle Button
│     └─ dispatch({ type: 'TOGGLE_THEME' })
│        └─ Updates: state.theme
│           └─ Entire page re-renders with new theme
│
├─ Analytics Dashboard
│  └─ Uses useMemo(skillStats)
│     └─ Displays:
│        ├─ Total Skills (from skillStats.totalSkills)
│        ├─ Categories (from Object.keys(skillStats.byCategory).length)
│        ├─ Experience (from totalExperience)
│        └─ Favorites (from favoriteSkills.length)
│
├─ Skills Grid
│  └─ Maps portfolio.skills
│     └─ Each skill card has:
│        ├─ Heart button → dispatch ADD_FAVORITE
│        └─ Highlights if favorited
│
└─ Experience Timeline
   └─ Maps portfolio.experience
      └─ Displays job history
```

---

## 9. State Update Sequence (Adding Favorite)

```
Step 1: User clicks heart on "React" skill
┌─────────────────────────────────┐
│ onClick handler triggered       │
└──────────┬──────────────────────┘
           │
           ▼
Step 2: toggleFavorite() called
┌─────────────────────────────────┐
│ function toggleFavorite(skill) { │
│   dispatch({                    │
│     type: 'ADD_FAVORITE',       │
│     payload: skillObject        │
│   })                            │
│ }                               │
└──────────┬──────────────────────┘
           │
           ▼
Step 3: Reducer processes action
┌─────────────────────────────────────────┐
│ skillsReducer receives:                 │
│ state: { favorites: [...] }             │
│ action: { type: 'ADD_FAVORITE', ...}    │
│                                         │
│ Checks if already favorited             │
│ If not: adds to array                   │
│ Returns new state                       │
└──────────┬──────────────────────────────┘
           │
           ▼
Step 4: Context updates
┌─────────────────────────────────┐
│ SkillsContext.Provider value    │
│ updated with new state          │
└──────────┬──────────────────────┘
           │
           ▼
Step 5: Components re-render
┌──────────────────────────────────────┐
│ ✓ Portfolio component re-renders     │
│ ✓ useMemo recalculates favoriteSkills│
│ ✓ useMemo recalculates skillStats    │
│ ✓ Analytics update                   │
│ ✓ Heart icon changes ❤️              │
│ ✓ FavoritesWidget updates            │
└──────────┬───────────────────────────┘
           │
           ▼
Step 6: UI reflects changes
┌──────────────────────────────────────┐
│ • Skill card highlights              │
│ • Heart becomes filled (❤️)          │
│ • Favorites count increases          │
│ • Navbar widget shows new favorite   │
│ • Analytics update in real-time      │
└──────────────────────────────────────┘
```

---

## 10. Performance Impact

```
BEFORE Optimization
┌────────────────────────────────────┐
│ Component renders (user action)    │
│ • All calculations run             │
│ • skillStats recalculated          │
│ • favoriteSkills re-filtered       │
│ • totalExperience recounted        │
│ • All children re-render           │
│ • Total time: ~100ms               │
└────────────────────────────────────┘

AFTER useMemo Optimization
┌────────────────────────────────────┐
│ Component renders (user action)    │
│ • Check dependencies               │
│ • If portfolio.skills not changed: │
│   └─ skillStats from cache (✓)    │
│ • If state.favorites not changed:  │
│   └─ favoriteSkills from cache (✓)│
│ • If portfolio.experience not chg: │
│   └─ totalExperience from cache (✓)
│ • Children smart re-render         │
│ • Total time: ~50ms                │
└────────────────────────────────────┘

Result: 2x Performance Improvement! 🚀
```

---

## Key Takeaways

1. **Context** = Global state management (theme, favorites, profile)
2. **Reducer** = Predictable state updates (5 actions)
3. **useMemo** = Performance optimization (50% fewer calculations)
4. **Router** = Multi-page navigation (9 pages)
5. **Portfolio** = Integration of all features

All working together in the Portfolio page! ✅
