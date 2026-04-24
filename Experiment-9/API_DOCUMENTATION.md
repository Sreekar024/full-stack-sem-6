# API Documentation for Experiment 9

## 🌐 Backend API Reference

This document describes all API endpoints that the Experiment 9 frontend consumes from the Spring Boot backend (Experiment 7).

---

## 📌 Base Configuration

### API Base URL
```
http://localhost:8080/api
```

### Content Type
```
application/json
```

### Authentication
Custom headers (determined by backend):
```
X-User-Name: {username}
X-User-Role: {role}
```

---

## 🔐 Authentication Endpoints

### 1. Login
**Endpoint:** `POST /auth/login`

**Description:** Authenticate user with username and password

**Request Body:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Successful Response (200 OK):**
```json
{
  "user": "admin",
  "role": "ADMIN"
}
```

**Error Response (401 Unauthorized):**
```json
{
  "message": "Invalid credentials"
}
```

**Implementation in Frontend:**
```javascript
const authLogin = (username, password) => 
  api.post('/auth/login', { username, password });

// Usage
const result = await authLogin('admin', 'password123');
// Returns: { user: 'admin', role: 'ADMIN' }
```

---

### 2. Logout
**Endpoint:** `POST /auth/logout`

**Description:** Logout current user and invalidate session

**Request Body:** None (or empty JSON)
```json
{}
```

**Successful Response (200 OK):**
```json
{
  "message": "Logged out successfully"
}
```

**Implementation in Frontend:**
```javascript
const authLogout = () => 
  api.post('/auth/logout');

// Usage
await authLogout();
// Clears sessionStorage and redirects
```

---

## 👤 User Endpoints

### 1. Get User Profile
**Endpoint:** `GET /user/profile`

**Description:** Get current logged-in user's profile information

**Authentication:** Required (USER or ADMIN role)

**Request Parameters:** None

**Successful Response (200 OK):**
```json
{
  "id": 1,
  "username": "user",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "role": "USER",
  "createdAt": "2024-01-01T00:00:00",
  "updatedAt": "2024-01-01T00:00:00"
}
```

**Error Response (401 Unauthorized):**
```json
{
  "message": "Unauthorized"
}
```

**Error Response (403 Forbidden):**
```json
{
  "message": "Access Denied"
}
```

**Implementation in Frontend:**
```javascript
const getUserProfile = () => 
  api.get('/user/profile');

// Usage
useEffect(() => {
  getUserProfile()
    .then(response => {
      setProfileData(response.data);
    })
    .catch(error => {
      setError(error.response?.data?.message);
    });
}, []);
```

**Expected in Component:**
```jsx
<Table>
  <TableRow>
    <TableCell>ID</TableCell>
    <TableCell>{profileData.id}</TableCell>
  </TableRow>
  <TableRow>
    <TableCell>Username</TableCell>
    <TableCell>{profileData.username}</TableCell>
  </TableRow>
  {/* More fields */}
</Table>
```

---

### 2. Get User Data
**Endpoint:** `GET /user/data`

**Description:** Get additional user-specific data

**Authentication:** Required (USER role)

**Request Parameters:** None

**Successful Response (200 OK):**
```json
{
  "userId": 1,
  "totalLogins": 10,
  "lastLogin": "2024-04-23T15:30:00",
  "accountStatus": "ACTIVE",
  "preferences": {
    "theme": "light",
    "notifications": true
  }
}
```

**Implementation in Frontend:**
```javascript
const getUserData = () => 
  api.get('/user/data');
```

---

## 🔧 Admin Endpoints

### 1. Get Admin Dashboard
**Endpoint:** `GET /admin/dashboard`

**Description:** Get system statistics and admin dashboard data

**Authentication:** Required (ADMIN role only)

**Request Parameters:** None

**Successful Response (200 OK):**
```json
{
  "totalUsers": 25,
  "totalAdmins": 3,
  "totalRegularUsers": 22,
  "totalLogins": 150,
  "activeUsers": 8,
  "newUsersToday": 2,
  "systemStatus": "HEALTHY"
}
```

