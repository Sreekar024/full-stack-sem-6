# JWT Backend Server - Experiment 8

## Overview

Simple Express.js backend server for JWT authentication. Provides login and protected endpoints for the React frontend.

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Server
```bash
npm start
```

### 3. Server Running
```
✅ Server listening on http://localhost:5000
```

## Endpoints

### POST /login
Get JWT token by authenticating with username and password.

**Request:**
```bash
curl -X POST http://localhost:5000/login \
  -H "Content-Type: application/json" \
  -d '{"username":"user1","password":"password123"}'
```

**Response (Success):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "message": "Login successful",
  "user": {
    "id": 1,
    "username": "user1"
  }
}
```

**Response (Error):**
```json
{
  "message": "Invalid credentials"
}
```

### GET /protected
Access protected data using JWT token.

**Request:**
```bash
curl -X GET http://localhost:5000/protected \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Response (Success):**
```json
{
  "message": "This is protected data",
  "user": "user1",
  "userId": 1,
  "timestamp": "2026-04-17T10:30:00.000Z",
  "data": {
    "role": "user",
    "permissions": ["read", "write"],
    "access_level": "standard"
  }
}
```

**Response (Error):**
```json
{
  "message": "Invalid token"
}
```

### GET /health
Health check endpoint.

**Request:**
```bash
curl http://localhost:5000/health
```

**Response:**
```json
{
  "status": "Server is running",
  "timestamp": "2026-04-17T10:30:00.000Z"
}
```

## Test Users

| Username | Password | Status |
|----------|----------|--------|
| user1 | password123 | ✅ Active |
| user2 | password456 | ✅ Active |

## Configuration

### Port
Default: `5000`

To change, edit `server.js`:
```javascript
const PORT = 5001; // Change this
```

### Secret Key
Edit `server.js`:
```javascript
const SECRET_KEY = 'your-secret-key-change-in-production';
```

### CORS
Origin: `http://localhost:3000`

Edit in `server.js` if frontend is on different URL.

## Features

✅ Express.js server  
✅ CORS enabled  
✅ JWT token generation  
✅ Token validation  
✅ Protected routes  
✅ Error handling  
✅ Logging  

## Dependencies

- **express** - Web framework
- **cors** - CORS middleware
- **jsonwebtoken** - JWT handling
- **body-parser** - Request body parsing

## Development

### Install Dev Dependencies
```bash
npm install --save-dev nodemon
```

### Run with Auto-Reload
```bash
npm run dev
```

## Security Notes

⚠️ This is a demo backend for testing purposes only.

For production:
- Use a real database
- Hash passwords
- Use environment variables for secret key
- Implement proper authentication
- Add rate limiting
- Use HTTPS

## Troubleshooting

### Port Already in Use
```bash
# Find process on port 5000
lsof -i :5000

# Kill process
kill -9 <PID>
```

### CORS Error
Check frontend URL matches CORS origin in `server.js`

### Token Invalid
Ensure token is sent in correct format:
```
Authorization: Bearer <token>
```

## Files

- `server.js` - Main server file with all endpoints
- `package.json` - Dependencies and scripts

## License

MIT
