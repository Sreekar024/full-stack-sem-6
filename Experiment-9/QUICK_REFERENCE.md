# Quick Reference Guide - Experiment 9

## 🚀 Quick Start (2 minutes)

```bash
cd Experiment-9
npm install
npm run dev
```

Visit: `http://localhost:3000`

---

## 🔐 Demo Credentials

| Role | Username | Password |
|------|----------|----------|
| ADMIN | `admin` | `password123` |
| USER | `user` | `password123` |

---

## 📂 Key Files

| File | Purpose |
|------|---------|
| `src/App.jsx` | Main router and app entry |
| `src/api.js` | Axios configuration |
| `src/context/AuthContext.jsx` | Auth state management |
| `src/routes/ProtectedRoute.jsx` | Route protection |
| `src/components/Login.jsx` | Login form |
| `src/components/UserDashboard.jsx` | User dashboard |
| `src/components/AdminDashboard.jsx` | Admin dashboard |
| `src/components/Navbar.jsx` | Navigation bar |

---

## 🔄 Component Structure

```
App.jsx
├── <Routes>
│   ├── /login → Login.jsx
│   ├── /user → ProtectedRoute (USER) → UserDashboard.jsx
│   ├── /admin → ProtectedRoute (ADMIN) → AdminDashboard.jsx
│   ├── /access-denied → AccessDenied.jsx
│   └── / → Navigate to /login
└── <AuthProvider>
```

---

## 🎯 Main Hooks

### useAuth()
```javascript
const {
  user,              // 'admin'
  role,              // 'ADMIN'
  isAuthenticated,   // true/false
  isAdmin,           // true/false
  isUser,            // true/false
  login(u, p),       // async login
  logout(),          // async logout
  loading,           // loading state
  error              // error message
} = useAuth();
```

### useNavigate()
```javascript
const navigate = useNavigate();
navigate('/user');           // Navigate
navigate('/login', { replace: true }); // Replace history
```

### useState() & useEffect()
```javascript
const [data, setData] = useState(null);

useEffect(() => {
  // Fetch data
  getData().then(res => setData(res.data));
}, []);
```

---

## 📡 API Quick Reference

### Auth
```javascript
POST /api/auth/login      → { user, role }
POST /api/auth/logout     → { message }
```

### User
```javascript
GET /api/user/profile     → { user data }
GET /api/user/data        → { user stats }
```

### Admin
```javascript
GET /api/admin/dashboard  → { statistics }
GET /api/admin/users      → [ users ]
DELETE /api/admin/users/1 → { message }
```

---

## 🎨 Material UI Quick Components

```javascript
// TextField (Input)
<TextField label="Username" value={val} onChange={e => setVal(e.target.value)} />

// Button
<Button variant="contained" onClick={handleClick}>Click</Button>

// Card
<Card><CardContent>Content</CardContent></Card>

// Table
<Table>
  <TableHead><TableRow><TableCell>Header</TableCell></TableRow></TableHead>
  <TableBody><TableRow><TableCell>Data</TableCell></TableRow></TableBody>
</Table>

// Alert
<Alert severity="error">Error message</Alert>

// Dialog
<Dialog open={open} onClose={onClose}>
  <DialogTitle>Title</DialogTitle>
  <DialogContent>Content</DialogContent>
</Dialog>

// Loading
<CircularProgress />

// Chip
<Chip label="ADMIN" color="error" />
```

---

## 🔒 Protected Route Example

```javascript
<ProtectedRoute requiredRole="ADMIN">
  <AdminDashboard />
</ProtectedRoute>
```

---

## 📦 Installation Breakdown

```bash
# Install all dependencies
npm install

# Install specific package
npm install package-name

# Key packages installed:
# - react
# - react-router-dom
# - @mui/material
# - axios
# - @emotion/react
```

---

## 🎬 Session Flow

1. **Login** → Send credentials to backend
2. **Backend** → Returns user and role
3. **Store** → Save in sessionStorage
4. **Context** → Update AuthContext state
5. **Navigate** → Redirect based on role
6. **Protected** → Routes check role
7. **Logout** → Clear sessionStorage and redirect

---

## 🐛 Quick Debugging

### Check Session
```javascript
// In browser console
sessionStorage.getItem('user')    // "admin"
sessionStorage.getItem('role')    // "ADMIN"
```

### Check Auth State
```javascript
// In component
const { user, role, isAuthenticated } = useAuth();
console.log({ user, role, isAuthenticated });
```

### Check API Call
```javascript
// In DevTools Network tab
// Look for POST /api/auth/login
// Check response: { user, role }
```

