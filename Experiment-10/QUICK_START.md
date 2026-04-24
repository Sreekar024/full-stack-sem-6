# 🚀 Quick Start Guide

Get the College Student API running in 5 minutes!

## 1️⃣ Install Dependencies
```bash
cd Experiment-10
npm install
```

## 2️⃣ Start MongoDB
```bash
brew services start mongodb-community
```
Or open a new terminal and run:
```bash
mongod
```

## 3️⃣ Run the Server
```bash
npm run dev
```

You should see:
```
╔════════════════════════════════════════╗
║   🎓 COLLEGE STUDENT API SERVER        ║
╚════════════════════════════════════════╝
✅ Server is running on http://localhost:5000
```

## 4️⃣ Test the API

### Using cURL

**Create a student:**
```bash
curl -X POST http://localhost:5000/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "course": "Computer Science"
  }'
```

**Get all students:**
```bash
curl http://localhost:5000/api/students
```

**Get a specific student (replace ID):**
```bash
curl http://localhost:5000/api/students/[STUDENT_ID]
```

**Update a student:**
```bash
curl -X PUT http://localhost:5000/api/students/[STUDENT_ID] \
  -H "Content-Type: application/json" \
  -d '{
    "course": "Data Science"
  }'
```

**Delete a student:**
```bash
curl -X DELETE http://localhost:5000/api/students/[STUDENT_ID]
```

## 📮 Using Postman

1. Open Postman
2. Import `POSTMAN_COLLECTION.json` from the project folder
3. Set the `baseUrl` variable to `http://localhost:5000`
4. Start testing!

## 📋 API Endpoints

| Method | Endpoint | Action |
|--------|----------|--------|
| POST | `/api/students` | Create student |
| GET | `/api/students` | Get all students |
| GET | `/api/students/:id` | Get single student |
| PUT | `/api/students/:id` | Update student |
| DELETE | `/api/students/:id` | Delete student |

## ✅ Expected Results

### Create Response (201)
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
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### Get All Response (200)
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
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 1,
    "totalCount": 1,
    "limit": 10
  }
}
```

## 🐛 Troubleshooting

**MongoDB connection error?**
- Make sure MongoDB is running: `brew services list`
- Or start it: `brew services start mongodb-community`

**Port 5000 already in use?**
- Edit `.env` and change PORT to 5001 or another free port
- Or kill the process: `lsof -ti:5000 | xargs kill -9`

**Duplicate email error?**
- Use a different email address
- Or delete the existing student using DELETE endpoint

## 📚 Next Steps

1. Read full README.md for detailed documentation
2. Explore the code structure in each file
3. Check the Postman collection for more examples
4. Try creating, reading, updating, and deleting students

---

**Happy Coding! 🎓**
