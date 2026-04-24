# 📚 API Reference

## Base URL
```
http://localhost:5000
```

---

## 🏥 Health Check Endpoint

### Health Check
```http
GET /
```

**Description**: Test if the API is running and get available endpoints

**Response** (200 OK):
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

---

## 👨‍🎓 Student Endpoints

### 1. CREATE Student
```http
POST /api/students
```

**Description**: Create a new student

**Request Headers**:
```
Content-Type: application/json
```

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "course": "Computer Science"
}
```

**Request Example (cURL)**:
```bash
curl -X POST http://localhost:5000/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "course": "Computer Science"
  }'
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

**Error Response** (400 Bad Request):
```json
{
  "success": false,
  "statusCode": 400,
  "message": "Please provide all required fields: name, email, and course"
}
```

**Validation Rules**:
- `name`: String, required, 2-100 characters, trimmed
- `email`: String, required, valid email format, unique, lowercase
- `course`: String, required, 2-100 characters, trimmed

---

### 2. GET All Students
```http
GET /api/students
```

**Description**: Retrieve all students with pagination and sorting

**Query Parameters**:
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| page | number | 1 | Page number for pagination |
| limit | number | 10 | Number of results per page |
| sort | string | -createdAt | Sort field (prefix with - for descending) |

**Request Examples**:
```bash
# Get first page (default)
curl http://localhost:5000/api/students

# Get specific page
curl "http://localhost:5000/api/students?page=2&limit=10"

# Sort by name (ascending)
curl "http://localhost:5000/api/students?sort=name"

# Sort by creation date (newest first)
curl "http://localhost:5000/api/students?sort=-createdAt"

# Custom limit
curl "http://localhost:5000/api/students?limit=5"
```

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
    "totalPages": 5,
    "totalCount": 47,
    "limit": 10
  }
}
```

**Error Response** (200 OK, empty data):
```json
{
  "success": true,
  "statusCode": 200,
  "message": "No students found",
  "data": [],
  "pagination": {
    "currentPage": 1,
    "totalPages": 0,
    "totalCount": 0,
    "limit": 10
  }
}
```

---

### 3. GET Student by ID
```http
GET /api/students/:id
```

**Description**: Retrieve a specific student by MongoDB ID

**URL Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | MongoDB ObjectId (24 hex characters) |

**Request Examples**:
```bash
curl http://localhost:5000/api/students/507f1f77bcf86cd799439011
```

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

**Error Response** (404 Not Found):
```json
{
  "success": false,
  "statusCode": 404,
  "message": "Student not found"
}
```

**Error Response** (400 Bad Request):
```json
{
  "success": false,
  "statusCode": 400,
  "message": "Invalid student ID format"
}
```

---

### 4. UPDATE Student
```http
PUT /api/students/:id
```

**Description**: Update a student's information (partial or full update)

**URL Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | MongoDB ObjectId (24 hex characters) |

**Request Headers**:
```
Content-Type: application/json
```

**Request Body** (any or all fields):
```json
{
  "name": "John Updated Doe",
  "email": "john.updated@example.com",
  "course": "Data Science"
}
```

**Request Examples**:
```bash
# Update single field
curl -X PUT http://localhost:5000/api/students/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{"course": "Data Science"}'

# Update multiple fields
curl -X PUT http://localhost:5000/api/students/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Smith",
    "course": "Artificial Intelligence"
  }'
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
    "email": "john.updated@example.com",
    "course": "Data Science",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T11:45:00.000Z"
  }
}
```

**Error Response** (400 - Duplicate Email):
```json
{
  "success": false,
  "statusCode": 400,
  "message": "A student with this email already exists"
}
```

**Error Response** (404 Not Found):
```json
{
  "success": false,
  "statusCode": 404,
  "message": "Student not found"
}
```

**Error Response** (400 Invalid ID):
```json
{
  "success": false,
  "statusCode": 400,
  "message": "Invalid student ID format"
}
```

---

### 5. DELETE Student
```http
DELETE /api/students/:id
```

**Description**: Delete a student from the database

**URL Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | MongoDB ObjectId (24 hex characters) |

**Request Examples**:
```bash
curl -X DELETE http://localhost:5000/api/students/507f1f77bcf86cd799439011
```

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
    "updatedAt": "2024-01-15T11:45:00.000Z"
  }
}
```

**Error Response** (404 Not Found):
```json
{
  "success": false,
  "statusCode": 404,
  "message": "Student not found"
}
```

