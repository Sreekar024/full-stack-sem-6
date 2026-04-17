# Testing Guide - Experiment 8

## 🧪 Comprehensive Testing Procedures

### Prerequisites
- Backend running on `http://localhost:5000`
- Frontend running on `http://localhost:3000`
- Browser with DevTools support
- Test credentials: `user1` / `password123`

---

## Test Suite 1: Login Functionality

### Test 1.1: Valid Login
**Steps:**
1. Navigate to `http://localhost:3000`
2. Enter username: `user1`
3. Enter password: `password123`
4. Click "Login"

**Expected Result:**
- ✅ Redirects to dashboard
- ✅ Page displays "Dashboard" heading
- ✅ Shows logged-in username
- ✅ Token visible in sessionStorage

**Evidence (Screenshot):**
- Login form with populated fields
- Dashboard page displaying

---

### Test 1.2: Invalid Username
**Steps:**
1. Navigate to login page
2. Enter username: `wronguser`
3. Enter password: `password123`
4. Click "Login"

**Expected Result:**
- ✅ Stays on login page
- ✅ Shows error message: "Invalid credentials"
- ✅ No token created

**Evidence (Screenshot):**
- Error message visible
- Still on login page

---

### Test 1.3: Invalid Password
**Steps:**
1. Navigate to login page
2. Enter username: `user1`
3. Enter password: `wrongpassword`
4. Click "Login"

**Expected Result:**
- ✅ Stays on login page
- ✅ Shows error message: "Invalid credentials"
- ✅ No token created

**Evidence (Screenshot):**
- Error message visible

---

### Test 1.4: Empty Fields
**Steps:**
1. Navigate to login page
2. Leave username and password empty
3. Click "Login"

**Expected Result:**
- ✅ Shows validation error
- ✅ No API call made
- ✅ Stays on login page

**Evidence (Screenshot):**
- Validation error message

---

## Test Suite 2: Session Storage

### Test 2.1: Token Stored in sessionStorage
**Steps:**
1. Login successfully
2. Open DevTools (F12)
3. Go to "Application" tab
4. Look at "Session Storage"

**Expected Result:**
- ✅ See `token` key with JWT value
- ✅ See `username` key with username
- ✅ Token is long encoded string (JWT format)

**Evidence (Screenshot):**
```
Key: token
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

Key: username
Value: user1
```

---

### Test 2.2: Token Format Verification
**Steps:**
1. Copy token from sessionStorage
2. Go to `https://jwt.io`
3. Paste token in debugger
4. Inspect decoded payload

**Expected Result:**
- ✅ Token decodes successfully
- ✅ Shows valid JWT structure
- ✅ Contains user information

**Evidence (Screenshot):**
- JWT.io shows decoded token with header, payload, signature

---

### Test 2.3: Token Cleared on Logout
**Steps:**
1. Login successfully
2. Note token in sessionStorage
3. Click "Logout"
4. Check sessionStorage

**Expected Result:**
- ✅ Redirects to login page
- ✅ sessionStorage is empty (no token)
- ✅ sessionStorage is empty (no username)

**Evidence (Screenshot):**
- SessionStorage empty after logout

---

## Test Suite 3: Protected Route Access

### Test 3.1: Dashboard Access with Token
**Steps:**
1. Login successfully
2. You should be on dashboard
3. Try to navigate to `/dashboard` directly (URL bar)

**Expected Result:**
- ✅ Dashboard loads normally
- ✅ Can see protected data section
- ✅ Token visible in token info box

**Evidence (Screenshot):**
- Dashboard displaying correctly

---

### Test 3.2: Dashboard Access without Token
**Steps:**
1. Navigate to `http://localhost:3000/dashboard`
2. WITHOUT logging in first
3. (Or manually delete token from sessionStorage first)

**Expected Result:**
- ✅ Automatically redirects to login page
- ✅ Dashboard never loads
- ✅ Shows login form

**Evidence (Screenshot):**
- Login page instead of dashboard

---

### Test 3.3: Token Deletion Mid-Session
**Steps:**
1. Login successfully (on dashboard)
2. Open DevTools → Application → Session Storage
3. Delete the `token` key manually
4. Click "Fetch Protected Data"

