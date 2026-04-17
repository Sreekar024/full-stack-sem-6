# API Integration Guide

## 🔗 Complete API Integration Reference

This guide shows how the frontend integrates with JWT APIs.

---

## 📌 API Endpoints

### Base URL
```
http://localhost:5000
```

### Endpoints
1. `POST /login` - Authenticate and get JWT
2. `GET /protected` - Access protected data

---

## 📤 Endpoint 1: POST /login

### Purpose
Authenticate user with username and password, receive JWT token.

### Location in Code
**File:** `src/components/Login.js`  
**Function:** `handleLogin()`

### Request Format

**URL:**
```
POST http://localhost:5000/login
```

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "username": "user1",
  "password": "password123"
}
```

### Code Implementation

```javascript
const handleLogin = async (e) => {
  e.preventDefault();
  setError('');
  setLoading(true);

  try {
    // Make API call
    const response = await axios.post(
      'http://localhost:5000/login',
      {
        username,
        password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    // Handle success
    if (response.data && response.data.token) {
      // Store token in sessionStorage
      sessionStorage.setItem('token', response.data.token);
      sessionStorage.setItem('username', username);
      
      console.log('Login successful, token stored in sessionStorage');
      console.log('Token:', response.data.token);

      // Redirect to dashboard
      navigate('/dashboard');
    } else {
      setError('Login failed: No token received');
    }
  } catch (err) {
    // Handle errors
    console.error('Login error:', err);
    setError(
      err.response?.data?.message ||
      err.message ||
      'Login failed. Please check your credentials.'
    );
  } finally {
    setLoading(false);
  }
};
```

### Response - Success (200)

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
  "message": "Login successful"
}
```

### Response - Error (401)

```json
{
  "message": "Invalid credentials"
}
```

### Curl Command

```bash
curl -X POST http://localhost:5000/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "user1",
    "password": "password123"
  }'
```

### Testing Steps

1. **Open login page**
   - Navigate to http://localhost:3000

2. **Enter credentials**
   - Username: `user1`
   - Password: `password123`

3. **Click Login**
   - Observe network request in DevTools

4. **Verify Success**
   - Should redirect to dashboard
   - Token should appear in sessionStorage
   - DevTools Network tab shows 200 status

5. **Check DevTools**
   - Application → Session Storage
   - Should see `token` key with JWT value

---

## 📥 Endpoint 2: GET /protected

### Purpose
Access protected data using JWT authentication.

### Location in Code
**File:** `src/components/Dashboard.js`  
**Function:** `handleFetchData()`

### Request Format

**URL:**
```
GET http://localhost:5000/protected
```

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

**Note:** Replace `<JWT_TOKEN>` with actual token from sessionStorage

### Code Implementation

```javascript
const handleFetchData = async () => {
  setError('');
  setLoading(true);
  setData('');

  try {
    // Get token from sessionStorage
    const token = sessionStorage.getItem('token');

    // Make API call with Bearer token
    const response = await axios.get(
      'http://localhost:5000/protected',
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Protected endpoint response:', response.data);

    // Display response
    if (typeof response.data === 'object') {
      setData(JSON.stringify(response.data, null, 2));
    } else {
      setData(response.data);
    }
  } catch (err) {
    console.error('Fetch data error:', err);
    
    if (err.response?.status === 401) {
      setError('Unauthorized! Token may be invalid or expired.');
      // Redirect to login after delay
      setTimeout(() => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('username');
        navigate('/');
      }, 2000);
    } else {
      setError(
        err.response?.data?.message ||
        err.message ||
        'Failed to fetch protected data'
      );
    }
  } finally {
    setLoading(false);
  }
};
```

### Response - Success (200)

```json
{
  "message": "This is protected data",
  "user": "user1",
  "timestamp": "2024-04-17T10:30:00Z",
  "data": {
    "role": "user",
    "permissions": ["read", "write"]
  }
}
```

### Response - Unauthorized (401)

```json
{
  "message": "Unauthorized"
}
```

### Response - Invalid Token (401)

```json
{
  "message": "Invalid token"
}
```

### Curl Command

```bash
curl -X GET http://localhost:5000/protected \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE" \
  -H "Content-Type: application/json"
```

### Testing Steps

1. **Login first**
   - Ensure you're on dashboard
   - Token should be in sessionStorage

2. **Click "Fetch Protected Data"**
   - Observe network request in DevTools

3. **Verify Success**
   - Should see response data displayed
   - DevTools shows 200 status

4. **Check Authorization Header**
   - DevTools Network tab
   - Find `/protected` request
   - Headers section shows: `Authorization: Bearer <token>`

---

## 🔄 Complete Request/Response Cycle

### Step 1: Login Request/Response

**Request:**
```
POST /login
Content-Type: application/json

{
  "username": "user1",
  "password": "password123"
}
```

**Response:**
```
200 OK
Content-Type: application/json

{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "message": "Login successful"
}
```

**Frontend Action:**
- Store token in `sessionStorage.token`
- Navigate to `/dashboard`

### Step 2: Access Protected Endpoint

**Request:**
```
GET /protected
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

**Response:**
```
200 OK
Content-Type: application/json

{
  "message": "This is protected data",
  "user": "user1",
  "timestamp": "2024-04-17T10:30:00Z"
}
```

**Frontend Action:**
- Display response data on dashboard

### Step 3: Logout

**Frontend Action:**
- Remove `sessionStorage.token`
- Navigate to `/login`

---

## 🛡️ Authentication Flow Diagram

```
┌─────────────┐
│   Login     │
│  Page Load  │
└──────┬──────┘
       │
       ▼
┌─────────────────────────────────┐
│ User Enters Credentials         │
│ - Username: user1               │
│ - Password: password123         │
└──────┬──────────────────────────┘
       │
       ▼
┌─────────────────────────────────┐
│ POST /login                     │
│ {                               │
│   "username": "user1",          │
│   "password": "password123"     │
│ }                               │
└──────┬──────────────────────────┘
       │
       ▼
┌─────────────────────────────────┐
│ Backend Validates Credentials   │
│ - Check username exists         │
│ - Verify password               │
│ - Generate JWT token            │
└──────┬──────────────────────────┘
       │
       ▼
┌─────────────────────────────────┐
│ Return JWT Token                │
│ {                               │
│   "token": "eyJ...",            │
│   "message": "Success"          │
│ }                               │
└──────┬──────────────────────────┘
       │
       ▼
┌─────────────────────────────────┐
│ Store in sessionStorage         │
│ sessionStorage.token = "eyJ..."│
└──────┬──────────────────────────┘
       │
       ▼
┌─────────────────────────────────┐
│ Redirect to Dashboard           │
│ /dashboard                      │
└──────┬──────────────────────────┘
       │
       ▼
┌─────────────────────────────────┐
│ Click "Fetch Protected Data"    │
└──────┬──────────────────────────┘
       │
       ▼
┌─────────────────────────────────┐
│ GET /protected                  │
│ Authorization: Bearer eyJ...    │
└──────┬──────────────────────────┘
       │
       ▼
┌─────────────────────────────────┐
│ Backend Validates Token         │
│ - Check token signature         │
│ - Verify token not expired      │
│ - Get user from token           │
└──────┬──────────────────────────┘
       │
       ▼
┌─────────────────────────────────┐
│ Return Protected Data           │
│ {                               │
│   "message": "Protected data",  │
│   "user": "user1",              │
│   "timestamp": "..."            │
│ }                               │
└──────┬──────────────────────────┘
       │
       ▼
┌─────────────────────────────────┐
│ Display Data on Dashboard       │
└──────┬──────────────────────────┘
       │
       ▼
┌─────────────────────────────────┐
│ User Clicks "Logout"            │
└──────┬──────────────────────────┘
       │
       ▼
┌─────────────────────────────────┐
│ Clear sessionStorage            │
│ - Remove token                  │
│ - Remove username               │
└──────┬──────────────────────────┘
       │
       ▼
┌─────────────────────────────────┐
│ Redirect to Login               │
│ /                               │
└─────────────────────────────────┘
```

---

## 🔐 JWT Token Structure

### Token Format
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

### Token Parts

**Header (Base64URL Encoded):**
```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

**Payload (Base64URL Encoded):**
```json
{
  "sub": "1234567890",
  "name": "user1",
  "iat": 1516239022
}
```

**Signature:**
```
HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), secret)
```

### Decoding Token
Use https://jwt.io to decode and verify tokens

---

## 🧪 Testing API Integration

### Using Postman

#### Import Collection
```json
{
  "info": {
    "name": "JWT Authentication",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Login",
      "request": {
        "method": "POST",
        "url": "http://localhost:5000/login",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\"username\":\"user1\",\"password\":\"password123\"}"
        }
      }
    },
    {
      "name": "Get Protected Data",
      "request": {
        "method": "GET",
        "url": "http://localhost:5000/protected",
        "header": [
          {
            "key": "Authorization",
            "value": "Bearer {{token}}"
          }
        ]
      }
    }
  ]
}
```

### Using cURL

```bash
# Step 1: Login and get token
curl -X POST http://localhost:5000/login \
  -H "Content-Type: application/json" \
  -d '{"username":"user1","password":"password123"}' \
  -s | jq '.token' > token.txt

# Step 2: Use token to access protected endpoint
TOKEN=$(cat token.txt | tr -d '"')
curl -X GET http://localhost:5000/protected \
  -H "Authorization: Bearer $TOKEN" \
  -s | jq
```

---

## ⚠️ Error Handling

### HTTP Status Codes

| Code | Meaning | Handling |
|------|---------|----------|
| 200 | Success | Display data |
| 400 | Bad Request | Show error to user |
| 401 | Unauthorized | Redirect to login |
| 403 | Forbidden | Show access denied |
| 404 | Not Found | Show not found error |
| 500 | Server Error | Show server error |

### Error Response Examples

**Invalid Credentials (401):**
```json
{
  "message": "Invalid credentials",
  "status": 401
}
```

**Expired Token (401):**
```json
{
  "message": "Token expired",
  "status": 401
}
```

**Server Error (500):**
```json
{
  "message": "Internal server error",
  "status": 500
}
```

### Frontend Error Handling

```javascript
try {
  const response = await axios.get(url, { headers });
  // Handle success
} catch (err) {
  if (err.response?.status === 401) {
    // Unauthorized - redirect to login
    navigate('/');
  } else if (err.response?.status === 403) {
    // Forbidden - show access denied
    setError('Access denied');
  } else if (err.response?.status >= 500) {
    // Server error
    setError('Server error. Please try again later.');
  } else {
    // Other errors
    setError(err.message);
  }
}
```

---

## 📚 Useful References

- [JWT Specification](https://tools.ietf.org/html/rfc7519)
- [HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
- [Axios Documentation](https://axios-http.com)
- [CORS Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- [Sessions and Cookies](https://owasp.org/www-community/attacks/Session_fixation)

---

**API Integration Complete! 🎉**
