# 🎓 College Student Management REST API

A complete REST API backend built with **Node.js, Express.js, and MongoDB** for managing student records with full CRUD operations.

## 📋 Project Overview

This project demonstrates industry best practices for building a production-ready REST API including:
- Clean, modular code structure
- Proper error handling and validation
- MongoDB integration with Mongoose
- Environment configuration
- CORS support
- Pagination and sorting
- Unique email constraint

---

## 🎯 Features

✅ **Create** - Add new students
✅ **Read** - Get all students or a specific student
✅ **Update** - Modify student information
✅ **Delete** - Remove students from database
✅ **Validation** - Email uniqueness, required fields
✅ **Error Handling** - Centralized error middleware
✅ **Pagination** - Support for paginated student lists
✅ **Timestamps** - Automatic createdAt and updatedAt

---

## 📁 Project Structure

```
Experiment-10/
├── server.js                    # Main Express server setup
├── package.json                 # Project dependencies
├── .env                         # Environment variables
├── .gitignore                   # Git ignore file
├── README.md                    # This file
│
├── config/
│   └── db.js                   # MongoDB connection setup
│
├── models/
│   └── Student.js              # Mongoose Student schema
│
├── controllers/
│   └── studentController.js    # Business logic for CRUD operations
│
├── routes/
│   └── studentRoutes.js        # API route definitions
│
└── middleware/
    └── errorMiddleware.js      # Centralized error handling
```

---

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js 4.x
- **Database**: MongoDB
- **ODM**: Mongoose 7.x
- **Middleware**: CORS, dotenv
- **Dev Tools**: Nodemon

---

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally on `127.0.0.1:27017` or configured in .env)
- npm or yarn

### Step 1: Clone/Navigate to Project
```bash
cd Experiment-10
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Environment
The `.env` file is already provided with default values:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/collegeDB
NODE_ENV=development
```

**For MongoDB Atlas Cloud** (Optional):
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/collegeDB
```

### Step 4: Start MongoDB
```bash
# On macOS (if installed via Homebrew)
brew services start mongodb-community

# Or manually
mongod
```

### Step 5: Run the Server

**Development Mode** (with auto-restart on file changes):
```bash
npm run dev
```

**Production Mode**:
```bash
npm start
```

### Expected Output
```
╔════════════════════════════════════════╗
║   🎓 COLLEGE STUDENT API SERVER        ║
╚════════════════════════════════════════╝
✅ Server is running on http://localhost:5000
📚 API Base URL: http://localhost:5000/api
🔌 MongoDB URI: mongodb://127.0.0.1:27017/collegeDB
🌍 Environment: development
```

---

## 🔌 API Endpoints

### Base URL
```
http://localhost:5000/api
```

### 1. Health Check
```
GET /
```
**Response**:
```json
{
  "success": true,
  "message": "🎓 College Student Management API is running",
  "version": "1.0.0",
  "endpoints": { ... }
}
```

### 2. Create Student
```
POST /api/students
```
**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "course": "Computer Science"
}
```
**Response** (201 Created):
```json
{
  "success": true,
  "statusCode": 201,
  "message": "Student created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "course": "Computer Science",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z",
    "__v": 0
  }
}
```

### 3. Get All Students
```
GET /api/students
```
**Optional Query Parameters**:
- `page=1` - Page number (default: 1)
- `limit=10` - Results per page (default: 10)
- `sort=name` - Sort field (default: -createdAt for newest first)

**Example**: `GET /api/students?page=1&limit=5&sort=name`

**Response** (200 OK):
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Students retrieved successfully",
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "course": "Computer Science",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    },
    {
      "_id": "507f1f77bcf86cd799439012",
      "name": "Jane Smith",
      "email": "jane@example.com",
      "course": "Mathematics",
      "createdAt": "2024-01-15T10:35:00.000Z",
      "updatedAt": "2024-01-15T10:35:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 2,
    "totalCount": 15,
    "limit": 10
  }
}
```

### 4. Get Student by ID
```
GET /api/students/:id
```
**Example**: `GET /api/students/507f1f77bcf86cd799439011`

**Response** (200 OK):
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Student retrieved successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "course": "Computer Science",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### 5. Update Student
```
PUT /api/students/:id
```
**Request Body** (update any or all fields):
```json
{
  "name": "John Updated Doe",
  "course": "Data Science"
}
```
**Response** (200 OK):
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Student updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Updated Doe",
    "email": "john@example.com",
    "course": "Data Science",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T11:45:00.000Z"
  }
}
```

### 6. Delete Student
```
DELETE /api/students/:id
```
**Example**: `DELETE /api/students/507f1f77bcf86cd799439011`

**Response** (200 OK):
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Student deleted successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "course": "Computer Science",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

## ⚠️ Error Responses

### Validation Error (400 Bad Request)
```json
{
  "success": false,
  "statusCode": 400,
  "message": "Please provide all required fields: name, email, and course"
}
```

### Duplicate Email Error (400 Bad Request)
```json
{
  "success": false,
  "statusCode": 400,
  "message": "A student with this email already exists"
}
```

### Invalid ID Format (400 Bad Request)
```json
{
  "success": false,
  "statusCode": 400,
  "message": "Invalid student ID format"
}
```

### Not Found (404)
```json
{
  "success": false,
  "statusCode": 404,
  "message": "Student not found"
}
```