**Error Response** (400 Invalid ID):
```json
{
  "success": false,
  "statusCode": 400,
  "message": "Invalid student ID format"
}
```

---

## ⚠️ Error Responses

### HTTP Status Codes

| Status | Meaning | Example |
|--------|---------|---------|
| 200 | OK | Successful GET, PUT, DELETE |
| 201 | Created | Successful POST |
| 400 | Bad Request | Invalid input, duplicate email, invalid ID |
| 404 | Not Found | Student doesn't exist |
| 500 | Server Error | Unexpected server error |

### Common Error Messages

```json
{
  "success": false,
  "statusCode": 400,
  "message": "Please provide all required fields: name, email, and course"
}
```

```json
{
  "success": false,
  "statusCode": 400,
  "message": "A student with this email already exists"
}
```

```json
{
  "success": false,
  "statusCode": 400,
  "message": "Invalid student ID format"
}
```

```json
{
  "success": false,
  "statusCode": 404,
  "message": "Student not found"
}
```

```json
{
  "success": false,
  "statusCode": 500,
  "message": "Internal Server Error"
}
```

---

## 📊 Data Model

### Student Object

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@example.com",
  "course": "Computer Science",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z",
  "__v": 0
}
```

### Field Descriptions

| Field | Type | Required | Unique | Example |
|-------|------|----------|--------|---------|
| _id | ObjectId | ✅ Auto | ✅ Yes | 507f1f77bcf86cd799439011 |
| name | String | ✅ Yes | ❌ No | John Doe |
| email | String | ✅ Yes | ✅ Yes | john@example.com |
| course | String | ✅ Yes | ❌ No | Computer Science |
| createdAt | Date | ✅ Auto | ❌ No | 2024-01-15T10:30:00.000Z |
| updatedAt | Date | ✅ Auto | ❌ No | 2024-01-15T10:30:00.000Z |

---

## 🔍 Validation Rules

### Name
- **Type**: String
- **Required**: Yes
- **Min Length**: 2 characters
- **Max Length**: 100 characters
- **Trimmed**: Yes (leading/trailing spaces removed)

### Email
- **Type**: String
- **Required**: Yes
- **Format**: Valid email pattern (user@domain.com)
- **Unique**: Yes (no duplicates allowed)
- **Case**: Converted to lowercase
- **Trimmed**: Yes

### Course
- **Type**: String
- **Required**: Yes
- **Min Length**: 2 characters
- **Max Length**: 100 characters
- **Trimmed**: Yes (leading/trailing spaces removed)

---

## 📈 Example Workflows

### Create and Retrieve Student

```bash
# 1. Create a student
curl -X POST http://localhost:5000/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "course": "Engineering"
  }'

# Copy the _id from response: 507f1f77bcf86cd799439011

# 2. Retrieve the created student
curl http://localhost:5000/api/students/507f1f77bcf86cd799439011
```

### Update Student

```bash
# Update course
curl -X PUT http://localhost:5000/api/students/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{"course": "Mechanical Engineering"}'
```

### List All Students with Pagination

```bash
# Get first page (10 per page)
curl "http://localhost:5000/api/students?page=1&limit=10"

# Get second page
curl "http://localhost:5000/api/students?page=2&limit=10"

# Get with custom sorting
curl "http://localhost:5000/api/students?sort=name&limit=10"
```

### Delete Student

```bash
curl -X DELETE http://localhost:5000/api/students/507f1f77bcf86cd799439011
```

---

## 🧪 Testing with Different Tools

### Using cURL
```bash
curl -X POST http://localhost:5000/api/students \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","course":"Test"}'
```

### Using Postman
1. Import `POSTMAN_COLLECTION.json`
2. Set `baseUrl` variable to `http://localhost:5000`
3. Use pre-configured requests

### Using fetch (JavaScript)
```javascript
const response = await fetch('http://localhost:5000/api/students', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    course: 'Computer Science'
  })
});
const data = await response.json();
console.log(data);
```

### Using axios (JavaScript)
```javascript
const axios = require('axios');

axios.post('http://localhost:5000/api/students', {
  name: 'John Doe',
  email: 'john@example.com',
  course: 'Computer Science'
})
.then(response => console.log(response.data))
.catch(error => console.error(error));
```

---

## 🔗 Quick Links

- **Postman Collection**: See `POSTMAN_COLLECTION.json`
- **Full Documentation**: See `README.md`
- **Quick Start**: See `QUICK_START.md`
- **Installation Guide**: See `INSTALLATION_TESTING.md`

---

**Happy API Testing! 🚀**
