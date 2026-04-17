# 🔍 NETWORK ERROR DIAGNOSIS

## The Network Error Explained

When you see "Network error" on the login page, here's what happened:

### 1. Frontend tried to connect to backend
```
POST http://localhost:5000/login
```

### 2. Backend not responding
```
❌ Connection refused
❌ Backend not running
❌ Port 5000 not listening
```

### 3. Error shown to user
```
"Login failed. Please check your credentials."
```

---

## 🚨 The Real Issue

**Your backend server is NOT running on port 5000!**

---

## ✅ SOLUTION (Follow These Steps)

### Step 1: Open a NEW Terminal Window

Keep your frontend terminal running, open a **second terminal**.

### Step 2: Find Your Backend

Likely locations:
```
- Experiment-6/ (Java/Spring Boot)
- experiment-7-backend/ (Node.js)
- Other backend folder
```

### Step 3: Start Backend

**For Node.js backend:**
```bash
cd experiment-7-backend
npm install
npm start
```

**For Java/Spring Boot backend:**
```bash
cd Experiment-6
# Follow its README
mvn clean install
mvn spring-boot:run
```

### Step 4: Verify Backend Started

Look for message like:
```
✓ Server running on http://localhost:5000
✓ Port 5000 listening
✓ Application started
```

### Step 5: Refresh Frontend

Go back to browser: `http://localhost:3000`  
Refresh (F5)  
Try login again

---

## 🧪 How to Check if It's Working

### Check 1: Open DevTools (F12)

**Console tab:**
- Login and look for logs
- Should see: "Login successful"
- Should NOT see: "Connection refused"

**Network tab:**
- Click to `/login` request
- Check Status: `200` or `401` (good)
- NOT: `ERR_CONNECTION_REFUSED` (bad)

### Check 2: Check sessionStorage

**DevTools → Application → Session Storage**
- After login, should see:
  - Key: `token` → Value: `eyJ...` (JWT)
  - Key: `username` → Value: `user1`

---

## 🎯 Common Scenarios

### Scenario 1: Backend Not Started
```
Error: "Network error" or "Connection refused"
Fix: Start backend in another terminal
```

### Scenario 2: Backend on Wrong Port
```
Error: "Network error"
Frontend expects: localhost:5000
Backend is on: localhost:8080
Fix: Update URL in Login.js and Dashboard.js
```

### Scenario 3: CORS Issue
```
Error: "CORS policy blocked this request"
Fix: Enable CORS in backend
```

### Scenario 4: Backend Endpoint Missing
```
Error: "404 Not Found"
Fix: Ensure backend has /login endpoint
```

---

## 🔧 If Backend is on Different Port

### Find the Port
Look at backend startup message:
```
Server running on http://localhost:8080  ← Port is 8080
```

### Update Frontend

**File: `src/components/Login.js`**

Find around line 34-35:
```javascript
const response = await axios.post(
  'http://localhost:5000/login',  // ← Change this
```

Change to:
```javascript
const response = await axios.post(
  'http://localhost:8080/login',  // ← New port
```

**File: `src/components/Dashboard.js`**

Find around line 50:
```javascript
const response = await axios.get(
  'http://localhost:5000/protected',  // ← Change this
```

Change to:
```javascript
const response = await axios.get(
  'http://localhost:8080/protected',  // ← New port
```

### Restart Frontend
```bash
npm start
```

---

## 📝 Terminal Setup

### Recommended Setup

**Terminal 1 - Backend:**
```bash
cd experiment-7-backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd Experiment-8
npm start
```

Both run side by side, no issues!

---

## ✅ Verification Checklist

After making changes:

- [ ] Backend terminal shows "Server running" or "Application started"
- [ ] Frontend browser shows login page
- [ ] No errors in DevTools Console
- [ ] Can enter credentials
- [ ] Click "Login"
- [ ] Gets response from backend (not network error)
- [ ] Redirects to dashboard on success
- [ ] Token visible in sessionStorage

---

## 🚀 Expected Flow

```
1. You type: npm start (in Experiment-8)
   ↓
2. Frontend opens at localhost:3000
   ↓
3. You see login page
   ↓
4. You enter username/password
   ↓
5. Frontend sends POST to localhost:5000/login
   ↓
6. Backend responds with token
   ↓
7. Frontend stores token in sessionStorage
   ↓
8. Frontend redirects to dashboard
   ↓
9. You see "Fetch Protected Data" button
   ↓
10. All working! ✅
```

---

## 🆘 Still Having Issues?

### Check DevTools (F12)

**Go to Console tab:**
```javascript
// You should see after login attempt:
Login error: AxiosError
// Details will show what went wrong
```

**Go to Network tab:**
```
Look for failed request to /login
Right-click → Copy as cURL
See exact error response
```

---

## 💡 Pro Tip

**Use curl to test backend directly:**

```bash
# Test if backend is responding
curl http://localhost:5000

# Test login endpoint
curl -X POST http://localhost:5000/login \
  -H "Content-Type: application/json" \
  -d '{"username":"user1","password":"password123"}'
```

If it responds, backend is working ✅  
If not, backend is not running ❌

---

## 📞 Summary

**Network Error = Backend Not Running**

**Fix:**
1. Open second terminal
2. Navigate to backend folder
3. Run `npm start`
4. Refresh frontend
5. Try login again

**That's it! ✅**

---

Read: **QUICK_FIX.md** for ultra-quick steps  
Read: **NETWORK_ERROR_FIX.md** for detailed troubleshooting
