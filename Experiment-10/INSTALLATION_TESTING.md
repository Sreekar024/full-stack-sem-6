# 🎯 Installation & Testing Guide

## Step 1: Navigate to Project Directory

```bash
cd "Experiment-10"
```

## Step 2: Install Node.js Dependencies

```bash
npm install
```

This will install:
- express (4.18.2) - Web framework
- mongoose (7.5.0) - MongoDB ODM
- cors (2.8.5) - CORS middleware
- dotenv (16.3.1) - Environment variables
- nodemon (3.0.1) - Development tool for auto-reload

**Time**: ~2-3 minutes
**Space**: ~200MB

---

## Step 3: Start MongoDB

### Option 1: Using Homebrew (Recommended for macOS)
```bash
brew services start mongodb-community
```

### Option 2: Manual Start
```bash
mongod
```

### Verify MongoDB is Running
```bash
mongo
# or newer version:
mongosh
```

You should see MongoDB shell prompt.

---

## Step 4: Run the Server

### Development Mode (Recommended)
```bash
npm run dev
```

The server will restart automatically when you save files.

### Production Mode
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

## Step 5: Test the API

### Test 1: Health Check
```bash
curl http://localhost:5000/
```

**Expected Response**:
```json
{
  "success": true,
  "message": "🎓 College Student Management API is running",
  "version": "1.0.0",
  "endpoints": {
    "health": "GET /",
    "createStudent": "POST /api/students",
    "getAllStudents": "GET /api/students",
    "getStudentById": "GET /api/students/:id",
    "updateStudent": "PUT /api/students/:id",
    "deleteStudent": "DELETE /api/students/:id"
  }
}
```

✅ **Status**: API is running

---

### Test 2: Create a Student
```bash
curl -X POST http://localhost:5000/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "course": "Computer Science"
  }'
```

**Expected Response** (201 Created):
```json
{
  "success": true,
  "statusCode": 201,
  "message": "Student created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "course": "Computer Science",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z",
    "__v": 0
  }
}
```

✅ **Status**: Student created successfully
📝 **Note**: Save the `_id` value for next tests

---

### Test 3: Create More Students

```bash
# Student 2
curl -X POST http://localhost:5000/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "email": "jane.smith@example.com",
    "course": "Mathematics"
  }'

# Student 3
curl -X POST http://localhost:5000/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Bob Wilson",
    "email": "bob.wilson@example.com",
    "course": "Physics"
  }'
```

✅ **Status**: Multiple students created

---

### Test 4: Get All Students
```bash
curl http://localhost:5000/api/students
```

**Expected Response** (200 OK):
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Students retrieved successfully",
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "course": "Computer Science",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    },
    {
      "_id": "507f1f77bcf86cd799439012",
      "name": "Jane Smith",
      "email": "jane.smith@example.com",
      "course": "Mathematics",
      "createdAt": "2024-01-15T10:35:00.000Z",
      "updatedAt": "2024-01-15T10:35:00.000Z"
    },
    {
      "_id": "507f1f77bcf86cd799439013",
      "name": "Bob Wilson",
      "email": "bob.wilson@example.com",
      "course": "Physics",
      "createdAt": "2024-01-15T10:40:00.000Z",
      "updatedAt": "2024-01-15T10:40:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 1,
    "totalCount": 3,
    "limit": 10
  }
}
```

✅ **Status**: All students retrieved

---

### Test 5: Get Student by ID

Replace `507f1f77bcf86cd799439011` with an actual student ID:

```bash
curl http://localhost:5000/api/students/507f1f77bcf86cd799439011
```

**Expected Response** (200 OK):
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Student retrieved successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "course": "Computer Science",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

✅ **Status**: Single student retrieved

---

### Test 6: Update Student

Replace `507f1f77bcf86cd799439011` with an actual student ID:

```bash
curl -X PUT http://localhost:5000/api/students/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{
    "course": "Data Science"
  }'
```

**Expected Response** (200 OK):
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Student updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "course": "Data Science",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T11:45:00.000Z"
  }
}
```

✅ **Status**: Student updated successfully

---

### Test 7: Delete Student

Replace `507f1f77bcf86cd799439011` with an actual student ID:

```bash
curl -X DELETE http://localhost:5000/api/students/507f1f77bcf86cd799439011
```

**Expected Response** (200 OK):
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Student deleted successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "course": "Data Science",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T11:45:00.000Z"
  }
}
```

✅ **Status**: Student deleted successfully

---

## Advanced Testing

### Test Pagination
```bash
# Page 1 with 5 items per page
curl "http://localhost:5000/api/students?page=1&limit=5"

