# Setup & Submission Guide for Experiment 9

## 🎯 Pre-Submission Checklist

Before submitting this experiment, ensure all items are completed:

### Frontend Setup
- [ ] All dependencies installed (`npm install`)
- [ ] No build errors (`npm run build` succeeds)
- [ ] No linting errors (`npm run lint` passes)
- [ ] All files follow the required structure
- [ ] All components created (Login, UserDashboard, AdminDashboard, Navbar)

### Routing & Navigation
- [ ] React Router v6 properly configured
- [ ] Protected routes implemented
- [ ] Role-based redirects working
- [ ] Login redirects to appropriate dashboard
- [ ] Unauthorized users see access denied
- [ ] Logout works and clears session

### Authentication
- [ ] Login form accepts username/password
- [ ] Backend authentication working
- [ ] Session stored in sessionStorage
- [ ] Role determined from backend (not hardcoded)
- [ ] Both admin and user logins work

### User Dashboard
- [ ] Accessible only to USER role
- [ ] Fetches from `/api/user/profile`
- [ ] Displays response in table format
- [ ] Shows user restrictions
- [ ] Loading and error states work

### Admin Dashboard
- [ ] Accessible only to ADMIN role
- [ ] Fetches from `/api/admin/dashboard`
- [ ] Displays statistics in cards
- [ ] User management table implemented
- [ ] Delete user functionality works
- [ ] Loading and error states work

### UI/UX Requirements
- [ ] Material UI components used (Button, Card, TextField, Alert)
- [ ] Bootstrap grid system implemented
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Navbar shows logged-in user
- [ ] Navbar shows role with color
- [ ] Logout button functional
- [ ] Clean and professional appearance

### API Integration
- [ ] Axios configured with `baseURL: http://localhost:8080/api`
- [ ] Request interceptors add headers
- [ ] Response interceptors handle errors
- [ ] 401/403 errors handled gracefully
- [ ] All API endpoints working

### Session Management
- [ ] SessionStorage used for persistence
- [ ] `user` key stored in sessionStorage
- [ ] `role` key stored in sessionStorage
- [ ] Logout clears sessionStorage
- [ ] Session persists on page refresh
- [ ] Direct URL access checks auth

### Security
- [ ] Unauthorized users redirect to login
- [ ] Wrong roles redirect to access denied
- [ ] Protected routes cannot be accessed directly
- [ ] Logout clears all auth data
- [ ] No sensitive data in local storage

### Code Quality
- [ ] All imports are correct
- [ ] No unused variables
- [ ] Proper error handling
- [ ] Comments for complex logic
- [ ] Consistent naming conventions
- [ ] Proper React best practices

### Documentation
- [ ] README.md complete
- [ ] 00-START-HERE.md created
- [ ] Code comments included
- [ ] Project structure documented
- [ ] API endpoints documented

---

## 🚀 Installation Instructions

### Step 1: Navigate to Project
```bash
cd Experiment-9
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Verify Backend is Running
Ensure Spring Boot backend is running on:
```
http://localhost:8080
```

### Step 4: Start Development Server
```bash
npm run dev
```

### Step 5: Access Application
Open browser and navigate to:
```
http://localhost:3000
```

---

## 🧪 Testing Instructions

### Test 1: Login as Admin
1. Navigate to login page
2. Enter username: `admin`
3. Enter password: `password123`
4. Click "Sign In"
5. **Expected:** Redirect to `/admin` dashboard

### Test 2: Admin Dashboard
1. On admin dashboard, verify:
   - [ ] Dashboard statistics displayed
   - [ ] User table with all users
   - [ ] Delete button for each user
   - [ ] Logout button functional
2. Click on a user delete button
3. **Expected:** Confirmation dialog appears

### Test 3: Login as User
1. Click logout
2. Login with username: `user`
3. Click "Sign In"
4. **Expected:** Redirect to `/user` dashboard

### Test 4: User Dashboard
1. On user dashboard, verify:
   - [ ] Profile information displayed
   - [ ] No admin controls visible
   - [ ] Logout button functional

### Test 5: Unauthorized Access
1. While logged in as user, try accessing `/admin` directly
2. **Expected:** Redirect to `/access-denied`

### Test 6: Protected Routes
1. Logout (clear session)
2. Try accessing `/user` or `/admin` directly
3. **Expected:** Redirect to `/login`

### Test 7: Session Persistence
1. Login to system
2. Refresh page (F5)
3. **Expected:** Still logged in, session persists

### Test 8: API Calls
1. Open DevTools (F12)
2. Go to Network tab
3. Perform login and navigate
4. **Expected:** API calls to `http://localhost:8080/api`

---

## 📁 File Structure Verification

Verify all files exist:

```
Experiment-9/
├── public/
├── src/
│   ├── components/
│   │   ├── Login.jsx ......................... ✓
│   │   ├── UserDashboard.jsx ............... ✓
│   │   ├── AdminDashboard.jsx ............. ✓
│   │   ├── Navbar.jsx ....................... ✓
│   │   └── AccessDenied.jsx ............... ✓
│   ├── routes/
│   │   └── ProtectedRoute.jsx ............. ✓
│   ├── context/
│   │   └── AuthContext.jsx ............... ✓
│   ├── api.js ............................. ✓
│   ├── App.jsx ............................ ✓
│   ├── App.css ............................ ✓
│   └── main.jsx ........................... ✓
├── index.html ............................ ✓
├── vite.config.js ........................ ✓
├── eslint.config.js ...................... ✓
├── package.json .......................... ✓
├── .gitignore ............................ ✓
├── 00-START-HERE.md ..................... ✓
├── README.md ............................. ✓
└── SETUP_AND_SUBMISSION_GUIDE.md ........ ✓
```