### Check Errors
```javascript
// In browser console
// Check for red errors
// Check Network tab for failed requests
// Check Response content
```

---

## ✅ Common Tasks

### Add New API Endpoint
```javascript
// In src/api.js
export const newEndpoint = () => 
  api.get('/path/to/endpoint');

// In component
import { newEndpoint } from '../api';
const data = await newEndpoint();
```

### Add New Component
```javascript
// Create src/components/NewComponent.jsx
import { useAuth } from '../context/AuthContext';

export default function NewComponent() {
  const { user } = useAuth();
  return <div>Hello {user}</div>;
}

// Add to routing in App.jsx
<Route path="/new" element={<NewComponent />} />
```

### Add Protected Route
```javascript
// In App.jsx
<Route
  path="/special"
  element={
    <ProtectedRoute requiredRole="ADMIN">
      <SpecialComponent />
    </ProtectedRoute>
  }
/>
```

---

## 🚨 Common Issues & Fixes

| Issue | Solution |
|-------|----------|
| `Cannot find module` | Run `npm install` |
| API 404 | Check backend is running on 8080 |
| CORS error | Backend needs CORS enabled |
| Login fails | Check credentials and backend auth |
| Role not working | Check sessionStorage has `role` key |
| Protected route fails | Verify requiredRole matches |
| UI not showing | Check imports and component syntax |
| Loading forever | Check API endpoint exists |

---

## 📚 File Reference

### Component Files
```
src/components/
├── Login.jsx           (150 lines) - Login form
├── UserDashboard.jsx   (180 lines) - User profile
├── AdminDashboard.jsx  (250 lines) - Admin panel
├── Navbar.jsx          (100 lines) - Top nav
└── AccessDenied.jsx    (70 lines) - Error page
```

### Configuration Files
```
src/
├── api.js              (66 lines) - Axios config
├── App.jsx             (60 lines) - Main router
└── context/AuthContext.jsx (100 lines) - Auth state
```

### Utility Files
```
src/routes/
└── ProtectedRoute.jsx  (20 lines) - Route guard
```

### Styling
```
src/
├── App.css             (400+ lines) - All styles
└── main.jsx            (12 lines) - Entry
```

---

## 🎯 Testing Checklist

- [ ] Login works for both users
- [ ] Dashboard appears after login
- [ ] Navbar shows correct user/role
- [ ] Logout works and clears session
- [ ] Unauthorized access redirects
- [ ] Protected routes enforce role
- [ ] API calls appear in Network tab
- [ ] No console errors
- [ ] Responsive on mobile

---

## 🚀 Deployment Quick Steps

```bash
# 1. Build
npm run build

# 2. Preview
npm run preview

# 3. Deploy
# Upload dist/ folder to hosting
# Configure API URL for production
# Done!
```

---

## 📞 Quick Links

- **React Docs:** https://react.dev
- **Material UI:** https://mui.com
- **React Router:** https://reactrouter.com
- **Axios:** https://axios-http.com

---

## 💡 Tips & Tricks

### Quick Test Admin Access
```javascript
// In Login.jsx, auto-fill admin
const [username, setUsername] = useState('admin');
const [password, setPassword] = useState('password123');
```

### Debug Auth State
```javascript
// Add to any component
const auth = useAuth();
useEffect(() => console.log('Auth:', auth), [auth]);
```

### Test Protected Routes
```javascript
// Try: http://localhost:3000/admin
// Should redirect to login if not authenticated
```

### Check sessionStorage Persistence
```javascript
// 1. Login
// 2. Open DevTools → Application
// 3. Session Storage → Look for 'user' and 'role'
// 4. Refresh page → Should still be there
```

---

## 🎓 Learning Outcomes

By working with this codebase, you learn:

✅ React Hooks & Context API  
✅ React Router v6  
✅ Material UI components  
✅ Axios API integration  
✅ Authentication flows  
✅ Role-based access control  
✅ Session management  
✅ Error handling  
✅ Responsive design  

---

## 📋 Useful Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run preview          # Preview build
npm run lint             # Check code quality

# Package Management
npm install              # Install dependencies
npm update               # Update packages
npm list                 # List installed packages

# Debugging
npm run dev -- --host    # Run on network
npm run build --verbose  # Build with details
```

---

## 🎉 You're Ready!

You now have all the information needed to work with Experiment 9. 

**Happy Coding! 🚀**

---

**Quick Reference Version:** 1.0  
**Last Updated:** April 2026  
**Format:** Markdown Cheat Sheet
