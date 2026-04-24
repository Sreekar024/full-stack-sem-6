# Experiment 9: Complete RBAC System with React Frontend

A comprehensive Role-Based Access Control (RBAC) implementation with a modern React frontend and Spring Boot backend integration.

## 📖 Overview

This experiment demonstrates a complete RBAC system including:
- User authentication and login
- Role-based access control (ADMIN/USER)
- Protected routes and pages
- Session management
- Material UI components
- Bootstrap responsive design
- Axios API integration

---

## 🎯 Objectives

### Primary Goals
1. Build a complete React frontend with authentication
2. Implement role-based routing and access control
3. Create protected routes for different user roles
4. Integrate with Spring Boot backend
5. Use Material UI for professional UI components
6. Implement proper session management

### Secondary Goals
1. Error handling and user feedback
2. Loading states and spinners
3. Responsive and accessible design
4. Clean code structure and best practices
5. Comprehensive documentation

---

## ✨ Features

### Authentication
- ✅ Login form with username/password
- ✅ Backend authentication via REST API
- ✅ Automatic role detection from backend
- ✅ SessionStorage-based session persistence
- ✅ Logout functionality with cleanup

### Authorization
- ✅ Protected routes with role guards
- ✅ ADMIN-only sections
- ✅ USER-only sections
- ✅ Access denied page
- ✅ Automatic redirects based on role

### User Interface
- ✅ Material UI components (Button, Card, TextField, etc.)
- ✅ Bootstrap grid system for layout
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Navigation bar with user info
- ✅ Loading indicators
- ✅ Error alerts and messages

### User Dashboard
- ✅ Profile information display
- ✅ Fetch data from `/api/user/profile`
- ✅ Table-based data presentation
- ✅ User restrictions display

### Admin Dashboard
- ✅ System statistics (dashboard cards)
- ✅ User management table
- ✅ Delete user functionality
- ✅ Fetch from `/api/admin/dashboard` and `/api/admin/users`
- ✅ Confirmation dialogs for destructive actions

### Navigation
- ✅ React Router v6 for SPA routing
- ✅ Protected route component
- ✅ Role-based navigation
- ✅ Navbar with logout button
- ✅ User profile display

---

## 🏗️ Architecture

### Frontend Stack
```
React 18 (Functional Components + Hooks)
├── React Router v6 (Navigation)
├── Context API (Auth State)
├── Material UI 5 (Components)
├── Axios (API Calls)
├── Bootstrap Grid (Layout)
└── CSS Modules (Styling)
```

### Component Structure
```
App.jsx (Main Router)
├── Login.jsx (Public)
├── ProtectedRoute.jsx (Guard)
├── UserDashboard.jsx (USER role)
├── AdminDashboard.jsx (ADMIN role)
├── AccessDenied.jsx (Error)
└── Navbar.jsx (Navigation)
```

### State Management
```
AuthContext (Context API)
├── user (string)
├── role (string)
├── isAuthenticated (boolean)
├── isAdmin (boolean)
├── isUser (boolean)
├── login() (function)
├── logout() (function)
└── error (string)
```

---

## 📦 Dependencies

### Core
- `react` - UI library
- `react-dom` - DOM rendering
- `react-router-dom` - Routing

### UI Components
- `@mui/material` - Material UI components
- `@mui/icons-material` - Material icons
- `@emotion/react` - CSS-in-JS
- `@emotion/styled` - Styled components

### API
- `axios` - HTTP client

### Build
- `vite` - Build tool
- `@vitejs/plugin-react` - React plugin

### Development
- `eslint` - Code linting
- `eslint-plugin-react` - React rules
- `eslint-plugin-react-hooks` - Hooks rules

---

## 🚀 Quick Start

### Installation
```bash
# Navigate to project
cd Experiment-9

# Install dependencies
npm install

# Start development server
npm run dev
```

### Login
Visit `http://localhost:3000` and login with:
- **Admin:** username: `admin`, password: `password123`
- **User:** username: `user`, password: `password123`

---

## 📱 Components Guide

### Login.jsx
**Purpose:** User authentication
**Props:** None (uses context)
**Features:**
- Username/password input fields
- Form validation
- Error messages
- Loading state
- Demo credentials display