**Expected Result:**
- ✅ Shows error: "Unauthorized"
- ✅ Automatically redirects to login
- ✅ Shows error message

**Evidence (Screenshot):**
- Error message and redirect to login

---

## Test Suite 4: API Integration

### Test 4.1: Fetch Protected Data (Authorized)
**Steps:**
1. Login successfully
2. Click "Fetch Protected Data"
3. Check Network tab in DevTools

**Expected Result:**
- ✅ Button shows loading spinner
- ✅ API call made to `GET /protected`
- ✅ Response displayed on dashboard
- ✅ Response shows in formatted JSON

**Evidence (Screenshot):**
- Dashboard with fetched data displayed
- Network tab showing successful request

---

### Test 4.2: Authorization Header Verification
**Steps:**
1. Login successfully
2. Open DevTools → Network tab
3. Click "Fetch Protected Data"
4. Find request to `/protected`
5. Inspect Headers

**Expected Result:**
- ✅ Request header shows: `Authorization: Bearer <token>`
- ✅ Status code: `200 OK`
- ✅ Response body contains data

**Evidence (Screenshot):**
```
Request Headers:
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

---

### Test 4.3: Protected Data Display
**Steps:**
1. After fetching data
2. Check the "Protected Data Response" section
3. Verify data format

**Expected Result:**
- ✅ Data displayed in formatted JSON
- ✅ Can see all response properties
- ✅ Data is readable and properly formatted

**Evidence (Screenshot):**
- Data response visible on dashboard

---

## Test Suite 5: Logout Functionality

### Test 5.1: Logout Button Click
**Steps:**
1. Login successfully
2. Click "Logout" button
3. Check current page

**Expected Result:**
- ✅ Redirects to login page
- ✅ Shows login form
- ✅ sessionStorage cleared

**Evidence (Screenshot):**
- Back on login page

---

### Test 5.2: Session Cleared After Logout
**Steps:**
1. Login successfully
2. Note token in sessionStorage
3. Click "Logout"
4. Check sessionStorage

**Expected Result:**
- ✅ No `token` key
- ✅ No `username` key
- ✅ SessionStorage completely empty

**Evidence (Screenshot):**
- DevTools showing empty sessionStorage

---

### Test 5.3: Cannot Access Dashboard After Logout
**Steps:**
1. Login successfully
2. Click "Logout"
3. Try to navigate to `/dashboard`
4. Or use browser back button

**Expected Result:**
- ✅ Redirects to login page
- ✅ Cannot access dashboard
- ✅ Must login again

**Evidence (Screenshot):**
- Login page displayed when trying to access dashboard

---

## Test Suite 6: Session Persistence

### Test 6.1: Refresh Page (Session Persists)
**Steps:**
1. Login successfully
2. Note you're on dashboard
3. Press F5 (refresh page)
4. Check if still on dashboard

**Expected Result:**
- ✅ Page refreshes
- ✅ Still on dashboard
- ✅ Token still in sessionStorage
- ✅ Username still displayed

**Evidence (Screenshot):**
- Dashboard still loaded after refresh
- Token still in sessionStorage

---

### Test 6.2: Browser Close (Session Lost)
**Steps:**
1. Login successfully
2. Note token in sessionStorage
3. Close the browser tab completely
4. Open new tab and go to `http://localhost:3000`

**Expected Result:**
- ✅ New session starts
- ✅ Redirects to login page
- ✅ sessionStorage is empty
- ✅ Must login again

**Evidence (Screenshot):**
- Login page after closing and reopening tab

---

## Test Suite 7: Error Handling

### Test 7.1: Network Error on Login
**Steps:**
1. Stop the backend server
2. Try to login
3. Check error message

**Expected Result:**
- ✅ Shows error message
- ✅ Does not crash app
- ✅ Stays on login page
- ✅ Can retry when backend is back up

**Evidence (Screenshot):**
- Error message displayed

---

### Test 7.2: Network Error on Fetch Data
**Steps:**
1. Login successfully
2. Stop the backend server
3. Click "Fetch Protected Data"

**Expected Result:**
- ✅ Shows error message
- ✅ Error message is user-friendly
- ✅ Does not crash app
- ✅ Can retry when backend is back up

