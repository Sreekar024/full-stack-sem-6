# Experiment 9 ↔️ Experiment 7 Integration Guide

## 🔗 Complete Integration Overview

This guide explains how **Experiment 9 (React Frontend)** integrates with **Experiment 7 (Spring Boot Backend)**.

---

## 🎯 Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                  Experiment 9 (Frontend)                │
│                  React + Material UI                    │
│                    Port: 3000                           │
└────────────────────────┬────────────────────────────────┘
                         │
                    HTTP/REST
                    Axios
                    CORS
                         │
┌────────────────────────▼────────────────────────────────┐
│                  Experiment 7 (Backend)                 │
│              Spring Boot + Spring Security              │
│                    Port: 8080                           │
└─────────────────────────────────────────────────────────┘
```

---

## ✅ Experiment 7 Backend Requirements

### Required Endpoints

#### 1. Authentication Endpoints
```
POST /api/auth/login
  Request: { username, password }
  Response: { user: "string", role: "ADMIN|USER" }

POST /api/auth/logout
  Request: (any)
  Response: { message: "string" }
```

#### 2. User Endpoints
```
GET /api/user/profile
  Auth Required: USER or ADMIN
  Response: { id, username, email, firstName, lastName, role, ... }

GET /api/user/data
  Auth Required: USER
  Response: { userId, totalLogins, lastLogin, ... }
```

#### 3. Admin Endpoints
```
GET /api/admin/dashboard
  Auth Required: ADMIN only
  Response: { totalUsers, totalAdmins, totalRegularUsers, ... }

GET /api/admin/users
  Auth Required: ADMIN only
  Response: [{ id, username, email, role, ... }]

DELETE /api/admin/users/:id
  Auth Required: ADMIN only
  Response: { message: "string" }
```

### Security Requirements
- CORS enabled for http://localhost:3000
- Proper HTTP status codes (401, 403, 404, 500)
- JSON response format
- Role validation on each endpoint
- User validation on profile endpoints

---

## 🚀 Experiment 9 Frontend Setup

### Step 1: Install Dependencies
```bash
cd Experiment-9
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

Server will start on `http://localhost:3000`

### Step 3: Verify Backend Connection
1. Backend should run on `http://localhost:8080`
2. Check CORS is enabled
3. Test endpoints with Postman first

---

## 🔄 How Integration Works

### 1. Startup Flow
```
App Loads
  ↓
AuthProvider checks sessionStorage
  ↓
No session → Shows Login page
  ↓
Has session → Shows appropriate dashboard
```

### 2. Login Flow
```
User enters credentials in Login.jsx
  ↓
authLogin() called from AuthContext
  ↓
Axios POST to /api/auth/login
  ↓
Backend validates and returns { user, role }
  ↓
Frontend stores in sessionStorage
  ↓
Frontend navigates based on role
```

### 3. API Call Flow
```
Component (e.g., UserDashboard) mounts
  ↓
useEffect calls getUserProfile()
  ↓
Request interceptor adds auth headers
  ↓
Axios GET to /api/user/profile
  ↓
Backend checks authorization
  ↓
Backend returns user data or 401/403
  ↓
Response interceptor handles errors
  ↓
Component state updates with data
```

### 4. Logout Flow
```
User clicks logout in Navbar
  ↓
authLogout() called
  ↓
POST to /api/auth/logout
  ↓
sessionStorage.clear()
  ↓
Navigate to /login
  ↓
Login page displayed
```

---

## 📡 API Configuration Details

### Axios Base URL
```javascript
// In src/api.js
const api = axios.create({
  baseURL: 'http://localhost:8080/api'
});
```

### Request Interceptor
```javascript
api.interceptors.request.use((config) => {
  const user = sessionStorage.getItem('user');
  const role = sessionStorage.getItem('role');
  
  if (user && role) {
    config.headers['X-User-Name'] = user;
    config.headers['X-User-Role'] = role;
  }
  
  return config;
});
```