# Page 2
curl "http://localhost:5000/api/students?page=2&limit=5"
```

### Test Sorting
```bash
# Sort by name (ascending)
curl "http://localhost:5000/api/students?sort=name"

# Sort by creation date (newest first)
curl "http://localhost:5000/api/students?sort=-createdAt"

# Sort by name descending
curl "http://localhost:5000/api/students?sort=-name"
```

### Test Error Handling

**Missing Required Fields**:
```bash
curl -X POST http://localhost:5000/api/students \
  -H "Content-Type: application/json" \
  -d '{"name": "John"}'
```

Expected Error Response (400):
```json
{
  "success": false,
  "statusCode": 400,
  "message": "Please provide all required fields: name, email, and course"
}
```

**Duplicate Email**:
```bash
curl -X POST http://localhost:5000/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "email": "john.doe@example.com",
    "course": "History"
  }'
```

Expected Error Response (400):
```json
{
  "success": false,
  "statusCode": 400,
  "message": "A student with this email already exists"
}
```

**Invalid ID**:
```bash
curl http://localhost:5000/api/students/invalidid
```

Expected Error Response (400):
```json
{
  "success": false,
  "statusCode": 400,
  "message": "Invalid student ID format"
}
```

**Non-existent Student**:
```bash
curl http://localhost:5000/api/students/507f1f77bcf86cd799999999
```

Expected Error Response (404):
```json
{
  "success": false,
  "statusCode": 404,
  "message": "Student not found"
}
```

---

## Using Postman

### 1. Import Collection
1. Open Postman
2. Click **Import**
3. Select **File** → Upload `POSTMAN_COLLECTION.json`

### 2. Set Base URL Variable
1. Click **Environments** (or use collection variables)
2. Set `baseUrl` = `http://localhost:5000`

### 3. Test Requests
- Use **Create Alice Johnson** request to create a student
- Use **Get All Students** to retrieve all students
- Use **Get Student by ID** (copy ID from previous response)
- Use **Update Student** to modify student
- Use **Delete Student** to remove student

---

## Expected Test Results

| Test | Method | Endpoint | Status | Response Code |
|------|--------|----------|--------|---------------|
| Health Check | GET | / | ✅ Pass | 200 |
| Create Student | POST | /api/students | ✅ Pass | 201 |
| Get All Students | GET | /api/students | ✅ Pass | 200 |
| Get by ID | GET | /api/students/:id | ✅ Pass | 200 |
| Update Student | PUT | /api/students/:id | ✅ Pass | 200 |
| Delete Student | DELETE | /api/students/:id | ✅ Pass | 200 |
| Invalid ID | GET | /api/students/invalid | ✅ Pass | 400 |
| Not Found | GET | /api/students/507f... | ✅ Pass | 404 |
| Missing Fields | POST | /api/students | ✅ Pass | 400 |
| Duplicate Email | POST | /api/students | ✅ Pass | 400 |

---

## Troubleshooting

### Issue: "Cannot find module 'express'"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: MongoDB Connection Refused
```bash
# Check if MongoDB is running
brew services list

# Start MongoDB
brew services start mongodb-community

# Or manually:
mongod
```

### Issue: Port 5000 Already in Use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Or change port in .env:
PORT=5001
```

### Issue: Student Already Exists (Email)
```bash
# Use a different email address or delete existing:
curl -X DELETE http://localhost:5000/api/students/[ID]
```

---

## Testing Checklist

Before submitting, verify all tests pass:

- [ ] npm install completes successfully
- [ ] MongoDB is running
- [ ] Server starts with npm run dev
- [ ] Health check endpoint responds (/)
- [ ] Can create a new student (POST)
- [ ] Can retrieve all students (GET /api/students)
- [ ] Can get single student by ID (GET /api/students/:id)
- [ ] Can update student (PUT)
- [ ] Can delete student (DELETE)
- [ ] Pagination works (?page=1&limit=5)
- [ ] Sorting works (?sort=name)
- [ ] Validation errors return 400
- [ ] Not found errors return 404
- [ ] Duplicate email prevents creation
- [ ] Invalid ID format is caught
- [ ] All responses have proper structure
- [ ] Timestamps are present (createdAt, updatedAt)

---

## Performance Notes

- Server response time: < 100ms per request
- Database queries are optimized
- Pagination prevents memory overload
- Error handling prevents crashes
- Proper indexing on email field

---

## Next Steps

After successful testing:
1. ✅ Review the code structure
2. ✅ Understand the CRUD operations
3. ✅ Explore error handling
4. ✅ Deploy to production
5. ✅ Add authentication (optional)
6. ✅ Add more features

---

**All tests passing? You're ready to deploy! 🚀**