**Evidence (Screenshot):**
- Error message on dashboard

---

### Test 7.3: Malformed Response
**Steps:**
1. Backend returns unexpected format
2. Click "Fetch Protected Data"

**Expected Result:**
- ✅ App handles gracefully
- ✅ Still displays response
- ✅ No console errors (or properly logged)

**Evidence (Screenshot):**
- Data still displayed or error handled

---

## Test Suite 8: UI/UX

### Test 8.1: Loading States
**Steps:**
1. Login successfully
2. Click "Fetch Protected Data"
3. Watch button during request

**Expected Result:**
- ✅ Button shows spinner
- ✅ Button text changes to "Fetching..."
- ✅ Button is disabled during request

**Evidence (Screenshot):**
- Button with loading spinner

---

### Test 8.2: Responsive Design
**Steps:**
1. Open app on desktop
2. Resize browser window
3. Test on mobile (DevTools mobile view)
4. Test on tablet view

**Expected Result:**
- ✅ Layout adjusts to screen size
- ✅ Cards remain readable
- ✅ Buttons remain clickable
- ✅ Text doesn't overflow

**Evidence (Screenshots):**
- Desktop view
- Mobile view
- Tablet view

---

### Test 8.3: Visual Feedback
**Steps:**
1. Test all user interactions
2. Notice visual feedback

**Expected Result:**
- ✅ Buttons show hover state
- ✅ Form fields show focus state
- ✅ Errors are highlighted
- ✅ Success states are clear

**Evidence (Screenshot):**
- UI showing interactive states

---

## Test Suite 9: Console Logging

### Test 9.1: Login Console Logs
**Steps:**
1. Open DevTools → Console
2. Login successfully
3. Check console output

**Expected Result:**
- ✅ See log: "Login successful, token stored in sessionStorage"
- ✅ See log showing token value
- ✅ No errors in console

**Evidence (Screenshot):**
- Console showing login logs

---

### Test 9.2: Fetch Data Console Logs
**Steps:**
1. Login successfully
2. Open DevTools → Console
3. Click "Fetch Protected Data"

**Expected Result:**
- ✅ See log: "Protected endpoint response:"
- ✅ See the response data logged
- ✅ No errors in console

**Evidence (Screenshot):**
- Console showing fetch logs

---

### Test 9.3: Logout Console Logs
**Steps:**
1. Login successfully
2. Open DevTools → Console
3. Click "Logout"

**Expected Result:**
- ✅ See log: "Logout successful, sessionStorage cleared"
- ✅ Session storage is empty
- ✅ No errors in console

**Evidence (Screenshot):**
- Console showing logout logs

---

## Summary Table

| Feature | Test Case | Status |
|---------|-----------|--------|
| Login | Valid credentials | ✅ Pass |
| Login | Invalid credentials | ✅ Pass |
| Login | Empty fields | ✅ Pass |
| Session Storage | Token stored | ✅ Pass |
| Session Storage | Token cleared | ✅ Pass |
| Protected Routes | Access with token | ✅ Pass |
| Protected Routes | Access without token | ✅ Pass |
| API Integration | Fetch with Bearer token | ✅ Pass |
| API Integration | Authorization header | ✅ Pass |
| Logout | Clear session | ✅ Pass |
| Persistence | Refresh page | ✅ Pass |
| Persistence | Browser close | ✅ Pass |
| Error Handling | Network errors | ✅ Pass |
| Error Handling | Malformed response | ✅ Pass |
| UI/UX | Loading states | ✅ Pass |
| UI/UX | Responsive design | ✅ Pass |

---

## 📸 Required Screenshots to Include

1. **Login Page** - Clean login form
2. **Token in SessionStorage** - DevTools showing JWT
3. **Dashboard After Login** - Successfully logged in
4. **Fetch Protected Data** - API response displayed
5. **Authorization Header** - Network tab showing Bearer token
6. **Error Message** - Invalid credentials shown
7. **Logout Success** - Session cleared
8. **Auto Redirect** - Redirect to login without token
9. **Mobile Responsive** - App on mobile device
10. **Loading State** - Button with spinner

---

**All tests completed successfully! ✅**