**Error Response (403 Forbidden):**
```json
{
  "message": "Only admins can access this resource"
}
```

**Implementation in Frontend:**
```javascript
const getAdminDashboard = () => 
  api.get('/admin/dashboard');

// Usage in component
const [dashboardData, setDashboardData] = useState(null);

useEffect(() => {
  getAdminDashboard()
    .then(res => setDashboardData(res.data))
    .catch(err => setError(err.message));
}, []);

// Display as cards
{Object.entries(dashboardData).map(([key, value]) => (
  <Card key={key}>
    <Typography>{key}</Typography>
    <Typography variant="h5">{value}</Typography>
  </Card>
))}
```

---

### 2. Get All Users
**Endpoint:** `GET /admin/users`

**Description:** Get list of all users in the system

**Authentication:** Required (ADMIN role only)

**Request Parameters:** 
- `page` (optional): Page number for pagination (default: 0)
- `size` (optional): Number of users per page (default: 20)
- `role` (optional): Filter by role (ADMIN, USER)

**Query Examples:**
```
/api/admin/users
/api/admin/users?page=0&size=10
/api/admin/users?role=USER
```

**Successful Response (200 OK):**
```json
[
  {
    "id": 1,
    "username": "admin",
    "email": "admin@example.com",
    "firstName": "Admin",
    "lastName": "User",
    "role": "ADMIN",
    "createdAt": "2024-01-01T00:00:00",
    "updatedAt": "2024-04-20T10:30:00"
  },
  {
    "id": 2,
    "username": "user",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "USER",
    "createdAt": "2024-02-15T00:00:00",
    "updatedAt": "2024-04-22T14:20:00"
  }
]
```

**Implementation in Frontend:**
```javascript
const getAllUsers = () => 
  api.get('/admin/users');

// Usage in component
const [users, setUsers] = useState([]);

useEffect(() => {
  getAllUsers()
    .then(res => setUsers(res.data))
    .catch(err => setError(err.message));
}, []);

// Display in table
<Table>
  <TableBody>
    {users.map(user => (
      <TableRow key={user.id}>
        <TableCell>{user.id}</TableCell>
        <TableCell>{user.username}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>{user.role}</TableCell>
        <TableCell>
          <Button onClick={() => deleteUser(user.id)}>
            Delete
          </Button>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

---

### 3. Delete User
**Endpoint:** `DELETE /admin/users/:id`

**Description:** Delete a specific user from the system

**Authentication:** Required (ADMIN role only)

**Path Parameters:**
- `id` (required): User ID to delete (integer)

**Request Body:** None

**URL Example:**
```
DELETE /api/admin/users/5
```

**Successful Response (200 OK):**
```json
{
  "message": "User deleted successfully"
}
```

**Error Response (404 Not Found):**
```json
{
  "message": "User not found"
}
```

**Error Response (403 Forbidden):**
```json
{
  "message": "Cannot delete admin users"
}
```

**Implementation in Frontend:**
```javascript
const deleteUser = (userId) => 
  api.delete(`/admin/users/${userId}`);

// Usage with confirmation dialog
const handleDeleteConfirm = async () => {
  try {
    await deleteUser(userToDelete.id);
    setUsers(users.filter(u => u.id !== userToDelete.id));
    setDeleteDialog({ open: false, userId: null });
  } catch (err) {
    setError(err.response?.data?.message);
  }
};
```

---

## 🔄 Request/Response Cycle

### Complete Authentication Flow

**1. User submits login form**
```javascript
// In Login.jsx
await authLogin(username, password);
```

**2. Axios Request**
```
POST http://localhost:8080/api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "password123"
}
```

**3. Backend Processing**
- Validates credentials
- Checks user exists
- Verifies password
- Determines role

**4. Response**
```
HTTP/1.1 200 OK
Content-Type: application/json

