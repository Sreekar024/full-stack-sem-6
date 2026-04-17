# ⚡ QUICK FIX - NETWORK ERROR

## The Problem
❌ Frontend shows "Network Error" when trying to login

## The Root Cause
**Your backend server is NOT running!**

The frontend tries to connect to: `http://localhost:5000`  
But nothing is listening on that address.

---

## ✅ IMMEDIATE SOLUTIONS

### Solution A: Start Your Backend Server

**If using Experiment-6 (Java/Spring Boot):**
```bash
# In a new terminal
cd ../Experiment-6
# Follow its README to start the server
# Usually runs on localhost:8080 or :5000
```

**If using experiment-7-backend (Node.js):**
```bash
# In a new terminal
cd ../experiment-7-backend
npm install
npm start
```

**Then:** Refresh browser and try login

---

### Solution B: Check If Backend is Actually Running

Open terminal and type:
```bash
curl http://localhost:5000
```

**If you see response:** Backend is running ✅  
**If you see error:** Backend is NOT running ❌ → Start it first

---

### Solution C: Update Frontend to Match Your Backend

**If backend runs on DIFFERENT PORT (e.g., 8080):**

Edit `src/components/Login.js` line 34:
```javascript
// Change from:
'http://localhost:5000/login'

// To:
'http://localhost:8080/login'
```

Also edit `src/components/Dashboard.js` line 50:
```javascript
// Change from:
'http://localhost:5000/protected'

// To:
'http://localhost:8080/protected'
```

Then: `npm start` and refresh

---

## 🧪 Quick Test

### Test 1: Is Frontend Running?
```
Open: http://localhost:3000
Expected: Login page loads ✅
```

### Test 2: Is Backend Running?
```
Open: http://localhost:5000
Expected: Some response (not blank) ✅
```

### Test 3: Open DevTools
```
F12 → Console tab
Try login
Look for error message
```

---

## 📋 Quick Checklist

- [ ] Backend server is started and running
- [ ] Backend is on correct port (5000 or update frontend)
- [ ] Frontend URL in code matches backend port
- [ ] Refresh browser after changes
- [ ] Check DevTools console for specific errors

---

## 🎯 Most Likely Fix

**99% of the time the fix is:**

```bash
# Terminal 1: Start Backend
cd ../experiment-7-backend  # (or your backend folder)
npm start
# Backend runs on localhost:5000

# Terminal 2: Start Frontend (in Experiment-8 folder)
npm start
# Frontend runs on localhost:3000
```

Then try login with: `user1` / `password123`

---

## 🆘 If Still Not Working

Open DevTools (F12) and check **Console** tab.

**Copy the exact error and:**
1. Check NETWORK_ERROR_FIX.md (full guide)
2. Check your backend is responding
3. Check backend has `/login` endpoint
4. Check backend has CORS enabled

---

**Start your backend server, refresh browser, and try again! 🚀**
