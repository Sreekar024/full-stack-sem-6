# 🚀 BACKEND SETUP - QUICK START

## ✅ You Now Have a Backend Server!

I've created a simple Node.js backend server for you in:
```
Experiment-8/backend/
```

---

## 🎯 Quick Setup (2 minutes)

### Step 1: Install Backend Dependencies

```bash
cd Experiment-8/backend
npm install
```

**Wait for installation to complete...**

---

### Step 2: Start Backend Server

```bash
npm start
```

**You should see:**
```
╔════════════════════════════════════════╗
║   JWT Backend Server Running ✅        ║
╚════════════════════════════════════════╝

📍 Server URL: http://localhost:5000
🔗 Frontend URL: http://localhost:3000

📚 Available Endpoints:
  ✓ POST   /login       - Get JWT token
  ✓ GET    /protected   - Access protected data
  ✓ GET    /health      - Health check

🧪 Test Credentials:
  Username: user1
  Password: password123
```

---

### Step 3: Start Frontend (In Another Terminal)

```bash
cd Experiment-8
npm start
```

---

### Step 4: Test It!

1. Open `http://localhost:3000`
2. Login with: `user1` / `password123`
3. Click "Fetch Protected Data"
4. ✅ Should work!

---

## 📁 Backend Files Created

**Location:** `Experiment-8/backend/`

```
backend/
├── package.json .................. Dependencies
└── server.js ..................... Main server file
```

---

## 🔧 What the Backend Does

### ✅ POST /login
- Takes username & password
- Returns JWT token
- Valid users:
  - `user1` / `password123`
  - `user2` / `password456`

### ✅ GET /protected
- Requires Bearer token
- Returns protected data
- Validates JWT token

### ✅ GET /health
- Check if server is running

---

## 📊 Terminal Setup (Recommended)

You need **2 terminals open**:

### Terminal 1 - Backend:
```bash
cd Experiment-8/backend
npm install
npm start

# Output shows: ✅ JWT Backend Server Running
```

### Terminal 2 - Frontend:
```bash
cd Experiment-8
npm start

# Output shows: ✅ Compiled successfully!
```

---

## ✅ Verification Checklist

- [ ] Backend installed: `npm install` (in backend folder)
- [ ] Backend running: `npm start` (port 5000)
- [ ] Frontend running: `npm start` (port 3000)
- [ ] Browser shows login page
- [ ] Login works with user1/password123
- [ ] Dashboard loads
- [ ] "Fetch Protected Data" works
- [ ] Token visible in sessionStorage (F12)

---

## 🧪 Test Endpoints with cURL

In a **third terminal**:

```bash
# Test 1: Health check
curl http://localhost:5000/health

# Test 2: Login
curl -X POST http://localhost:5000/login \
  -H "Content-Type: application/json" \
  -d '{"username":"user1","password":"password123"}'

# Test 3: Protected endpoint (replace TOKEN with actual token)
curl -X GET http://localhost:5000/protected \
  -H "Authorization: Bearer TOKEN_HERE"
```

---

## 🎯 Complete Flow

```
1. Start Backend:
   cd Experiment-8/backend
   npm install
   npm start
   ✓ Running on localhost:5000

2. Start Frontend (new terminal):
   cd Experiment-8
   npm start
   ✓ Running on localhost:3000

3. Open Browser:
   http://localhost:3000

4. Login:
   user1 / password123

5. See Dashboard:
   ✅ Success!

6. Click "Fetch Protected Data":
   ✅ Shows protected data
```

---

## 🆘 If Something Goes Wrong

### Backend won't start?
```bash
# Check if port 5000 is in use
lsof -i :5000

# If stuck, kill the process
kill -9 <PID>
```

### Missing dependencies?
```bash
cd Experiment-8/backend
npm install
```

### Port already in use?
Change port in `server.js` line 5:
```javascript
const PORT = 5001; // Change from 5000 to 5001
```

Then update frontend URL in `src/components/Login.js` and `Dashboard.js`

---

## 📝 Backend Features

✅ CORS enabled (allows requests from localhost:3000)  
✅ JWT token generation & validation  
✅ Sample user database (in-memory)  
✅ Error handling  
✅ Token expiry (1 hour)  
✅ Detailed logging  

---

## 🎉 Ready to Go!

Your complete JWT authentication system is now ready:
- ✅ Frontend (React)
- ✅ Backend (Node.js Express)
- ✅ JWT authentication
- ✅ Protected routes

**Next Step:** Follow the "Complete Flow" above!

---

**Don't forget:** Backend and Frontend need to run in separate terminals!
