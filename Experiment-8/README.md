# JWT Authentication Frontend - Experiment 8

## 📋 Project Overview

This is a React-based frontend application that implements **session-based JWT authentication**. The application consumes JWT APIs from a backend server and demonstrates secure authentication patterns using `sessionStorage`.

## ✨ Features Implemented

### 1. **Login Page**
- User enters Username & Password
- Calls `POST /login` endpoint
- On successful login:
  - JWT token is stored in **sessionStorage**
  - User is redirected to the dashboard
- Displays error messages for invalid credentials
- Demo credentials: `user1` / `password123`

### 2. **Protected Dashboard Page**
- Only accessible if JWT token exists in sessionStorage
- If no token found, user is automatically redirected to login
- Displays logged-in username
- Calls `GET /protected` endpoint with JWT token
- Token is sent in the Authorization header: `Authorization: Bearer <token>`
- Displays protected data response

### 3. **Logout Functionality**
- Clears the JWT token from sessionStorage
- Clears the stored username
- Redirects to login page
- Session is completely cleared

### 4. **Session-Based Restrictions**
- Token stored per session in `sessionStorage`
- Token is lost when browser tab is closed
- Protected routes verify token existence before allowing access
- Automatic redirect to login if token expires or is missing

## 🏗️ Project Structure

```
Experiment-8/
├── public/
│   └── index.html           # HTML template
├── src/
│   ├── components/
│   │   ├── Login.js         # Login component
│   │   └── Dashboard.js     # Protected dashboard component
│   ├── App.js               # Main app with routing
│   ├── App.css              # Application styles
│   ├── index.js             # React entry point
│   └── index.css            # Global styles
├── package.json             # Project dependencies
└── README.md                # This file
```

## 💻 Tech Stack

- **React 18.2.0** - UI Framework
- **React Router DOM 6.20.0** - Client-side routing
- **Axios 1.6.0** - HTTP client for API calls
- **Bootstrap 5.3.0** - CSS framework
- **Material UI 5.14.0** - Advanced UI components
- **Emotion** - CSS-in-JS styling library

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager
- Backend server running on `http://localhost:5000`

### Installation Steps

1. **Navigate to the project directory:**
   ```bash
   cd Experiment-8
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Open in browser:**
   - The app will automatically open at `http://localhost:3000`

## 🔐 Authentication Flow

```
User Input
    ↓
Login Form (username, password)
    ↓
POST /login → Backend
    ↓
Token Received
    ↓
Store in sessionStorage
    ↓
Redirect to Dashboard
    ↓
GET /protected with Bearer Token
    ↓
Display Protected Data
    ↓
Logout → Clear sessionStorage
    ↓
Redirect to Login
```

## 📝 Key Implementation Details

### Login Component (`Login.js`)
```javascript
// 1. User enters credentials
const handleLogin = async (e) => {
  // 2. Send to backend
  const response = await axios.post(
    'http://localhost:5000/login',
    { username, password }
  );
  
  // 3. Store token in sessionStorage
  if (response.data.token) {
    sessionStorage.setItem('token', response.data.token);
    sessionStorage.setItem('username', username);
    navigate('/dashboard');
  }
};
```

### Dashboard Component (`Dashboard.js`)
```javascript
// 1. Check if token exists
useEffect(() => {
  if (!token) {
    navigate('/');  // Redirect if no token
  }
}, [token]);

// 2. Fetch protected data with token
const handleFetchData = async () => {
  const response = await axios.get(
    'http://localhost:5000/protected',
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  setData(response.data);
};

// 3. Logout - clear session
const handleLogout = () => {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('username');
  navigate('/');
};
```

## 🧪 Testing the Application

### Test Case 1: Valid Login
1. Enter username: `user1`
2. Enter password: `password123`
3. Click "Login"
4. ✅ Should redirect to dashboard with token in sessionStorage

### Test Case 2: Protected Data Access
1. After login, click "Fetch Protected Data"
2. ✅ Should display response from `/protected` endpoint
3. Open DevTools → Application → Session Storage
4. ✅ Should see stored JWT token

