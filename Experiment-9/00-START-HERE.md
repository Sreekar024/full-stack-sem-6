# 🔐 Experiment 9 - RBAC Frontend Implementation

## Quick Start

Welcome to **Experiment 9**, a complete Role-Based Access Control (RBAC) system with a modern React frontend integrated with Spring Boot backend.

### Prerequisites
- Node.js (v14+)
- npm or yarn
- Spring Boot backend running on `http://localhost:8080`

### Setup & Installation

```bash
# Navigate to the project directory
cd Experiment-9

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will open at `http://localhost:3000`

---

## 📋 Demo Credentials

### Admin User
- **Username:** `admin`
- **Password:** `password123`
- **Access:** Full admin dashboard, user management, system statistics

### Regular User
- **Username:** `user`
- **Password:** `password123`
- **Access:** User profile dashboard only

---

## 🎯 What You'll Learn

1. **Authentication** - Login with username/password, role-based redirect
2. **Role-Based Access Control** - Protected routes based on user roles
3. **Session Management** - Using sessionStorage for auth persistence
4. **Material UI Integration** - Professional UI components
5. **React Router** - Dynamic routing and navigation
6. **Axios Integration** - API communication with backend
7. **Context API** - Global state management for auth
8. **Error Handling** - Graceful error messages and redirects

---

## 🗂️ Project Structure

```
Experiment-9/
├── public/                 # Static assets
├── src/
│   ├── components/        # React components
│   │   ├── Login.jsx      # Login form
│   │   ├── UserDashboard.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── Navbar.jsx
│   │   └── AccessDenied.jsx
│   ├── routes/
│   │   └── ProtectedRoute.jsx  # Protected route wrapper
│   ├── context/
│   │   └── AuthContext.jsx     # Auth state management
│   ├── api.js             # Axios configuration
│   ├── App.jsx            # Main app routing
│   ├── App.css            # Global styles
│   └── main.jsx           # Entry point
├── index.html
├── vite.config.js
├── eslint.config.js
└── package.json
```

---

## 🔄 Application Flow

```
User Visit
    ↓
Is Authenticated? → NO → Login Page
    ↓ YES
Has Session? → NO → Login Page
    ↓ YES
Role = ADMIN? → Admin Dashboard
    ↓
Role = USER? → User Dashboard
    ↓
Unauthorized? → Access Denied Page
```

---

## 🔑 Key Features

### ✅ Authentication
- Username/password login
- Backend authentication via API
- Automatic role determination from backend
- Session-based persistence

### ✅ Role-Based Access
- Admin Dashboard - Full system access
- User Dashboard - Personal profile only
- Protected routes with role checks
- Automatic redirect on unauthorized access

### ✅ UI/UX
- Material UI components
- Bootstrap grid system
- Responsive design
- Loading indicators
- Error alerts
- Navigation bar with user info

### ✅ Security
- SessionStorage for session management
- Protected routes with auth guards
- Automatic logout on 401/403
- Role validation on navigation

---

## 📡 API Endpoints

The frontend communicates with backend at `http://localhost:8080/api`

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### User Routes
- `GET /api/user/profile` - Get user profile
- `GET /api/user/data` - Get user data

### Admin Routes (Protected)
- `GET /api/admin/dashboard` - Get dashboard statistics
- `GET /api/admin/users` - Get all users
- `DELETE /api/admin/users/:id` - Delete a user

---

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
```
Starts Vite dev server with hot reload

### Build for Production
```bash
npm run build
npm run preview
```

### Linting
```bash
npm run lint
```

---

## 🔗 Integration with Experiment 7

This Experiment 9 builds on Experiment 7 (RBAC Backend). 

**Backend Requirements:**
- Spring Security configured with user roles
- JWT/Basic Auth implementation
- User database with roles
- Role-based endpoint protection

**Backend Endpoints Expected:**
- All endpoints prefixed with `/api/`
- Authentication returns: `{ user: "username", role: "ADMIN|USER" }`
- Proper HTTP status codes (401, 403)

---

## 🛠️ Troubleshooting

### 1. CORS Errors
Ensure backend has CORS enabled:
```
Access-Control-Allow-Origin: http://localhost:3000
```

### 2. API Connection Fails
- Check backend is running on `http://localhost:8080`
- Verify API endpoints exist
- Check browser console for network errors

### 3. Login Not Working
- Verify credentials are correct
- Check backend authentication logic
- Ensure response includes `{ user, role }`

### 4. Role Not Working
- Check sessionStorage has `role` key
- Verify backend returns correct role
- Check ProtectedRoute logic

---

## 📚 Technology Stack

- **React 18** - UI library
- **React Router v6** - Navigation
- **Material UI 5** - Component library
- **Axios** - HTTP client
- **Vite** - Build tool
- **Bootstrap** - Grid system

---

## 🎓 Learning Outcomes

By completing this experiment, you will understand:

1. ✅ Complete authentication flow
2. ✅ Role-based access control implementation
3. ✅ Protected routing patterns
4. ✅ Context API for state management
5. ✅ Material UI component usage
6. ✅ Axios API integration
7. ✅ Error handling and user feedback
8. ✅ Session persistence strategies

---

## 📝 Next Steps

1. ✅ Install dependencies: `npm install`
2. ✅ Ensure backend is running
3. ✅ Start dev server: `npm run dev`
4. ✅ Login with demo credentials
5. ✅ Explore admin/user dashboards
6. ✅ Test protected routes
7. ✅ Review code and understand patterns

---

## 📧 Support

For issues or questions:
- Check browser console for errors
- Review network tab in DevTools
- Verify backend is running
- Check API responses
- Review component logic

---

**Happy Learning! 🎉**
