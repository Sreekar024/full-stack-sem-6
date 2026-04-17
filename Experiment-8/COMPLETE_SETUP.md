# ✅ COMPLETE SETUP GUIDE

## Experiment 8: JWT Authentication (Frontend + Backend)

---

## 📋 What You Have

### ✅ Frontend (React)
Location: `Experiment-8/`
- Login page
- Protected dashboard
- Logout functionality
- Beautiful UI

### ✅ Backend (Node.js Express)
Location: `Experiment-8/backend/`
- `/login` endpoint
- `/protected` endpoint
- JWT token generation
- CORS enabled

---

## 🚀 COMPLETE SETUP (5 Minutes)

### Step 1: Terminal 1 - Start Backend

```bash
cd Experiment-8/backend
npm install
npm start
```

**Wait for:**
```
✅ JWT Backend Server Running
Server URL: http://localhost:5000
```

---

### Step 2: Terminal 2 - Start Frontend

**Open a NEW terminal window** and run:

```bash
cd Experiment-8
npm install
npm start
```

**Wait for:**
```
✅ Compiled successfully!
Frontend running on: http://localhost:3000
```

---

### Step 3: Open Browser

```
http://localhost:3000
```

You should see the **Login Page** ✅

---

### Step 4: Test Login

**Credentials:**
```
Username: user1
Password: password123
```

Enter and click **Login**

---

### Step 5: Verify Success

✅ Redirects to Dashboard  
✅ Shows "Welcome, user1"  
✅ Can click "Fetch Protected Data"  
✅ Token visible in sessionStorage (F12)

---

## 🎯 Your Complete Setup

```
Experiment-8/
│
├── Frontend (React)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.js
│   │   │   └── Dashboard.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   ├── public/index.html
│   └── package.json
│
└── backend/ (Node.js Express)
    ├── server.js
    └── package.json
```

---

## 📊 Terminal Windows Needed

### Window 1 - Backend
```bash
cd Experiment-8/backend
npm start
```

**Shows:**
```
✅ JWT Backend Server Running
📍 Server URL: http://localhost:5000
```

### Window 2 - Frontend
```bash
cd Experiment-8
npm start
```

**Shows:**
```
✅ Compiled successfully!
You can now view jwt-frontend in the browser.
Local: http://localhost:3000
```

### Window 3 (Optional) - Testing
For curl commands or verification.

---

## 🧪 Test Flow

### 1. Login
- [ ] Open `http://localhost:3000`
- [ ] See login page
- [ ] Enter: `user1` / `password123`
- [ ] Click "Login"

### 2. Dashboard
- [ ] See dashboard page
- [ ] Shows logged-in username
- [ ] Token visible in sessionStorage (F12)

### 3. Fetch Data
- [ ] Click "Fetch Protected Data"
- [ ] See API response displayed
- [ ] Network tab shows successful request

### 4. Logout
- [ ] Click "Logout"
- [ ] Returns to login page
- [ ] SessionStorage cleared

---

## ✅ Verification

### Backend Verification

```bash
# Test health endpoint
curl http://localhost:5000/health

# Test login
curl -X POST http://localhost:5000/login \
  -H "Content-Type: application/json" \
  -d '{"username":"user1","password":"password123"}'
```

Should return token ✅

### Frontend Verification

**DevTools (F12):**
- Console: No errors
- Network: Requests to `/login` and `/protected` succeed
- Application: SessionStorage has token

---

## 📝 File Locations

| File | Location | Purpose |
|------|----------|---------|
| Frontend Main | `Experiment-8/src/App.js` | Main app component |
| Login Component | `Experiment-8/src/components/Login.js` | Login form |
| Dashboard | `Experiment-8/src/components/Dashboard.js` | Protected page |
| Backend Server | `Experiment-8/backend/server.js` | API endpoints |
| Backend Config | `Experiment-8/backend/package.json` | Dependencies |

---

## 🔗 URLs

| Service | URL | Port |
|---------|-----|------|
| Frontend | `http://localhost:3000` | 3000 |
| Backend | `http://localhost:5000` | 5000 |
| Login Endpoint | `POST /login` | 5000 |
| Protected Endpoint | `GET /protected` | 5000 |

---

## 📚 Documentation

| Guide | File |
|-------|------|
| Quick Setup | `BACKEND_SETUP.md` |
| Frontend Docs | `README.md` |
| Backend Docs | `backend/README.md` |
| Testing | `TESTING_GUIDE.md` |
| API Integration | `API_INTEGRATION_GUIDE.md` |
| Network Errors | `NETWORK_ERROR_FIX.md` |

---

## 🚨 Common Issues

### Issue 1: Backend won't start
```bash
# Check if port 5000 is in use
lsof -i :5000

# Kill process if needed
kill -9 <PID>

# Try again
npm start
```

### Issue 2: Frontend shows network error
- Ensure backend is running
- Check backend terminal for errors
- Verify port 5000 is listening

### Issue 3: Can't login
- Check credentials: `user1` / `password123`
- Check backend logs for errors
- Ensure both frontend and backend are running

### Issue 4: Port already in use
```bash
# Change port in server.js line 5
const PORT = 5001;

# Also update frontend URLs
# In Login.js and Dashboard.js
```

---

## 🎓 What This Demonstrates

✅ **Frontend-Backend Communication**  
✅ **JWT Authentication Flow**  
✅ **Session-Based Token Management**  
✅ **Protected Routes**  
✅ **API Integration**  
✅ **Error Handling**  
✅ **CORS Configuration**  

---

## 🎯 Next Steps

1. **Follow the Complete Setup above**
2. **Start both servers**
3. **Test the login flow**
4. **Review the code**
5. **Test all features**

---

## ✨ You're All Set!

Everything is ready to go. Just follow the setup steps above and you'll have a working JWT authentication system in 5 minutes.

**Start with the backend first, then the frontend!**

---

## 📞 Need Help?

1. **Backend issues?** → Check `backend/README.md`
2. **Frontend issues?** → Check `README.md`
3. **Network errors?** → Check `NETWORK_ERROR_FIX.md`
4. **API questions?** → Check `API_INTEGRATION_GUIDE.md`

---

**Happy coding! 🚀**