---

## 🔍 Code Quality Checks

### Run Linter
```bash
npm run lint
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

---

## 📋 Requirements Verification

### Requirement 1: Tech Stack
- [x] React (functional components with hooks)
- [x] Axios for API calls
- [x] Bootstrap for layout styling
- [x] Material UI for components
- [x] React Router DOM for navigation

### Requirement 2: Authentication
- [x] Login page with username and password
- [x] REST API call to backend
- [x] SessionStorage for user and role
- [x] Role from backend (not hardcoded)
- [x] Redirect based on role

### Requirement 3: Routing
- [x] React Router for navigation
- [x] Protected routes implemented
- [x] Redirect if no session
- [x] Role-based route restriction

### Requirement 4: Components
- [x] Login.js with form
- [x] UserDashboard.js (USER only)
- [x] AdminDashboard.js (ADMIN only)
- [x] Navbar.js with user info
- [x] ProtectedRoute.js

### Requirement 5: Role-Based UI
- [x] Conditional rendering
- [x] USER cannot see admin controls
- [x] ADMIN sees all controls
- [x] Role from sessionStorage

### Requirement 6: API Integration
- [x] Axios with baseURL configured
- [x] Auth headers attached
- [x] Error handling (401, 403)

### Requirement 7: Session Management
- [x] SessionStorage for persistence
- [x] Logout clears sessionStorage
- [x] Redirect to login after logout

### Requirement 8: UI Requirements
- [x] Bootstrap container/grid
- [x] Material UI components
- [x] Clean and responsive design

### Requirement 9: Security
- [x] Unauthorized users see "Access Denied"
- [x] Redirect to login on unauth
- [x] Prevent direct URL access

### Requirement 10: Project Structure
- [x] src/components/ with all components
- [x] api.js for axios config
- [x] routes/ProtectedRoute.js
- [x] context/AuthContext.jsx
- [x] Proper app structure

---

## 🎯 Submission Preparation

### Final Steps
1. [ ] Run `npm install` to ensure clean install
2. [ ] Run `npm run lint` and fix any errors
3. [ ] Run `npm run build` and verify no errors
4. [ ] Test all features manually
5. [ ] Verify all documentation is complete
6. [ ] Test with both admin and user roles
7. [ ] Test unauthorized access handling
8. [ ] Check responsive design on different sizes

### Files to Submit
- [x] All source files in `src/`
- [x] Configuration files (vite, eslint)
- [x] package.json with all dependencies
- [x] index.html
- [x] All documentation (README, START_HERE)
- [x] .gitignore file

### What NOT to Submit
- ❌ node_modules/ folder
- ❌ dist/ folder
- ❌ .env files with secrets
- ❌ IDE configuration (.vscode, .idea)
- ❌ OS files (.DS_Store, Thumbs.db)

---

## 📞 Common Issues & Solutions

### Issue: Cannot find module 'react-router-dom'
**Solution:** Run `npm install react-router-dom`

### Issue: Material UI icons not showing
**Solution:** Run `npm install @mui/icons-material`

### Issue: CORS error from backend
**Solution:** Ensure backend has CORS enabled and is running

### Issue: Login doesn't work
**Solution:** 
1. Check backend is running on port 8080
2. Verify credentials: admin/password123 or user/password123
3. Check Network tab in DevTools

### Issue: Role not updating
**Solution:**
1. Check backend returns `{ user, role }` in response
2. Verify sessionStorage has both keys
3. Check AuthContext login function

### Issue: Protected routes not working
**Solution:**
1. Verify ProtectedRoute component logic
2. Check sessionStorage has `role` key
3. Test by logging in and checking sessionStorage

---

## ✅ Final Checklist Before Submission

- [ ] All components created and working
- [ ] All routes protected properly
- [ ] Authentication working
- [ ] API calls successful
- [ ] UI is clean and responsive
- [ ] No console errors
- [ ] No build errors
- [ ] Documentation complete
- [ ] Code is well-structured
- [ ] Tests pass

---

## 🎓 Learning Objectives Achieved

By completing this experiment, you have learned:

- ✅ Complete React authentication flow
- ✅ Role-based access control implementation
- ✅ Protected routing patterns
- ✅ Context API usage
- ✅ Material UI integration
- ✅ Axios API client setup
- ✅ Error handling best practices
- ✅ Session management strategies
- ✅ React best practices
- ✅ Responsive web design

---

## 📞 Getting Help

If you encounter issues:

1. **Check Documentation**
   - Review README.md
   - Check 00-START-HERE.md
   - Look at code comments

2. **Debug in Browser**
   - Open DevTools (F12)
   - Check Console for errors
   - Check Network tab for API calls
   - Check Application > SessionStorage

3. **Verify Setup**
   - Backend is running
   - npm dependencies installed
   - Vite dev server running
   - Correct ports (3000 for frontend, 8080 for backend)

4. **Common Debugging**
   - Check sessionStorage keys
   - Verify API responses
   - Check component props
   - Review Context values

---

**Good Luck with Your Submission! 🚀**

---

**Version:** 1.0  
**Last Updated:** April 2026  
**Experiment:** 9 - RBAC Frontend Implementation