{
  "user": "admin",
  "role": "ADMIN"
}
```

**5. Frontend Storage**
```javascript
sessionStorage.setItem('user', 'admin');
sessionStorage.setItem('role', 'ADMIN');
```

**6. Navigation**
```javascript
navigate('/admin', { replace: true });
```

---

## ⚠️ Error Handling

### HTTP Status Codes

| Status | Meaning | Action |
|--------|---------|--------|
| 200 | OK | Request successful |
| 400 | Bad Request | Invalid request format |
| 401 | Unauthorized | No valid authentication |
| 403 | Forbidden | Authenticated but not authorized |
| 404 | Not Found | Resource doesn't exist |
| 500 | Server Error | Backend error |

### Frontend Error Handling

```javascript
// In Axios interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear auth and redirect to login
      sessionStorage.clear();
      window.location.href = '/login';
    } else if (error.response?.status === 403) {
      // Redirect to access denied
      navigate('/access-denied');
    }
    return Promise.reject(error);
  }
);

// In component
try {
  const response = await getUserProfile();
  setData(response.data);
} catch (error) {
  setError(error.response?.data?.message || 'An error occurred');
}
```

---

## 📊 Data Models

### User Model
```javascript
{
  id: number,           // Unique identifier
  username: string,     // Login username
  email: string,        // User email
  firstName: string,    // First name
  lastName: string,     // Last name
  role: string,         // "ADMIN" or "USER"
  createdAt: datetime,  // Account creation date
  updatedAt: datetime   // Last update date
}
```

### Auth Response
```javascript
{
  user: string,    // Username
  role: string     // "ADMIN" or "USER"
}
```

### Dashboard Stats
```javascript
{
  totalUsers: number,
  totalAdmins: number,
  totalRegularUsers: number,
  totalLogins: number,
  activeUsers: number,
  newUsersToday: number,
  systemStatus: string
}
```

---

## 🧪 Testing with Postman

### Collection Setup

**1. Create Environment Variables:**
```
{{base_url}} = http://localhost:8080/api
{{token}} = (stored after login)
{{user_id}} = (stored after user fetch)
```

**2. Authentication Test**
```
POST {{base_url}}/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "password123"
}
```

**3. Get Profile Test**
```
GET {{base_url}}/user/profile
Authorization: Bearer {{token}}
```

**4. Admin Dashboard Test**
```
GET {{base_url}}/admin/dashboard
Authorization: Bearer {{token}}
```

---

## 🔐 Security Considerations

### Session Management
- Sessions stored in sessionStorage (not cookies)
- Cleared on logout
- Cleared on 401/403 response
- Persists on page refresh (intentional for UX)

### Role-Based Access
- Backend validates role on each request
- Frontend validates before rendering
- Admin routes only accessible to ADMIN role
- User routes only accessible to USER role

### Headers
- X-User-Name header sent with requests
- X-User-Role header sent with requests
- Content-Type: application/json always used

---

## 📝 API Integration Checklist

### Before Development
- [ ] Backend API is running
- [ ] All endpoints are available
- [ ] CORS is enabled
- [ ] Correct port (8080)

### During Development
- [ ] API baseURL configured correctly
- [ ] Request/response interceptors working
- [ ] Error handling implemented
- [ ] Loading states added
- [ ] Error messages displayed

### Testing
- [ ] Login endpoint works
- [ ] Logout endpoint works
- [ ] User endpoints return correct data
- [ ] Admin endpoints return correct data
- [ ] Delete operations work
- [ ] Error responses handled

### Production
- [ ] API endpoint configured for production
- [ ] CORS configured for production domain
- [ ] Error logging implemented
- [ ] Performance optimized
- [ ] Security review completed

---

## 🚀 Conclusion

This API documentation provides complete information for integrating the Experiment 9 frontend with the Spring Boot backend. All endpoints are RESTful, return JSON, and implement proper error handling.

For any API-related issues, check:
1. Backend logs
2. Network tab in DevTools
3. Request/Response format
4. Role permissions
5. Session validity

---

**API Documentation Version:** 1.0  
**Last Updated:** April 2026  
**Experiment:** 9 - RBAC System