### Response Interceptor
```javascript
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      sessionStorage.clear();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

---

## 🧪 Testing Integration

### Test 1: Login
```bash
1. Start backend on port 8080
2. Start frontend on port 3000
3. Try logging in with valid credentials
4. Check Network tab for POST /api/auth/login
5. Verify response has { user, role }
```

### Test 2: Dashboard Access
```bash
1. After login, verify correct dashboard appears
2. Admin should go to /admin
3. User should go to /user
4. Check sessionStorage has user and role
```

### Test 3: API Calls
```bash
1. On dashboard, verify API calls in Network tab
2. Admin dashboard should fetch /api/admin/dashboard
3. Admin dashboard should fetch /api/admin/users
4. User dashboard should fetch /api/user/profile
5. Check response data displays correctly
```

### Test 4: Unauthorized Access
```bash
1. Login as USER role
2. Try accessing /admin directly
3. Should redirect to /access-denied
4. Try logging in as ADMIN
5. Can now access /admin
```

### Test 5: Session Persistence
```bash
1. Login to system
2. Refresh page (F5)
3. Should still be logged in
4. Session should persist
```

### Test 6: Error Handling
```bash
1. Stop backend server
2. Try using frontend
3. Should show error message
4. Should not crash application
5. Restart backend to continue
```

---

## 🔐 Security Verification

### Frontend Security
- ✅ Sessions stored in sessionStorage (not localStorage for security)
- ✅ Protected routes with role guards
- ✅ Automatic logout on 401/403
- ✅ No credentials stored after logout
- ✅ No API keys exposed in code

### Backend Requirements
- ✅ Password hashing (bcrypt)
- ✅ Role validation on every endpoint
- ✅ CORS properly configured
- ✅ HTTPS in production
- ✅ Token/session expiration

---

## 📊 Demo Data for Testing

### Admin User (from Experiment 7)
```
Username: admin
Password: password123
Role: ADMIN
Access: Full system
```

### Regular User (from Experiment 7)
```
Username: user
Password: password123
Role: USER
Access: Profile only
```

### Test Flow
1. Login as `admin` / `password123`
2. Go to admin dashboard
3. View all users and statistics
4. Logout
5. Login as `user` / `password123`
6. View user profile only
7. Try accessing admin (should redirect)

---

## 🐛 Troubleshooting Integration Issues

### Issue: CORS Error
```
Error: Access to XMLHttpRequest at 'http://localhost:8080/api/auth/login'
from origin 'http://localhost:3000' has been blocked by CORS policy
```

**Solution:**
```java
// In Spring Boot backend
@Configuration
public class CorsConfig {
  @Bean
  public CorsFilter corsFilter() {
    CorsConfiguration config = new CorsConfiguration();
    config.addAllowedOrigin("http://localhost:3000");
    config.addAllowedMethod("*");
    config.addAllowedHeader("*");
    config.setAllowCredentials(true);
    
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", config);
    return new CorsFilter(source);
  }
}
```

### Issue: 401 Unauthorized
```
Error: 401 Unauthorized from /api/user/profile
```

**Solution:**
1. Check credentials are correct
2. Verify backend authentication logic
3. Check JWT token/session is set
4. Verify role matches endpoint requirements

### Issue: Login Fails
```
Error: Cannot POST /api/auth/login
```

**Solution:**
1. Verify backend is running on port 8080
2. Check endpoint path is exactly `/api/auth/login`
3. Verify request body format: `{ username, password }`
4. Check backend logs for errors

### Issue: API Response Empty
```
Dashboard appears but no data loaded
```

**Solution:**
1. Check API endpoint exists on backend
2. Verify response format is JSON
3. Check role has access to endpoint
4. Look at Network tab for actual response

### Issue: Session Not Persisting
```
Refresh page and login screen appears
```

**Solution:**
1. Check sessionStorage is working
2. Verify no JavaScript errors
3. Check sessionStorage keys exist
4. Test with localStorage temporarily

---

## 📈 Performance Optimization Tips

### Frontend Side
```javascript
// 1. Use lazy loading for routes
const AdminDashboard = lazy(() => import('./components/AdminDashboard'));