```jsx
<Login />  // Usage in routing
```

### UserDashboard.jsx
**Purpose:** User-only dashboard
**Access:** USER role only
**Features:**
- Fetch user profile
- Display profile data in table
- Loading and error states
- Restrictions display

### AdminDashboard.jsx
**Purpose:** Admin-only dashboard
**Access:** ADMIN role only
**Features:**
- System statistics cards
- User management table
- Delete user functionality
- Confirmation dialogs
- User role display

### Navbar.jsx
**Purpose:** Top navigation bar
**Features:**
- Display logged-in user
- Display user role
- Logout button with menu
- Role color indicator

### AccessDenied.jsx
**Purpose:** Unauthorized access page
**Features:**
- Clear message
- Navigation buttons
- Current role display

### ProtectedRoute.jsx
**Purpose:** Route guard for role-based access
**Usage:**
```jsx
<ProtectedRoute requiredRole="ADMIN">
  <AdminDashboard />
</ProtectedRoute>
```

---

## 🔑 Key Functions

### AuthContext
```jsx
const {
  user,              // Current username
  role,              // Current role (ADMIN/USER)
  loading,           // Loading state
  error,             // Error message
  isAuthenticated,   // Boolean
  isAdmin,           // Boolean
  isUser,            // Boolean
  login(),           // Login function
  logout(),          // Logout function
  setError()         // Set error message
} = useAuth();
```

### API Calls
```jsx
// Authentication
authLogin(username, password)  // Returns { user, role }
authLogout()                   // Clears session

// User APIs
getUserProfile()               // Returns user profile
getUserData()                  // Returns user data

// Admin APIs
getAdminDashboard()           // Returns statistics
getAllUsers()                 // Returns users array
deleteUser(userId)            // Deletes user
```

---

## 🔐 Security Features

1. **Session-based Authentication**
   - Credentials stored in sessionStorage
   - Cleared on logout
   - Cleared on 401/403 responses

2. **Protected Routes**
   - Redirect to login if not authenticated
   - Redirect to access denied if wrong role
   - No direct URL access to protected pages

3. **Role-Based Access**
   - Backend determines user role
   - Frontend validates role before rendering
   - UI elements hidden based on role

4. **API Security**
   - Authorization headers attached to requests
   - 401/403 responses handled
   - Automatic logout on unauthorized

---

## 📊 Data Flow

### Login Flow
```
User Input (username/password)
    ↓
Form Validation
    ↓
API Call to /api/auth/login
    ↓
Backend Authentication
    ↓
Response: { user, role }
    ↓
Store in sessionStorage
    ↓
Update AuthContext
    ↓
Redirect to Dashboard (based on role)
```

### Protected Route Flow
```
Navigate to Route
    ↓
ProtectedRoute Component
    ↓
Check isAuthenticated?
    ↓ NO
Redirect to /login
    ↓ YES
Check requiredRole?
    ↓ NO MATCH
Redirect to /access-denied
    ↓ MATCH
Render Protected Component
```

### API Call Flow
```
Component mounted / User action
    ↓
Call API function
    ↓
Axios interceptor adds headers
    ↓
Send request to backend
    ↓
Backend validates role
    ↓
Response: Data or Error
    ↓
Handle success/error in component
    ↓
Update UI / Show message
```

---

## 🎨 UI/UX Design

### Design System
- **Primary Color:** #1976d2 (Blue)
- **Secondary Color:** #dc004e (Pink)
- **Error Color:** #f44336 (Red)
- **Success Color:** #4caf50 (Green)
- **Background:** #f5f5f5 (Light Gray)

### Component Design
- **Cards:** Shadow + rounded corners
- **Tables:** Hover states + alternating rows
- **Buttons:** Ripple effect + transitions
- **Inputs:** Material UI TextField
- **Alerts:** Color-coded (error, success, info, warning)

### Responsive Breakpoints
- **Mobile:** < 576px
- **Tablet:** 576px - 992px
- **Desktop:** 992px+

---

## 🧪 Testing the Application

