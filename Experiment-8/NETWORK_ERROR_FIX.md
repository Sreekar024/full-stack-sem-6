# 🔧 NETWORK ERROR TROUBLESHOOTING

## Problem: "Network Error" When Logging In

The frontend is showing a network error because it **cannot connect to the backend API** at `http://localhost:5000`.

---

## 🔍 Root Cause

**Frontend expects backend at:** `http://localhost:5000`  
**Status:** Backend is not running ❌

---

## ✅ Solution 1: Start Your Backend Server (REQUIRED)

### Step 1: Check Backend Location
Your backend should be running on a different project/port.

Typical locations:
- **Experiment-6** (Java Spring Boot) → Port 8080
- **experiment-7-backend** (Node.js) → Port 5000
- **Experiment-8** (This project) → Frontend only on Port 3000

### Step 2: Start Your Backend
If using **Experiment-6 (Java)**:
```bash
cd ../Experiment-6
# Follow the setup in that project
# Usually runs on http://localhost:8080 or :5000
```

If using **experiment-7-backend (Node.js)**:
```bash
cd ../experiment-7-backend
npm install
npm start
# Runs on port 5000
```

### Step 3: Verify Backend is Running
Open browser and go to:
```
http://localhost:5000
```
Should see: `Cannot GET /` or some response (not blank/timeout)

---

## ✅ Solution 2: Update Backend URL in Frontend

If your backend is on a **different port or URL**, update the frontend:

### Edit: `src/components/Login.js`

**Find line 34-35:**
```javascript
const response = await axios.post(
  'http://localhost:5000/login',  // ← CHANGE THIS
```

**Replace with your backend URL:**

**If backend is on port 8080:**
```javascript
const response = await axios.post(
  'http://localhost:8080/login',  // Changed port
```

**If backend is on different machine:**
```javascript
const response = await axios.post(
  'http://192.168.x.x:5000/login',  // Your machine IP
```

**If backend is on production:**
```javascript
const response = await axios.post(
  'https://your-backend-url.com/login',
```

### Also Edit: `src/components/Dashboard.js`

**Find line 50 (similar change):**
```javascript
const response = await axios.get(
  'http://localhost:5000/protected',  // ← CHANGE THIS
```

Replace with your backend URL (same as above).

---

## ✅ Solution 3: Using Environment Variables (Recommended)

### Step 1: Create `.env` file
In the Experiment-8 folder, create `.env`:
```
REACT_APP_API_URL=http://localhost:5000
```

### Step 2: Update `src/components/Login.js`

Replace:
```javascript
const response = await axios.post(
  'http://localhost:5000/login',
```

With:
```javascript
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
const response = await axios.post(
  `${API_URL}/login`,
```

### Step 3: Update `src/components/Dashboard.js`

Replace:
```javascript
const response = await axios.get(
  'http://localhost:5000/protected',
```

With:
```javascript
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
const response = await axios.get(
  `${API_URL}/protected`,
```

### Step 4: Restart Frontend
```bash
npm start
```

Now you can easily change the backend URL by editing `.env` file.

---

## ✅ Solution 4: Check CORS Configuration

If backend is running but still getting network error, **CORS might be blocked**.

Your backend should have CORS headers:

**If using Node.js/Express:**
```javascript
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
```

**If using Java/Spring Boot:**
```java
@Configuration
public class CorsConfig {
  @Bean
  public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
    configuration.setAllowedMethods(Arrays.asList("*"));
    configuration.setAllowedHeaders(Arrays.asList("*"));
    configuration.setAllowCredentials(true);
    // ...
  }
}
```

---

## 🧪 Step-by-Step Verification

### ✅ Check 1: Is Backend Running?
Open terminal and check:
```bash
curl http://localhost:5000
```

**Expected:** Server responds (not connection refused)  
**If error:** Backend is not running → Start it first

### ✅ Check 2: Is Frontend Running?
Open: `http://localhost:3000`

**Expected:** Login page loads  
**If error:** Run `npm start` in Experiment-8 folder

### ✅ Check 3: Check DevTools
1. Open browser DevTools (F12)
2. Go to **Console** tab
3. Try logging in
4. Look for error message

**Examples:**
```
GET http://localhost:5000/login net::ERR_CONNECTION_REFUSED
```
→ Backend not running

```
Access to XMLHttpRequest blocked by CORS policy
```
→ CORS issue on backend

```
Cannot GET /login
```
→ Backend running but endpoint doesn't exist

### ✅ Check 4: Check Network Tab
1. Open DevTools (F12)
2. Go to **Network** tab
3. Try logging in
4. Find the request to `/login`
5. Check:
   - **Status:** Should be 200 (success) or 401 (auth error)
   - **Headers:** Should show Request URL and status
   - **Response:** Should show JSON response

---

## 🚀 Quick Checklist

- [ ] Backend is running on `http://localhost:5000`
- [ ] Frontend is running on `http://localhost:3000`
- [ ] Browser can access both URLs
- [ ] Backend has `/login` endpoint
- [ ] Backend has `/protected` endpoint
- [ ] Backend has CORS enabled
- [ ] Frontend URL matches backend URL
- [ ] No firewall blocking ports 3000/5000

---

## 📝 Common Network Errors & Fixes

### Error: "Cannot connect to localhost:5000"
**Cause:** Backend not running  
**Fix:** Start your backend server

### Error: "CORS policy blocked"
**Cause:** Backend CORS not configured  
**Fix:** Enable CORS on backend (see above)

### Error: "net::ERR_CONNECTION_REFUSED"
**Cause:** Port 5000 not open  
**Fix:** Change port or ensure backend runs on 5000

### Error: "404 Not Found"
**Cause:** Endpoint doesn't exist  
**Fix:** Check backend has `/login` and `/protected` endpoints

### Error: "timeout"
**Cause:** Backend taking too long to respond  
**Fix:** Check backend is working, reduce load

---

## 🎯 Next Steps

1. **Verify backend is running:**
   ```bash
   curl http://localhost:5000
   ```

2. **If backend not running:**
   - Find your backend project
   - Start it on port 5000 (or update frontend URL)

3. **If backend is running:**
   - Check DevTools Console (F12)
   - Check Network tab for requests
   - Check backend CORS configuration

4. **After fixing:**
   - Refresh browser (F5)
   - Try login again
   - Check DevTools for success

---

## 📞 If Still Not Working

### Debug Information to Check

1. **What backend are you using?**
   - Experiment-6 (Java)?
   - experiment-7-backend (Node.js)?
   - Other?

2. **What port is backend on?**
   - 5000?
   - 8080?
   - Other?

3. **What's the exact error message?**
   - Network error?
   - CORS error?
   - 401 Unauthorized?
   - Other?

4. **DevTools Console shows:**
   - Check F12 → Console tab
   - Copy exact error message

---

## ✅ Success Indicators

When working correctly:
- ✅ Login page loads without errors
- ✅ Enter credentials and click Login
- ✅ Dashboard page loads
- ✅ Token visible in sessionStorage (DevTools)
- ✅ Can fetch protected data

---

**Fix the network error by ensuring your backend is running on the correct port!**