// 2. Memoize components
const Navbar = memo(NavbarComponent);

// 3. Cache API responses
const cache = new Map();

// 4. Debounce API calls
const debouncedSearch = debounce(searchFunction, 300);
```

### Backend Side
```java
// 1. Add pagination
@GetMapping("/admin/users")
public Page<User> getAllUsers(Pageable pageable)

// 2. Add caching
@Cacheable("admin-dashboard")
public DashboardStats getDashboard()

// 3. Add compression
HttpServletResponse.setHeader("Content-Encoding", "gzip");

// 4. Optimize queries
@Query with specific select instead of full object
```

---

## 🚀 Deployment Integration

### Development
```
Frontend: http://localhost:3000
Backend: http://localhost:8080
```

### Production
```
Frontend: https://yourdomain.com
Backend: https://api.yourdomain.com

Update in Experiment 9:
const api = axios.create({
  baseURL: 'https://api.yourdomain.com/api'
});
```

---

## 📋 Integration Checklist

Before considering integration complete:

### Backend (Experiment 7)
- [ ] All endpoints implemented
- [ ] CORS enabled for frontend
- [ ] Proper error responses (401, 403, etc.)
- [ ] Role validation working
- [ ] User authentication working
- [ ] Database populated with test data
- [ ] Running on port 8080

### Frontend (Experiment 9)
- [ ] All components created
- [ ] API configuration correct
- [ ] Login working
- [ ] Session storage working
- [ ] Protected routes working
- [ ] Error handling working
- [ ] Running on port 3000

### Integration Tests
- [ ] Login successful
- [ ] Admin dashboard loads
- [ ] User dashboard loads
- [ ] API calls work
- [ ] Unauthorized access handled
- [ ] Error messages display
- [ ] Logout works
- [ ] Session persists

---

## 🎓 Learning Resources

### Spring Boot Security
- https://spring.io/projects/spring-security
- https://docs.spring.io/spring-security/reference/

### React Integration Patterns
- https://react.dev/learn/synchronizing-with-effects
- https://react.dev/learn/scaling-up-with-reducer-and-context

### CORS
- https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS

### API Best Practices
- RESTful API Design Guide
- HTTP Status Codes Reference

---

## 📞 Debugging Tools

### Browser DevTools
```
1. Network Tab - See all API requests
2. Console - Check for JavaScript errors
3. Application - View sessionStorage
4. DevTools Network - See response content
```

### Backend Logging
```java
// Add logging to see what's happening
@GetMapping("/user/profile")
public ResponseEntity<?> getProfile() {
  System.out.println("User profile requested");
  // ...
}
```

### Postman Testing
```
1. Test endpoints directly
2. Verify response format
3. Test with different credentials
4. Test error cases
```

---

## ✨ Complete Integration Example

### Scenario: Admin Dashboard
```
1. Admin logs in with admin/password123
2. Frontend sends POST /api/auth/login with credentials
3. Backend validates and returns { user: "admin", role: "ADMIN" }
4. Frontend stores in sessionStorage and navigates to /admin
5. AdminDashboard component mounts
6. useEffect calls getAdminDashboard()
7. Frontend sends GET /api/admin/dashboard
8. Backend checks role is ADMIN ✓ and returns statistics
9. Component displays statistics in cards
10. Frontend sends GET /api/admin/users
11. Backend checks role is ADMIN ✓ and returns user list
12. Component displays users in table
13. User can delete a user via DELETE /api/admin/users/5
14. Backend checks role is ADMIN ✓ and deletes user
15. Frontend updates UI
```

---

## 🎉 Conclusion

When properly integrated:
- ✅ Experiment 9 (Frontend) provides the UI
- ✅ Experiment 7 (Backend) provides the API
- ✅ Together they form a complete RBAC system
- ✅ Users can securely login and access role-appropriate features
- ✅ Data is properly validated and protected

**Integration is complete when all checklist items are verified!**

---

**Integration Guide Version:** 1.0  
**Last Updated:** April 2026  
**Status:** ✅ Ready for Integration