### Test Login
1. Enter admin username: `admin`
2. Enter password: `password123`
3. Click "Sign In"
4. Should redirect to `/admin`

### Test User Access
1. Login as `user`
2. Should be on `/user` dashboard
3. Try navigating to `/admin`
4. Should redirect to `/access-denied`

### Test Protected Routes
1. Logout (sessionStorage cleared)
2. Try accessing `/user` directly
3. Should redirect to `/login`

### Test API Calls
1. Check Network tab in DevTools
2. Verify API calls to `http://localhost:8080/api`
3. Check response headers and data

---

## 🐛 Troubleshooting

### Issue: CORS Error
**Solution:** Ensure backend has CORS enabled
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization
```

### Issue: Login Fails
**Check:**
1. Backend is running on port 8080
2. Credentials are correct
3. Backend response includes `user` and `role`
4. Network tab shows successful request

### Issue: Role Not Working
**Check:**
1. sessionStorage has `role` key
2. Backend returns correct role
3. ProtectedRoute has correct `requiredRole`

### Issue: API Not Found
**Check:**
1. Backend endpoint exists
2. API baseURL is correct: `http://localhost:8080/api`
3. Endpoint path matches backend route

---

## 📚 Learning Resources

### React
- [React Hooks Documentation](https://react.dev/reference/react)
- [Context API Guide](https://react.dev/reference/react/useContext)
- [React Router v6](https://reactrouter.com/)

### Material UI
- [Material UI Components](https://mui.com/material-ui/all-components/)
- [Icons Library](https://mui.com/material-ui/icons/)
- [Theming](https://mui.com/material-ui/customization/theming/)

### Axios
- [Axios Documentation](https://axios-http.com/)
- [Interceptors](https://axios-http.com/docs/interceptors)

---

## 📈 Performance Optimization

### Implemented
- ✅ Code splitting via React Router
- ✅ Lazy loading of routes
- ✅ sessionStorage caching
- ✅ Axios response caching

### Recommendations
- Add React.memo for component memoization
- Implement useCallback for function memoization
- Add loading skeletons
- Implement pagination for user table
- Cache API responses

---

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Hosting
1. Build: `npm run build`
2. Upload `dist/` folder to hosting
3. Configure backend URL for production
4. Enable CORS on backend for production domain

---

## 📝 Code Examples

### Using Auth Context
```jsx
import { useAuth } from '../context/AuthContext';

function MyComponent() {
  const { user, role, logout } = useAuth();
  
  return (
    <div>
      Welcome {user} ({role})
      {role === 'ADMIN' && <AdminPanel />}
    </div>
  );
}
```

### Making API Calls
```jsx
import { getUserProfile } from '../api';

useEffect(() => {
  getUserProfile()
    .then(res => setData(res.data))
    .catch(err => setError(err.message));
}, []);
```

### Creating Protected Route
```jsx
<ProtectedRoute requiredRole="ADMIN">
  <AdminDashboard />
</ProtectedRoute>
```

---

## 📋 Checklist

- [x] React setup with Vite
- [x] React Router v6 configuration
- [x] Auth Context for state management
- [x] Protected route component
- [x] Login component with form
- [x] User dashboard component
- [x] Admin dashboard component
- [x] Navbar component
- [x] Access denied page
- [x] Material UI integration
- [x] Bootstrap grid system
- [x] Axios configuration
- [x] API error handling
- [x] Loading states
- [x] Error alerts
- [x] Session persistence
- [x] Logout functionality
- [x] Responsive design
- [x] Documentation

---

## 🔗 Related Experiments

- **Experiment 7:** Spring Boot RBAC Backend
- **Experiment 6:** JWT Authentication
- **Experiment 5:** Database Integration

---

## 📞 Support & Contribution

For questions or improvements:
1. Check documentation
2. Review code comments
3. Check browser console for errors
4. Verify backend is running

---

**Version:** 1.0.0  
**Last Updated:** April 2026  
**Status:** ✅ Complete

---

## 🎉 Conclusion

This experiment provides a complete, production-ready RBAC frontend implementation that can be extended for various use cases. The modular design allows easy customization and scaling.

**Happy Learning! 🚀**