### Server Error (500)
```json
{
  "success": false,
  "statusCode": 500,
  "message": "Internal Server Error"
}
```

---

## 📮 Postman Testing Guide

### Import Collection
1. Open Postman
2. Click **Import** → Choose **Link**
3. Paste the collection JSON (see below) or manually create requests

### Sample Requests

#### 1. Create Student
```
POST http://localhost:5000/api/students
Content-Type: application/json

{
  "name": "Alice Johnson",
  "email": "alice.johnson@example.com",
  "course": "Engineering"
}
```

#### 2. Get All Students
```
GET http://localhost:5000/api/students?page=1&limit=10
```

#### 3. Get Single Student
```
GET http://localhost:5000/api/students/[STUDENT_ID]
```
Replace `[STUDENT_ID]` with actual MongoDB ID from create response

#### 4. Update Student
```
PUT http://localhost:5000/api/students/[STUDENT_ID]
Content-Type: application/json

{
  "course": "Mechanical Engineering"
}
```

#### 5. Delete Student
```
DELETE http://localhost:5000/api/students/[STUDENT_ID]
```

---

## 🧪 Testing with cURL

### Create Student
```bash
curl -X POST http://localhost:5000/api/students \
  -H "Content-Type: application/json" \
  -d '{"name": "Bob Wilson", "email": "bob@example.com", "course": "Chemistry"}'
```

### Get All Students
```bash
curl http://localhost:5000/api/students
```

### Get Single Student
```bash
curl http://localhost:5000/api/students/507f1f77bcf86cd799439011
```

### Update Student
```bash
curl -X PUT http://localhost:5000/api/students/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{"course": "Physics"}'
```

### Delete Student
```bash
curl -X DELETE http://localhost:5000/api/students/507f1f77bcf86cd799439011
```

---

## 📊 Student Schema Validation

| Field  | Type   | Required | Validation                           |
|--------|--------|----------|--------------------------------------|
| name   | String | ✅ Yes   | 2-100 chars, trimmed               |
| email  | String | ✅ Yes   | Valid email format, unique, lowercase |
| course | String | ✅ Yes   | 2-100 chars, trimmed               |

---

## 🔐 Best Practices Implemented

✅ **Modular Architecture** - Separated concerns (routes, controllers, models)
✅ **Error Handling** - Centralized error middleware for consistent responses
✅ **Input Validation** - Server-side validation for all inputs
✅ **Database Validation** - Mongoose schema-level validation rules
✅ **Async/Await** - Clean, modern async code patterns
✅ **Environment Config** - Sensitive data in .env file
✅ **CORS Support** - Cross-origin requests enabled
✅ **Meaningful Logs** - Console logs with emoji indicators
✅ **HTTP Status Codes** - Proper status codes for each scenario
✅ **Comments & Documentation** - Clear code documentation

---

## 🐛 Troubleshooting

### MongoDB Connection Error
```
❌ Error connecting to MongoDB: connection refused
```
**Solution**: 
- Ensure MongoDB is running: `brew services start mongodb-community`
- Check MongoDB URI in .env file
- Verify MongoDB is listening on the correct port

### Port Already in Use
```
EADDRINUSE: address already in use :::5000
```
**Solution**:
- Change PORT in .env file to a different port (e.g., 5001)
- Or kill process using port 5000: `lsof -ti:5000 | xargs kill -9`

### Email Already Exists Error
```
A student with this email already exists
```
**Solution**: Use a unique email address or delete the existing student

### Invalid Student ID Error
```
Invalid student ID format
```
**Solution**: Ensure you're using a valid MongoDB ObjectId (24 hex characters)

---

## 📚 File Descriptions

| File | Purpose |
|------|---------|
| `server.js` | Main Express server, middleware setup, route mounting |
| `config/db.js` | MongoDB connection with error handling |
| `models/Student.js` | Mongoose schema definition with validations |
| `controllers/studentController.js` | CRUD logic with try/catch blocks |
| `routes/studentRoutes.js` | Route definitions mapping to controllers |
| `middleware/errorMiddleware.js` | Global error handling |
| `package.json` | Dependencies and npm scripts |
| `.env` | Environment variables |

---

## 📈 Performance Tips

1. **Use Pagination** - Always paginate large result sets
   ```
   GET /api/students?page=1&limit=10
   ```

2. **Index Frequently Queried Fields** - Email is already indexed (unique)

3. **Use Lean Queries** - For read-only operations:
   ```javascript
   const students = await Student.find().lean();
   ```

4. **Connection Pooling** - Mongoose handles this automatically

---

## 🚀 Deployment

### Deploy to Heroku
```bash
heroku create your-app-name
heroku config:set MONGO_URI=your_mongodb_atlas_uri
git push heroku main
```

### Deploy to Railway/Render
1. Push code to GitHub
2. Connect repository to hosting platform
3. Set environment variables
4. Deploy

---

## 📝 License

ISC License - Free to use for educational and commercial purposes

---

## 👨‍💻 Author

Created as part of Full Stack Development Course - Experiment 10

---

## 📞 Support

For issues or questions:
1. Check the Troubleshooting section
2. Review error messages in console
3. Verify MongoDB is running
4. Check .env configuration

---

**Happy Coding! 🚀**
