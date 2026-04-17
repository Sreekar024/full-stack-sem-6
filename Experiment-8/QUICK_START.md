# QUICK START GUIDE - Experiment 8

## 🚀 Get Started in 3 Steps

### Step 1: Install Dependencies
```bash
cd Experiment-8
npm install
```

### Step 2: Ensure Backend is Running
Make sure your backend server is running on `http://localhost:5000` with these endpoints:
- `POST /login` - Returns JWT token
- `GET /protected` - Returns protected data (requires Bearer token)

### Step 3: Start the Frontend
```bash
npm start
```

The app will open at `http://localhost:3000`

## 🧪 Test It Immediately

### Login Credentials
```
Username: user1
Password: password123
```

### 5-Minute Test Flow

1. **Open app** → You see the login page
2. **Enter credentials** → Use `user1` / `password123`
3. **Click Login** → Redirects to dashboard
4. **Open DevTools** (F12) → Go to "Application" tab
5. **Check Session Storage** → See your JWT token stored
6. **Click "Fetch Protected Data"** → See API response on dashboard
7. **Click "Logout"** → Returns to login, session cleared

## 📸 Expected Screenshots

| Action | Screenshot |
|--------|-----------|
| Login page loads | Form with username/password fields |
| Login successful | Token visible in sessionStorage (DevTools) |
| Dashboard shows | Protected data fetched and displayed |
| Click fetch button | API response shown in formatted JSON |
| Logout works | Redirects to login, sessionStorage cleared |

## 🔍 Verify Implementation

### ✅ Check 1: Token Storage
1. Login successfully
2. F12 → Application → Session Storage
3. Look for `token` key with JWT value

### ✅ Check 2: Protected Route
1. Delete token from sessionStorage manually
2. Refresh page
3. Should redirect to login (page protection working)

### ✅ Check 3: Authorization Header
1. Open DevTools → Network tab
2. Click "Fetch Protected Data"
3. Find request to `/protected`
4. In Headers, see: `Authorization: Bearer <token>`

### ✅ Check 4: Session Based
1. Login and note token
2. Close browser tab
3. Open new tab
4. Should redirect to login (session cleared)

## 📋 File Structure Created

```
Experiment-8/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Login.js ..................... Login form & authentication
│   │   └── Dashboard.js ................. Protected page with data fetch
│   ├── App.js ........................... Main app with routing
│   ├── App.css .......................... All styling & animations
│   ├── index.js ......................... React entry point
│   └── index.css ........................ Global styles
├── package.json ......................... Dependencies
└── README.md ............................ Full documentation
```

## 🎯 Key Features

✅ **Session-Based Auth** - JWT stored in sessionStorage (not localStorage)  
✅ **Protected Routes** - Redirect to login if no token  
✅ **API Integration** - Axios calls with Bearer token  
✅ **Error Handling** - User-friendly error messages  
✅ **Responsive UI** - Works on all devices  
✅ **Loading States** - Visual feedback on actions  
✅ **Console Logging** - Debug API interactions  

## 🔧 Troubleshooting

| Problem | Solution |
|---------|----------|
| "Cannot connect to backend" | Ensure backend runs on localhost:5000 |
| "Port 3000 already in use" | Run `npx lsof -i :3000` then `kill -9 <PID>` |
| "Token not in sessionStorage" | Check browser storage is enabled |
| "401 Unauthorized" | Verify backend token validation |

## 📞 Need Help?

1. **Check browser console** (F12) for error messages
2. **Check Network tab** to see API requests/responses
3. **Verify backend** is responding correctly
4. **Read full README.md** for detailed documentation

## ✨ Next Steps

After testing:
1. Integrate with your production backend
2. Update API base URL from `localhost:5000`
3. Add more protected routes as needed
4. Implement refresh token logic (optional)
5. Add role-based access control (RBAC)

---

**Ready? Run `npm start` and test the authentication flow!** 🎉