### Test Case 3: Invalid Credentials
1. Enter wrong username or password
2. Click "Login"
3. ✅ Should show error message

### Test Case 4: Unauthorized Access
1. Manually delete token from sessionStorage (DevTools)
2. Try to access dashboard by URL
3. ✅ Should redirect to login page

### Test Case 5: Logout
1. Click "Logout" button
2. ✅ Should redirect to login page
3. Open DevTools → Application → Session Storage
4. ✅ Token should be cleared

### Test Case 6: Session Persistence
1. Login successfully
2. Refresh the page (F5)
3. ✅ Should remain on dashboard (token persists in session)

### Test Case 7: Tab Close
1. Login successfully
2. Note the token in sessionStorage
3. Close the browser tab
4. Open new tab and navigate to app
5. ✅ Should redirect to login (session cleared)

## 🛠️ API Endpoints Expected

### POST /login
**Request:**
```json
{
  "username": "user1",
  "password": "password123"
}
```

**Response (Success):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "message": "Login successful"
}
```

**Response (Error):**
```json
{
  "message": "Invalid credentials"
}
```

### GET /protected
**Headers:**
```
Authorization: Bearer <token>
```

**Response (Success):**
```json
{
  "message": "This is protected data",
  "user": "user1",
  "timestamp": "2024-01-17T10:30:00Z"
}
```

**Response (Unauthorized):**
```json
{
  "message": "Unauthorized"
}
```

## 📸 Screenshots to Capture

1. **Login Page** - Clean login form with username/password fields
2. **Token in sessionStorage** - DevTools showing stored JWT
3. **Dashboard After Login** - Successfully logged in state
4. **Protected Data Display** - API response shown on dashboard
5. **Unauthorized Error** - Attempting to access with invalid token
6. **Logout Confirmation** - Session storage cleared after logout
7. **Auto Redirect** - Redirect to login when accessing dashboard without token

## 🎨 UI Features

- **Modern gradient background** (Purple to pink)
- **Card-based layout** with smooth animations
- **Responsive design** - Works on mobile, tablet, desktop
- **Loading states** with spinner animation
- **Error handling** with user-friendly messages
- **Token visibility** in sessionStorage section
- **User information display** on dashboard
- **Help section** with instructions

## 🔒 Security Best Practices Implemented

1. ✅ Token stored in **sessionStorage** (not localStorage)
2. ✅ Token cleared on logout
3. ✅ Route protection - redirects if no token
4. ✅ Token sent in Authorization header (not in URL)
5. ✅ Error handling for 401 Unauthorized responses
6. ✅ CORS headers properly configured
7. ✅ Input validation before API calls

## 🐛 Troubleshooting

### Issue: "Cannot connect to backend"
- Ensure backend is running on `http://localhost:5000`
- Check CORS is enabled on backend
- Verify firewall settings

### Issue: "Token not persisting after refresh"
- Check if sessionStorage is enabled in browser
- Ensure you're on the same session (not incognito mode)

### Issue: "401 Unauthorized error"
- Verify token format is correct
- Check backend is validating token properly
- Ensure token hasn't expired

### Issue: "Cannot redirect after logout"
- Clear browser cache and cookies
- Check if React Router is properly configured

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Axios Documentation](https://axios-http.com)
- [React Router Documentation](https://reactrouter.com)
- [JWT.io - JWT Information](https://jwt.io)
- [Bootstrap Documentation](https://getbootstrap.com)

## ✅ Submission Checklist

- [x] Login page with form validation
- [x] JWT token stored in sessionStorage
- [x] Protected dashboard with token verification
- [x] Logout functionality clearing session
- [x] API calls with Bearer token in headers
- [x] Error handling and user feedback
- [x] Auto-redirect on unauthorized access
- [x] Responsive UI design
- [x] Console logging for debugging
- [x] README documentation

## 📝 Notes

- Session-based storage means token is **lost when browser closes**
- This is ideal for security as it prevents token leakage from localStorage
- All API calls include proper error handling
- Application is fully functional and ready for integration testing
- Console logs available for debugging API interactions

---

**Created for: Experiment 8 - JWT Authentication Frontend**  
**Date: April 2026**
